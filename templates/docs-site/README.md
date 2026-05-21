# @quoin/template-docs-site

Two-column docs site template: sticky TOC sidebar + main content. **Scaffold only.**

**Scaffolded:** Session 5 Track D · 2026-05-21.
**Full composition:** pending Track B closure.

## Status: scaffold

Track C shipped 2 of the 4 editorial patterns this template requires:

- ✅ `@quoin/pattern-table-of-contents` (Track C)
- ✅ `@quoin/pattern-prose-aside` (Track C)
- ⏳ `@quoin/pattern-prose-body` (Track B, queued)
- ⏳ `@quoin/pattern-code-block` (Track B, queued)

The scaffold `index.html` renders the shipped patterns directly and uses stand-in markup for `prose-body` and `code-block`. A follow-up commit will swap the stand-ins for the real patterns once Track B closes.

## Intended composition (when complete)

1. **`@quoin/pattern-nav`** — `docs` variant. Doc tree + search + version selector.
2. **`@quoin/pattern-page-header`** — `default` register. Title + breadcrumb.
3. **`@quoin/pattern-table-of-contents`** — `sticky-side` · `h1-h3`. ✅ shipped Track C.
4. **`@quoin/pattern-prose-body`** — `docs` variant. ⏳ Track B.
5. **`@quoin/pattern-code-block`** — `with-copy` variant. ⏳ Track B.
6. **`@quoin/pattern-prose-aside`** — `bordered` register. ✅ shipped Track C.
7. **`@quoin/pattern-footer-mega`** — `compact` variant.

## Customization points

| What | Where |
|------|-------|
| Sidebar doc tree structure | nav-docs sidebar |
| Search backend (Algolia DocSearch / Pagefind / custom) | nav-docs search slot |
| Doc version switcher | nav-docs primary slot |
| TOC depth (`h1-h2` / `h1-h3` / `h1-h6`) | toc `data-depth` attribute |
| Prose font, measure, leading | tokens override (once prose-body ships) |

## Recommended aesthetics

- `@quoin/aesthetic-default` (loaded by default)
- `@quoin/aesthetic-harrow-haus` — editorial typography for technical content

## Track B coordination

When Track B ships `pattern-prose-body` and `pattern-code-block`:

1. Replace `<article class="prose-stub">` with `<article data-pattern="prose-body" data-variant="docs">`.
2. Replace `<pre class="code-stub">` instances with `<pre data-pattern="code-block" data-variant="with-copy">` + the pack's full markup (language tag, copy button).
3. Bump this template's `version` from `0.1.0-scaffold` to `1.0.0`; remove `status: "scaffold"` and the `pendingDependencies` block from `quoin.template.json`.
4. Update each composition entry's `status` from `pending-track-b` to `shipped`.

## License

MIT.
