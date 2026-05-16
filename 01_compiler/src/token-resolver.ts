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

const CANONICAL_SEMANTIC_TOKENS: readonly string[] = [
  // §2.1 surface
  "surface",
  "surface-elevated",
  "surface-recessed",
  "surface-inverse",
  // §2.2 text
  "text",
  "text-emphasis",
  "text-recede",
  "text-disabled",
  "text-on-accent",
  "text-on-critical",
  "text-on-success",
  "text-on-warning",
  "text-on-info",
  // §2.3 border
  "border",
  "border-emphasis",
  "border-recede",
  // §2.4 accent + status
  "accent",
  "accent-recede",
  "critical",
  "success",
  "warning",
  "info",
  // §2.5 typography (families + sizes + leading + tracking + measure)
  "font-sans",
  "font-serif",
  "font-mono",
  "font-display",
  "type-size-xs",
  "type-size-sm",
  "type-size-base",
  "type-size-lg",
  "type-size-xl",
  "type-size-2xl",
  "type-size-3xl",
  "type-size-display",
  "leading-tight",
  "leading-normal",
  "leading-prose",
  "leading-loose",
  "tracking-tight",
  "tracking-normal",
  "tracking-wide",
  "measure-prose",
  // §2.6 spacing
  "space-0",
  "space-1",
  "space-2",
  "space-3",
  "space-4",
  "space-6",
  "space-8",
  "space-12",
  "space-16",
  "space-24",
  "space-32",
  "space-stack-compact",
  "space-stack-normal",
  "space-stack-loose",
  "space-inline-tight",
  "space-inline-normal",
  "space-card",
  "space-panel",
  "space-frame",
  // §2.7 radius
  "radius-none",
  "radius-sm",
  "radius-md",
  "radius-lg",
  "radius-pill",
  "radius-card",
  "radius-frame",
  "radius-media",
  // §2.8 motion
  "motion-fast",
  "motion-normal",
  "motion-slow",
  "ease-standard",
  "ease-decelerate",
  "ease-accelerate"
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
  if (typeof (node as DtcgNode).$value === "string") {
    out[prefix] = (node as DtcgNode).$value as string;
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
  const resolved = raw.replace(/\{([^}]+)\}/g, (_, refPath: string) => {
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
