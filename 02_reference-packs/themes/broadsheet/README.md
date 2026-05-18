# @quoin/theme-broadsheet

**Big Editorial Headline.** Type IS the design. 100px+ headlines on the
first screen, monochrome palette, variable-axis demos baked into the
type tokens, single-column rhythm with generous margins. For editorial
publications and typography-forward brands.

## Trend lineage

- **Trend:** Big Editorial Headline / Display-Type Centerpiece (established, 2026)
- **Reference sites:** [pangrampangram.com](https://pangrampangram.com), [productiontype.com](https://productiontype.com), [displaay.net](https://displaay.net), [klim.co.nz](https://klim.co.nz), [fontshare.com](https://fontshare.com)
- **Lineage citation:** Research Section 1A, Trend #7 — "Type IS the design. 100px+ headlines; headline-as-hero with minimal supporting content. Variable font axes exposed."
- **Trajectory:** Established for typographic brands.

## Palette

**Monochrome.** True-white ground in light, true-black in dark. The
focus ring is the only chromatic note.

| Token | Light | Dark |
|---|---|---|
| `surface` | `oklch(100% 0 0)` `#fff` | `oklch(0% 0 0)` `#000` |
| `text-emphasis` | `oklch(0% 0 0)` | `oklch(100% 0 0)` |
| `accent` | `oklch(0% 0 0)` ink | `oklch(100% 0 0)` paper |
| `focus-ring` | `oklch(50% 0.18 270)` blue | `oklch(72% 0.18 270)` blue |

## Typography

Quoin identity stack — Junicode for display, Ranade for body.

| Slot | Stack |
|---|---|
| `font-display` | `Junicode 2` → `Junicode` → `PP Editorial New` → `GT Alpina` |
| `font-serif` | `Junicode 2` → `Junicode` → `PP Editorial New` |
| `font-sans` | `Ranade Variable` → `Ranade` → `PP Fragment Sans` → `Inter` |
| `font-mono` | `JetBrains Mono Variable` → `JetBrains Mono` |

### Type scale (light/dark, both)

| Token | Value | Use |
|---|---|---|
| `type-size-2xl` | `3.5rem` (56px) | Card titles |
| `type-size-3xl` | `5rem` (80px) | Page headings |
| `type-size-4xl` | `7rem` (112px) | Section heroes |
| `type-size-5xl` | `9rem` (144px) | Hero headlines |
| `type-size-display` | `11rem` (176px) | Cover lockups |
| `leading-tight` | `0.95` | Tight display rhythm |
| `tracking-tight` | `-0.04em` | Negative tracking at display tier |

Variable-font axes (wght, wdth, opsz where supported) MAY be exposed
on showcase pages — the impl pack reads variable-axis hints from
primitive metadata.

## Motion

Type-centric. Weight/width morph on scroll where appropriate.

- `motion-fast`: 180ms
- `motion-normal`: 320ms
- `motion-slow`: 600ms

## Depth

Flat. All radius tokens forced to `0px`. All shadows zero. The type
carries every level of hierarchy.

## Restraint / saturation strategy

Pure monochrome. The headline takes 60–80% of the first screen. Body
copy lives at a narrow measure (640–720px container). The blue focus
ring is the only non-grayscale token.

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-broadsheet");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT.
