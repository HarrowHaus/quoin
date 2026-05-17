# @quoin/vocab-app-shell

Added in **Phase 5d**. Five primitives that compose into a complete
application surface — the sidebar + top-bar + content layouts that every
SaaS product, admin console, and authenticated app uses.

## Primitives

| Primitive | Role |
|-----------|------|
| `<app-shell>` | Outer page wrapper. CSS Grid with named areas for command-bar / sidebar / main. min-height: 100vh. |
| `<command-bar>` | Top bar across the whole viewport. Logo + breadcrumb / search / global actions. |
| `<sidebar-nav>` | Vertical nav rail. Grouped sections with section headings. Optional collapsed compact mode. |
| `<content-region>` | The main content area. Inside `<app-shell>` it goes in the main grid area. |
| `<page-header>` | Title + breadcrumb + meta + action row, sitting at the top of `<content-region>`. |

## Canonical composition

```html
<app-shell>
  <command-bar>
    <a href="/">Acme</a>
    <input-cell type="search" placeholder="Search…" />
    <cluster>
      <secondary-action>Invite</secondary-action>
      <primary-action>New</primary-action>
    </cluster>
  </command-bar>

  <sidebar-nav>
    <stack>
      <recede-block>Workspace</recede-block>
      <a href="/dashboard">Dashboard</a>
      <a href="/projects">Projects</a>
      <a href="/team">Team</a>
    </stack>
    <stack>
      <recede-block>Settings</recede-block>
      <a href="/billing">Billing</a>
      <a href="/account">Account</a>
    </stack>
  </sidebar-nav>

  <content-region>
    <page-header>
      <breadcrumb-trail>
        <a href="/">Acme</a><span>/</span><span>Projects</span>
      </breadcrumb-trail>
      <authority-mark>Projects</authority-mark>
      <lead-graf>Eight active. Two awaiting review.</lead-graf>
    </page-header>

    <!-- the actual page content goes here -->
  </content-region>
</app-shell>
```

## Why a separate pack

Editorial / marketing / docs pages don't need app-shell. App surfaces
do. Splitting the app-shell vocabulary keeps the v1 reference packs
focused on content + chrome, and lets app-targeted projects opt into
the shell vocabulary explicitly.

## Pair with

`@quoin/vocab-essentials` for tab-panels, stat-display, split-shell,
etc. inside the content region. `@quoin/vocab-dashboard` for
`<active-zone>`, `<alert-band>`, `<segment-control>`, the data-display
primitives that fill a typical admin page.

## Cross-references

- Pack format: [`00_spec/pack-format.md`](../../00_spec/pack-format.md) §5.
- Companion packs: [`@quoin/vocab-essentials`](../vocab-essentials),
  [`@quoin/vocab-dashboard`](../vocab-dashboard).
- Implementation: [`@quoin/impl-tailwind`](../impl-tailwind) — bespoke
  emitters for each app-shell primitive that produce real CSS Grid
  layouts.
