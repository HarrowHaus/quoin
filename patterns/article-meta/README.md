# @quoin/pattern-article-meta

Article meta strip. Author, date, reading-time + conditional category, tag-list, share-actions. Reading time is build-time, never runtime.

**Shipped:** Session 5 Track C · 2026-05-21.

## Anatomy

| Slot | Element | Required | Notes |
|------|---------|----------|-------|
| `meta-container` | `<div>` | yes | Sets density + position variants |
| `article-meta-author` | `<div>` | yes | Author cluster; optional avatar inside |
| `article-meta-avatar` | `<img>` | conditional | Inside author; lazy-loaded |
| `article-meta-date` | `<time>` | yes | `datetime` attribute is required ISO-8601 |
| `article-meta-reading-time` | `<span>` | yes | `data-minutes` attribute carries the count |
| `article-meta-category` | `<a>` | conditional | Single category link with `rel="category"` |
| `article-meta-tag-list` | `<ul>` | conditional | Composes `prim-label` for each tag |
| `article-meta-share-actions` | `<div>` | conditional | `role="group"` + `aria-label="Share article"` |

## Variants

| Axis | Values | Default |
|------|--------|---------|
| `density` | `compact` / `default` / `expanded` | `default` |
| `position` | `top` / `bottom` / `both` | `top` |

## Reading time — build time only

Reading time MUST be computed at **build time** from the article's word count, using an operator-chosen words-per-minute baseline (common defaults: 238 wpm general, 180 wpm technical). The result is rendered into the HTML at build time.

Runtime computation in the browser is **forbidden** because:
- It adds JS for no semantic benefit.
- It risks drift between the server-rendered and client-rendered values.
- It complicates SSR / hydration boundaries.

The `data-minutes` attribute carries the machine-readable count; the inner text is the human-readable label.

## ARIA contract

- **author-name** — anchor with `rel="author"`.
- **date** — `<time datetime="ISO-8601">`. Datetime attribute required.
- **category** — anchor with `rel="category"`.
- **tag-list** — `<ul aria-label="Tags">`. Each tag wraps a `prim-label` instance.
- **share-actions** — `<div role="group" aria-label="Share article">`.

## Composition

`@quoin/prim-label` is declared as an `optionalPeerPack` — it is required only when `article-meta-tag-list` is rendered. The `tag` variant of prim-label is the canonical tag-chip rendering for this pack.

For consumers who never render `tag-list`, prim-label is not pulled in.

## What's not in v1.0

- Share-count badges. Require third-party APIs + add tracking; operators who want them extend the slot.
- Multi-author bylines beyond a single visible author. v1.0 ships single-author; co-author conventions ("with X and Y") render as comma-separated text inside `author-name`.

## License

MIT.
