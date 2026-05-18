/**
 * Compilation pipeline.
 *
 * Implements spec.md §5: parse -> identify -> resolve attrs -> resolve tokens
 * -> emit -> replace -> serialize. Emits warnings for the conditions in §5.3
 * (vocabulary collisions, unused tokens, unused primitives).
 */

import { parse } from "./parser.js";
import { serialize } from "./serializer.js";
import { inheritedForChildren, resolveAttributes } from "./cascade.js";
import { findMissingSemanticTokens, lookupToken } from "./token-resolver.js";
import { CompilerError, PackValidationError } from "./errors.js";
import type {
  CompileOptions,
  CompileResult,
  CompilerDiagnostic,
  EmitInput,
  EmitOutput,
  HTMLElement,
  HTMLNode,
  IconPack,
  PatternPack,
  PrimitiveDefinition,
  ResolvedTokens,
  ThemePack,
  TokenPack,
  VocabularyPack
} from "./types.js";
import type { InheritedAttributes } from "./cascade.js";

/* ────────────────────── public entry ────────────────────── */

export function compile(options: CompileOptions): CompileResult {
  return runCompile(options);
}

/**
 * Create a reusable compiler instance bound to a fixed pack configuration.
 * Each compile() call still uses fresh state — no leakage between builds.
 */
export function createCompiler(
  base: Omit<CompileOptions, "source" | "filename">
): {
  compile(source: string, filename?: string): CompileResult;
} {
  return {
    compile(source: string, filename?: string): CompileResult {
      return runCompile({ ...base, source, filename });
    }
  };
}

/* ────────────────────── pipeline ────────────────────── */

function runCompile(options: CompileOptions): CompileResult {
  const warnings: CompilerDiagnostic[] = [];

  // Validate the canonical semantic namespace once per compile (the loader
  // does this on disk-loaded packs; this catches in-memory packs too).
  // Phase 0.5: packs declaring `"status": "pending-3.5c-fill"` emit a
  // warning instead of throwing during the transitional window.
  const missingCanonical = findMissingSemanticTokens(options.tokenPack.tokens);
  if (missingCanonical.length > 0) {
    const status = (options.tokenPack.manifest as { status?: string }).status;
    if (status === "pending-3.5c-fill") {
      warnings.push({
        kind: "warning",
        message: `Token pack ${options.tokenPack.manifest.name} is pending-3.5c-fill: ${missingCanonical.length} canonical tokens not yet populated.`,
        pack: options.tokenPack.manifest.name
      });
    } else {
      throw new PackValidationError(
        `Token pack ${options.tokenPack.manifest.name} missing canonical semantic tokens: ` +
          missingCanonical.join(", "),
        options.tokenPack.manifest.name
      );
    }
  }

  const registry = buildPrimitiveRegistry(
    options.vocabularyPacks,
    options.patternPacks ?? [],
    warnings
  );
  const tokens = mergedTokens(
    options.tokenPack,
    options.themePack,
    options.projectTokens
  );
  const iconRegistry = buildIconRegistry(options.iconPacks ?? []);

  const tree = parse(options.source);
  const cssChunks: string[] = [];
  const usedPrimitives = new Set<string>();
  const usedTokens = new Set<string>();

  const compiledTree: HTMLNode[] = tree.map((n) =>
    compileNode(n, {}, {
      registry,
      iconRegistry,
      tokens,
      options,
      cssChunks,
      usedPrimitives,
      usedTokens,
      warnings
    })
  );

  recordUnusedWarnings(
    options.vocabularyPacks,
    options.tokenPack,
    usedPrimitives,
    usedTokens,
    warnings
  );

  const html = serialize(compiledTree, { pretty: true });
  const css = cssChunks.join("\n").trim();
  return { html, css, warnings };
}

interface CompileContext {
  registry: PrimitiveRegistry;
  iconRegistry: IconRegistry;
  tokens: Record<string, string>;
  options: CompileOptions;
  cssChunks: string[];
  usedPrimitives: Set<string>;
  usedTokens: Set<string>;
  warnings: CompilerDiagnostic[];
}

function compileNode(
  node: HTMLNode,
  inherited: InheritedAttributes,
  ctx: CompileContext
): HTMLNode {
  if (node.type === "text") return node;
  const tag = node.tag;
  // Icon-pack tags take precedence over primitive registry — an icon
  // pack can register a tag like `icon` or `brand-mark` and the
  // compiler resolves the SVG inline before falling through.
  if (ctx.iconRegistry.tags.has(tag)) {
    return emitIcon(node, tag, ctx);
  }
  const entry = ctx.registry.byName.get(tag);
  if (!entry) {
    const childInherited = inherited;
    return {
      ...node,
      children: node.children.map((c) => compileNode(c, childInherited, ctx))
    };
  }
  return emitPrimitive(node, entry.primitive, entry.pack, inherited, ctx);
}

function emitPrimitive(
  el: HTMLElement,
  primitive: PrimitiveDefinition,
  pack: VocabularyPack | PatternPack,
  inherited: InheritedAttributes,
  ctx: CompileContext
): HTMLNode {
  const filename = ctx.options.filename;
  const diagnose = (msg: string): CompilerError =>
    new CompilerError("INVALID_ATTRIBUTE_VALUE", msg, {
      filename,
      primitive: primitive.name,
      pack: pack.manifest.name
    });

  const resolved = resolveAttributes(primitive, el, inherited, diagnose);

  const tokens: ResolvedTokens = {};
  const packStatus = (ctx.options.tokenPack.manifest as { status?: string }).status;
  for (const [property, ref] of Object.entries(primitive.tokens)) {
    const value = lookupToken(ctx.tokens, ref);
    if (value === undefined) {
      if (packStatus === "pending-3.5c-fill") {
        // Phase 0.5 transitional: a primitive referencing a token the
        // pack hasn't filled yet emits the literal CSS-var fallback
        // (`var(--foo)`) instead of throwing. The compiler test suite
        // and reference demos keep functioning while harvested packs
        // are populated in Phase 3.5c.
        const cssVar = ref.startsWith("--") ? ref : `--${ref}`;
        tokens[property] = `var(${cssVar})`;
        ctx.usedTokens.add(normaliseTokenName(ref));
        continue;
      }
      throw new CompilerError(
        "MISSING_TOKEN",
        `Token "${ref}" is not provided by the active token pack ` +
          `(referenced by <${primitive.name}>)`,
        {
          filename,
          primitive: primitive.name,
          pack: pack.manifest.name
        }
      );
    }
    tokens[property] = value;
    ctx.usedTokens.add(normaliseTokenName(ref));
  }

  ctx.usedPrimitives.add(primitive.name);

  const childInherited = inheritedForChildren(resolved);
  const compiledChildren = el.children.map((c) =>
    compileNode(c, childInherited, ctx)
  );

  const emitInput: EmitInput = {
    primitive,
    attributes: resolved,
    tokens,
    children: compiledChildren
  };

  let output: EmitOutput;
  try {
    output = ctx.options.implementationPack.emit(emitInput);
  } catch (err) {
    if (err instanceof CompilerError) throw err;
    const msg = err instanceof Error ? err.message : String(err);
    if (/no emitter|unsupported|missing/i.test(msg)) {
      throw new CompilerError(
        "MISSING_EMITTER",
        `Implementation pack ${ctx.options.implementationPack.manifest.name} ` +
          `has no emitter for <${primitive.name}>: ${msg}`,
        {
          filename,
          primitive: primitive.name,
          pack: ctx.options.implementationPack.manifest.name
        }
      );
    }
    throw err;
  }

  if (output.css) ctx.cssChunks.push(output.css);
  return output.html;
}

/* ────────────────────── helpers ────────────────────── */

interface PrimitiveRegistry {
  byName: Map<
    string,
    { primitive: PrimitiveDefinition; pack: VocabularyPack | PatternPack }
  >;
}

interface IconRegistry {
  /** Set of tags registered by any active icon pack. */
  tags: Set<string>;
  /**
   * Tag -> list of icon packs that register it, in load order.
   * The compiler walks this list when resolving an icon name; the
   * first pack containing the name (or matching the requested
   * `pack="<short>"` attribute) wins.
   */
  byTag: Map<string, IconPack[]>;
  /** Short-name -> icon pack, for `pack="<short>"` disambiguation. */
  byShortName: Map<string, IconPack>;
}

function buildPrimitiveRegistry(
  vocabPacks: VocabularyPack[],
  patternPacks: PatternPack[],
  warnings: CompilerDiagnostic[]
): PrimitiveRegistry {
  const byName = new Map<
    string,
    { primitive: PrimitiveDefinition; pack: VocabularyPack | PatternPack }
  >();
  // Vocab packs first, then pattern packs — patterns can shadow vocab
  // primitives of the same name (a "button-pattern" pack augmenting a
  // vocab pack's bare button is a valid composition).
  const allPacks: Array<VocabularyPack | PatternPack> = [
    ...vocabPacks,
    ...patternPacks
  ];
  for (const pack of allPacks) {
    for (const [name, primitive] of Object.entries(pack.primitives)) {
      if (byName.has(name)) {
        const prev = byName.get(name)!;
        warnings.push({
          kind: "warning",
          message:
            `Primitive name collision: <${name}> defined by both ` +
            `${prev.pack.manifest.name} and ${pack.manifest.name}. ` +
            `Last loaded wins (${pack.manifest.name}).`,
          primitive: name
        });
      }
      byName.set(name, { primitive, pack });
    }
  }
  return { byName };
}

function buildIconRegistry(packs: IconPack[]): IconRegistry {
  const tags = new Set<string>();
  const byTag = new Map<string, IconPack[]>();
  const byShortName = new Map<string, IconPack>();
  for (const pack of packs) {
    tags.add(pack.semanticTag);
    const existing = byTag.get(pack.semanticTag);
    if (existing) existing.push(pack);
    else byTag.set(pack.semanticTag, [pack]);
    if (!byShortName.has(pack.shortName)) {
      byShortName.set(pack.shortName, pack);
    }
  }
  return { tags, byTag, byShortName };
}

function mergedTokens(
  tokenPack: TokenPack,
  themePack: ThemePack | undefined,
  projectTokens: Record<string, string> | undefined
): Record<string, string> {
  // Composition order: token pack → theme (light) → project overrides.
  // Theme dark + p3 overrides aren't applied at compile time — the
  // implementation pack reads them off the theme pack to emit
  // mode-scoped CSS blocks alongside the resolved output.
  const out: Record<string, string> = { ...tokenPack.tokens };
  if (themePack) {
    for (const [name, value] of Object.entries(themePack.lightModeOverrides)) {
      out[normaliseTokenName(name)] = value;
    }
  }
  if (projectTokens) {
    for (const [name, value] of Object.entries(projectTokens)) {
      out[normaliseTokenName(name)] = value;
    }
  }
  return out;
}

function normaliseTokenName(name: string): string {
  let k = name.trim();
  if (k.startsWith("{") && k.endsWith("}")) k = k.slice(1, -1);
  if (k.startsWith("--")) k = k.slice(2);
  return k;
}

function recordUnusedWarnings(
  packs: VocabularyPack[],
  tokenPack: TokenPack,
  usedPrimitives: Set<string>,
  usedTokens: Set<string>,
  warnings: CompilerDiagnostic[]
): void {
  for (const pack of packs) {
    for (const name of Object.keys(pack.primitives)) {
      if (!usedPrimitives.has(name)) {
        warnings.push({
          kind: "warning",
          message: `Unused primitive: <${name}> declared by ${pack.manifest.name} but not used in source`,
          primitive: name,
          pack: pack.manifest.name
        });
      }
    }
  }
  for (const name of Object.keys(tokenPack.tokens)) {
    if (!usedTokens.has(name)) {
      warnings.push({
        kind: "warning",
        message: `Unused token: --${name} declared by ${tokenPack.manifest.name} but not referenced by any primitive`,
        pack: tokenPack.manifest.name
      });
    }
  }
}

/* ────────────────────── icon resolution ────────────────────── */

const ICON_SIZE_TOKEN_KEYS: Record<string, string> = {
  xs: "icon-size-xs",
  sm: "icon-size-sm",
  md: "icon-size-md",
  lg: "icon-size-lg",
  xl: "icon-size-xl"
};

function emitIcon(
  el: HTMLElement,
  tag: string,
  ctx: CompileContext
): HTMLNode {
  const filename = ctx.options.filename;
  const name = el.attributes.name;
  if (!name) {
    throw new CompilerError(
      "MISSING_ATTRIBUTE",
      `<${tag}> requires a "name" attribute`,
      { filename }
    );
  }

  const candidates = ctx.iconRegistry.byTag.get(tag) ?? [];
  const requestedPack = el.attributes.pack;
  let match: { pack: IconPack; svg: string } | undefined;
  if (requestedPack) {
    const pack = ctx.iconRegistry.byShortName.get(requestedPack);
    if (!pack) {
      throw new CompilerError(
        "MISSING_ICON_PACK",
        `<${tag} name="${name}" pack="${requestedPack}" />: no loaded icon pack with short-name "${requestedPack}"`,
        { filename }
      );
    }
    const svg = pack.icons[name];
    if (!svg) {
      throw new CompilerError(
        "MISSING_ICON",
        `<${tag} name="${name}" />: icon "${name}" not found in pack ${pack.manifest.name}`,
        { filename, pack: pack.manifest.name }
      );
    }
    match = { pack, svg };
  } else {
    for (const pack of candidates) {
      const svg = pack.icons[name];
      if (svg) {
        match = { pack, svg };
        break;
      }
    }
  }

  if (!match) {
    throw new CompilerError(
      "MISSING_ICON",
      `<${tag} name="${name}" />: icon "${name}" not found in any loaded icon pack`,
      { filename }
    );
  }

  const size = el.attributes.size ?? "md";
  const sizeTokenKey = ICON_SIZE_TOKEN_KEYS[size];
  let sizeValue: string;
  if (sizeTokenKey) {
    const v = ctx.tokens[sizeTokenKey];
    if (v === undefined) {
      // Should never happen post-canonical-namespace, but guard anyway.
      sizeValue = `var(--${sizeTokenKey})`;
    } else {
      sizeValue = v;
    }
    ctx.usedTokens.add(sizeTokenKey);
  } else {
    // Caller passed a raw dimension (`size="22px"`) — pass through.
    sizeValue = size;
  }

  const labelAttr = el.attributes["aria-label"];
  const decorative = el.attributes["aria-hidden"] === "true";
  const ariaLabel = labelAttr ?? (decorative ? undefined : name.replace(/-/g, " "));

  const svgEl = parseSvg(match.svg, tag, name, filename);

  // Apply size + accessibility attributes to the root <svg>.
  svgEl.attributes.width = sizeValue;
  svgEl.attributes.height = sizeValue;
  if (decorative) {
    svgEl.attributes["aria-hidden"] = "true";
    delete svgEl.attributes["aria-label"];
    delete svgEl.attributes.role;
  } else {
    if (ariaLabel) svgEl.attributes["aria-label"] = ariaLabel;
    svgEl.attributes.role = "img";
  }
  // Surface which pack supplied the glyph for debug / impl-pack use.
  svgEl.attributes["data-icon-pack"] = match.pack.shortName;
  svgEl.attributes["data-icon-name"] = name;

  return svgEl;
}

function parseSvg(
  svg: string,
  tag: string,
  name: string,
  filename: string | undefined
): HTMLElement {
  const nodes = parse(svg);
  const root = nodes.find((n): n is HTMLElement => n.type === "element" && n.tag === "svg");
  if (!root) {
    throw new CompilerError(
      "INVALID_ICON_SVG",
      `<${tag} name="${name}" />: pack supplied SVG without a single root <svg> element`,
      { filename }
    );
  }
  return root;
}
