# @quoin/template-blog-with-prose

Long-form blog post template. **Scaffold only.**

**Scaffolded:** Session 5 Track D · 2026-05-21.
**Full composition:** pending Track B closure.

## Status: scaffold

Track C shipped 2 of the 5 editorial patterns this template requires:

- ✅ `@quoin/pattern-article-meta` (Track C)
- ✅ `@quoin/pattern-footnote` (Track C)
- ⏳ `@quoin/pattern-prose-body` (Track B, queued)
- ⏳ `@quoin/pattern-pull-quote` (Track B, queued)
- ⏳ `@quoin/pattern-figure-with-caption` (Track B, queued)

The scaffold `index.html` renders the shipped patterns and uses stand-in markup for the three Track B patterns. A follow-up commit will swap the stand-ins for the real patterns once Track B closes.

## Intended composition (when complete)

1. **`@quoin/pattern-nav`** — `editorial` variant. Wordmark + slim primary links.
2. **`@quoin/pattern-page-header`** — `default` register. Eyebrow + article title.
3. **`@quoin/pattern-article-meta`** — `default · top`. ✅ shipped Track C.
4. **`@quoin/pattern-prose-body`** — `editorial` variant. ⏳ Track B.
5. **`@quoin/pattern-pull-quote`** — `centered` variant. ⏳ Track B.
6. **`@quoin/pattern-figure-with-caption`** — `inline` variant. ⏳ Track B.
7. **`@quoin/pattern-footnote`** — `footnote-bottom` variant. ✅ shipped Track C.
8. **`@quoin/pattern-footer-mega`** — `compact` variant.

## Customization points

| What | Where |
|------|-------|
| Post frontmatter format (Markdown / MDX / DTCG-friendly JSON) | build pipeline |
| Archive index structure (chronological / by-tag / by-author) | consumer routing |
| RSS / Atom feed generation | build script |
| Prose font, measure, leading, dropcap behavior | tokens override (once prose-body ships) |
| Words-per-minute baseline for reading-time calc | build script (article-meta consumer) |

## Recommended aesthetics

- `@quoin/aesthetic-harrow-haus` — editorial typography is the design intent of this template
- `@quoin/aesthetic-default` — neutral baseline

## Track B coordination

When Track B ships `pattern-prose-body`, `pattern-pull-quote`, and `pattern-figure-with-caption`:

1. Replace `<article class="prose-stub">` with `<article data-pattern="prose-body" data-variant="editorial">`.
2. Replace `<blockquote class="pull-quote-stub">` with `<blockquote data-pattern="pull-quote" data-variant="centered">`.
3. Replace `<figure class="figure-stub">` with `<figure data-pattern="figure-with-caption" data-variant="inline">`.
4. Bump this template's `version` from `0.1.0-scaffold` to `1.0.0`; remove `status: "scaffold"` and the `pendingDependencies` block from `quoin.template.json`.
5. Update each composition entry's `status` from `pending-track-b` to `shipped`.

## License

MIT.
