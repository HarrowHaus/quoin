# @quoin/impl-tailwind

Tailwind v4 implementation pack for Quoin. Emits HTML elements with
Tailwind class strings for every primitive in the v1 vocabulary.

## Design rule

The pack is **token-pack agnostic**. Structural utilities (layout,
spacing, borders) emit plain Tailwind class names. Token-bearing
utilities (colour, typography, radius, spacing-token references) emit
Tailwind v4 arbitrary-value classes that resolve through CSS custom
properties:

```
token reference   →  emitted class
--accent          →  bg-[var(--accent)]
--text-emphasis   →  text-[var(--text-emphasis)]
--border          →  border-[var(--border)]
--radius-card     →  rounded-[var(--radius-card)]
--font-display    →  font-[var(--font-display)]
```

This means any DTCG token pack that supplies the canonical semantic
namespace from [`00_spec/tokens.md` §2](../../00_spec/tokens.md) produces
the right output without changes to the emitter. Swap
`@quoin/tokens-baseline` for a Material 3 token pack and every
primitive's emitted output stays the same — only the CSS variables
change.

## Use

Pair with any Quoin token pack that ships a CSS export plus your usual
Tailwind v4 toolchain:

```html
<link rel="stylesheet" href="/node_modules/@quoin/tokens-baseline/tokens.css">
<link rel="stylesheet" href="/dist/tailwind.css">
<link rel="stylesheet" href="/node_modules/@quoin/impl-tailwind/companion.css">
```

Tailwind v4 picks up the arbitrary-value classes during its content
scan and emits the corresponding CSS. The variables resolve at runtime
against the token pack's stylesheet.

## Companion stylesheet (Phase 5a polish)

`companion.css` ships alongside `emit.js` and applies the visual-maturity
layer — hover, focus, active, and motion states for every primitive —
via attribute selectors that match the arbitrary-value classes the
emitter produces. Loading it gives you, for free:

- Tactile button hover (1px lift + brightness shift) and active state.
- Universal keyboard focus rings on every interactive primitive.
- Card hover lift (border + shadow) for emphasis-card, pricing-tier,
  feature-cell, kpi-card, etc.
- Input focus rings on input-cell, textarea-cell, pin-entry.
- Animated entrance for alert-band, resolved-mark, active-zone.
- Shimmer animation for pending-block + skeleton-placeholder.
- Refined tab states for segment-control.
- Custom scrollbar styling.
- `prefers-reduced-motion` honoured throughout.

The companion uses the canonical `--motion-*` and `--ease-*` token
namespace, so durations and easings respect whatever your active token
pack defines. No JavaScript required — every effect is pure CSS.

## Coverage

All 36 v1 primitives across editorial, layout, navigation, state,
content, and interactive categories. Sample compiled outputs match the
reference Tailwind output documented in
[`00_spec/primitives.md`](../../00_spec/primitives.md), with the
token-bearing classes upgraded to arbitrary-value form.

## Cross-references

- Spec: [`00_spec/spec.md`](../../00_spec/spec.md) — language reference.
- Pack format: [`00_spec/pack-format.md`](../../00_spec/pack-format.md) §6 — implementation pack contract.
- Companion pack: [`@quoin/impl-raw-css`](../impl-raw-css) — alternative emitter with zero framework dependency.
