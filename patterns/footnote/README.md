# @quoin/pattern-footnote

Editorial footnote pattern. Inline trigger that reveals footnote content via four position variants.

**Shipped:** Session 5 Track C · 2026-05-21.

## Anatomy

| Slot | Element | Required | Notes |
|------|---------|----------|-------|
| `footnote` | `<span>` | yes | Container; sets the `data-position` variant |
| `footnote-trigger` | `<a>` | yes | Inline marker (anchor with href + aria-describedby) |
| `footnote-content` | `<aside>` | yes | Body content; `role="note"` for prose, `popover` attribute for popup variants |

## Variants

| Variant | Behavior |
|---------|----------|
| `sidenote-margin` | Renders content in the outer margin alongside the prose. Uses CSS Anchor Positioning (`anchor-name` on trigger, `position-anchor` on content). Tufte-style. |
| `footnote-bottom` | Classic register. Content collected at the bottom of the prose block. Trigger is a superscript link. No platform-feature dependencies. |
| `popup-on-hover` | Content rendered as a `popover`; appears on hover (and focus). Uses popover attribute + CSS Anchor Positioning. |
| `popup-on-click` | Content rendered as a `popover`; appears on click/Enter/Space, dismisses via outside-click or Esc. |

## Browser support

CSS Anchor Positioning is **Baseline January 2026** (Chrome 125+, Safari 18.2+, Firefox 128+). The `sidenote-margin`, `popup-on-hover`, and `popup-on-click` variants depend on it.

### Polyfill consumption (older browsers)

For browsers earlier than Baseline 2026, load OddBird's polyfill:

```html
<script>
  if (!CSS.supports('anchor-name', '--x')) {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/@oddbird/css-anchor-positioning';
    s.type = 'module';
    document.head.appendChild(s);
  }
</script>
```

The polyfill is loaded conditionally so modern browsers never pay the bytes. `footnote-bottom` works without any polyfill and is the recommended fallback variant for environments that cannot ship the polyfill.

## ARIA contract

- **trigger** — `aria-describedby` linking trigger to content id. Provide `aria-label="Footnote {n}"` so the marker is announced fully.
- **content** — `role="note"` for prose footnotes. Use `role="doc-footnote"` (DPub-ARIA) for formal digital publishing. Include a back-reference link with `aria-label="Back to text"`.
- **popover variants** — the `popover="auto"` attribute handles dismissal semantics; no JS focus management needed for the common case.

## Composition

Composes naturally with `@quoin/pattern-prose-body` (Track B, queued). No mandatory peer dependencies beyond `tokens-baseline` and `vocab-editorial`.

## What's not in v1.0

- Scroll-tracking semantics (footnote auto-collapses on scroll out of viewport). Would require a separate primitive; deferred.
- Numbered-list auto-collection at document end via CSS counters. The current `footnote-bottom` variant uses operator-authored ordered lists; the auto-counter primitive may land in a future minor.

## License

MIT.
