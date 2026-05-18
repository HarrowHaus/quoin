# Pattern Pack

**Version:** 1.0
**Status:** v1.0 normative.

A pattern pack ships a reusable UI primitive — hero, footer, pricing tiers, command palette — as a Quoin semantic element. Pattern packs share the vocabulary-pack resolution path; from the compiler's perspective they are a specialised flavour of vocabulary pack.

## 1. Manifest

`quoin.pack.json` for a pattern pack:

```json
{
  "$schema": "https://harrow.haus/quoin/schema/pack.json",
  "name": "@quoin/pattern-hero-animated",
  "version": "1.0.0",
  "type": "pattern",
  "quoinVersion": "^0.1.0",
  "description": "Hero with animated product mockup (Linear / Stripe archetype).",
  "category": "hero",
  "variant": "animated-product-mock",
  "exports": {
    "primitives": "./primitives/index.json",
    "examples": "./examples"
  },
  "metadata": {
    "author": "Quoin",
    "license": "MIT",
    "tags": ["hero", "saas", "marketing"]
  },
  "responsive": {
    "mobile": "stacked",
    "tablet": "split-50-50",
    "desktop": "split-40-60"
  },
  "states": ["default", "loading", "error"],
  "microStates": ["default", "hover", "active", "focus", "disabled"],
  "tokensConsumed": [
    "--text-display", "--text-body-lg",
    "--accent", "--text-on-accent",
    "--shadow-xl", "--transition-default"
  ]
}
```

### 1.1 Required fields

| Field | Type | Purpose |
|-------|------|---------|
| `type` | `"pattern"` | Discriminator. |
| `category` | string | Pattern category (`"hero"`, `"footer"`, `"pricing"`, `"command-palette"`, `"feature-grid"`, `"testimonial"`, etc.). |
| `exports.primitives` | string | Path to the primitive definition file (same shape as vocabulary pack `primitives/index.json`). |
| `states` | string[] | All page states this pattern handles (`"default"`, `"loading"`, `"error"`, `"empty"`, `"sparse"`, `"dense"`, `"success"`). |
| `microStates` | string[] | All interaction microstates (`"default"`, `"hover"`, `"active"`, `"focus"`, `"focus-visible"`, `"disabled"`, `"loading"`, `"read-only"`, `"selected"`, `"indeterminate"`). |

### 1.2 Optional fields

| Field | Type | Purpose |
|-------|------|---------|
| `variant` | string | Subcategory (`"animated-product-mock"`, `"centered"`, `"split-50-50"`). |
| `responsive` | object | `{ mobile, tablet, desktop }` describing the layout shape per breakpoint. |
| `tokensConsumed` | string[] | List of canonical token names the pattern references. Validator can warn when the active token pack is missing any. |
| `exports.examples` | string | Directory of HTML example files showing usage. |

## 2. Primitive definitions

The `exports.primitives` file uses the same shape as a vocabulary pack's `primitives/index.json` ([`pack-format.md`](pack-format.md) §5). Each entry declares the semantic tag the pattern registers.

Example:

```json
[
  {
    "name": "hero-animated",
    "category": "marketing",
    "role": "Animated hero with product mockup and dual CTA.",
    "attributes": {
      "density": { "values": ["compact", "normal", "spacious"], "default": "normal" },
      "variant": { "values": ["product-mock", "video", "split-illustration"], "default": "product-mock", "specific": true }
    },
    "tokens": {
      "background": "--surface",
      "color": "--text-emphasis",
      "padding": "--space-panel"
    },
    "structure": { "element": "section", "attributes": { "role": "banner" } },
    "children": "flow-content",
    "scope": "block"
  }
]
```

The implementation pack receives the registered primitive at emit time and produces the final HTML + CSS via the same path it uses for vocabulary primitives.

## 3. Resolution

Pattern packs register their primitives in the compiler's primitive registry alongside vocabulary pack primitives, in declaration order. Collisions follow the last-loaded-wins rule from [`spec.md` §4.3](spec.md).

## 4. Validation rules

A pattern pack is valid if and only if:

1. The manifest passes the discriminated schema (`type: "pattern"` + required fields).
2. The primitive definitions file parses; every primitive declares `name`, `category`, `role`, `structure.element`.
3. Every primitive `name` is a valid kebab-case custom-element name (contains a hyphen).
4. `states` includes at least `"default"`.
5. `microStates` includes at least `"default"` and `"focus"`.
6. Every token name in `tokensConsumed` exists in the canonical namespace ([`tokens.md`](tokens.md) §3).
7. License is in the recognised SPDX set.

## 5. Quality bar

Every pattern pack MUST satisfy the universal pack quality bar from the [`quoin-pack-author` skill](#). For patterns specifically:

- **All declared states actually implemented.** If `states` includes `"loading"`, the pattern's primitive definition + emit output must produce a loading state.
- **All declared microstates actually implemented.** Focus rings, hover treatments, active states all designed.
- **Responsive behaviour matches `responsive` declaration.** A pattern marked `mobile: "stacked"` doesn't break on `<400px`.
- **Token-grounded.** Every value references a canonical token; no hardcoded `#fff`, `1rem`, `0.5s`.
- **Documented example.** `exports.examples/usage.html` shows the pattern in context.

## 6. File layout

```
@quoin/pattern-<name>/
├── package.json
├── quoin.pack.json
├── README.md
├── LICENSE
├── primitives/
│   └── index.json         # the primitive definition
└── examples/
    └── usage.html         # working example
```

## 7. Cross-references

- [`pack-types.md`](pack-types.md) — composition order.
- [`pack-format.md`](pack-format.md) §5 — vocabulary pack manifest (pattern packs share the primitive-definition shape).
- [`primitives.md`](primitives.md) — v1 canonical vocabulary primitives that patterns extend.
- [`tokens.md`](tokens.md) — canonical token namespace.
