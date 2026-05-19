# @quoin/pattern-nav-docs

**P1 docs-site navigation pattern.** Top-bar (logo + Cmd+K search + version selector + theme switcher + GitHub link) combined with a collapsible left sidebar (docs tree). The Quoin Docs / Stripe Docs / Vercel Docs / Linear Docs convention. Ten primitives.

**WCAG 2.4.1 skip-to-content link is part of the hard contract** — visually hidden until focused, first focusable element in the tree.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | `nav-docs-meta-actions` (theme, GitHub, version) · `nav-docs-mobile-toggle` | All top-bar utility buttons. All 8 microstates inherited. |
| `<modal-dialog variant="command">` (soft dep) | `@quoin/pattern-modal-dialog` | `^1.0.0` | Cmd+K search palette | The search trigger opens a command palette dialog. Soft composition — the search trigger advertises via `aria-haspopup="dialog"`; the palette is host-mounted, not bundled. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Typography / spacing / borders / motion / focus-ring. CSS Grid for sidebar layout. |

---

## What this pattern adds

Ten primitives:

- **`<nav-docs-section>`** — top-level grid wrapper. 2 registers × 3 sidebar widths × 4 states.
- **`<nav-docs-topbar>`** — top horizontal bar. Sticky.
- **`<nav-docs-brand>`** — wordmark + subtitle ("Quoin Docs").
- **`<nav-docs-search>`** — Cmd+K palette trigger.
- **`<nav-docs-meta-actions>`** — version selector, theme switcher, GitHub link cluster.
- **`<nav-docs-sidebar>`** — left sidebar with `role="navigation"` + `aria-label="Documentation"`. Sticky-to-viewport.
- **`<nav-docs-sidebar-section>`** — collapsible category with heading-as-button + `aria-expanded`.
- **`<nav-docs-sidebar-link>`** — single doc link. `aria-current="page"` for active. Optional NEW/BETA/DEPRECATED badge.
- **`<nav-docs-mobile-toggle>`** — hamburger button for mobile drawer.
- **`<nav-docs-skip-link>`** — **REQUIRED** WCAG 2.4.1 bypass link. First focusable element.

## Reference lineage

| Aspect | Source |
|---|---|
| Top-bar + sidebar docs layout | Stripe Docs, Vercel Docs, Linear Docs, MDN, web.dev |
| Cmd+K palette in docs | Algolia DocSearch, Vercel docs, Stripe docs |
| Version selector dropdown | React docs, Tailwind docs, Vercel docs |
| Tri-state theme switcher | Apple HIG, web.dev recommended pattern |
| Skip-to-content link visually-hidden-until-focus | WAI-ARIA Authoring Practices 1.3, WebAIM |
| `aria-current="page"` on active link | WCAG 4.1.2, WAI-ARIA 1.3 |
| Mobile sidebar drawer with focus trap | Material Design, WAI-ARIA APG Modal Dialog |
| Collapsible sidebar sections with `aria-expanded` | WAI-ARIA APG Disclosure pattern |

## Tokens consumed

Canonical only:

- **Colour**: `--surface`, `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis`, `--text-recede`, `--accent`, `--accent-hover`, `--accent-recede`, `--text-on-accent`, `--success` (NEW badge), `--critical` (DEPRECATED badge), `--border`, `--border-emphasis`, `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / pill`, `--border-width-sm / md`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display`, `--font-mono`, `--type-size-xs / sm / md / lg`, `--font-weight-medium / semibold`, `--leading-tight`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`. Sidebar drawer slide collapses under reduced-motion.

## Registers × states

### Registers

| Register | Use |
|---|---|
| `with-sidebar` | Top-bar + sidebar. The 80% choice. |
| `topbar-only` | Top-bar only. Used on docs landing pages. |

### States

| State | DOM signal | Meaning |
|---|---|---|
| `default` | (no modifier) | Sidebar expanded, top-bar visible. |
| `sidebar-collapsed` | `[data-state="sidebar-collapsed"]` | Sidebar collapsed to icon column. |
| `mobile-drawer-open` | `[data-state="mobile-drawer-open"]` | Mobile breakpoint: sidebar slides in as overlay. aria-modal + focus trap. |
| `search-open` | `[data-state="search-open"]` | Cmd+K palette open. Sidebar inert. |

## Templates that consume this pattern

- `template-docs-pro` — docs root layout (with-sidebar default)
- `template-docs-pro` index page (topbar-only)
- `template-marketing` /docs subpath — same pattern as docs-pro for unified UX

## Use

```html
<div data-pattern="nav-docs-section" register="with-sidebar">
  <a data-pattern="nav-docs-skip-link" href="#main">Skip to main content</a>

  <nav data-pattern="nav-docs-topbar" aria-label="Top">
    <nav-docs-mobile-toggle aria-controls="docs-sidebar" aria-label="Open documentation menu" />
    <nav-docs-brand href="/" aria-label="Quoin home">Quoin <span class="subtitle">Docs</span></nav-docs-brand>
    <nav-docs-search aria-keyshortcuts="Meta+K Control+K" aria-haspopup="dialog">
      <icon name="search" />
      <span>Search docs…</span>
      <kbd>⌘K</kbd>
    </nav-docs-search>
    <div class="spacer"></div>
    <nav-docs-meta-actions role="group" aria-label="Documentation actions">
      <action-button intent="ghost" aria-haspopup="listbox" aria-expanded="false">v1.0</action-button>
      <action-button intent="ghost" aria-label="Theme: auto" aria-pressed="false"><icon name="theme" /></action-button>
      <action-button intent="ghost" as="a" href="https://github.com/harrowhaus/quoin" rel="noopener noreferrer" aria-label="Quoin on GitHub"><icon name="github" /></action-button>
    </nav-docs-meta-actions>
  </nav>

  <nav data-pattern="nav-docs-sidebar" id="docs-sidebar" role="navigation" aria-label="Documentation">
    <nav-docs-sidebar-section data-expanded="true">
      <h3><button aria-expanded="true" aria-controls="getting-started-list">Getting started <icon name="chevron-down" class="chevron" /></button></h3>
      <ul id="getting-started-list">
        <li><nav-docs-sidebar-link href="/docs">Introduction</nav-docs-sidebar-link></li>
        <li><nav-docs-sidebar-link href="/docs/install">Install</nav-docs-sidebar-link></li>
        <li><nav-docs-sidebar-link href="/docs/first-pack" aria-current="page">Build your first pack</nav-docs-sidebar-link></li>
      </ul>
    </nav-docs-sidebar-section>
    <!-- more sections -->
  </nav>

  <main id="main">
    <!-- docs content -->
  </main>
</div>
```

## Specimen

Open `examples/index.html` in a browser. Includes:

- **Canonical with-sidebar Quoin Docs** — full top-bar + 4-section sidebar with active page highlighted, version selector, theme switcher, GitHub link, working collapsible sections, NEW + BETA badges on appropriate links
- **State: sidebar-collapsed** — icon-only sidebar column for content-priority layouts
- **Register: topbar-only** — docs landing page layout, no sidebar
- **Composition lineage table** with soft-composition note for modal-dialog
- **13-item accessibility checklist** covering WCAG 2.4.1 skip-link discipline, 2.4.6 nav landmarks, 4.1.2 aria-current/aria-expanded, search ARIA, mobile toggle state-aware label, mobile drawer focus trap, external link rel attributes, depth indicators, collapsible sections, badge labels, theme switcher tri-state, focus styles, reduced-motion

## License

MIT.
