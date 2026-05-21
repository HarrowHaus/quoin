# @quoin/pattern-prose-aside

Prose aside (callout / admonition). Six semantic registers — `note` · `tip` · `warning` · `danger` · `success` · `info`. Token-driven colour mapping; aria-label per role.

**Shipped:** Session 5 Track C · 2026-05-21.

## Anatomy

| Slot | Element | Required | Notes |
|------|---------|----------|-------|
| `aside-container` | `<aside>` | yes | Sets `data-semantic` + `data-register` + `aria-label` |
| `aside-icon` | `<div>` | yes | Decorative — `aria-hidden="true"` |
| `aside-label` | `<p>` (or heading) | yes | Short title in the semantic-accent colour |
| `aside-content` | `<div>` | yes | Body flow content |

## Variants

### semantic (required)

| Value | Token mapping | ARIA label |
|-------|---------------|------------|
| `note` | `--text-recede` accent | "Note" |
| `tip` | `--success` accent | "Tip" |
| `warning` | `--warning` accent | "Warning" |
| `danger` | `--critical` accent | "Danger" |
| `success` | `--success` accent | "Success" |
| `info` | `--info` accent (or `--accent` fallback) | "Information" |

### register (visual weight)

| Value | Behavior |
|-------|----------|
| `inline` | No surface fill; vertical accent rule only. Minimal weight. |
| `bordered` | Surface fill + inline-start accent border. Default. |
| `filled` | Fully filled surface in semantic-soft colour. Higher emphasis. |

## ARIA contract

- **aside-container** — `role="note"` by default; `aria-label` per semantic (table above). For the `danger` semantic specifically, operators may opt into `role="alert"` for more prominent AT announcement — the pack does NOT auto-promote.
- **aside-icon** — `aria-hidden="true"`. The container's aria-label carries the semantic signal.
- **aside-label** — visual title (human-authored text like "Heads up", "Don't do this"). NOT duplicative with aria-label; they serve different audiences.

## Token-driven colour

Each semantic maps to baseline tokens:

- `tip` / `success` → `--success` accent, `--success-soft` surface
- `warning` → `--warning` accent, `--warning-soft` surface
- `danger` → `--critical` accent, `--critical-soft` surface
- `info` → `--info` accent (or `--accent` fallback)
- `note` → `--text-recede` accent, `--surface-elevated` surface

Aesthetic packs override these tokens — a Boeing-Watch danger looks like signal amber; a Harrow-Haus danger looks like the house signal red — without the pattern needing to know about aesthetics.

## Icon mapping (consumer responsibility)

The pack defines the colour for the icon slot but does NOT ship glyphs. Consumers wire icons from an icon pack or inline SVG. Recommended glyph mapping:

| Semantic | Icon |
|----------|------|
| `note` | info-circle |
| `tip` | lightbulb |
| `warning` | triangle-alert |
| `danger` | octagon-alert |
| `success` | check-circle |
| `info` | info-circle |

## Composition

No mandatory peer dependencies beyond `tokens-baseline` and `vocab-editorial`. Composes naturally with `@quoin/pattern-prose-body` (Track B, queued).

## License

MIT.
