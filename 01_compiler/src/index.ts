/**
 * Quoin reference compiler — public API.
 */

export { compile, createCompiler } from "./compiler.js";
export {
  loadTokenPack,
  loadVocabularyPack,
  loadImplementationPack,
  loadAestheticPack,
  /** @deprecated D.52 — use loadAestheticPack. */
  loadThemePack,
  loadPatternPack,
  loadIconPack
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
  AestheticPack,
  AestheticPackSource,
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
  IconDefinition,
  IconPack,
  IconPackSource,
  ImplementationPack,
  ImplementationPackSource,
  PackManifest,
  PackType,
  PatternPack,
  PatternPackSource,
  PrimitiveCategory,
  PrimitiveDefinition,
  ResolvedAttributes,
  ResolvedTokens,
  /** @deprecated D.52 — use AestheticPack. */
  ThemePack,
  /** @deprecated D.52 — use AestheticPackSource. */
  ThemePackSource,
  TokenPack,
  TokenPackSource,
  VocabularyPack,
  VocabularyPackSource
} from "./types.js";

export { CANONICAL_ATTRIBUTES, CANONICAL_VALUE_SETS, PACK_TYPE_ALIASES } from "./types.js";
