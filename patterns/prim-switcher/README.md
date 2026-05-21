# @quoin/prim-switcher

Layout primitive — **switch from row to column when container width drops below a threshold**. Universal for two-column compositions that need to stack on narrow containers without using viewport media queries.

**Shipped:** Phase 22.6 · 2026-05-21.

## Concern boundary

`prim-switcher` owns one decision: row when wide enough, column when not. It does NOT own child styling, distribution beyond equal `flex: 1`, or wrapping (use `prim-grid` for wrap-based responsive grids).

## Container-query requirement

`switcher-container` declares `container-type: inline-size`. The pack's CSS sets this directly. **v3.G.11 container-query convention applies.**

Browser support: Baseline 2024 (Chrome 105+, Safari 16+, Firefox 110+). Older browsers degrade to the row layout. Operators who prefer an always-stacked fallback on legacy browsers wrap the pack rules in `@supports (container-type: inline-size)`.

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| `switcher-container` | `<div>` | Container-query host; flips between row + column based on inline-size. | `container-type`, `--prim-switcher-gap`, `--prim-switcher-align` |

### Conditional slots

(none — children are operator-provided)

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens |
|--------------|--------|------------------------------|-------------------|
| `data-threshold` | `narrow` (30em) / `standard` (40em, default) / `wide` (60em) | — | container-query breakpoint |
| `data-gap` | `xs` / `sm` / `md` (default) / `lg` | — | maps to `--space-2` / `--space-3` / `--space-card` / `--space-section` |
| `data-align` | `start` / `center` / `end` / `stretch` (default) | — | `align-items` CSS value |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| (none) | — | — | Foundational primitive. |

## Markup

```html
<div data-pattern="switcher-container" data-threshold="standard" data-gap="md">
  <div><!-- left/top child --></div>
  <div><!-- right/bottom child --></div>
</div>
```

## Composition

- **Two-column hero** — left text + right image; stacks on narrow containers.
- **Side-by-side comparison** — feature comparison, before/after panels.
- **Form layout** — two-column form on wide containers; single-column on narrow.

## Difference from prim-sidebar

| Concern | prim-sidebar | prim-switcher |
|---------|--------------|---------------|
| Slots | Two distinct (`sidebar-aside` + `sidebar-main`) | N equal children |
| Use when | One child is structurally a sidebar (different content type) | Children are peers (same content type, equal weight) |
| Width | Sidebar has fixed width; main fills | All children share equally (flex: 1) |

## Difference from prim-grid

`prim-grid` wraps N children into rows + columns based on cell width.
`prim-switcher` keeps all N children in one row above threshold, stacks them in one column below.

Use `prim-grid` when N varies and cells should wrap. Use `prim-switcher` when N is fixed (typically 2 or 3) and the choice is binary: row or column.

## ARIA

`switcher-container` is structural — no role. Operators wrap in a semantic landmark when one is needed.

## Browser support

Container queries are **Baseline 2024**. Older browsers degrade to row layout (or always-stacked if the pack rules are `@supports`-gated).

## License

MIT.
