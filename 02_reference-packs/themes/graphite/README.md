# @quoin/theme-graphite

**Geist Precision / Swiss Black-and-White.** Pure-black-on-white (or
inverted), hairline borders, geometric-grotesque type, single accent in
reserve. Engineering-grade restraint for developer tooling, infra, and
B2B SaaS.

## Trend lineage

- **Trend:** Geist Precision / Cold Liquid Linear (established, defining the developer-tooling visual default — 2026)
- **Reference site:** [vercel.com](https://vercel.com), [v0.dev](https://v0.dev), [replit.com](https://replit.com)
- **Lineage citation:** Research Section 1A, Trend #8 — "Tight Swiss grid; pure-black-on-white or pure-white-on-black; single accent used sparingly." Also Section 1A Trend #2 (Liquid Linear, cold-Linear direction).
- **Published sources:** vercel.com/font; vercel.com/geist/typography; vercel.com/design/guidelines; vercel.com/blog/introducing-geist-pixel (Geist Pixel released February 6, 2026).

## Palette

| Token | Light | Dark | Notes |
|---|---|---|---|
| `surface` | `oklch(100% 0 0)` (`#fff`) | `oklch(0% 0 0)` (`#000`) | Pure |
| `surface-elevated` | `oklch(100% 0 0)` | `oklch(8% 0 0)` | Inverted; no warm shift |
| `text-emphasis` | `oklch(0% 0 0)` | `oklch(100% 0 0)` | Mechanical |
| `border` | `oklch(92% 0 0)` (`#e5e5e5`) | `oklch(18% 0 0)` (`#2a2a2a`) | Hairline |
| `accent` | `oklch(70% 0.20 145)` | `oklch(75% 0.22 145)` | Developer green |
| `focus-ring` | `oklch(55% 0.22 260)` | `oklch(70% 0.22 260)` | Muted blue |

## Typography

| Slot | Stack |
|---|---|
| `font-display` / `font-sans` | `Geist Variable` → `Geist` → `Inter Variable` → `Inter` → system |
| `font-mono` | `Geist Mono Variable` → `Geist Mono` → `JetBrains Mono` → `ui-monospace` |
| `font-mono-pixel` | `Geist Pixel` → `Departure Mono` → `monospace` |

> **License note:** Geist Sans, Geist Mono, and Geist Pixel are OFL-licensed by Vercel / Basement Studio. Consumers should self-host with `@font-face` declarations and proper metric overrides. System-font fallbacks (Inter, JetBrains Mono) are populated automatically if the named faces aren't installed.

## Motion

Very short, purposeful. No easing flourishes.

- `motion-fast`: 120ms
- `motion-normal`: 160ms
- `motion-slow`: 200ms

## Depth

**Flat.** Hairline `1px` borders only. `shadow-md` and `shadow-lg` collapse to 1px solid spread (the visual rule, not a glow). No drop shadows.

## Restraint / saturation strategy

Monochromatic ground. **One accent in reserve** — the developer green
appears only on primary CTAs and active states. Focus rings are a
distinct muted-blue so they don't double as accent semantics.

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-graphite");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT. Theme overrides only; the Geist font family ships under its own OFL license from Vercel.
