/**
 * Quoin reference compiler — public API.
 */

export { compile, createCompiler } from "./compiler.js";
export {
  loadTokenPack,
  loadVocabularyPack,
  loadImplementationPack
} from "./pack-loader.js";
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
