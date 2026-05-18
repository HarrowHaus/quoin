# Icon Pack

**Version:** 1.0
**Status:** v1.0 normative.

An icon pack ships a set of icon glyphs as Quoin semantic elements. Consumers author `<icon name="home" size="md" />` and the compiler resolves the named glyph from the active icon pack(s).

## 1. Manifest

`quoin.pack.json` for an icon pack:

```json
{
  "$schema": "https://harrow.haus/quoin/schema/pack.json",
  "name": "@quoin/icons-mynaui",
  "version": "1.0.0",
  "type": "icon",
  "quoinVersion": "^0.1.0",
  "description": "Mynaui icon set — 1.25px-stroke precision for technical UI at 16–18px scale.",
  "iconStyle": "outline",
  "iconCount": 1200,
  "exports": {
    "icons": "./icons",
    "manifest": "./icons.json"
  },
  "metadata": {
    "author": "Quoin",
    "license": "ISC",
    "tags": ["outline", "ui", "technical", "dense"]
  },
  "attribution": {
    "sourceSystem": "Mynaui",
    "sourceUrl": "https://mynaui.com",
    "sourceLicense": "ISC",
    "harvestedAt": "2026-05-17"
  },
  "recommendedSize": {
    "min": "16px",
    "max": "24px",
    "sweetSpot": "18px"
  },
  "semanticTag": "icon",
  "sizeTokensConsumed": [
    "--icon-size-xs", "--icon-size-sm", "--icon-size-md",
    "--icon-size-lg", "--icon-size-xl"
  ]
}
```

### 1.1 Required fields

| Field | Type | Purpose |
|-------|------|---------|
| `type` | `"icon"` | Discriminator. |
| `iconStyle` | string | `"outline"`, `"solid"`, `"duotone"`, `"bold"`, `"bold-duotone"`, `"two-tone"`. Multiple variant styles per pack ship as separate icon packs. |
| `iconCount` | number | Total icons in the pack. |
| `exports.icons` | string | Directory containing one SVG per icon. Filename = icon name (`home.svg`, `chevron-down.svg`). |
| `exports.manifest` | string | Path to a JSON file listing every available icon name + aliases. |
| `attribution` | object | Same shape as harvested token packs ([`pack-format.md`](pack-format.md) §3.5) — source system, URL, license, harvest date. |
| `recommendedSize` | object | `{ min, max, sweetSpot }` size guidance. |

### 1.2 Optional fields

| Field | Type | Purpose |
|-------|------|---------|
| `semanticTag` | string | The semantic tag the pack registers; defaults to `"icon"`. Specialty packs (e.g. brand-logo packs) MAY use a different tag like `"brand-mark"`. |
| `sizeTokensConsumed` | string[] | Canonical icon-size dimension tokens the pack reads (`--icon-size-xs` through `--icon-size-xl`). |

## 2. Icon manifest

The `exports.manifest` file lists every icon the pack ships and any name aliases:

```json
{
  "$schema": "https://harrow.haus/quoin/schema/icon-manifest.json",
  "icons": [
    { "name": "home", "aliases": ["house"], "file": "home.svg" },
    { "name": "chevron-down", "aliases": ["arrow-down-small"], "file": "chevron-down.svg" },
    { "name": "search", "aliases": ["magnifier", "magnifying-glass"], "file": "search.svg" }
  ]
}
```

## 3. SVG conventions

Every SVG in `exports.icons/`:

- MUST be a single root `<svg>` element.
- MUST declare `viewBox` (square viewBox preferred).
- MUST use `currentColor` for any stroke / fill the consumer wants to colour from CSS (`stroke="currentColor"` or `fill="currentColor"`).
- MAY use multiple colours for duotone / two-tone styles (the styles indicate this in `iconStyle`).
- MUST NOT include `width` / `height` attributes — sizing comes from `--icon-size-*` tokens at consume time.
- MUST NOT include `<title>` (the impl pack injects this from the `<icon>` element's `aria-label`).

## 4. Authoring syntax

Consumers reference icons as semantic elements:

```html
<icon name="home" size="md" />
<icon name="chevron-down" size="sm" pack="solar" />
<icon name="logo" pack="brand" />
```

Attributes:

| Attribute | Values | Default | Purpose |
|-----------|--------|---------|---------|
| `name` | string | (required) | Icon name from the manifest. |
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| dimension | `md` | Maps to `--icon-size-{value}` token. |
| `pack` | icon pack short-name | (resolves to first matching pack) | Disambiguates when multiple icon packs declare the same name. |
| `aria-label` | string | (auto-generated from `name`) | Accessible label; if missing, the impl pack uses `name` with hyphens replaced by spaces. |

## 5. Resolution

When the compiler encounters `<icon name="X" size="md" />`:

1. The active icon pack list is searched in load order.
2. If `pack` is specified, the named pack is consulted; else the first pack containing the name wins.
3. The matched SVG is read from `exports.icons/<file>` and inlined into the output, with `width` + `height` set to the `--icon-size-*` token value.
4. `aria-label` is set; `role="img"` is added unless the icon is decorative-only.

A consumer that loads zero icon packs gets a compile error if their source uses `<icon>`.

## 6. Validation rules

An icon pack is valid if and only if:

1. The manifest passes the discriminated schema (`type: "icon"` + required fields).
2. The `exports.manifest` file parses; every icon entry has `name` + `file`.
3. Every referenced SVG file exists in `exports.icons/`.
4. Every SVG file is well-formed XML with a single root `<svg>` element.
5. License is in the recognised SPDX set and compatible with redistribution. Packs marked as reference-only must declare this explicitly.

## 7. License compatibility

Icon licenses vary widely. Quoin verifies:

| License | Redistribution | Status |
|---------|---------------|--------|
| MIT | Yes | Ship as-is. |
| ISC | Yes | Ship as-is. |
| Apache-2.0 | Yes | Ship as-is. |
| CC0-1.0 | Yes | Ship as-is. |
| CC-BY-4.0 | Yes with attribution | Ship; attribution required in pack README + UI consumer's about page. |
| CC-BY-NC | No (commercial) | Hold; can't ship under @quoin/*. |

## 8. File layout

```
@quoin/icons-<name>/
├── package.json
├── quoin.pack.json
├── README.md
├── LICENSE
├── icons.json              # manifest listing every icon + aliases
└── icons/
    ├── home.svg
    ├── chevron-down.svg
    └── …
```

## 9. Cross-references

- [`pack-types.md`](pack-types.md) — composition order.
- [`tokens.md`](tokens.md) §3.13 — icon-size dimension tokens.
- [`pack-format.md`](pack-format.md) §3.5 — attribution block shape.
