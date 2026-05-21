# @quoin/prim-center

Layout primitive — **center content within parent on one or both axes**. Used by hero centered in section, modal centered in viewport, empty-state centered in container, and the canonical max-width prose column.

**Shipped:** Phase 22.6 · 2026-05-21.

## Concern boundary

`prim-center` owns centering + max-width. It does NOT own typography, vertical rhythm (that's `prim-stack`'s job), or horizontal grouping (that's `prim-cluster`'s).

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| `center-container` | `<div>` | Owns the centering mechanism + max-width. | `--prim-center-max-width`, `--prim-center-padding` |
| `center-content` | `<div>` | Inner wrapper; the thing being centered. | (none) |

### Conditional slots

(none)

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens |
|--------------|--------|------------------------------|-------------------|
| `data-axis` | `both` (default) / `horizontal` / `vertical` | — | CSS recipe per axis (grid place-items / margin-inline auto / flex column) |
| `data-max-width` | `narrow` (45ch) / `standard` (66ch, default) / `wide` (80ch) / `none` | — | `max-width` CSS value |
| `data-padding` | `sm` / `md` (default) / `lg` | — | `--space-3` / `--space-card` / `--space-panel` |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| (none) | — | — | Foundational primitive; consumes only tokens. |

## Markup

```html
<div data-pattern="center-container" data-axis="horizontal" data-max-width="standard">
  <div data-pattern="center-content">
    <!-- centered content -->
  </div>
</div>
```

## Why two slots

Separating container from content lets the container own positioning while the content owns its own sizing and styling. It also lets operators wrap content in a semantic landmark (`<article>`, `<main>`) without coupling the centering layer to the semantics.

## Composition

- **Wrapping a `prim-stack`** — prose container with internal vertical rhythm. The most common idiom in the catalog: `prim-center > prim-stack`.
- **Inside a section** — hero content centered in the viewport: `<section><prim-center data-axis="both">...</prim-center></section>`.
- **As modal content centering** — modal-dialog already does this; future modals compose prim-center to avoid duplicating the recipe.

## ARIA

`prim-center` is purely structural. No role, no aria-label. The operator wraps the centered content in a semantic landmark when one is needed.

## Browser support

`display: grid; place-items: center` is Baseline 2017. `margin-inline: auto` is Baseline 2021. All variants work in evergreen browsers without polyfill.

## License

MIT.
