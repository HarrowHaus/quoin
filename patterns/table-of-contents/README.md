# @quoin/pattern-table-of-contents

Table of contents for long-form articles or docs. IntersectionObserver-driven active-section detection. Composes `prim-sequence`.

**Shipped:** Session 5 Track C · 2026-05-21.

## Anatomy

| Slot | Element | Required | Notes |
|------|---------|----------|-------|
| `toc-container` | `<nav>` | yes | Sets variants; declares `aria-label="Table of contents"` |
| `toc-list` | `<ol>` | yes | Composed via `prim-sequence` ordered-list variant |
| `toc-item` | `<li>` | yes | Wraps anchor link to heading id |
| `active-indicator` | (styling) | yes | Applied to `toc-item[data-current="true"]`; no separate DOM |
| `toc-scroll-tracker` | `<div>` | conditional | Decorative progress visualization. `aria-hidden="true"` |
| `toc-collapse-toggle` | `<button>` | conditional | Present when `data-collapsible="true"` |

## Variants

| Axis | Values | Default |
|------|--------|---------|
| `position` | `sticky-side` / `inline-top` / `floating-overlay` | `sticky-side` |
| `depth` | `h1-h2` / `h1-h3` / `h1-h6` | `h1-h3` |
| `collapsible` | `true` / `false` | `false` |

## Active-section detection

The pack ships an IntersectionObserver enhancement that watches every heading element within the prose container. When a heading enters the top 30% of the viewport (`rootMargin: '0px 0px -70% 0px'`), the corresponding `toc-item` gets `data-current="true"` and its inner link gets `aria-current="location"`.

The CSS reads from these attributes — there is no JS-driven inline styling. Operators who prefer no JS can rely on plain anchor-jump behavior; the active indicator simply never updates.

## ARIA contract

- **toc-container** — `<nav aria-label="Table of contents">`. One per page; multiple TOCs need disambiguating labels.
- **toc-item current state** — `aria-current="location"` (NOT `aria-current="page"`; that's reserved for page-level navigation).
- **toc-collapse-toggle** — `aria-expanded` reflects state; `aria-controls` references the toc-list id.
- **toc-scroll-tracker** — always `aria-hidden="true"`.

## Composition

This pack consumes `@quoin/prim-sequence` (ordered-list variant) for the list rendering. The `toc-list` slot does NOT inline its own ordered-list semantics — it delegates to prim-sequence. This keeps the list-rendering contract in one place across all consuming patterns.

## What's not in v1.0

- Scroll-progress percentage as a semantic attribute (`aria-valuenow`-style). v1.0 ships the scroll-tracker as decorative only.
- TOC generation from headings via build-time script. v1.0 ships the markup contract; build-time generators are a separate tooling concern.

## License

MIT.
