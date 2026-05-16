/**
 * Quoin compiler shared types.
 *
 * Mirrors the contracts in 00_spec/spec.md, pack-format.md, tokens.md.
 */

export type CanonicalAttribute =
  | "intent"
  | "register"
  | "density"
  | "weight"
  | "scope";

export const CANONICAL_ATTRIBUTES: readonly CanonicalAttribute[] = [
  "intent",
  "register",
  "density",
  "weight",
  "scope"
] as const;

export const CANONICAL_VALUE_SETS: Record<CanonicalAttribute, readonly string[]> = {
  intent: [
    "primary",
    "secondary",
    "tertiary",
    "supporting",
    "critical",
    "success",
    "warning",
    "info"
  ],
  register: ["formal", "technical", "editorial", "casual", "dense"],
  density: ["sparse", "normal", "dense", "ultra"],
  weight: ["recede", "normal", "emphasize", "dominate"],
  scope: ["block", "inline", "ambient"]
};

export type PrimitiveCategory =
  | "editorial"
  | "layout"
  | "navigation"
  | "state"
  | "content"
  | "interactive";

/** A primitive attribute spec, as it appears in a vocabulary pack. */
export interface AttributeSpec {
  values: readonly string[];
  default?: string;
  /** True for primitive-specific (non-canonical) attributes. */
  specific?: boolean;
}

/** Primitive definition as declared by a vocabulary pack. */
export interface PrimitiveDefinition {
  name: string;
  category: PrimitiveCategory;
  role: string;
  attributes: Record<string, AttributeSpec>;
  /** CSS-property -> semantic-token reference (e.g. "--text-emphasis"). */
  tokens: Record<string, string>;
  structure: {
    element: string;
    attributes?: Record<string, string>;
  };
  children: "phrasing-content" | "flow-content" | "none" | string[];
  scope: "block" | "inline" | "ambient";
  /** Optional pack-defined extras carried through to emitters. */
  meta?: Record<string, unknown>;
}

/** Resolved attribute state after cascade. */
export interface ResolvedAttributes {
  /** Canonical attribute final values keyed by canonical name. */
  canonical: Partial<Record<CanonicalAttribute, string>>;
  /** Primitive-specific attribute final values, raw strings as authored. */
  specific: Record<string, string>;
}

/** Resolved token values for a primitive — semantic name -> raw value. */
export type ResolvedTokens = Record<string, string>;

/* ────────────────────── HTML node model ────────────────────── */

export type HTMLNode = HTMLElement | HTMLText;

export interface HTMLElement {
  type: "element";
  tag: string;
  attributes: Record<string, string>;
  children: HTMLNode[];
  /** True if the element should be serialized as void (e.g. img, input). */
  voidElement?: boolean;
}

export interface HTMLText {
  type: "text";
  value: string;
}

/* ────────────────────── Pack model ────────────────────── */

export interface PackManifest {
  $schema?: string;
  name: string;
  version: string;
  type: "token" | "vocabulary" | "implementation";
  quoinVersion: string;
  description: string;
  exports: Record<string, string>;
  metadata?: {
    author?: string;
    license?: string;
    homepage?: string;
    tags?: string[];
  };
  attribution?: {
    sourceSystem: string;
    sourceOrganization?: string;
    sourceUrl?: string;
    sourceLicense: string;
    harvestedAt: string;
    harvestNotes?: string;
  };
  peerPacks?: Record<string, string>;
  capabilities?: string[];
}

/** A loaded token pack. */
export interface TokenPack {
  manifest: PackManifest;
  /** Flat map of token name (with or without leading `--`) -> resolved value. */
  tokens: Record<string, string>;
  capabilities: ReadonlySet<string>;
}

/** A loaded vocabulary pack. */
export interface VocabularyPack {
  manifest: PackManifest;
  primitives: Record<string, PrimitiveDefinition>;
  /** Component tokens declared by the pack (optional). */
  componentTokens?: Record<string, string>;
}

/** Inputs delivered to the implementation pack's emit function. */
export interface EmitInput {
  primitive: PrimitiveDefinition;
  attributes: ResolvedAttributes;
  tokens: ResolvedTokens;
  children: HTMLNode[];
}

export interface EmitOutput {
  html: HTMLElement;
  css?: string;
}

export type EmitFn = (input: EmitInput) => EmitOutput;

export interface ImplementationPack {
  manifest: PackManifest;
  emit: EmitFn;
  metadata: {
    target: string;
    supportedPrimitives: string[] | ["*"];
    emittedFormat: string;
    capabilities?: string[];
    [key: string]: unknown;
  };
}

/* ────────────────────── Compiler I/O ────────────────────── */

export interface CompileOptions {
  source: string;
  tokenPack: TokenPack;
  vocabularyPacks: VocabularyPack[];
  implementationPack: ImplementationPack;
  /** Project-local token overrides (token name -> value). Highest precedence. */
  projectTokens?: Record<string, string>;
  /** Source file path, used in diagnostics only. */
  filename?: string;
}

export interface CompileResult {
  html: string;
  css: string;
  warnings: CompilerDiagnostic[];
}

export interface CompilerDiagnostic {
  kind: "warning" | "error";
  message: string;
  filename?: string;
  primitive?: string;
  pack?: string;
}

/* ────────────────────── Pack sources (loader inputs) ────────────────────── */

/**
 * A pack source is either a fully constructed in-memory pack object,
 * or a directory path to load from disk.
 */
export type TokenPackSource = TokenPack | string;
export type VocabularyPackSource = VocabularyPack | string;
export type ImplementationPackSource = ImplementationPack | string;
