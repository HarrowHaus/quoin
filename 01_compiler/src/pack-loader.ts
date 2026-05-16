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
  ImplementationPack,
  PackManifest,
  PrimitiveDefinition,
  TokenPack,
  TokenPackSource,
  VocabularyPack,
  VocabularyPackSource,
  ImplementationPackSource
} from "./types.js";
import { validateManifest } from "./pack-validator.js";
import {
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
  if (missing.length > 0) {
    throw new PackValidationError(
      `Token pack ${pack.manifest.name} missing canonical semantic tokens: ` +
        missing.join(", "),
      pack.manifest.name
    );
  }
  return pack;
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
