# @quoin/theme-prism

**Liquid Glass.** Real frosted-glass material, light-responsive
surfaces, floating chromes. Use when shipping iOS 26-adjacent feel.
Opt-in: requires `backdrop-filter` support.

## Trend lineage

- **Trend:** Liquid Glass / Frosted Material (emerging, post-WWDC 2025)
- **Reference site:** [linear.app mobile](https://linear.app) (Oct 2025 refresh), iOS 26 system chrome
- **Lineage citation:** Research Section 1A, Trend #10 — "Frosted-glass material with physically-modeled light response. Translucent overlays at 30–60% opacity with `backdrop-filter: blur(12px–24px)`; tinted-glass variants."
- **Trajectory:** Emerging strongly in 2026; oversaturation risk. Ship as opt-in.

## Browser support gate

This theme requires `backdrop-filter` support
([95.8% global as of April 2026](https://caniuse.com/css-backdrop-filter)).
Impl packs SHOULD emit `@supports (backdrop-filter: blur(1px))` guards
and provide a graceful fallback to opaque elevation when unsupported.

The pack manifest declares `capabilities: ["backdrop-filter"]` so
build tooling can warn when paired with an impl pack that hasn't
declared support.

## Palette

Translucent surface tokens. Note the alpha values on `surface-elevated`
and `surface-recessed` — those make `backdrop-filter: blur(…)` reveal
underlying content.

| Token | Light | Dark | Notes |
|---|---|---|---|
| `surface` | `oklch(98% 0.005 240)` | `oklch(10% 0.012 240)` | Opaque ground |
| `surface-elevated` | `oklch(98% 0.005 240 / 0.45)` | `oklch(14% 0.015 240 / 0.45)` | **Translucent** |
| `surface-recessed` | `oklch(94% 0.008 240 / 0.55)` | `oklch(6% 0.010 240 / 0.55)` | **Translucent** |
| `accent` | `oklch(60% 0.18 230)` system blue | `oklch(72% 0.18 230)` | iOS-blue family |

## Blur tokens

The canonical `blur-*` dimension tokens are tuned for this theme:

- `blur-sm`: 12px (touch bars, segmented controls)
- `blur-md`: 20px (cards, modals)
- `blur-lg`: 32px (full-screen sheets)

Impl packs read these to emit `backdrop-filter: blur(var(--blur-md))`
on `surface-elevated` surfaces.

## Typography

| Slot | Stack |
|---|---|
| `font-display` | `SF Pro Display` → `-apple-system` → `Inter Display Variable` |
| `font-sans` | `SF Pro Text` → `-apple-system` → `Inter Variable` |
| `font-mono` | `SF Mono` → `JetBrains Mono Variable` |

On Apple platforms (where SF Pro resolves), the theme inherits the
native system register exactly. Elsewhere, Inter substitutes with
metric-override scaffolding handled by `tokens-baseline`'s `@font-face`
declarations.

## Motion

200–400ms organic ease. Light moves through space (where the GPU
permits). The impl pack handles motion-tied translucency changes.

- `motion-fast`: 200ms
- `motion-normal`: 320ms
- `motion-slow`: 400ms

## Depth

**Material AS depth, not shadow.** The translucent surfaces with
backdrop-filter blur substitute for drop shadows entirely. The
remaining `shadow-md`/`shadow-lg` exist for non-backdrop-filter
fallback only.

## Restraint / saturation strategy

Translucent surfaces with one anchor colour (system blue). The visual
weight comes from light-and-blur transitions across the page, not from
chromatic accents. Use when the brand reads "OS native" rather than
"website".

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-prism");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT.
