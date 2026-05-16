# Pack Format Specification

**Version:** 0.1
**Status:** Phase 0 — canonical pack manifest reference.

A Quoin pack is a distributable unit published to npm under the `@quoin/*` scope. Three pack types exist: **token**, **vocabulary**, **implementation**. All packs share a common manifest format and minimum directory layout. Token files conform to the **W3C Design Tokens Community Group (DTCG)** format. The token architecture is documented in `tokens.md`; pack composition and resolution rules are documented in `spec.md` §4.

## 1. Naming

### 1.1 npm scope and naming convention

```
@quoin/tokens-{name}        Token packs
@quoin/vocab-{name}         Vocabulary packs
@quoin/impl-{name}          Implementation packs
```

`{name}` is kebab-case, alphanumeric plus hyphens, 2–32 characters, must begin with a letter, must not end with a hyphen.

Examples:

- `@quoin/tokens-baseline`
- `@quoin/tokens-material` (a Material 3 token pack)
- `@quoin/tokens-carbon` (an IBM Carbon token pack)
- `@quoin/vocab-editorial`
- `@quoin/vocab-dashboard`
- `@quoin/impl-tailwind`
- `@quoin/impl-raw-css`

### 1.2 Third-party packs

Packs published outside the official scope follow the same internal structure but use their own namespace, e.g. `@example-org/quoin-tokens-{name}`. The compiler treats third-party packs identically to first-party packs.

### 1.3 Reserved prefixes

Within `@quoin/*`, the prefixes `tokens-`, `vocab-`, and `impl-` are reserved by pack type. A pack published under one prefix MUST declare the matching `type` in its manifest (§3).

## 2. Directory structure

All packs share this minimum structure:

```
@quoin/{name}/
├── quoin.pack.json         Pack manifest (required)
├── package.json            npm metadata (required)
├── README.md               Human documentation (required)
├── LICENSE                 License notice (required)
└── (type-specific contents — sections 4-6)
```

Type-specific directory contents follow.

## 3. Manifest schema (quoin.pack.json)

Every pack MUST contain a `quoin.pack.json` at its root.

### 3.1 Example manifest

```json
{
  "$schema": "https://harrow.haus/quoin/schema/pack.json",
  "name": "@quoin/tokens-baseline",
  "version": "1.0.0",
  "type": "token",
  "quoinVersion": "^0.1.0",
  "description": "Neutral baseline token pack.",
  "exports": {
    "tokens": "./tokens/index.json"
  },
  "metadata": {
    "author": "Quoin",
    "license": "MIT",
    "homepage": "https://harrow.haus/quoin/packs/tokens-baseline",
    "tags": ["neutral", "default", "reference"]
  }
}
```

### 3.2 Required fields

| Field | Type | Description |
|-------|------|-------------|
| `$schema` | URL string | Reference to the canonical Quoin pack schema. |
| `name` | npm-style package name | MUST match `package.json#name`. |
| `version` | semver | Pack version. |
| `type` | `"token"` \| `"vocabulary"` \| `"implementation"` | Pack category. |
| `quoinVersion` | semver range | Compatible Quoin spec versions (e.g. `"^0.1.0"`). |
| `description` | string | One-line summary. |
| `exports` | object | Type-specific entry points (§4–6). |

### 3.3 Optional fields

| Field | Purpose |
|-------|---------|
| `metadata.author` | Pack maintainer. |
| `metadata.license` | SPDX identifier. |
| `metadata.homepage` | URL. |
| `metadata.tags` | Free-form discovery tags. |
| `attribution` | REQUIRED for harvested packs (§7). |
| `peerPacks` | Explicit compatibility declarations with other packs. |
| `capabilities` | Optional capability flags (e.g. `"elevation"`) consumed during compiler capability negotiation (`spec.md` §4.4). |

### 3.4 JSON Schema

The authoritative schema, served at `https://harrow.haus/quoin/schema/pack.json`. Compilers and validators load this schema directly. The full document is reproduced here for the spec record.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://harrow.haus/quoin/schema/pack.json",
  "title": "Quoin Pack Manifest",
  "type": "object",
  "required": ["name", "version", "type", "quoinVersion", "description", "exports"],
  "properties": {
    "$schema": { "type": "string", "format": "uri" },
    "name": {
      "type": "string",
      "pattern": "^@[a-z0-9][a-z0-9-]*/[a-z][a-z0-9-]{1,31}$"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z.-]+)?(?:\\+[0-9A-Za-z.-]+)?$"
    },
    "type": { "enum": ["token", "vocabulary", "implementation"] },
    "quoinVersion": { "type": "string" },
    "description": { "type": "string", "minLength": 1, "maxLength": 200 },
    "exports": {
      "type": "object",
      "minProperties": 1,
      "additionalProperties": { "type": "string" }
    },
    "metadata": {
      "type": "object",
      "properties": {
        "author": { "type": "string" },
        "license": { "type": "string" },
        "homepage": { "type": "string", "format": "uri" },
        "tags": { "type": "array", "items": { "type": "string" } }
      },
      "additionalProperties": false
    },
    "attribution": {
      "type": "object",
      "required": ["sourceSystem", "sourceLicense", "harvestedAt"],
      "properties": {
        "sourceSystem": { "type": "string" },
        "sourceOrganization": { "type": "string" },
        "sourceUrl": { "type": "string", "format": "uri" },
        "sourceLicense": { "type": "string" },
        "harvestedAt": { "type": "string", "format": "date" },
        "harvestNotes": { "type": "string" }
      },
      "additionalProperties": false
    },
    "peerPacks": {
      "type": "object",
      "additionalProperties": { "type": "string" }
    },
    "capabilities": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "allOf": [
    {
      "if": { "properties": { "type": { "const": "token" } } },
      "then": {
        "properties": {
          "exports": {
            "required": ["tokens"],
            "properties": { "tokens": { "type": "string" } }
          }
        }
      }
    },
    {
      "if": { "properties": { "type": { "const": "vocabulary" } } },
      "then": {
        "properties": {
          "exports": {
            "required": ["primitives"],
            "properties": {
              "primitives": { "type": "string" },
              "componentTokens": { "type": "string" }
            }
          }
        }
      }
    },
    {
      "if": { "properties": { "type": { "const": "implementation" } } },
      "then": {
        "properties": {
          "exports": {
            "required": ["emit", "metadata"],
            "properties": {
              "emit": { "type": "string" },
              "metadata": { "type": "string" }
            }
          }
        }
      }
    }
  ],
  "additionalProperties": false
}
```

## 4. Token packs

### 4.1 Directory layout

```
@quoin/tokens-baseline/
├── quoin.pack.json
├── package.json
├── README.md
├── LICENSE
└── tokens/
    ├── base.json              Base palette
    ├── semantic.json          OR semantic.light.json + semantic.dark.json
    └── index.json             Entry point; references theme files
```

### 4.2 Exports

```json
"exports": {
  "tokens": "./tokens/index.json"
}
```

### 4.3 Token file format

Token files conform to the **W3C DTCG** format (`https://design-tokens.github.io/community-group/format/`). Three logical layers exist; the canonical layer model is defined in `tokens.md` §1.

- **Base tokens** — raw values.
- **Semantic tokens** — purpose-bound references to base tokens. The canonical semantic namespace (`tokens.md` §2) is the interoperability contract.
- **Component tokens** — vocabulary-specific tokens, typically shipped with vocabulary packs.

A token pack MUST supply:

1. Every entry in the canonical semantic namespace (`tokens.md` §2).
2. Every base token its semantic tokens reference.

### 4.4 Example token file (DTCG)

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "stone": {
      "50":  { "$value": "oklch(98% 0 0)", "$type": "color" },
      "500": { "$value": "oklch(50% 0 0)", "$type": "color" },
      "900": { "$value": "oklch(15% 0 0)", "$type": "color" }
    }
  },
  "surface":        { "$value": "{color.stone.50}",  "$type": "color" },
  "text":           { "$value": "{color.stone.700}", "$type": "color" },
  "text-emphasis":  { "$value": "{color.stone.900}", "$type": "color" }
}
```

References use `{path.to.token}` syntax, resolved at compile time. Circular references fail the build (`spec.md` §5.3).

## 5. Vocabulary packs

### 5.1 Directory layout

```
@quoin/vocab-editorial/
├── quoin.pack.json
├── package.json
├── README.md
├── LICENSE
├── primitives/
│   ├── index.json             Lists all primitives
│   ├── authority-mark.json
│   ├── recede-block.json
│   └── ...
└── tokens/
    └── component.json         Component-level token defaults
```

### 5.2 Exports

```json
"exports": {
  "primitives": "./primitives/index.json",
  "componentTokens": "./tokens/component.json"
}
```

### 5.3 Primitive definition format

Each primitive is a JSON record:

```json
{
  "name": "authority-mark",
  "category": "editorial",
  "role": "Dominant editorial mark; the primary headline-class element of a view.",
  "attributes": {
    "intent":  { "values": ["primary", "secondary"], "default": "primary" },
    "weight":  { "values": ["normal", "emphasize", "dominate"], "default": "dominate" }
  },
  "tokens": {
    "fontSize":      "--type-size-display",
    "fontFamily":    "--font-display",
    "color":         "--text-emphasis",
    "letterSpacing": "--tracking-tight"
  },
  "structure": {
    "element": "h1",
    "attributes": {}
  },
  "children": "phrasing-content",
  "scope": "block"
}
```

Allowed fields:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | yes | Tag name. Kebab-case, ≥ 1 hyphen. |
| `category` | yes | One of `editorial` \| `layout` \| `navigation` \| `state` \| `content` \| `interactive`. |
| `role` | yes | 1–2 sentence semantic description. |
| `attributes` | yes | Map of canonical attribute name → `{ values: string[], default: string }`. Canonical attributes only; primitive-specific attributes are declared here too with `specific: true`. |
| `tokens` | yes | Map of CSS-property name → semantic-token reference. References MUST resolve against the canonical namespace (`tokens.md` §2). |
| `structure` | yes | The base HTML element the primitive compiles to plus any default attributes. |
| `children` | yes | Children declaration (§5.4). |
| `scope` | yes | One of `block` \| `inline` \| `ambient`. |

### 5.4 Children declarations

`children` MAY be:

- `"phrasing-content"` — text and inline elements only.
- `"flow-content"` — block-level content allowed.
- `"none"` — no children permitted.
- An explicit array of allowed primitive names.

### 5.5 Component tokens

Vocabulary packs MAY define component tokens that reference semantic tokens. These are defaults, overridable at the project level.

```json
{
  "authority-mark-size":   { "$value": "{type-size-display}", "$type": "dimension" },
  "primary-action-bg":     { "$value": "{accent}",            "$type": "color"     }
}
```

## 6. Implementation packs

### 6.1 Directory layout

```
@quoin/impl-tailwind/
├── quoin.pack.json
├── package.json
├── README.md
├── LICENSE
├── emit.js
├── metadata.json
└── emitters/                 Per-primitive emitter modules
    ├── authority-mark.js
    └── ...
```

### 6.2 Exports

```json
"exports": {
  "emit": "./emit.js",
  "metadata": "./metadata.json"
}
```

### 6.3 Emit function signature

```typescript
type EmitFn = (input: {
  primitive: PrimitiveDefinition;
  attributes: ResolvedAttributes;
  tokens: ResolvedTokens;
  children: Node[];
}) => {
  html: HTMLNode;
  css?: string;
};
```

An implementation pack MUST handle every primitive in any vocabulary pack it claims to support. Missing emitters fail the build with an enumeration of every missing handler (`spec.md` §5.3).

### 6.4 Implementation metadata

```json
{
  "target": "tailwind-v4",
  "tailwindVersion": "^4.0.0",
  "supportedPrimitives": ["*"],
  "emittedFormat": "html-with-classes",
  "capabilities": ["elevation", "ring-focus", "data-theme"]
}
```

- `supportedPrimitives: ["*"]` declares universal support.
- An implementation pack MAY restrict itself to a named subset.
- `capabilities` declares which optional token-pack capabilities the implementation can render (consumed by capability negotiation — `spec.md` §4.4).

## 7. Harvested packs

Packs harvested from existing public design systems MUST include an `attribution` block:

```json
"attribution": {
  "sourceSystem": "Material Design 3",
  "sourceOrganization": "Google",
  "sourceUrl": "https://m3.material.io/",
  "sourceLicense": "Apache-2.0",
  "harvestedAt": "2026-05-16",
  "harvestNotes": "See harvest-report.md for mapping decisions."
}
```

The harvested pack's own license MUST be compatible with the source license. License compatibility is validated at publish time.

## 8. Versioning rules

- Pack version follows semver.
- The `quoinVersion` range declares compatibility with the Quoin spec (`spec.md` §7).
- **Major:** breaking change to a primitive's attribute set, token references, or emitted structure; removal of a token from a token pack; removal of an emitter.
- **Minor:** new optional attribute; new primitive; newly exposed token; new emitter; new declared capability.
- **Patch:** documentation; internal restructuring; no behavioral change.

## 9. Validation

A pack is valid if and only if:

1. `quoin.pack.json` parses and validates against the JSON Schema (§3.4).
2. All declared `exports` resolve to existing files.
3. **Token packs**: every entry in the canonical semantic namespace (`tokens.md` §2) is supplied, and no circular references exist.
4. **Vocabulary packs**: every primitive's `tokens` map references only names in the canonical semantic namespace.
5. **Implementation packs**: an emitter exists for every primitive across every vocabulary pack the pack declares it supports.

A reference validator ships as `@quoin/validate-pack`.

## 10. Cross-references

- Authoring syntax, attribute system, cascade, compilation model: `spec.md`
- The v1 semantic vocabulary (36 primitives): `primitives.md`
- Token architecture, the canonical semantic namespace, DTCG layer details: `tokens.md`
