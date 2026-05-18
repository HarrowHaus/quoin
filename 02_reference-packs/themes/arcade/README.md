# @quoin/theme-arcade

**Dopamine Saturation.** Hyper-saturated palette, oversized display
sans, spring-overshoot motion, retro-future glow shadows. Y2K-nostalgia
overtones. For consumer products and creator tools where energy is the
brand.

## Trend lineage

- **Trend:** Dopamine Saturation (peaking, broad-consumer, 2026)
- **Reference brands:** Vacation (suncare), Lush, Headspace, Starface
- **Lineage citation:** Research Section 1A, Trend #5 — "Hyper-saturated palettes; neon pink, electric blue, acid red; high-contrast pairings; Y2K-nostalgia overtones."
- **Trajectory:** Peaking in consumer-lifestyle; declining in B2B. Use deliberately, not by default.

## Palette

Hyper-saturated. Selected to clip on sRGB displays so the P3 variant
reads as physically hotter.

| Token | Light | Dark | OKLCH chroma |
|---|---|---|---|
| `accent` | `oklch(70% 0.25 350)` neon magenta | `oklch(75% 0.25 350)` | 0.25 |
| `success` | `oklch(78% 0.22 130)` acid lime | `oklch(82% 0.22 130)` | 0.22 |
| `info` | `oklch(60% 0.30 270)` electric blue | `oklch(68% 0.30 270)` | 0.30 |
| `critical` | `oklch(65% 0.28 25)` neon red | `oklch(70% 0.28 25)` | 0.28 |
| `warning` | `oklch(82% 0.20 75)` highlighter yellow | `oklch(85% 0.22 75)` | 0.20 |

## Typography

Bold display sans for the headline tier; humanist body.

| Slot | Stack |
|---|---|
| `font-display` | `PP Editorial New` → `Clash Display` → `PP Fragment Sans` → `Inter Display` |
| `font-sans` | `Inter Variable` → `Inter` → `PP Fragment Sans` → `system-ui` |
| `font-mono` | `JetBrains Mono Variable` |

Type-size scale lifted: `5xl` is 8rem (128px), `display` is 10rem (160px).

## Motion

Energetic. Spring/overshoot via `ease-emphasized` and `ease-spring`
overrides.

- `motion-fast`: 260ms
- `motion-normal`: 380ms
- `motion-slow`: 520ms
- `ease-emphasized`: `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot)
- `ease-spring`: `cubic-bezier(0.42, 1.62, 0.58, 1.05)` (springy)

## Depth

**Flat with coloured glow shadows.** `shadow-tint` is the magenta
accent at 0.45 alpha (light) / 0.55 alpha (dark), so all elevated
surfaces emit a magenta glow rather than dropping a grey shadow.
Radii are generous (10–20px) and `radius-pill` is set for inline
pills.

## Restraint / saturation strategy

Zero restraint. The whole palette is selected for high chroma; the
P3 variant is selected to clip on sRGB so wide-gamut monitors render
the design as designed. Use sparingly outside consumer brands — the
register reads loud anywhere it shows up.

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-arcade");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT.
