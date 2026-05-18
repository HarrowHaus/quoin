# @quoin/theme-terminal

**Honest Brutalism / Editorial Mono.** Pure-black ground with one acid
accent. Mono-everywhere — every typographic slot resolves to Monaspace
Neon. ASCII rules, Unicode box-drawing dividers, deliberate
column-collision. For engineering blogs and terminal-adjacent apps.

## Trend lineage

- **Trend:** Honest Brutalism / Editorial Mono (emerging, niche, 2026)
- **Reference sites:** [rauno.me](https://rauno.me), [departuremono.com](https://departuremono.com), [posthog.com](https://posthog.com), [commitmono.com](https://commitmono.com)
- **Lineage citation:** Research Section 1A, Trend #4 — "Monospaced UI, asymmetric typography, exposed structure, near-black grounds with one ultra-bright accent."
- **Trajectory:** Emerging in technical-brand subculture.

## Palette

| Token | Light (bidirectional) | Dark (canonical) |
|---|---|---|
| `surface` | `oklch(98% 0.005 100)` paper | `oklch(0% 0 0)` true-black |
| `text-emphasis` | `oklch(0% 0 0)` | `oklch(98% 0.008 100)` |
| `accent` | `oklch(78% 0.22 130)` acid lime | `oklch(85% 0.22 130)` |
| `border` | `oklch(10% 0.005 100)` ink hairline | `oklch(35% 0.008 100)` |

The acid lime is the only chromatic note — every other token lives in
the achromatic 0–0.012 chroma band.

## Typography

**Mono-everywhere.** Every typographic slot resolves to Monaspace Neon.

| Slot | Stack |
|---|---|
| `font-display` | `Monaspace Neon Variable` → `Monaspace Neon` → `JetBrains Mono` |
| `font-sans` | `Monaspace Neon Variable` → `Monaspace Neon` → `JetBrains Mono` |
| `font-serif` | `Monaspace Neon Variable` → `Monaspace Neon` |
| `font-mono` | `Monaspace Neon Variable` → `Monaspace Neon` → `JetBrains Mono` |
| `font-mono-pixel` | `Departure Mono` |

Quoin identity stack mono variants underpin this theme exclusively.

## Motion

Snap. 80–150ms. **Linear easing only** — `ease-standard`,
`ease-decelerate`, `ease-accelerate` all overridden to `linear` so the
brutalist register stays honest. No spring, no overshoot, no
deceleration.

- `motion-fast`: 80ms
- `motion-normal`: 100ms
- `motion-slow`: 150ms

## Depth

**Zero.** All radius tokens forced to `0px`. All shadow tokens collapse
to zero. Hairline `1px` borders only, often dashed (via
`stroke-dashed`).

## Restraint / saturation strategy

Monochrome ground with **one acidic accent**. ASCII rules and Unicode
box-drawing characters (`─ │ ┌ ┐ └ ┘ ┼`) substitute for visual chrome.
Deliberate column-collision in layouts: the impl pack should NOT
enforce alignment between text columns and grid columns.

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-terminal");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT. Monaspace ships under SIL OFL from GitHub Next.
