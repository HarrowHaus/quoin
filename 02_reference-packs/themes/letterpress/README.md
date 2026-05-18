# @quoin/theme-letterpress

**Tactile Warmth.** Paper-cream and stone-gray surfaces, fine grain
overlay, magazine-grid rhythm, archival photography support. Pantone
Color of the Year 2026 — Cloud Dancer #f1ece4 — as the page reference.

## Trend lineage

- **Trend:** Tactile Warmth / Texture Return (emerging, 2026)
- **Reference site:** [klim.co.nz](https://klim.co.nz)
- **Lineage citation:** Research Section 1A, Trend #3 — "Grain overlays, organic gradients, material-inspired surfaces, warmth as deliberate counter to AI sterility."
- **Pantone reference:** Pantone Color of the Year 2026 — **PANTONE 11-4201 Cloud Dancer**, announced December 4, 2025.
- **Published sources:** Webspec 2026 trends; Wix "11 Biggest Web Design Trends of 2026"; Webflow Blog "8 web design trends to watch in 2026".

## Palette

Earth tones, low saturation. Cream / sand / oat / terracotta / dusty olive.

| Token | Light | Dark | Hex anchor |
|---|---|---|---|
| `surface` | `oklch(95% 0.018 80)` | `oklch(20% 0.020 55)` | `#f1ece4` Cloud Dancer |
| `surface-elevated` | `oklch(92% 0.025 70)` warm sand | `oklch(24% 0.022 55)` | — |
| `text-emphasis` | `oklch(18% 0.020 60)` | `oklch(96% 0.018 75)` | — |
| `accent` | `oklch(58% 0.12 45)` terracotta | `oklch(68% 0.14 45)` | — |

## Typography

Uses **Quoin identity stack** end-to-end:

| Slot | Stack |
|---|---|
| `font-display` / `font-serif` | `Junicode 2` → `Junicode` → `ui-serif` → Georgia |
| `font-sans` | `Ranade Variable` → `Ranade` → `system-ui` |
| `font-mono` | `Monaspace Neon Variable` → `Monaspace Neon` → `JetBrains Mono` → `ui-monospace` |
| `font-mono-pixel` | `Departure Mono` → `monospace` |

> Commercial peer-foundry faces (Tiempos Headline / Text, Untitled Sans) were removed in the pre-Phase-Templates cleanup. The Quoin identity stack (Junicode + Ranade + Monaspace + Departure Mono) — all OFL — fully carries the typographic register.

## Motion

Slow, eased, sparse. The pace of magazine reading, not application UX.

- `motion-fast`: 320ms
- `motion-normal`: 600ms
- `motion-slow`: 800ms

## Depth

**Texture replaces shadow.** All `shadow-*` tokens collapse to zero;
implementation packs should emit an SVG noise filter at 3–8% opacity
over elevated surfaces in lieu of a drop shadow. Hand-rule dividers
and archival photography carry the remaining visual weight.

Corner radii are minimal (0–4px) — the type and texture do the
softening, not the geometry.

## Restraint / saturation strategy

Low-saturation earth tones throughout. The terracotta accent is the
only chromatic peak; everything else lives in the 0.018–0.030 chroma
range. Magazine-grid rhythm: generous margins, asymmetric content
blocks, archival imagery treated as the primary visual incident.

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-letterpress");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT.
