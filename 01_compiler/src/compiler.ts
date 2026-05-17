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
  PrimitiveDefinition,
  ResolvedTokens,
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

  const registry = buildPrimitiveRegistry(options.vocabularyPacks, warnings);
  const tokens = mergedTokens(options.tokenPack, options.projectTokens);

  const tree = parse(options.source);
  const cssChunks: string[] = [];
  const usedPrimitives = new Set<string>();
  const usedTokens = new Set<string>();

  const compiledTree: HTMLNode[] = tree.map((n) =>
    compileNode(n, {}, {
      registry,
      tokens,
      options,
      cssChunks,
      usedPrimitives,
      usedTokens
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
  tokens: Record<string, string>;
  options: CompileOptions;
  cssChunks: string[];
  usedPrimitives: Set<string>;
  usedTokens: Set<string>;
}

function compileNode(
  node: HTMLNode,
  inherited: InheritedAttributes,
  ctx: CompileContext
): HTMLNode {
  if (node.type === "text") return node;
  const tag = node.tag;
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
  pack: VocabularyPack,
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
  byName: Map<string, { primitive: PrimitiveDefinition; pack: VocabularyPack }>;
}

function buildPrimitiveRegistry(
  packs: VocabularyPack[],
  warnings: CompilerDiagnostic[]
): PrimitiveRegistry {
  const byName = new Map<
    string,
    { primitive: PrimitiveDefinition; pack: VocabularyPack }
  >();
  for (const pack of packs) {
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

function mergedTokens(
  tokenPack: TokenPack,
  projectTokens: Record<string, string> | undefined
): Record<string, string> {
  const out: Record<string, string> = { ...tokenPack.tokens };
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
