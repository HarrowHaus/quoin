# Theme Pack

**Version:** 1.0
**Status:** v1.0 normative.

A theme pack overrides selected values in the canonical semantic-token namespace ([`tokens.md`](tokens.md) §3) to produce a distinct aesthetic. Themes do NOT add new token names; they only override existing ones.

Sits between the active token pack and project-local overrides in the resolution chain ([`pack-types.md`](pack-types.md) §2).

## 1. Manifest

`quoin.pack.json` for a theme pack:

```json
{
  "$schema": "https://harrow.haus/quoin/schema/pack.json",
  "name": "@quoin/theme-vellum",
  "version": "1.0.0",
  "type": "theme",
  "quoinVersion": "^0.1.0",
  "description": "Warm parchment ground, serif at broadsheet display scale.",
  "exports": {
    "lightModeOverrides": "./tokens-light.json",
    "darkModeOverrides": "./tokens-dark.json",
    "p3WideGamutOverrides": "./tokens-p3.json"
  },
  "metadata": {
    "author": "Quoin",
    "license": "MIT",
    "lineage": "Calm Ivory Editorial",
    "referenceSite": "anthropic.com",
    "tags": ["editorial", "warm", "serif", "broadsheet"]
  },
  "compatibility": {
    "tokenPacks": ["*"],
    "vocabPacks": ["*"]
  },
  "identity": {
    "displayFontFallback": "Junicode VF, Iowan Old Style, Cambria, serif",
    "bodyFontFallback": "Ranade, Inter, system-ui, sans-serif",
    "monoFontFallback": "Monaspace Neon, ui-monospace, monospace"
  }
}
```

### 1.1 Required fields

| Field | Type | Purpose |
|-------|------|---------|
| `type` | `"theme"` | Discriminator. |
| `exports.lightModeOverrides` | string | Path to the light-mode DTCG override file (relative to the pack root). |

### 1.2 Optional fields

| Field | Type | Purpose |
|-------|------|---------|
| `exports.darkModeOverrides` | string | Path to dark-mode DTCG override file. The implementation pack applies this via `[data-theme="dark"]` or `prefers-color-scheme`. |
| `exports.p3WideGamutOverrides` | string | Path to P3 wide-gamut DTCG override file, applied via `@supports (color: oklch(0% 0 0))`. |
| `metadata.lineage` | string | Free-form lineage descriptor (e.g. "Calm Ivory Editorial"). |
| `metadata.referenceSite` | string | URL of a real site whose aesthetic this theme approximates. |
| `compatibility.tokenPacks` | string[] | List of `@quoin/tokens-*` packs the theme is designed for. `["*"]` means universal. |
| `compatibility.vocabPacks` | string[] | Same as above for vocabulary packs. |
| `identity` | object | Optional fallback font stacks the theme prefers when its primary identity fonts aren't installed. |

## 2. The override file

The override file is a DTCG 2025.10 token document containing only `$value` entries for names that already exist in the canonical namespace. Adding a new name (i.e. a name not listed in [`tokens.md`](tokens.md) §3) is a validation error.

Example `tokens-light.json`:

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "surface":          { "$value": "oklch(96% 0.015 70)",  "$type": "color" },
  "surface-elevated": { "$value": "oklch(99% 0.008 70)",  "$type": "color" },
  "text":             { "$value": "oklch(22% 0.020 30)",  "$type": "color" },
  "text-emphasis":    { "$value": "oklch(12% 0.022 30)",  "$type": "color" },
  "accent":           { "$value": "oklch(38% 0.110 35)",  "$type": "color" },
  "font-display":     { "$value": "'Junicode 2', 'Junicode', ui-serif, Georgia, serif", "$type": "fontFamily" },
  "text-display": {
    "$type": "typography",
    "$value": {
      "fontFamily": "{font-display}",
      "fontSize": "{type-size-display}",
      "fontWeight": "{font-weight-regular}",
      "lineHeight": "{leading-tight}",
      "letterSpacing": "{tracking-tight}"
    }
  }
}
```

The same composite + reference syntax from [`tokens.md`](tokens.md) §4 applies.

## 3. Resolution

When a theme pack is loaded alongside a token pack:

1. The compiler loads the token pack's `semantic` + base palette (existing behaviour).
2. The compiler loads the theme pack's override file(s).
3. For each name in the theme override file: the value replaces the token pack's value for that name. Other names from the token pack pass through unchanged.
4. Project overrides (`quoin.tokens.json`) apply on top.

A theme pack with NO entries is the no-op identity — it leaves the token pack unchanged.

## 4. Validation rules

A theme pack is valid if and only if:

1. The manifest passes the discriminated schema (`type: "theme"` + `exports.lightModeOverrides` required).
2. The override file is valid DTCG 2025.10.
3. Every override name exists in the canonical semantic namespace ([`tokens.md`](tokens.md) §3). New names fail validation.
4. Composite-typed overrides conform to the DTCG composite structures in [`tokens.md`](tokens.md) §4.
5. License is in the recognised SPDX set ([`pack-format.md`](pack-format.md) §9).

## 5. Cross-references

- [`pack-types.md`](pack-types.md) — composition order across all pack types.
- [`tokens.md`](tokens.md) — the canonical namespace + composite structures.
- [`pack-format.md`](pack-format.md) — manifest universals (`metadata`, `attribution`, `quoinVersion`).
