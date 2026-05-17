/**
 * Token graph resolution.
 *
 * Loads DTCG-style JSON, flattens to a name -> value map, resolves
 * {path.to.token} references, detects cycles, and produces a flat map
 * the impl pack can consume.
 *
 * See tokens.md for the canonical layered model and the namespace contract.
 */

import { CompilerError } from "./errors.js";

/** A raw DTCG node — recursive. */
export interface DtcgNode {
  $value?: string;
  $type?: string;
  $description?: string;
  [key: string]: unknown;
}

/**
 * The canonical semantic-token namespace, frozen at v1.0 in Phase 0.5.
 * Every Quoin token pack MUST supply a `$value` for every name in this
 * list (or declare `"status": "pending-3.5c-fill"` during the
 * transitional window). See `00_spec/tokens.md` §3.
 *
 * 164 tokens across 11 DTCG 2025.10 types:
 *   color (29), dimension (64), number (21), fontFamily (4),
 *   fontWeight (6), duration (5), cubicBezier (6), shadow (7),
 *   border (3), typography (13), transition (3), strokeStyle (3).
 */
const CANONICAL_SEMANTIC_TOKENS: readonly string[] = [
  // §3.1 color — surfaces (5)
  "surface", "surface-elevated", "surface-recessed", "surface-inverse", "scrim",
  // §3.2 color — text (10)
  "text", "text-emphasis", "text-recede", "text-disabled",
  "text-on-accent", "text-on-critical", "text-on-success", "text-on-warning", "text-on-info",
  "highlight",
  // §3.3 color — borders (3)
  "border", "border-emphasis", "border-recede",
  // §3.4 color — accent + status (6)
  "accent", "accent-recede", "critical", "success", "warning", "info",
  // §3.5 color — focus, links, shadow tint (5)
  "focus-ring", "link", "link-visited", "link-hover", "shadow-tint",
  // §3.6 dimension — spacing scale (14)
  "space-0", "space-1", "space-2", "space-3", "space-4", "space-5", "space-6",
  "space-8", "space-10", "space-12", "space-16", "space-20", "space-24", "space-32",
  // §3.7 dimension — semantic spacing (9)
  "space-stack-compact", "space-stack-normal", "space-stack-loose",
  "space-inline-tight", "space-inline-normal", "space-inline-loose",
  "space-card", "space-panel", "space-frame",
  // §3.8 dimension — type sizes (10)
  "type-size-xs", "type-size-sm", "type-size-md", "type-size-lg",
  "type-size-xl", "type-size-2xl", "type-size-3xl", "type-size-4xl",
  "type-size-5xl", "type-size-display",
  // §3.9 dimension — tracking (3)
  "tracking-tight", "tracking-normal", "tracking-wide",
  // §3.10 dimension — radius (9)
  "radius-none", "radius-sm", "radius-md", "radius-lg", "radius-xl",
  "radius-pill", "radius-card", "radius-frame", "radius-media",
  // §3.11 dimension — border widths (4)
  "border-width-hairline", "border-width-sm", "border-width-md", "border-width-lg",
  // §3.12 dimension — focus ring metrics (2)
  "focus-ring-width", "focus-ring-offset",
  // §3.13 dimension — icon sizes (5)
  "icon-size-xs", "icon-size-sm", "icon-size-md", "icon-size-lg", "icon-size-xl",
  // §3.14 dimension — containers (4)
  "container-narrow", "container-default", "container-wide", "container-full",
  // §3.15 dimension — measure + blur (4)
  "measure-prose", "blur-sm", "blur-md", "blur-lg",
  // §3.16 number — opacity (5)
  "opacity-disabled", "opacity-recede", "opacity-hover-layer", "opacity-active-layer", "opacity-scrim",
  // §3.17 number — z-index (8)
  "z-base", "z-raised", "z-sticky", "z-dropdown", "z-modal", "z-popover", "z-tooltip", "z-toast",
  // §3.18 number — aspect ratios (4)
  "aspect-square", "aspect-video", "aspect-portrait", "aspect-banner",
  // §3.19 number — leading multipliers (4)
  "leading-tight", "leading-normal", "leading-prose", "leading-loose",
  // §3.20 fontFamily (4)
  "font-sans", "font-serif", "font-mono", "font-display",
  // §3.21 fontWeight (6)
  "font-weight-light", "font-weight-regular", "font-weight-medium",
  "font-weight-semibold", "font-weight-bold", "font-weight-black",
  // §3.22 duration — motion (5)
  "motion-instant", "motion-fast", "motion-normal", "motion-slow", "motion-slower",
  // §3.23 cubicBezier — easing (6)
  "ease-linear", "ease-standard", "ease-decelerate", "ease-accelerate",
  "ease-emphasized", "ease-spring",
  // §3.24 shadow (composite, 7)
  "shadow-xs", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-inner",
  // §3.25 border (composite, 3)
  "border-default", "border-emphasis-stroke", "border-divider",
  // §3.26 typography (composite, 13)
  "text-display",
  "text-headline-lg", "text-headline-md", "text-headline-sm",
  "text-title-lg", "text-title-md", "text-title-sm",
  "text-body-lg", "text-body-md", "text-body-sm",
  "text-label-lg", "text-label-md", "text-label-sm",
  // §3.27 transition (composite, 3)
  "transition-default", "transition-emphasis", "transition-fast",
  // §3.28 strokeStyle (3)
  "stroke-solid", "stroke-dashed", "stroke-dotted"
];

export const REQUIRED_SEMANTIC_TOKENS = CANONICAL_SEMANTIC_TOKENS;

/**
 * Flatten a DTCG document into a map of canonical dot-path -> $value string.
 */
export function flattenDtcg(input: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  walk(input as Record<string, unknown>, "", out);
  return out;
}

function walk(
  node: Record<string, unknown>,
  prefix: string,
  out: Record<string, string>
): void {
  if (!node || typeof node !== "object") return;
  const dtcg = node as DtcgNode;
  if (dtcg.$value !== undefined) {
    // Atomic $value: string is stored verbatim.
    // Composite $value: serialise the object (or array of objects, for
    // layered shadows) as JSON so the resolved map remains a flat
    // `name -> string` shape. Impl packs parse it back per-type via the
    // declared $type.
    if (typeof dtcg.$value === "string") {
      out[prefix] = dtcg.$value;
    } else if (typeof dtcg.$value === "number") {
      out[prefix] = String(dtcg.$value);
    } else if (Array.isArray(dtcg.$value) || typeof dtcg.$value === "object") {
      out[prefix] = JSON.stringify(dtcg.$value);
    }
    return;
  }
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object") {
      walk(val as Record<string, unknown>, path, out);
    }
  }
}

/**
 * Resolve {path.to.token} references in a flattened map.
 * Cycles raise CompilerError(CIRCULAR_TOKEN_REFERENCE).
 */
export function resolveReferences(
  flat: Record<string, string>
): Record<string, string> {
  const out: Record<string, string> = {};
  const visiting = new Set<string>();
  for (const key of Object.keys(flat)) {
    out[key] = resolveOne(key, flat, visiting, out);
  }
  return out;
}

function resolveOne(
  key: string,
  flat: Record<string, string>,
  visiting: Set<string>,
  cache: Record<string, string>
): string {
  if (cache[key] !== undefined) return cache[key];
  if (visiting.has(key)) {
    throw new CompilerError(
      "CIRCULAR_TOKEN_REFERENCE",
      `Circular token reference detected at "${key}"`
    );
  }
  visiting.add(key);
  const raw = flat[key];
  if (raw === undefined) {
    visiting.delete(key);
    return "";
  }
  // Reference syntax: `{kebab.path.identifier}`. The character class is
  // tight so we don't accidentally match the outer braces of a
  // JSON-stringified composite token value (`{"color":"...","offsetX":...}`)
  // whose content contains quotes and colons.
  const resolved = raw.replace(/\{([a-zA-Z][a-zA-Z0-9_.-]*)\}/g, (_, refPath: string) => {
    if (flat[refPath] === undefined) {
      throw new CompilerError(
        "MISSING_TOKEN",
        `Unresolved token reference "{${refPath}}" referenced from "${key}"`
      );
    }
    return resolveOne(refPath, flat, visiting, cache);
  });
  visiting.delete(key);
  cache[key] = resolved;
  return resolved;
}

/**
 * Verify the canonical semantic namespace is fully populated.
 * Returns the list of missing token names (empty array == valid).
 */
export function findMissingSemanticTokens(
  resolved: Record<string, string>
): string[] {
  const missing: string[] = [];
  for (const name of CANONICAL_SEMANTIC_TOKENS) {
    if (resolved[name] === undefined) missing.push(name);
  }
  return missing;
}

/**
 * Look up a single semantic-token reference. Accepts forms:
 *   - "--text-emphasis"
 *   - "text-emphasis"
 *   - "{text-emphasis}"
 */
export function lookupToken(
  flat: Record<string, string>,
  name: string
): string | undefined {
  let key = name.trim();
  if (key.startsWith("{") && key.endsWith("}")) key = key.slice(1, -1);
  if (key.startsWith("--")) key = key.slice(2);
  return flat[key];
}
