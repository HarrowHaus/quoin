# @quoin/theme-vellum

**Calm Ivory Editorial.** Warm parchment ground, serif display at
broadsheet scale, achromatic UI with a single earthy accent held in
reserve. Quiet authority for AI labs, scholarly publishing, longform
editorial.

## Trend lineage

- **Trend:** Calm Ivory Editorial (peaking, 2026)
- **Reference site:** [anthropic.com](https://www.anthropic.com)
- **Lineage citation:** Research Section 1A, Trend #1 — "Warm-paper page surface (never #fff), serif display at broadsheet scale, achromatic UI with single earthy accent held in reserve."
- **Published sources:** Refero Styles Anthropic style reference; FontOfWeb anthropic.com design tokens extraction; Webspec "The Top New & Current Website Design Trends to Watch in 2026" (Feb 2026); Type Today "Styrene in use: ANTHROP\\C".

## Palette

| Token | Light (OKLCH) | Light (≈hex source) | Dark (OKLCH) |
|---|---|---|---|
| `surface` | `oklch(97.5% 0.011 85)` | `#faf9f5` Ivory Light | `oklch(14% 0.008 75)` |
| `surface-elevated` | `oklch(96% 0.012 80)` | `#f0eee6` | `oklch(18% 0.010 75)` |
| `surface-recessed` | `oklch(92% 0.018 80)` | `#e3dacc` | `oklch(10% 0.006 75)` |
| `text-emphasis` | `oklch(12% 0.005 75)` | `#141413` near-black ink | `oklch(98% 0.010 80)` |
| `accent` | `oklch(66% 0.14 40)` | `#d97757` terracotta | `oklch(72% 0.14 40)` |

The terracotta accent is **held in reserve** — never used for body chrome, only the singular CTA or in-text emphasis underline.

## Typography

| Slot | Stack |
|---|---|
| `font-display` | `Source Serif 4 Display` → `Source Serif 4` → `ui-serif` → Georgia |
| `font-serif` | `Source Serif 4` → `ui-serif` → Georgia |
| `font-sans` | `Inter Variable` → `Inter` → `system-ui` |
| `font-mono` | `JetBrains Mono Variable` → `JetBrains Mono` → `ui-monospace` |

> **Substitution note:** Anthropic ships proprietary Anthropic Sans + Anthropic Serif + Anthropic Mono. Vellum uses OFL equivalents — Source Serif 4 (Adobe) + Inter (Rasmus Andersson) + JetBrains Mono — that approximate the optical register without the licensing burden. The proprietary faces were previously aliased in the stack but were removed in the pre-Phase-Templates cleanup: every Quoin theme now ships with OFL/system fonts only.

## Motion

Restrained. 200–280ms ease-out on link/button states. Page transitions absent or instant.

- `motion-fast`: 200ms
- `motion-normal`: 240ms
- `motion-slow`: 280ms

## Depth

Effectively flat. No drop shadows beyond hairlines. Color-surface differentiation (cream cards on ivory page) substitutes for elevation. Asymmetric border radius on the primary CTA (0px 0px 8px 8px — flat top, rounded bottom) is the signature ornament.

## Restraint / saturation strategy

Achromatic UI with **one accent in reserve**. The terracotta `#d97757` should appear in fewer than three places per page — typically the primary CTA and a single in-text underline. Body chrome is all near-black-on-ivory.

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-vellum");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## License

MIT. Theme overrides only; fonts must be licensed separately.
