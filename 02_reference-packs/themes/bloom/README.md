# @quoin/theme-bloom

**Organic Anti-Grid.** Flowing gradient mesh sections, soft pastel-to-
coral palette, irregular section boundaries, humanist sans. Sections
without right angles; flow-into-flow transitions. For consumer apps
and lifestyle SaaS.

## Trend lineage

- **Trend:** Organic Anti-Grid / Flowing Layouts (emerging, 2026)
- **Reference sites:** [stripe.com](https://stripe.com), [wise.com](https://wise.com), [cash.app](https://cash.app)
- **Lineage citation:** Research Section 1A, Trend #6 — "Flowing lines, soft gradients, irregular section boundaries. Soft pastel-to-mid gradients; cream-to-coral, sage-to-cream."
- **Trajectory:** Emerging in marketing-site context.

## Palette

Pastel-to-mid range. Cream surface, peach accent, sage / rose surface tints.

| Token | Light | Dark | Hue role |
|---|---|---|---|
| `surface` | `oklch(97% 0.015 75)` cream | `oklch(18% 0.025 320)` plum | Warm ground |
| `surface-elevated` | `oklch(98% 0.020 30)` rose-tinted white | `oklch(22% 0.030 330)` | Card |
| `surface-recessed` | `oklch(94% 0.025 60)` sand | `oklch(12% 0.020 320)` | Receded |
| `accent` | `oklch(70% 0.18 25)` peach-coral | `oklch(78% 0.18 25)` | Anchor |
| `text-emphasis` | `oklch(20% 0.025 35)` warm-brown ink | `oklch(98% 0.018 40)` | — |

## Typography

Humanist sans (Synonym / Plein / General Sans) paired with display serif accents.

| Slot | Stack |
|---|---|
| `font-display` | `DM Serif Display` → `PP Editorial New` → `Synonym Variable` |
| `font-sans` | `Synonym Variable` → `Synonym` → `Plein Variable` → `General Sans` → `Inter` |
| `font-mono` | `JetBrains Mono Variable` |

## Motion

Slow, fluid. Scroll-tied morphing where impl pack supports it.

- `motion-fast`: 300ms
- `motion-normal`: 700ms
- `motion-slow`: 1200ms

## Depth

Soft gradient washes. Diffused drop shadows (8–16px y offset, 32–48px
blur) rather than hard borders. Radii generous (12–24px), `radius-pill`
on inline pills. The visual elevation is mostly colour-tint rather than
geometric shadow.

## Restraint / saturation strategy

Mid-saturation throughout. The peach-coral accent is the chromatic
anchor — it's expected to appear on hero CTAs, focus rings, and the
gradient-mesh top-third. Pastels carry surface differentiation. Use
this theme when the brand reads consumer-friendly, not enterprise.

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-bloom");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT.
