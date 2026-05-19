# @quoin/pattern-nav-app-chrome

**P0 in-app shell nav.** The Linear / Notion / Figma top-of-app chrome reframed as token-driven primitives. Nine primitives covering workspace identity, breadcrumb wayfinding, Cmd+K palette trigger, page action cluster, notifications, user menu, optional page-tabs subnav, and a status banner for degraded service.

This pattern is the **product-side counterpart** to `@quoin/pattern-nav-marketing`. Marketing nav is for the unauthenticated-visitor surface; app-chrome is for the authenticated-user shell.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | action-cluster ghost rows · notification bell · workspace-switcher popover rows · user-menu popover rows | The most common in-chrome button — every de-escalated action and every popover row uses the ghost intent. Inherits all 8 microstates. |
| `<action-button intent="secondary">` | `@quoin/pattern-button-system` | `^1.0.0` | action-cluster "Share" / "Filter" etc. | Medium-intent page actions. |
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | action-cluster "Publish" / "New" | The highest-intent action; rightmost slot in the action cluster. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Surfaces / typography / borders / motion / shadows / focus-ring. Chrome aesthetic flips with aesthetic-pack swaps; structure is invariant. |

---

## What this pattern adds

Nine primitives unique to this pack:

- **`<nav-app-chrome>`** — top-level `<header role="banner">`. 3 variants (standard / with-subnav / condensed) × 5 pattern states (default / search-open / menu-open / notifications-open / offline).
- **`<app-workspace-switcher>`** — left-anchored workspace identity + switcher popover. Plan badge optional.
- **`<app-breadcrumb>`** — middle path indicator with truncation when path exceeds max-segments.
- **`<app-global-search>`** — Cmd+K palette trigger with keyboard shortcut hint pill + `aria-keyshortcuts` + `aria-haspopup="dialog"`.
- **`<app-action-cluster>`** — right-of-search page action group. 3 registers (compact / default / extended).
- **`<app-notification-bell>`** — bell with unread-count badge; count-aware aria-label.
- **`<app-user-menu>`** — avatar with popover (profile, settings, theme, shortcuts, log out).
- **`<app-page-tabs>`** — optional secondary nav row. 3 registers (underline / pill / boxed).
- **`<app-status-banner>`** — top-anchored degraded-state banner. 3 tones (info / warning / critical).

## Reference lineage

| Aspect | Source |
|---|---|
| Workspace switcher in top-left + breadcrumb middle + action cluster right | Linear, Notion, Figma, Slack |
| Cmd+K palette trigger with keyboard hint pill | Linear, Vercel, Raycast, Notion |
| Notification bell with unread badge | GitHub, Linear, Notion, Slack |
| Avatar user menu in top-right | Universal SaaS pattern |
| Page tabs subnav (Overview / Activity / Settings) | GitHub repo tabs, Linear project tabs, Notion page tabs |
| Offline status banner across the top | Linear offline mode, Notion offline mode, Figma offline mode |
| `aria-keyshortcuts` advertising Cmd+K binding to AT | WAI-ARIA 1.3 spec |
| `aria-haspopup="dialog"` for command palette (not "menu") | WAI-ARIA Authoring Practices — Modal Dialog pattern |
| `aria-current="page"` for breadcrumb final segment + active page tab | WCAG 4.1.2 |

## Tokens consumed

Canonical only:

- **Colour**: `--surface` (chrome ground), `--surface-elevated` (popovers, hover), `--surface-recessed` (kbd pill, page-tabs boxed register), `--text`, `--text-emphasis` (workspace name, current page, breadcrumb tail), `--text-recede` (placeholders, breadcrumb non-current), `--text-disabled`, `--accent` (current-tab underline, primary CTA, logo ground, workspace logo), `--accent-recede` (info banner, avatar ground), `--accent-hover`, `--success` (status dot online), `--warning`, `--critical` (notification badge, offline banner), `--border`, `--border-emphasis`, `--focus-ring`, `--text-on-accent`
- **Dimension**: `--space-1 / 2 / 3 / card`, `--radius-sm / card`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-sans` (everything except workspace name and avatar initials), `--font-display` (workspace name, avatar initials, workspace logo letter), `--font-mono` (kbd pill), `--type-size-xs / sm / md`, `--font-weight-medium / semibold / bold`, `--tracking-tight / wide`
- **Motion**: `--motion-fast` (chevron rotate), `--motion-normal`, `--ease-standard`, `--transition-default`
- **Shadow**: `--shadow-md` (popovers)

## Variants × content matrix

| Variant | Workspace switcher | Breadcrumb | Cmd+K | Action cluster | Notifications | User menu | Page tabs | Typical use |
|---|---|---|---|---|---|---|---|---|
| `standard` | ✓ | ✓ | ✓ | ✓ default | ✓ | ✓ | — | Most app pages |
| `with-subnav` | ✓ | ✓ | ✓ | ✓ default | ✓ | ✓ | ✓ | Project / doc / settings pages with sub-sections |
| `condensed` | logo-only | — | — | compact | — | ✓ | — | Fullscreen-editor focus mode |

## States × microstates

### Pattern states

| State | DOM signal | Meaning |
|---|---|---|
| `default` | (no modifier) | Idle. |
| `search-open` | trigger's `aria-expanded="true"` | Cmd+K palette dialog is open. |
| `menu-open` | trigger's `aria-expanded="true"` | Workspace switcher / user menu / page-actions popover is open. |
| `notifications-open` | bell's `aria-expanded="true"` | Notifications popover is open. |
| `offline` | `[data-state="offline"]` | Connection lost. Sync-dependent actions disabled with explanatory aria-labels. Status banner renders. |

### Microstates (shared across all interactive elements)

| Microstate | DOM signal | ARIA |
|---|---|---|
| `default` | (no modifier) | — |
| `hover` | `:hover` | — |
| `active` | `:active` | — |
| `focus` | `:focus` | — |
| `focus-visible` | `:focus-visible` | — |
| `disabled` | `[aria-disabled=true]` | `aria-disabled="true"` |
| `loading` | `[aria-busy=true]` | `aria-busy="true"` |
| `current` | `[aria-current="page"]` (page tabs, breadcrumb) OR `[aria-expanded="true"]` (popover triggers) | varies |

## Templates that consume this pattern

- `template-app-tracker` — uses `variant=with-subnav` on item pages, `variant=standard` elsewhere
- `template-app-creator-studio` — uses `variant=condensed` in editor, `variant=standard` in gallery
- `template-saas-pro` — in-app surfaces use `variant=standard`; marketing pages use `pattern-nav-marketing` instead
- `template-docs-pro` — does NOT use this pattern; uses `pattern-nav-marketing` in compact variant + a sidebar nav

## Use

```html
<header data-pattern="nav-app-chrome" variant="standard" role="banner">
  <!-- optional status banner -->

  <nav aria-label="App shell">
    <app-workspace-switcher aria-haspopup="true" aria-expanded="false" aria-controls="ws-popover">
      <span class="logo">G</span>
      <span class="name">Elena's Galley</span>
      <span class="plan-badge">Pro</span>
      <icon name="chevron-down" />
    </app-workspace-switcher>

    <app-breadcrumb aria-label="Breadcrumb">
      <ol>
        <li><a href="/notes">Notes</a></li>
        <li class="separator" aria-hidden="true">/</li>
        <li><span aria-current="page">Phase Pattern Packs</span></li>
      </ol>
    </app-breadcrumb>

    <div class="spacer"></div>

    <app-global-search
      aria-keyshortcuts="Meta+K Control+K"
      aria-expanded="false"
      aria-haspopup="dialog"
      aria-label="Search; press Command K"
    >
      <icon name="search" />
      <span class="placeholder">Search…</span>
      <kbd>⌘K</kbd>
    </app-global-search>

    <app-action-cluster role="group" aria-label="Page actions">
      <action-button intent="ghost">New</action-button>
      <action-button intent="secondary">Share</action-button>
    </app-action-cluster>

    <app-notification-bell
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="Notifications, 3 unread"
    >
      <icon name="bell" />
      <span class="badge" aria-hidden="true">3</span>
    </app-notification-bell>

    <app-user-menu
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="Account menu — Elena Park"
    >
      <span class="avatar">EP</span>
    </app-user-menu>
  </nav>

  <!-- optional page tabs (with-subnav variant only) -->
  <app-page-tabs register="underline" aria-label="Page sections">
    <ul>
      <li><a href="/page/overview" aria-current="page">Overview</a></li>
      <li><a href="/page/activity">Activity</a></li>
      <li><a href="/page/settings">Settings</a></li>
    </ul>
  </app-page-tabs>
</header>
```

## Specimen

Open `examples/index.html` in a browser to render every variant + every state. The specimen includes:

- **All 3 variants** (standard / with-subnav / condensed) with full GALLEY in-app content (Elena's Galley workspace, real breadcrumb paths, GALLEY-themed notification copy)
- **Offline state** with the critical-tone status banner and disabled sync-dependent actions
- **All 3 popovers open** — workspace switcher with 3 workspaces + Pro/Free/Team badges, notifications with 4 entries (3 unread), user menu with profile + settings + theme + shortcuts + log out
- **page-tabs in all 3 registers** (underline / pill / boxed) for the same 5-tab content
- **status-banner in all 3 tones** (info / warning / critical)
- **Microstate matrix** for both the workspace switcher and the page tab — covering default / hover / aria-expanded / aria-current / focus-visible / disabled
- **Composition lineage table** documenting which sibling primitives are consumed where
- **Accessibility checklist** covering banner+nav landmarks, ARIA popover patterns, count-aware aria-labels, Cmd+K shortcut advertising, offline-state handling, focus management

## License

MIT.
