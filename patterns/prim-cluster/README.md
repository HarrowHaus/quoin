# @quoin/prim-cluster

Layout primitive — **horizontal grouping with wrapping**. Universal for nav links, button groups, tag clouds, action bars, breadcrumbs.

**Shipped:** Phase 22.6 · 2026-05-21.

## Concern boundary

`prim-cluster` owns one concern: horizontal grouping that wraps on overflow. Items inside are sized by themselves; the cluster only governs spacing and alignment between them. No typography, no color, no interaction.

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| `cluster-container` | `<div>` | Horizontal flex row that wraps. | `--prim-cluster-gap`, `--prim-cluster-justify`, `--prim-cluster-align`, `--prim-cluster-wrap` |

### Conditional slots

(none)

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens |
|--------------|--------|------------------------------|-------------------|
| `data-gap` | `xs` / `sm` (default) / `md` / `lg` | — | maps to `--space-1` / `--space-2` / `--space-3` / `--space-card` |
| `data-justify` | `start` (default) / `center` / `end` / `space-between` / `space-around` | — | `justify-content` CSS value |
| `data-align` | `start` / `center` (default) / `end` / `baseline` / `stretch` | — | `align-items` CSS value |
| `data-wrap` | `wrap` (default) / `nowrap` | — | `flex-wrap` CSS value |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| (none) | — | — | Foundational primitive; consumes only tokens. |

## Markup

```html
<div data-pattern="cluster-container" data-gap="sm" data-justify="start">
  <button>Save</button>
  <button>Cancel</button>
  <span class="hint">Unsaved changes</span>
</div>
```

## Composition

- **Inside `prim-stack`** — column of clusters (e.g., stacked action bars).
- **As any pattern's actions slot** — `hero-actions`, `meta-actions`, etc.
- **As nav link row** — wrap in `<nav aria-label="Primary">`; the cluster is the flex layout.
- **As tag cloud** — wrap in `<ul aria-label="Tags">`, each `<li>` is a cluster child.

## ARIA

`cluster-container` is structural. When the cluster represents a related group of controls, operators wrap it in `<div role="group" aria-label="...">`. The primitive itself does not declare role.

## Browser support

Plain flexbox with `gap`. Universal Baseline support since 2021.

## License

MIT.
