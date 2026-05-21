# @quoin/pattern-nav

Unified nav pattern — 4 variants (`marketing` / `app-chrome` / `docs` / `editorial`) × 2 mandatory + 17 conditional slots.

**Shipped:** Phase 22 / Consolidation 4 / 2026-05-20. Consolidates the 4 prior parallel nav packs (nav-marketing, nav-app-chrome, nav-docs, nav-editorial).

---

## Why this pack exists

Before Cons. 4, Quoin shipped 4 separate nav packs. The audit (`02_reference-packs/CONSOLIDATION-4-AUDIT.md`) confirmed that all 4 share core anatomy (section + brand) but diverge substantially in variant-specific structure (masthead vs sidebar vs workspace-switcher). Maintaining 4 parallel packs cost the same duplication tax Cons. 3 fixed for hero: CSS selectors written against one prefix don't match the others; aesthetic packs have to style every primitive 4×.

`@quoin/pattern-nav` collapses the 4 packs into one. The variant is selected via `data-variant`. Conditional slots activate per variant. The naming-prefix problem is resolved at v3.G.15.

## Anatomy contract (v3.G.18 — structured markdown until JSON contract ships)

### Mandatory slots (2 — present in every variant)

| Slot | Element | Role | Key token references |
|---|---|---|---|
| `nav-section` | `<header role="banner">` (top-of-page) or `<nav>` (secondary) or `<div>` (docs hybrid) | Container; carries `data-variant`, `data-alignment`, `data-state` | `--surface-elevated`, `--border-default`, `--shadow-sm` |
| `nav-brand` | `<a>` | Wordmark / logo link | `--text-emphasis`, `--font-display`, `--type-size-lg`, `--font-weight-semibold`, `--tracking-tight` |

### Conditional slots (17 — gated by `data-variant`)

| Slot | Gated by | Role |
|---|---|---|
| `nav-primary-links` | `marketing`, `app-chrome` | `<ul>` primary nav items |
| `nav-item` | `marketing`, `app-chrome`, `editorial` (sections) | `<a>` single nav link; `aria-current="page"` for active |
| `nav-dropdown-panel` | `marketing` | Floating panel for dropdown/mega-menu; `data-kind="simple \| mega"` |
| `nav-secondary-actions` | `marketing`, `app-chrome` | Action cluster (theme toggle + primary CTA + avatar) |
| `nav-mobile-toggle` | `marketing`, `app-chrome` | Hamburger trigger (inline-expansion via `data-state="menu-open"`) |
| `nav-workspace-switcher` | `app-chrome` | App-shell workspace selector trigger |
| `nav-search` | `app-chrome`, `docs` | Cmd-K palette trigger (opens modal-dialog) |
| `nav-search-inline` | `editorial` | Expandable inline search input (composes form-fields) |
| `nav-avatar` | `app-chrome` | User menu trigger (composes vocab-app-shell avatar + button-system) |
| `nav-skip-link` | `docs` (WCAG 2.4.1) | Skip-to-content link |
| `nav-topbar` | `docs` | Sticky topbar with brand + search + meta |
| `nav-sidebar` | `docs` | Documentation sidebar `<aside>` |
| `nav-sidebar-section` | `docs` | Collapsible section in the sidebar |
| `nav-meta-actions` | `docs` | Version switcher + theme toggle + GitHub link |
| `nav-utility` | `editorial` | Utility row above masthead (edition date, login, subscribe link) |
| `nav-masthead` | `editorial` | Large display wordmark; `data-weight="default \| heavy"`, `data-align="centered \| left"` |
| `nav-sections` | `editorial` | Section links row (Politics / Tech / Arts / etc.) |
| `nav-subscribe-cta` | `editorial` | Subscribe pill (composes action-button) |
| `nav-subnav` | `app-chrome` (with-subnav register) | Second-tier nav row |

### Variants (4)

| Variant | Conditional slots activated | Variant-specific attributes | Notes |
|---|---|---|---|
| `marketing` | primary-links, item, dropdown-panel, secondary-actions, mobile-toggle | `data-kind` (dropdown), `data-columns` (dropdown mega) | Marketing-site top nav with mega-menu, mobile drawer, theme toggle, primary CTA |
| `app-chrome` | primary-links, workspace-switcher, search, avatar, mobile-toggle, secondary-actions, subnav | (uses universal attrs) | App top-nav with workspace switcher, Cmd-K, avatar menu |
| `docs` | topbar, search, meta-actions, sidebar, sidebar-section, skip-link | `data-sidebar-width="narrow \| default \| wide"` | Docs sidebar with sticky TOC, Cmd-K, skip-link (WCAG 2.4.1) |
| `editorial` | utility, masthead, sections, search-inline, subscribe-cta | `data-weight` (masthead), `data-align` (masthead), `data-expanded` (search-inline) | Newsroom-style nav with utility row, masthead, sections |

### Composition lineage (real, not aspirational — v3.G.17)

| Consumed primitive | Source pack | Used in | How |
|---|---|---|---|
| `action-button` | `@quoin/pattern-button-system` | `nav-subscribe-cta` (editorial), marketing's primary CTA, app-chrome's primary CTA | `<a class="action-button" data-intent="primary">` |
| `form-control` (text input) | `@quoin/pattern-form-fields` | `nav-search-inline` (editorial expanded input) | `<input>` with form-fields' styling |
| modal-dialog (Cmd-K) | `@quoin/pattern-modal-dialog` | `nav-search` trigger (app-chrome, docs) | Triggers modal open via JS; modal element is composed separately |
| Canonical tokens | `@quoin/tokens-baseline` | every CSS value | — |

## Universal attributes

| Attribute | Values | Default | Purpose |
|---|---|---|---|
| `data-variant` | `marketing` / `app-chrome` / `docs` / `editorial` | `marketing` | Selects variant; activates conditional slots |
| `data-alignment` | `centered` / `left` / `right` / `split-anchor` | `left` | Content alignment where applicable; replaces deprecated `data-register` |
| `data-state` | `default` / `scrolled` / `menu-open` / `search-open` | `default` | Section-level interaction state |

## Migration from pre-Cons.4 packs

| Before | After |
|---|---|
| `data-pattern="nav-marketing"` | `data-pattern="nav-section" data-variant="marketing"` |
| `data-pattern="nav-app-chrome"` | `data-pattern="nav-section" data-variant="app-chrome"` |
| `data-pattern="nav-docs-section"` | `data-pattern="nav-section" data-variant="docs"` |
| `data-pattern="nav-editorial-section"` | `data-pattern="nav-section" data-variant="editorial"` |
| `data-pattern="nav-{variant}-X"` (any sub-slot) | `data-pattern="nav-X"` |
| `data-register="..."` on dropdown-panel | `data-kind="simple \| mega"` |
| `data-register="..."` (editorial subscribe-cta outline) | (drop; covered by `data-intent` on button-system) |
| Local `.cta` or inlined button styles | `class="action-button" data-intent="..."` per button-system |

## Examples

- `examples/marketing.html` — marketing variant
- `examples/app-chrome.html` — app-chrome variant
- `examples/docs.html` — docs variant
- `examples/editorial.html` — editorial variant

## Cross-references

- Architecture audit: [`02_reference-packs/CONSOLIDATION-4-AUDIT.md`](../../CONSOLIDATION-4-AUDIT.md)
- Implementation proposal: [`02_reference-packs/CONSOLIDATION-4-PROPOSAL.md`](../../CONSOLIDATION-4-PROPOSAL.md)
- Implementation report: [`02_reference-packs/CONSOLIDATION-4-REPORT.md`](../../CONSOLIDATION-4-REPORT.md)
- Architectural locks: `PHASE_GATES.md` — Cons. 3 introduced v3.G.15-v3.G.20; Cons. 4 inherits.
- Consumed packs: [`@quoin/pattern-button-system`](../button-system/README.md), [`@quoin/pattern-form-fields`](../form-fields/README.md), [`@quoin/pattern-modal-dialog`](../modal-dialog/README.md)
