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

export type PackType =
  | "token"
  | "vocabulary"
  | "implementation"
  | "aesthetic"
  | "theme"
  | "template"
  | "pattern"
  | "icon";

/**
 * Canonical pack-type discriminator names.
 *
 * D.52 (operator-locked 2026-05-18): "aesthetic" is the canonical name
 * for visual-only token-rebinding packs. "theme" is retained as a
 * deprecated alias for backward compatibility; the pack-loader emits a
 * one-line deprecation warning at load time when it encounters a manifest
 * with `type: "theme"`.
 *
 * Phase 14 (multi-backend compiler) will add `"backend"` to this union.
 */
export const PACK_TYPE_ALIASES = {
  theme: "aesthetic"
} as const;

export interface PackManifest {
  $schema?: string;
  name: string;
  version: string;
  type: PackType;
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
  /** Template pack: category (e.g. 'marketing'). */
  category?: string;
  /** Template pack: list of page identifiers. */
  pages?: string[];
  /** Template pack: peer pack dependencies. */
  dependencies?: {
    tokenPack?: string;
    implementationPack?: string;
    vocabularyPacks?: string[];
    themePack?: string;
    patternPacks?: string[];
    iconPacks?: string[];
  };
  /** Pattern pack: variant within a category. */
  variant?: string;
  /** Pattern pack: supported pattern-level states (must include 'default'). */
  states?: string[];
  /** Pattern pack: per-element micro-states (must include 'default' + 'focus'). */
  microStates?: string[];
  /** Icon pack: style of the icon set. */
  iconStyle?: "outline" | "solid" | "duotone" | "bold" | "bold-duotone" | "two-tone";
  /** Icon pack: total icon count. */
  iconCount?: number;
  /** Icon pack: recommended display sizes. */
  recommendedSize?: {
    min: string;
    max: string;
    sweetSpot: string;
  };
  /** Icon pack: tag the pack registers (defaults to 'icon'). */
  semanticTag?: string;
  /** Icon pack: canonical icon-size dimension tokens the pack reads. */
  sizeTokensConsumed?: string[];
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

/* ────────────────────── Aesthetic pack (was "theme pack") ──────────────────────
 *
 * D.52 rename (operator-locked 2026-05-18): canonical name is now
 * "aesthetic". `AestheticPack` is the canonical interface; `ThemePack`
 * is retained as a deprecated alias for backward compatibility.
 */

/**
 * A loaded aesthetic pack. Aesthetic packs supply mode-scoped overrides
 * on top of a token pack. The override files are DTCG documents whose
 * `$value` entries replace tokens already declared in the canonical
 * namespace — adding new names is a validation error.
 *
 * Composition order at compile time:
 *   token pack → aesthetic pack (light) → project overrides
 *
 * Dark mode and P3 wide-gamut overrides are carried through to the
 * implementation pack so it can emit `[data-theme="dark"]` and
 * `@media (color-gamut: p3)` blocks. The compiler itself applies
 * the light-mode overrides at primitive-token resolution time.
 */
export interface AestheticPack {
  manifest: PackManifest;
  /** Light-mode override map — token name -> value. Always present. */
  lightModeOverrides: Record<string, string>;
  /** Dark-mode override map — optional. */
  darkModeOverrides?: Record<string, string>;
  /** P3 wide-gamut override map — optional. */
  p3WideGamutOverrides?: Record<string, string>;
}

/**
 * @deprecated Use `AestheticPack` instead. Retained as a backward-compat
 * alias per D.52 (operator-locked 2026-05-18). Will be removed in a
 * future major version.
 */
export type ThemePack = AestheticPack;

/* ────────────────────── Pattern pack ────────────────────── */

/**
 * A loaded pattern pack. Pattern packs ship one primitive (the
 * pattern element) plus its supported states and microstates. They
 * share the vocabulary-pack resolution pipeline — the compiler
 * merges pattern primitives into the same primitive registry, so
 * `<button-pattern>` and `<emphasis-card>` are resolved identically.
 */
export interface PatternPack {
  manifest: PackManifest;
  primitives: Record<string, PrimitiveDefinition>;
  /** Component tokens (optional, same shape as vocab pack). */
  componentTokens?: Record<string, string>;
  /** Pattern-level states the pack provides (always includes 'default'). */
  states: string[];
  /** Per-element micro-states (always includes 'default' and 'focus'). */
  microStates: string[];
}

/* ────────────────────── Icon pack ────────────────────── */

/** A single icon entry from an icon-pack manifest. */
export interface IconDefinition {
  name: string;
  file: string;
  aliases?: string[];
}

/**
 * A loaded icon pack. Each pack registers a semantic tag (default
 * `icon`) under which named glyphs are looked up at compile time.
 * The compiler resolves `<icon name="home" size="md" />` by reading
 * the matching SVG from the pack and inlining it with size from
 * the canonical `--icon-size-*` tokens.
 */
export interface IconPack {
  manifest: PackManifest;
  /** The tag this pack registers (defaults to 'icon'). */
  semanticTag: string;
  /** Short-name handle used by authors via `pack="<short>"`. */
  shortName: string;
  /** Map of icon-name (or alias) → SVG source string. */
  icons: Record<string, string>;
  /** Map of icon-name → canonical definition (for diagnostics). */
  definitions: Record<string, IconDefinition>;
}

/* ────────────────────── Compiler I/O ────────────────────── */

export interface CompileOptions {
  source: string;
  tokenPack: TokenPack;
  vocabularyPacks: VocabularyPack[];
  implementationPack: ImplementationPack;
  /** Optional aesthetic pack — light-mode overrides applied at compile time (D.52 canonical name). */
  aestheticPack?: AestheticPack;
  /**
   * @deprecated Use `aestheticPack` instead. Retained for backward
   * compatibility per D.52 (operator-locked 2026-05-18). The compiler
   * reads `aestheticPack ?? themePack` so existing callers continue to
   * work but emit a one-line warning at compile time when only `themePack`
   * is supplied.
   */
  themePack?: ThemePack;
  /** Optional pattern packs — merged into the primitive registry. */
  patternPacks?: PatternPack[];
  /** Optional icon packs — searched in load order on `<icon>` resolution. */
  iconPacks?: IconPack[];
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
export type AestheticPackSource = AestheticPack | string;

/**
 * @deprecated Use `AestheticPackSource` instead. Retained as a backward-compat
 * alias per D.52 (operator-locked 2026-05-18).
 */
export type ThemePackSource = AestheticPackSource;
export type PatternPackSource = PatternPack | string;
export type IconPackSource = IconPack | string;
