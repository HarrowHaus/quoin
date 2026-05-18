/**
 * Pack loaders.
 *
 * A pack source is either:
 *   - An in-memory pack object (TokenPack | VocabularyPack | ImplementationPack)
 *   - A filesystem path to a pack directory containing quoin.pack.json
 *
 * The on-disk loader is best-effort: it reads JSON exports and dynamic-imports
 * JS exports for implementation packs. TypeScript-source impl packs should be
 * supplied as in-memory objects (tests do this directly).
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type {
  EmitFn,
  IconDefinition,
  IconPack,
  IconPackSource,
  ImplementationPack,
  ImplementationPackSource,
  PackManifest,
  PatternPack,
  PatternPackSource,
  PrimitiveDefinition,
  ThemePack,
  ThemePackSource,
  TokenPack,
  TokenPackSource,
  VocabularyPack,
  VocabularyPackSource
} from "./types.js";
import { validateManifest } from "./pack-validator.js";
import {
  REQUIRED_SEMANTIC_TOKENS,
  findMissingSemanticTokens,
  flattenDtcg,
  resolveReferences
} from "./token-resolver.js";
import { PackValidationError } from "./errors.js";

/* ────────────────────── Token pack ────────────────────── */

export async function loadTokenPack(source: TokenPackSource): Promise<TokenPack> {
  if (typeof source !== "string") {
    return finalizeTokenPack(source);
  }
  const manifest = await readManifest(source);
  if (manifest.type !== "token") {
    throw new PackValidationError(
      `Expected token pack, got "${manifest.type}" for ${manifest.name}`,
      manifest.name
    );
  }
  const tokensPath = manifest.exports.tokens;
  if (!tokensPath) {
    throw new PackValidationError(
      `Token pack ${manifest.name} missing "exports.tokens"`,
      manifest.name
    );
  }
  const tokensFile = path.join(source, tokensPath);
  const dtcg = JSON.parse(await fs.readFile(tokensFile, "utf8"));
  const flat = flattenDtcg(dtcg);
  const tokens = resolveReferences(flat);
  return finalizeTokenPack({
    manifest,
    tokens,
    capabilities: new Set(manifest.capabilities ?? [])
  });
}

function finalizeTokenPack(pack: TokenPack): TokenPack {
  const missing = findMissingSemanticTokens(pack.tokens);
  if (missing.length === 0) return pack;
  // Phase 0.5 transitional window: packs that declare
  // `"status": "pending-3.5c-fill"` in their manifest are allowed to
  // be missing canonical tokens — they emit a warning rather than
  // throwing. Strict validation resumes after Phase 3.5c lands.
  const status = (pack.manifest as { status?: string }).status;
  if (status === "pending-3.5c-fill") {
    if (typeof console !== "undefined" && typeof console.warn === "function") {
      console.warn(
        `Token pack ${pack.manifest.name} is pending-3.5c-fill: ${missing.length} canonical tokens not yet populated.`
      );
    }
    return pack;
  }
  throw new PackValidationError(
    `Token pack ${pack.manifest.name} missing canonical semantic tokens: ` +
      missing.join(", "),
    pack.manifest.name
  );
}

/* ────────────────────── Vocabulary pack ────────────────────── */

export async function loadVocabularyPack(
  source: VocabularyPackSource
): Promise<VocabularyPack> {
  if (typeof source !== "string") return source;
  const manifest = await readManifest(source);
  if (manifest.type !== "vocabulary") {
    throw new PackValidationError(
      `Expected vocabulary pack, got "${manifest.type}" for ${manifest.name}`,
      manifest.name
    );
  }
  const primitivesPath = manifest.exports.primitives;
  if (!primitivesPath) {
    throw new PackValidationError(
      `Vocabulary pack ${manifest.name} missing "exports.primitives"`,
      manifest.name
    );
  }
  const file = path.join(source, primitivesPath);
  const data = JSON.parse(await fs.readFile(file, "utf8")) as unknown;
  const list = normalisePrimitivesList(data);
  const primitives: Record<string, PrimitiveDefinition> = {};
  for (const p of list) {
    if (primitives[p.name]) {
      throw new PackValidationError(
        `Duplicate primitive "${p.name}" in vocabulary pack ${manifest.name}`,
        manifest.name
      );
    }
    primitives[p.name] = p;
  }

  let componentTokens: Record<string, string> | undefined;
  const compPath = manifest.exports.componentTokens;
  if (compPath) {
    try {
      const raw = JSON.parse(await fs.readFile(path.join(source, compPath), "utf8"));
      componentTokens = flattenDtcg(raw);
    } catch {
      componentTokens = undefined;
    }
  }

  return { manifest, primitives, componentTokens };
}

function normalisePrimitivesList(input: unknown): PrimitiveDefinition[] {
  if (Array.isArray(input)) return input as PrimitiveDefinition[];
  if (input && typeof input === "object" && "primitives" in input) {
    const inner = (input as { primitives: unknown }).primitives;
    if (Array.isArray(inner)) return inner as PrimitiveDefinition[];
  }
  throw new PackValidationError(
    'Vocabulary pack primitives entry must be an array or `{ "primitives": [...] }`'
  );
}

/* ────────────────────── Theme pack ────────────────────── */

export async function loadThemePack(source: ThemePackSource): Promise<ThemePack> {
  if (typeof source !== "string") return source;
  const manifest = await readManifest(source);
  if (manifest.type !== "theme") {
    throw new PackValidationError(
      `Expected theme pack, got "${manifest.type}" for ${manifest.name}`,
      manifest.name
    );
  }
  const lightPath = manifest.exports.lightModeOverrides;
  if (!lightPath) {
    throw new PackValidationError(
      `Theme pack ${manifest.name} missing "exports.lightModeOverrides"`,
      manifest.name
    );
  }
  const lightModeOverrides = await readOverrideFile(source, lightPath, manifest.name);
  const darkPath = manifest.exports.darkModeOverrides;
  const darkModeOverrides = darkPath
    ? await readOverrideFile(source, darkPath, manifest.name)
    : undefined;
  const p3Path = manifest.exports.p3WideGamutOverrides;
  const p3WideGamutOverrides = p3Path
    ? await readOverrideFile(source, p3Path, manifest.name)
    : undefined;
  return { manifest, lightModeOverrides, darkModeOverrides, p3WideGamutOverrides };
}

async function readOverrideFile(
  packDir: string,
  relPath: string,
  packName: string
): Promise<Record<string, string>> {
  const file = path.join(packDir, relPath);
  const raw = JSON.parse(await fs.readFile(file, "utf8"));
  const flat = flattenDtcg(raw);
  const tokens = resolveReferences(flat);
  // Theme packs MUST NOT introduce names outside the canonical namespace.
  const canonical = new Set(REQUIRED_SEMANTIC_TOKENS);
  const extras = Object.keys(tokens).filter((n) => !canonical.has(n));
  if (extras.length > 0) {
    throw new PackValidationError(
      `Theme pack ${packName} (${relPath}) introduces non-canonical token names: ` +
        extras.slice(0, 5).join(", ") +
        (extras.length > 5 ? `, ... (+${extras.length - 5} more)` : ""),
      packName
    );
  }
  return tokens;
}

/* ────────────────────── Pattern pack ────────────────────── */

export async function loadPatternPack(source: PatternPackSource): Promise<PatternPack> {
  if (typeof source !== "string") return source;
  const manifest = await readManifest(source);
  if (manifest.type !== "pattern") {
    throw new PackValidationError(
      `Expected pattern pack, got "${manifest.type}" for ${manifest.name}`,
      manifest.name
    );
  }
  const primitivesPath = manifest.exports.primitives;
  if (!primitivesPath) {
    throw new PackValidationError(
      `Pattern pack ${manifest.name} missing "exports.primitives"`,
      manifest.name
    );
  }
  const file = path.join(source, primitivesPath);
  const data = JSON.parse(await fs.readFile(file, "utf8")) as unknown;
  const list = normalisePrimitivesList(data);
  const primitives: Record<string, PrimitiveDefinition> = {};
  for (const p of list) {
    if (primitives[p.name]) {
      throw new PackValidationError(
        `Duplicate primitive "${p.name}" in pattern pack ${manifest.name}`,
        manifest.name
      );
    }
    primitives[p.name] = p;
  }

  let componentTokens: Record<string, string> | undefined;
  const compPath = manifest.exports.componentTokens;
  if (compPath) {
    try {
      const raw = JSON.parse(await fs.readFile(path.join(source, compPath), "utf8"));
      componentTokens = flattenDtcg(raw);
    } catch {
      componentTokens = undefined;
    }
  }

  const states = manifest.states ?? [];
  const microStates = manifest.microStates ?? [];
  if (!states.includes("default")) {
    throw new PackValidationError(
      `Pattern pack ${manifest.name}: "states" must include "default"`,
      manifest.name
    );
  }
  if (!microStates.includes("default") || !microStates.includes("focus")) {
    throw new PackValidationError(
      `Pattern pack ${manifest.name}: "microStates" must include "default" and "focus"`,
      manifest.name
    );
  }

  return { manifest, primitives, componentTokens, states, microStates };
}

/* ────────────────────── Icon pack ────────────────────── */

export async function loadIconPack(source: IconPackSource): Promise<IconPack> {
  if (typeof source !== "string") return source;
  const manifest = await readManifest(source);
  if (manifest.type !== "icon") {
    throw new PackValidationError(
      `Expected icon pack, got "${manifest.type}" for ${manifest.name}`,
      manifest.name
    );
  }
  const iconsDir = manifest.exports.icons;
  const iconManifestPath = manifest.exports.manifest;
  if (!iconsDir || !iconManifestPath) {
    throw new PackValidationError(
      `Icon pack ${manifest.name} missing "exports.icons" or "exports.manifest"`,
      manifest.name
    );
  }
  const iconManifest = JSON.parse(
    await fs.readFile(path.join(source, iconManifestPath), "utf8")
  ) as { icons?: IconDefinition[] };
  const defs = iconManifest.icons ?? [];
  if (!Array.isArray(defs)) {
    throw new PackValidationError(
      `Icon pack ${manifest.name} manifest must declare "icons" as an array`,
      manifest.name
    );
  }

  const icons: Record<string, string> = {};
  const definitions: Record<string, IconDefinition> = {};
  for (const def of defs) {
    if (!def.name || !def.file) {
      throw new PackValidationError(
        `Icon pack ${manifest.name}: every icon entry must declare "name" and "file"`,
        manifest.name
      );
    }
    const svgPath = path.join(source, iconsDir, def.file);
    const svg = await fs.readFile(svgPath, "utf8");
    icons[def.name] = svg;
    definitions[def.name] = def;
    for (const alias of def.aliases ?? []) {
      if (!icons[alias]) icons[alias] = svg;
      if (!definitions[alias]) definitions[alias] = def;
    }
  }

  const semanticTag = manifest.semanticTag ?? "icon";
  const shortName = deriveIconPackShortName(manifest.name);
  return { manifest, semanticTag, shortName, icons, definitions };
}

function deriveIconPackShortName(packName: string): string {
  // "@quoin/icons-mynaui" -> "mynaui"
  const slash = packName.lastIndexOf("/");
  const tail = slash >= 0 ? packName.slice(slash + 1) : packName;
  const stripped = tail.replace(/^icons?-/, "");
  return stripped || tail;
}

/* ────────────────────── Implementation pack ────────────────────── */

export async function loadImplementationPack(
  source: ImplementationPackSource
): Promise<ImplementationPack> {
  if (typeof source !== "string") return source;
  const manifest = await readManifest(source);
  if (manifest.type !== "implementation") {
    throw new PackValidationError(
      `Expected implementation pack, got "${manifest.type}" for ${manifest.name}`,
      manifest.name
    );
  }
  const emitPath = manifest.exports.emit;
  const metaPath = manifest.exports.metadata;
  if (!emitPath || !metaPath) {
    throw new PackValidationError(
      `Implementation pack ${manifest.name} missing "exports.emit" or "exports.metadata"`,
      manifest.name
    );
  }
  const metadata = JSON.parse(
    await fs.readFile(path.join(source, metaPath), "utf8")
  );
  const emitModUrl = pathToFileURL(path.join(source, emitPath)).href;
  const mod = (await import(emitModUrl)) as { default?: EmitFn; emit?: EmitFn };
  const emit = mod.emit ?? mod.default;
  if (typeof emit !== "function") {
    throw new PackValidationError(
      `Implementation pack ${manifest.name}: emit module exports neither "emit" nor default function`,
      manifest.name
    );
  }
  return { manifest, emit, metadata };
}

/* ────────────────────── shared helpers ────────────────────── */

async function readManifest(packDir: string): Promise<PackManifest> {
  const manifestPath = path.join(packDir, "quoin.pack.json");
  const raw = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  return validateManifest(raw);
}
