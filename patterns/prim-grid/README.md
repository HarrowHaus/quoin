# @quoin/prim-grid

Layout primitive — **auto-fit grid with min-width per cell**. Cells reflow into columns without media queries.

**Shipped:** Phase 22.6 · 2026-05-21.

## Concern boundary

`prim-grid` owns the auto-fit grid recipe. It does NOT own cell styling, hover states, or content layout inside cells (compose `prim-stack` for that).

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| `grid-container` | `<div>` | Auto-fit grid. Cells inside are layout children of the grid. | `--prim-grid-min-cell`, `--prim-grid-gap`, `--prim-grid-align` |

### Conditional slots

(none)

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens |
|--------------|--------|------------------------------|-------------------|
| `data-min-cell` | `narrow` (200px) / `standard` (280px, default) / `wide` (360px) / `custom` | — | `--prim-grid-min-cell` |
| `data-gap` | `xs` / `sm` / `md` (default) / `lg` | — | maps to `--space-2` / `--space-3` / `--space-card` / `--space-section` |
| `data-max-columns` | `2` / `3` / `4` / `unlimited` (default) | — | column-count cap |
| `data-align` | `start` / `center` / `stretch` (default) | — | `align-items` CSS value |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| (none) | — | — | Foundational primitive; consumes only tokens. |

## CSS recipe

```css
[data-pattern="grid-container"] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(var(--prim-grid-min-cell, 280px), 100%), 1fr));
  gap: var(--prim-grid-gap, var(--space-card));
}
```

The inner `min(min-cell, 100%)` prevents overflow on viewports narrower than the cell minimum — without it, a 200px min-cell on a 150px viewport would cause horizontal scroll.

## Markup

```html
<div data-pattern="grid-container" data-min-cell="standard" data-gap="md">
  <article>Cell one</article>
  <article>Cell two</article>
  <article>Cell three</article>
</div>
```

## Composition

- **Cells with internal stack** — `<prim-grid><div><prim-stack>image + heading + body + cta</prim-stack></div></prim-grid>`.
- **Pricing tier grid** — `data-min-cell="wide" data-max-columns="3"` matches the canonical pricing layout.
- **Card list with hover** — cell elements have their own border + hover; prim-grid only governs layout.

## ARIA

`grid-container` is structural. It is NOT a `role="grid"` (which has different semantic + interaction contracts — see `pattern-data-table`). Operators wrap the grid in `<ul>` when cells are list items.

## Future consolidation

`pattern-feature-grid` currently inlines this auto-fit grid recipe. A future consolidation (deferred to Phase 22.7) will refactor feature-grid to compose `prim-grid`. Not in this session's scope.

## Browser support

`display: grid` with `repeat(auto-fit, minmax(...))` is Baseline 2017. `min()` in CSS is Baseline 2020. Universal support.

## License

MIT.
