# Pack Format Specification

**Version:** 0.1 (draft)

A Quoin pack is a distributable unit published to npm under the `@quoin/*` scope. Three pack types exist: **token**, **vocabulary**, and **implementation**. All packs share a common manifest format and directory layout.

## 1. Naming

### 1.1 npm scope and naming convention

```
@quoin/tokens-{name}        Token packs
@quoin/vocab-{name}         Vocabulary packs
@quoin/impl-{name}          Implementation packs
```

`{name}` is kebab-case, alphanumeric plus hyphens, 2-32 characters.

Examples:
- `@quoin/tokens-baseline`
- `@quoin/tokens-material`
- `@quoin/vocab-editorial`
- `@quoin/vocab-dashboard`
- `@quoin/impl-tailwind`
- `@quoin/impl-raw-css`

### 1.2 Third-party packs

Packs published outside the official scope follow the same internal structure but use their own namespace, e.g. `@example-org/quoin-tokens-{name}`. The Quoin compiler treats third-party packs identically to first-party packs.

## 2. Directory structure

All packs share this minimum structure:

```
@quoin/tokens-baseline/
├── quoin.pack.json         Manifest (required)
├── package.json              npm metadata (required)
├── README.md                 Human documentation (required)
├── LICENSE                   License notice (required)
└── (type-specific contents)
```

Type-specific contents are described in sections 4-6.

## 3. Manifest schema (quoin.pack.json)

Every pack MUST contain a `quoin.pack.json` at its root conforming to this schema:

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

### 3.1 Required fields

| Field | Type | Description |
|-------|------|-------------|
| `$schema` | URL string | Reference to the Quoin pack schema. |
| `name` | npm-style package name | Must match `package.json`. |
| `version` | semver | Pack version. |
| `type` | `"token"` \| `"vocabulary"` \| `"implementation"` | Pack category. |
| `quoinVersion` | semver range | Compatible Quoin spec versions. |
| `description` | string | One-line summary. |
| `exports` | object | Type-specific entry points (see sections 4-6). |

### 3.2 Optional fields

- `metadata.author`, `metadata.license`, `metadata.homepage`, `metadata.tags`
- `attribution` — required for harvested packs (see section 7)
- `peerPacks` — explicit compatibility declarations with other packs

## 4. Token packs

### 4.1 Exports

```json
"exports": {
  "tokens": "./tokens/index.json"
}
```

### 4.2 Token file format

Token files conform to the **W3C Design Tokens Community Group (DTCG)** format. Three logical token layers exist:

- **Base tokens** — raw values (e.g., `--color-stone-500: oklch(50% 0 0)`).
- **Semantic tokens** — purpose-bound references to base tokens (e.g., `--surface: var(--color-stone-50)`). The canonical semantic token namespace is defined in `tokens.md`.
- **Component tokens** — vocabulary-specific tokens, typically supplied by vocabulary packs rather than token packs.

A token pack MUST supply:
- The full canonical semantic token namespace from `tokens.md`.
- Any base tokens that its semantic tokens reference.

### 4.3 Example token file

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
  "surface": {
    "$value": "{color.stone.50}",
    "$type": "color"
  },
  "text": {
    "$value": "{color.stone.900}",
    "$type": "color"
  }
}
```

## 5. Vocabulary packs

### 5.1 Exports

```json
"exports": {
  "primitives": "./primitives/index.json",
  "componentTokens": "./tokens/component.json"
}
```

### 5.2 Primitive definition format

Each primitive is defined as a JSON record:

```json
{
  "name": "authority-mark",
  "category": "editorial",
  "role": "Dominant editorial mark; functions as the primary headline-class element of a view.",
  "attributes": {
    "intent": { "values": ["primary", "secondary"], "default": "primary" },
    "weight": { "values": ["normal", "emphasize", "dominate"], "default": "emphasize" }
  },
  "tokens": {
    "fontSize": "--type-display",
    "fontFamily": "--font-display",
    "color": "--text-emphasis",
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

### 5.3 Children declarations

`children` may be:
- `"phrasing-content"` — text and inline elements only
- `"flow-content"` — block-level content allowed
- `"none"` — no children permitted
- An explicit array of allowed primitive names

## 6. Implementation packs

### 6.1 Exports

```json
"exports": {
  "emit": "./emit.js",
  "metadata": "./metadata.json"
}
```

### 6.2 Emit function signature

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

An implementation pack MUST export an emit function that handles every primitive in any vocabulary pack it claims to support. The compiler fails the build with an explicit error listing missing emitters if any primitive has no handler.

### 6.3 Implementation metadata

```json
{
  "target": "tailwind-v4",
  "tailwindVersion": "^4.0.0",
  "supportedPrimitives": ["*"],
  "emittedFormat": "html-with-classes"
}
```

`supportedPrimitives: ["*"]` indicates universal support. An implementation pack MAY limit itself to a subset by listing primitive names explicitly.

## 7. Harvested packs

Packs harvested from existing public design systems MUST include an `attribution` field in their manifest:

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

The harvested pack's own license must be compatible with the source license. License compatibility is validated at publish time.

## 8. Versioning rules

- Pack version follows semver.
- The `quoinVersion` range declares compatibility with the Quoin spec.
- A breaking change to a primitive's attributes or token references is a major version bump.
- An additive change (new optional attribute, new primitive, new exposed token) is a minor version bump.
- A non-behavioral change (documentation, internal restructuring) is a patch.

## 9. Validation

A pack is valid if and only if:
1. `quoin.pack.json` parses and validates against the schema.
2. All declared exports resolve to existing files.
3. Token packs supply every entry in the canonical semantic namespace.
4. Vocabulary packs reference only tokens that the canonical namespace declares.
5. Implementation packs export an emit function compatible with the declared target.

A reference validator is provided as `@quoin/validate-pack`.
