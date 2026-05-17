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

## Companion JS module (Phase 5c interactive behavior)

`companion.js` ships alongside `companion.css`. It's a single ES module
(pure DOM API, no dependencies) that auto-attaches four behaviors on
DOMContentLoaded:

```html
<script type="module" src="/node_modules/@quoin/impl-tailwind/companion.js"></script>
```

Behaviors:

1. **Tab panels** — keyboard navigation (`←` / `→` / `Home` / `End`)
   between `[role="tab"]` buttons inside a `[role="tablist"]`. Each
   tab's `aria-controls` should point to a `[role="tabpanel"]` id; the
   module shows/hides panels as tabs are selected.

2. **Disclosure smooth animation** — `<details>` elements get a
   `height` transition on toggle. Respects
   `prefers-reduced-motion: reduce` (skips animation entirely).

3. **Modal pattern** — any element with
   `[data-quoin-dialog-trigger="targetId"]` opens the `<dialog
   id="targetId">` on click via the native `showModal()` API. Clicking
   the dialog backdrop closes it. Native `ESC` close stays.

4. **Command menu** — `Cmd-K` / `Ctrl-K` toggles the first
   `[data-quoin-command-menu]` element (typically a `<dialog>`). An
   `<input>` with `[data-quoin-command-filter]` filters child `<li
   role="option">` items in real time. `Enter` activates the
   highlighted item; `Escape` closes.

Re-scan after dynamic content insertion via
`window.QuoinCompanion.init()`.

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
