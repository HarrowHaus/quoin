# @quoin/prim-stack

Layout primitive — **vertical stack of children with consistent gap between them**. Universal foundation for any vertical content composition.

**Shipped:** Phase 22.6 · 2026-05-21.

## Concern boundary

`prim-stack` owns one concern only: vertical spacing rhythm. It does NOT own typography, color, surface, or interaction. Aesthetic packs may override `--space-*` tokens; the primitive itself carries no aesthetic.

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| `stack-container` | `<div>` | The flex column; sets the gap between children. | `--prim-stack-gap` (defaults to `--space-3`) |

### Conditional slots

| Slot | Gated by | Role | Tokens |
|------|----------|------|--------|
| `stack-separator` | operator opt-in | `<hr>` between children for visible breaks | `--border`, `--border-recede`, `--border-emphasis`, `--border-width-sm/md` |

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens |
|--------------|--------|------------------------------|-------------------|
| `data-gap` | `xs` / `sm` / `md` (default) / `lg` / `xl` | — | maps to `--space-1` / `--space-2` / `--space-3` / `--space-card` / `--space-section` |
| `data-align` | `start` / `center` / `end` / `stretch` (default) | — | `align-items` CSS value |
| `data-recursive` | `true` / `false` (default) | — | applies stack rule to all descendants |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| (none) | — | — | Foundational primitive; consumes only tokens. |

## Markup

```html
<div data-pattern="stack-container" data-gap="md">
  <h2>Heading</h2>
  <p>Paragraph.</p>
  <p>Another paragraph.</p>
</div>
```

With a separator:

```html
<div data-pattern="stack-container" data-gap="lg">
  <section>Group A</section>
  <hr data-pattern="stack-separator" data-weight="default" />
  <section>Group B</section>
</div>
```

## Composition

`prim-stack` is designed to nest:

- **Inside `prim-center`** — vertically space content within a max-width centered container.
- **Inside `prim-sidebar`'s `sidebar-aside` slot** — stack sidebar navigation items.
- **Inside `prim-grid` cells** — each cell becomes its own internal stack.
- **Around a `prim-cluster`** — stack of clusters (e.g., a column of action bars).
- **Inside any pattern** — `pattern-prose-body`, `pattern-prose-aside`, `pattern-footnote`, etc. (Session 6 editorial patterns compose stack throughout.)

## ARIA

`stack-container` is purely structural — no `role`, no `aria-label`. Wrap a stack in a semantic landmark (`<section>`, `<article>`, `<aside>`) when one is needed. The stack is the layout; the parent is the semantics.

`stack-separator` renders as `<hr>` — already conveys separator semantics. No role override needed.

## Browser support

Plain flexbox with `gap`. Universal Baseline support since 2021.

## License

MIT.
