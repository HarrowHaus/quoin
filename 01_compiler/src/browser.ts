/**
 * Quoin compiler — browser-safe public API.
 *
 * Mirrors `index.ts` except for the pack loaders (`loadTokenPack`,
 * `loadVocabularyPack`, `loadImplementationPack`), which depend on
 * `node:fs` / `node:path` / `node:url` and cannot run in a browser.
 *
 * Browser consumers (e.g. the live playground) construct pack objects
 * in memory using {@link flattenDtcg} + {@link resolveReferences} and
 * pass them directly to {@link compile} — no disk access required.
 */

export { compile, createCompiler } from "./compiler.js";
export { validateManifest } from "./pack-validator.js";
export {
  flattenDtcg,
  resolveReferences,
  findMissingSemanticTokens,
  REQUIRED_SEMANTIC_TOKENS
} from "./token-resolver.js";
export { parse } from "./parser.js";
export { serialize } from "./serializer.js";
export { CompilerError, PackValidationError } from "./errors.js";

export type {
  AttributeSpec,
  CanonicalAttribute,
  CompileOptions,
  CompileResult,
  CompilerDiagnostic,
  EmitFn,
  EmitInput,
  EmitOutput,
  HTMLElement,
  HTMLNode,
  HTMLText,
  ImplementationPack,
  PackManifest,
  PrimitiveCategory,
  PrimitiveDefinition,
  ResolvedAttributes,
  ResolvedTokens,
  TokenPack,
  VocabularyPack
} from "./types.js";

export { CANONICAL_ATTRIBUTES, CANONICAL_VALUE_SETS } from "./types.js";
