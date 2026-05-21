# @quoin/prim-sidebar

Layout primitive — **sidebar + main content, container-query responsive**. Above the threshold: side-by-side. Below: stacked column.

**Shipped:** Phase 22.6 · 2026-05-21.

## Concern boundary

`prim-sidebar` owns one concern: the responsive sidebar-vs-main layout switch. It does NOT own sidebar contents (compose `prim-stack`, `toc-container`, or any nav pattern inside), main content layout, or sticky behavior.

## Container-query requirement

`sidebar-container` MUST have `container-type: inline-size` declared. The pack's CSS sets this on the slot directly — operators do not need to add it manually unless they want a different container scope.

**v3.G.11 container-query convention applies.** Browser support is Baseline 2024 (Chrome 105+, Safari 16+, Firefox 110+). Older browsers degrade to the stacked layout — the layout still functions, just without the responsive switch.

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| `sidebar-container` | `<div>` | Outer wrapper; declares container-query context; owns the responsive switch. | `container-type`, `--prim-sidebar-width`, threshold breakpoints |
| `sidebar-aside` | `<aside>` | The sidebar. Implicit `role="complementary"`. | `inline-size: var(--prim-sidebar-width)`, `flex-shrink: 0` |
| `sidebar-main` | `<main>` or `<div>` | The main content area. Takes remaining inline-size. | `flex: 1`, `min-inline-size: 0` |

### Conditional slots

(none)

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens |
|--------------|--------|------------------------------|-------------------|
| `data-side` | `left` (default) / `right` | — | Uses logical properties; RTL flips naturally |
| `data-width` | `narrow` (200px) / `standard` (280px, default) / `wide` (360px) | — | `--prim-sidebar-width` |
| `data-threshold` | `narrow` (40em) / `standard` (60em, default) / `wide` (80em) | — | Container width below which layout stacks |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| (none) | — | — | Foundational primitive. |

## Markup

```html
<div data-pattern="sidebar-container" data-side="left" data-width="standard" data-threshold="standard">
  <aside data-pattern="sidebar-aside" aria-label="Documentation">
    <!-- doc tree / TOC / settings menu -->
  </aside>
  <main data-pattern="sidebar-main">
    <!-- article body / form / dashboard content -->
  </main>
</div>
```

## Composition

- **Docs page** — `prim-sidebar > sidebar-aside ((toc + nav-docs)) + sidebar-main ((prose-body + prose-aside))`.
- **Settings page** — `prim-sidebar > sidebar-aside ((nav-settings)) + sidebar-main ((form-fields))`.
- **Dashboard** — `prim-sidebar > sidebar-aside ((nav-app-chrome)) + sidebar-main ((data-table))`.
- **Sidebar contents** — `<prim-sidebar-aside><prim-stack data-gap="sm">nav items</prim-stack></prim-sidebar-aside>`.

## ARIA

- `sidebar-container` is structural — no role.
- `sidebar-aside` uses `<aside>` (implicit `role="complementary"`). Operators add `aria-label` for context.
- `sidebar-main` uses `<main>` (one per page). When prim-sidebar is composed inside a larger landmark that already has `<main>`, switch to `<div>` or `<article>`.

## Browser support

CSS container queries are **Baseline 2024**. Modern evergreen browsers all support container queries. Older browsers (Safari ≤15, Firefox ≤109, Chrome ≤104) degrade gracefully to the stacked layout — usable, just not container-responsive.

## License

MIT.
