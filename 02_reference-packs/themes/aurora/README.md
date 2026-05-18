# @quoin/theme-aurora

**Warm Liquid Linear.** Warm-gray near-black ground, custom
frosted-glass elevation, Linear-violet anchor, GPU-driven specular
surfaces. The aesthetic Linear pioneered and Vercel/Raycast popularised
— with warmth.

## Trend lineage

- **Trend:** Warm Liquid Linear (established → bifurcating, 2026)
- **Reference site:** [linear.app](https://linear.app)
- **Lineage citation:** Research Section 1A, Trend #2 — "Near-black or warm-neutral surface, hairline borders, frosted-glass material as elevation, optional gradient-violet anchor." Aurora targets the warm-Linear branch of the bifurcation.
- **Published sources:** linear.app/now/behind-the-latest-design-refresh; linear.app/now/linear-liquid-glass.

## Palette

| Token | Light | Dark (canonical) |
|---|---|---|
| `surface` | `oklch(98.5% 0.003 280)` warm off-white | `oklch(12% 0.012 270)` (`#16161a`-family) |
| `surface-elevated` | `oklch(100% 0 0)` | `oklch(16% 0.015 270)` |
| `text-emphasis` | `oklch(12% 0.015 270)` | `oklch(98% 0.008 270)` |
| `accent` | `oklch(58% 0.20 268)` (`#5e6ad2`-family) | `oklch(70% 0.18 268)` |
| `border-emphasis` | violet hairline | violet hairline |

Note: aurora is **primarily a dark-mode theme.** Light mode is a courteous bidirectional, not the canonical surface. The Linear chrome is unmistakable in dark.

## Typography

| Slot | Stack |
|---|---|
| `font-display` | `Manrope Variable` → `Manrope` → `Inter Variable` → `Inter` → `system-ui` |
| `font-sans` | `Manrope Variable` → `Manrope` → `Inter Variable` → `Inter` → `system-ui` → `-apple-system` |
| `font-mono` | `JetBrains Mono Variable` → `JetBrains Mono` → `ui-monospace` |

> **Why Manrope:** aurora was previously Inter Display + Inter, which collided typographically with arcade and vapor after the pre-Phase-Templates commercial-font cleanup. Manrope by Mikhail Sharanda (OFL via Google Fonts) is a geometric grotesque with subtle humanist warmth at body sizes — distinctly different from Inter's neutral grotesque register. The slight terminal-curvature softening matches the warm-Linear aesthetic better than Inter, while remaining a clean modern sans for productivity UI. Linear ships proprietary type; Manrope is the closest OFL approximation to the warm-grotesque register without aliasing Inter.

## Motion

GPU-driven specular highlights, 180–400ms cubic-bezier. Page transitions subtle.

- `motion-fast`: 180ms
- `motion-normal`: 260ms
- `motion-slow`: 400ms

## Depth

Custom frosted-glass material as elevation — Linear built their own
implementation of Apple's WWDC-2025 Liquid Glass rather than adopting
Apple APIs. Implementation packs SHOULD emit `backdrop-filter: blur(…)`
on elevated surfaces when the theme is active. Soft shadow-md/lg use
violet-tinted spread + offset.

## Restraint / saturation strategy

Three colour zones only: warm-gray ground, off-white type, violet
accent. The violet is **the anchor** — not held in reserve. It appears
on focus rings, active states, hairlines on elevated surfaces, and the
gradient-mesh top-third (impl-pack responsibility).

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-aurora");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT.
