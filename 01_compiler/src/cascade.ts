/**
 * Canonical attribute cascade and per-element resolution.
 * Implements spec.md §3 (cascade and inheritance) + §3.3 (override precedence).
 */

import {
  CANONICAL_ATTRIBUTES,
  CANONICAL_VALUE_SETS
} from "./types.js";
import type {
  CanonicalAttribute,
  HTMLElement,
  PrimitiveDefinition,
  ResolvedAttributes
} from "./types.js";
import { CompilerError } from "./errors.js";

export type InheritedAttributes = Partial<Record<CanonicalAttribute, string>>;

/**
 * Compute the resolved attribute state for a primitive instance.
 *
 * Precedence (highest -> lowest), per spec.md §3.3:
 *   1. Inline attribute on the element instance
 *   2. Inherited canonical attribute from a Quoin ancestor
 *   3. Primitive default from the vocabulary pack
 *   4. (Implementation-pack fallback handled outside the cascade.)
 */
export function resolveAttributes(
  primitive: PrimitiveDefinition,
  el: HTMLElement,
  inherited: InheritedAttributes,
  diagnose: (msg: string) => CompilerError
): ResolvedAttributes {
  const canonical: ResolvedAttributes["canonical"] = {};
  const specific: ResolvedAttributes["specific"] = {};

  for (const name of CANONICAL_ATTRIBUTES) {
    const inline = el.attributes[name];
    if (inline !== undefined) {
      validateCanonicalValue(name, inline, diagnose);
      canonical[name] = inline;
      continue;
    }
    const inheritedVal = inherited[name];
    if (inheritedVal !== undefined) {
      canonical[name] = inheritedVal;
      continue;
    }
    const spec = primitive.attributes[name];
    if (spec?.default !== undefined) {
      canonical[name] = spec.default;
    }
  }

  for (const [attrName, value] of Object.entries(el.attributes)) {
    if (CANONICAL_ATTRIBUTES.includes(attrName as CanonicalAttribute)) continue;
    const spec = primitive.attributes[attrName];
    if (spec) {
      if (spec.values.length > 0 && !spec.values.includes(value)) {
        throw diagnose(
          `Unknown attribute value: ${attrName}="${value}" on <${primitive.name}>. ` +
            `Allowed: ${spec.values.join(" | ")}`
        );
      }
      specific[attrName] = value;
    } else {
      // Unknown attributes are passed through as-is (e.g. id, data-*, aria-*).
      specific[attrName] = value;
    }
  }

  for (const [attrName, spec] of Object.entries(primitive.attributes)) {
    if (CANONICAL_ATTRIBUTES.includes(attrName as CanonicalAttribute)) continue;
    if (!spec.specific) continue;
    if (specific[attrName] !== undefined) continue;
    if (spec.default !== undefined) specific[attrName] = spec.default;
  }

  return { canonical, specific };
}

function validateCanonicalValue(
  name: CanonicalAttribute,
  value: string,
  diagnose: (msg: string) => CompilerError
): void {
  const allowed = CANONICAL_VALUE_SETS[name];
  if (!allowed.includes(value)) {
    throw diagnose(
      `Unknown attribute value: ${name}="${value}". ` +
        `Allowed: ${allowed.join(" | ")}`
    );
  }
}

/**
 * Derive the inherited attribute set that this primitive should pass to its
 * Quoin descendants. Only canonical attributes cascade (spec.md §3.1).
 */
export function inheritedForChildren(
  resolved: ResolvedAttributes
): InheritedAttributes {
  return { ...resolved.canonical };
}
