# Consolidation 4 Audit — Nav variants

**Phase 22 / Unification Audit · Consolidation 4**
**Status: Audit phase complete; mechanically translated to proposal per Cons. 3 template (Session 2 extended-run authorization). No novel architectural questions surfaced.**
**Author: Claude Code (Opus 4.7) · 2026-05-20**

---

## 1. Scope

Per the unification dossier §2.1 #2 + Session 2 brief A.1: collapse the 4 parallel nav packs into a single `@quoin/pattern-nav` with 4 variants.

The 4 specimens audited:
- `pattern-nav-marketing` (1061 lines)
- `pattern-nav-app-chrome` (1129 lines)
- `pattern-nav-docs` (623 lines)
- `pattern-nav-editorial` (519 lines)

## 2. Halt-condition check (hard-halt #1)

The brief flagged 4 conditions that would trigger architectural halt:

| Condition | Status |
|---|---|
| Keyboard nav contract divergence requiring new primitive | ✓ No — all 4 use the same focus-visible ring tokens + `aria-current="page"` for active state |
| Mobile menu pattern divergence requiring new interaction primitive | ✓ No — all 4 use attribute-state toggles (`data-state="menu-open"`, `aria-expanded`); no separate drawer primitive needed beyond the existing modal-dialog (for app-chrome mobile drawer) |
| Sub-nav structure requiring popover/floating-element primitive | ✓ No — nav-marketing's mega-menu uses inline `[data-pattern="nav-dropdown-panel"][data-open="true \| false"]`; CSS Anchor Positioning could enhance it later but isn't required for the consolidation |
| Search integration requiring search-input primitive | ✓ No — nav-docs and nav-app-chrome use a `<button>` that opens modal-dialog (Cmd-K palette); nav-editorial uses an expandable inline `<input>` that composes form-fields |

**No hard halt fires.** Consolidation proceeds mechanically per Cons. 3's Q1–Q8 cascade.

## 3. Slot taxonomy across the 4 specimens

### 3.1 Mandatory slots (present in 4/4)

| Slot | Element | Role |
|---|---|---|
| `nav-section` | `<header role="banner">` (when site-top) or `<nav>` (when secondary) | Outer container; carries `data-variant`, `data-alignment` |
| `nav-brand` | `<a>` | Wordmark / logo / brand link to home |

### 3.2 Conditional slots (gated by variant)

| Slot | Variants | Element | Role |
|---|---|---|---|
| `nav-primary-links` | marketing, app-chrome | `<nav><ul>` | Primary navigation items list |
| `nav-item` | marketing, app-chrome, editorial (sections) | `<a>` inside `<li>` | Single nav link with `aria-current` support |
| `nav-dropdown-panel` | marketing (mega-menu) | `<div>` | Floating panel for dropdown / mega-menu content |
| `nav-secondary-actions` | marketing, app-chrome | `<div>` | Action cluster (theme toggle + primary CTA + avatar trigger) |
| `nav-mobile-toggle` | marketing, app-chrome | `<button>` | Hamburger trigger for mobile menu |
| `nav-workspace-switcher` | app-chrome only | `<button>` | App-shell workspace selector |
| `nav-search` | app-chrome, docs | `<button>` | Command palette trigger (opens modal-dialog) |
| `nav-search-inline` | editorial | `<form role="search">` | Expandable inline search input (composes form-fields) |
| `nav-avatar` | app-chrome | `<button>` | User menu trigger |
| `nav-skip-link` | docs (WCAG 2.4.1) | `<a class="sr-only-focusable">` | Skip-to-content link |
| `nav-topbar` | docs | `<header>` | Sticky topbar with brand + search + meta |
| `nav-sidebar` | docs | `<aside>` | Documentation sidebar with sections |
| `nav-sidebar-section` | docs | `<div>` | One collapsible section in the sidebar |
| `nav-meta-actions` | docs | `<div>` | Version switcher + theme toggle + GitHub link |
| `nav-utility` | editorial | `<div>` | Utility row above masthead (date, login, subscribe link) |
| `nav-masthead` | editorial | `<div>` | Large display wordmark below utility row |
| `nav-sections` | editorial | `<nav>` | Section links row (Politics / Tech / Arts / etc.) |
| `nav-subscribe-cta` | editorial | `<a class="action-button">` | Subscribe pill (composes button-system) |
| `nav-subnav` | app-chrome (with-subnav variant) | `<nav>` | Second-tier nav row below primary |

Total: 2 mandatory + 17 conditional. The conditional count is high because nav is anatomically more diverse than hero — masthead vs sidebar vs workspace-switcher are fundamentally different structural elements, not aesthetic flavors of the same anatomy.

### 3.3 Naming-prefix problem (the duplication cost — same as Cons. 3 hero finding)

Every variant prefixes its primitives differently:

| Variant | Section primitive |
|---|---|
| marketing | `data-pattern="nav-marketing"` |
| app-chrome | `data-pattern="nav-app-chrome"` |
| docs | `data-pattern="nav-docs-section"` |
| editorial | `data-pattern="nav-editorial-section"` |

Sub-slot prefixes vary too: `nav-brand` (marketing) vs `nav-docs-brand` (docs) vs `nav-editorial-masthead` (editorial). CSS selectors targeting one don't match the others. Cons. 4 collapses all to canonical `nav-<slot>` form per v3.G.15.

## 4. Verdict on the dossier's premise

Dossier §2.1 #2: "Nav variants — multiple parallel `pattern.nav.*` packs. Shared: nav-root, brand-mark, primary-links, secondary-actions, mobile-toggle, mobile-drawer. Variants are layout + aesthetic."

**Mostly correct, with one nuance.** The dossier assumed 6 shared slots (root, brand-mark, primary-links, secondary-actions, mobile-toggle, mobile-drawer). The actual audit found only 2 truly mandatory slots (`nav-section` + `nav-brand`); the other 4 dossier-listed "shared" slots are present in only 2 of the 4 variants (marketing + app-chrome).

This doesn't change the consolidation direction — it just means the unified pack has more conditional slots than hero. Each variant activates its subset.

## 5. Proposal direction (mechanically applied from Cons. 3 template)

- Single `@quoin/pattern-nav` with `data-variant="marketing | app-chrome | docs | editorial"`.
- 2 mandatory + 17 conditional slots; conditional slots gated by `data-variant` (some appear in multiple variants).
- Universal attribute: `data-alignment` (where alignment makes sense — marketing, app-chrome; not applicable to docs sidebar or editorial masthead which have intrinsic layout).
- Variant-specific attributes: `data-sidebar-width` (docs only), `data-weight` (editorial only — `default | heavy` for masthead weight), `data-variant` on dropdown-panel (simple / mega), `data-state` on section (`default | scrolled | menu-open`).
- Real composition: nav-subscribe-cta uses `class="action-button"` from button-system. Nav-search-inline composes form-fields' input primitive.
- `data-register` deprecated (per v3.G.16); use `data-variant` (top-level), `data-kind` (sub-slot kinds), or typed attribute (`data-sidebar-width`, `data-weight`).

Mechanically per Cons. 3 Q1–Q8. No new operator decisions required.

## 6. Stop condition

Audit phase complete. Mechanically translates to proposal (per Session 2 extended-run authorization: proposal phase does not halt for review). Implementation proceeds in the same session.
