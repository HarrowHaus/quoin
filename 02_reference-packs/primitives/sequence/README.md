# @quoin/prim-sequence

Sequence primitive — ordered/contextual list of items with separator + position-semantic state. 4 variants (`breadcrumb` / `ordered-list` / `unordered-list` / `sidebar-vertical`).

**Shipped:** Phase 22 / Consolidation 6 / 2026-05-20. Consolidates inlined breadcrumb + sidebar-list contracts in nav (app-chrome + docs variants).

## Anatomy (v3.G.18)

| Slot | Element | Role | Key tokens |
|---|---|---|---|
| `sequence` | `<ol>` (ordered-list) / `<ul>` (unordered-list / sidebar-vertical) / `<nav>` (breadcrumb wrapper) | Container | `--text-recede`, `--text-emphasis`, `--accent-hover`, `--type-size-sm`, `--space-2` |

### Universal attributes

| Attribute | Values | Default |
|---|---|---|
| `data-role` | `breadcrumb` / `ordered-list` / `unordered-list` / `sidebar-vertical` | `unordered-list` |
| `data-separator` | `chevron` / `slash` / `dot` / `pipe` / `number` / `none` | `chevron` (role-dependent default) |
| `data-size` | `sm` / `md` | `md` |

### Consumed by (reverse lineage per D.82)

| Consumer | Used as | Phase |
|---|---|---|
| `@quoin/pattern-nav` (app-chrome variant) | `class="sequence"` on `nav-breadcrumb` element — Home / Project / Subsection trail | Phase 22 Cons. 6 / 2026-05-20 |
| `@quoin/pattern-nav` (docs variant) | `class="sequence"` on `nav-sidebar-section` containers — collapsible docs sections | Phase 22 Cons. 6 / 2026-05-20 |

## Minimal markup

```html
<!-- Breadcrumb -->
<nav aria-label="Breadcrumb">
  <ol class="sequence" data-role="breadcrumb" data-separator="chevron">
    <li><a href="/">Home</a></li>
    <li><a href="/project-x">Project X</a></li>
    <li aria-current="page">Settings</li>
  </ol>
</nav>

<!-- Sidebar vertical -->
<nav aria-label="Documentation sections">
  <ul class="sequence" data-role="sidebar-vertical" data-separator="none">
    <li><a href="/intro" aria-current="page">Introduction</a></li>
    <li><a href="/setup">Setup</a></li>
  </ul>
</nav>
```

## Cross-references

- Audit: [`02_reference-packs/CONSOLIDATION-6-AUDIT.md`](../../CONSOLIDATION-6-AUDIT.md)
- Report: [`02_reference-packs/CONSOLIDATION-6-REPORT.md`](../../CONSOLIDATION-6-REPORT.md)
