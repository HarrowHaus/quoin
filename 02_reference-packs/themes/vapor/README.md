# @quoin/theme-vapor

**Atmospheric Layered Mesh** — for fintech, payment infrastructure, and
dev-marketing where the brand reads "institutional but considered."

## Why this isn't a Stripe clone

The Stripe Atmospheric Gradient (Section 1A Trend #9) has been widely
copied since 2019. The lineage prompt's stop condition was: ship only
if the gradient generator is novel. Vapor's novelty is two-fold:

1. **Compositional approach.** The gradient is NOT a CSS
   `radial-gradient` or `conic-gradient` syntax. The pack declares
   `capabilities: ["layered-mesh-gradient"]` and the impl pack
   composites **four absolutely-positioned blurred surface layers**
   — sky / horizon / ground / chromatic-dust — using `filter: blur()`
   on solid-fill divs rather than gradient-mesh syntax. This reads as
   atmospheric perspective in landscape painting, not a Stripe-style
   mesh anchored at one point. The `blur-sm / blur-md / blur-lg`
   canonical tokens are tuned to **40 / 80 / 140px** for this purpose
   (much larger than other themes use them).

2. **Palette tilt.** The classic Stripe palette is `#f6f9fc cream` →
   `#533afd indigo` → `#4434d4 indigo-deep` → `#0a2540 navy`. Vapor
   shifts each anchor:
   - **pale-mint-cream** `oklch(97% 0.012 200)` instead of pure
     cream — slight cyan-green tint
   - **warm-indigo** `oklch(58% 0.22 265)` instead of pure indigo —
     hue rotated +6° toward violet
   - **deep-teal-navy** `oklch(20% 0.045 240)` instead of pure navy —
     more saturation and a green-blue tilt
   
   Same chromatic territory, different mood: "atmospheric morning"
   rather than "urban dawn."

## Trend lineage

- **Trend:** Stripe Atmospheric Gradient (established, mature, 2026)
- **Reference site:** [stripe.com](https://stripe.com)
- **Lineage citation:** Research Section 1A, Trend #9 — "Recognizable gradient-mesh atmospheric backdrop occupying the upper page."
- **Stop condition cleared:** novel gradient generator (layered-mesh) plus palette tilt — ships per spec.

## Palette

| Token | Light | Role |
|---|---|---|
| `surface` | `oklch(97% 0.012 200)` | Sky tier (page top) |
| `surface-elevated` | `oklch(99% 0.005 230)` | Card above mesh |
| `surface-recessed` | `oklch(90% 0.030 240)` | Horizon tier |
| `text-emphasis` | `oklch(14% 0.025 240)` | Near-black ink |
| `accent` | `oklch(58% 0.22 265)` | Warm-indigo CTA |

Dark mode shifts to deep-teal-navy ground (`oklch(14% 0.040 240)`)
with the same warm-indigo accent preserved.

## Typography

| Slot | Stack |
|---|---|
| `font-display` / `font-sans` | `Söhne` → `Inter Display/Variable` → `Helvetica Neue` → `system-ui` |
| `font-mono` | `Söhne Mono` → `JetBrains Mono Variable` → `ui-monospace` |

> **Licensing note:** Söhne by Klim Type Foundry is a commercial
> typeface. Consumers wanting the proprietary stack must license it
> directly from Klim. Inter (OFL) is the listed fallback and produces
> a close-enough geometric register for development.

## Motion

Smooth 240–400ms.

- `motion-fast`: 240ms
- `motion-normal`: 320ms
- `motion-slow`: 400ms

## Depth

Soft diffused shadows (`shadow-md`: 32px blur + 8px spread; `shadow-lg`:
60px blur + 12px spread). 4–6px radii for buttons and cards. The
visual depth comes mostly from the layered-mesh composition; explicit
shadows are quiet supplements.

## Restraint / saturation strategy

Mid-saturation indigo + teal-navy. The mesh is the loudest element
on the page; everything inside the content tier is restrained. The
indigo accent appears on CTAs, focus rings, and the horizon tier's
chromatic dust. Tabular numerics expected on any monetary cell
(impl-pack responsibility via `font-variant-numeric: tabular-nums`).

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-vapor");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT.
