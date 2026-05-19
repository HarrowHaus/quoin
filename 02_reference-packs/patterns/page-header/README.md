# @quoin/pattern-page-header

**P0 in-app page-header pattern.** The strip rendered below `pattern-nav-app-chrome` that introduces the current page — eyebrow / title / subtitle / meta / actions / optional sub-tab strip. Seven primitives. Three registers × three sizes × three pattern states.

This pattern is the **content-page counterpart** to `pattern-nav-app-chrome`. The chrome handles workspace-level identity (workspace switcher, breadcrumb to project, search, user menu); page-header handles page-level identity (the page title and page-level actions). They don't overlap responsibilities — they stack.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `page-header-actions` primary CTA | Right-most action — Save / Publish / Add / Apply. All 8 microstates inherited. |
| `<action-button intent="secondary">` + `intent="ghost"` | `@quoin/pattern-button-system` | `^1.0.0` | `page-header-actions` Share / Export / Filter / kebab overflow | De-escalated CTAs. |
| `<avatar-stack>` primitive | `@quoin/vocab-app-shell` | `^0.2.0` | `page-header-meta` owner / sharing display | "Owned by Elena Park" / "Shared with 4 people". Inherits aria-label naming + +N overflow indicator. |
| `<app-page-tabs>` (optional) | `@quoin/pattern-nav-app-chrome` | `^1.0.0` | `page-header` extended register sub-tab strip | When the page has sub-sections (Overview / Activity / Settings), page-header may host an app-page-tabs instance. Sibling-pack composition — the same tabs primitive can live below the chrome OR below the page-header. |
| `<app-breadcrumb>` contract (optional) | `@quoin/pattern-nav-app-chrome` | `^1.0.0` | `page-header-eyebrow` breadcrumb register | The eyebrow's breadcrumb register mirrors app-breadcrumb's anatomy — `<nav aria-label="Breadcrumb">` + `<ol>` + chevron separators + `aria-current="page"` on the last segment. Either pattern's breadcrumb DOM can render here. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Surfaces / typography / borders / motion / shadows / focus-ring. |

---

## What this pattern adds

Seven primitives:

- **`<page-header>`** — top-level `<header>` (without `role="banner"` — the banner landmark lives on nav-app-chrome). 3 registers × 3 sizes × 3 pattern states.
- **`<page-header-eyebrow>`** — small uppercase pre-heading. 3 registers (text / breadcrumb / badge-row).
- **`<page-header-title-block>`** — flex column wrapping title + subtitle so the meta + actions can align relative to the visual centre.
- **`<page-header-title>`** — the page title. h1 by default; h2 when nested.
- **`<page-header-subtitle>`** — descriptive subtitle, max 72ch line length.
- **`<page-header-meta>`** — metadata cluster. Hosts avatar-stack, badges, last-updated, member count.
- **`<page-header-actions>`** — action button cluster. 3 registers (primary-only / secondary-plus-primary / extended).

## Reference lineage

| Aspect | Source |
|---|---|
| Title + subtitle + actions in a page-header strip | Stripe Dashboard, Linear, GitHub repo pages, Notion |
| Eyebrow above the title | Apple HIG, Material Design top app bar |
| Breadcrumb-in-eyebrow pattern | GitHub repo pages, Linear project pages |
| Meta cluster with avatar-stack + status pills | Linear issue page, GitHub PR page |
| `aria-current="page"` on breadcrumb tail | WCAG 4.1.2 |
| Sub-tab strip composed from nav-app-chrome's `app-page-tabs` | Same Linear / GitHub / Notion conventions |
| Editable titles via `contenteditable` + `role="textbox"` | Notion / Google Docs document name patterns (host-provided in v1) |

## Tokens consumed

Canonical only:

- **Colour**: `--surface` / `--surface-recessed` / `--surface-elevated` (background variants), `--text`, `--text-emphasis` (title), `--text-recede` (subtitle, meta, eyebrow), `--text-disabled`, `--accent` (current-page underline), `--accent-recede` (eyebrow badges, avatar bg), `--success` / `--warning` / `--critical` (status pills), `--border`, `--border-emphasis`, `--focus-ring`, `--text-on-accent`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / card / pill`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display` (title), `--type-size-xs / sm / md / xl / 2xl / 3xl`, `--font-weight-medium / semibold`, `--leading-tight / prose`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`

## Registers × content matrix

| Register | Eyebrow | Title | Subtitle | Meta | Actions | Sub-tabs | Typical use |
|---|---|---|---|---|---|---|---|
| `minimal` | — | ✓ | — | — | optional (1 CTA) | — | Settings sub-pages, simple inner pages |
| `default` | optional | ✓ | ✓ | optional | ✓ (1-3 CTAs) | — | The 80% choice — list views, detail pages |
| `extended` | ✓ | ✓ | ✓ | ✓ | ✓ | optional | Flagship in-app surfaces, document/project pages with deep sub-section structure |

## States × microstates

| State | DOM signal | Meaning |
|---|---|---|
| `default` | (no modifier) | Idle, page data loaded. |
| `loading` | `[data-state="loading"]` + `[aria-busy="true"]` | Skeleton shimmer on title + subtitle. Primary CTA aria-disabled. |
| `error` | `[data-state="error"]` | Title wraps in `role="alert"`. Subtitle includes link to status page. Primary CTA becomes Retry. |

Microstates apply to the buttons in `page-header-actions` (inherited from button-system) and the eyebrow's breadcrumb links + sub-tab links.

## Templates that consume this pattern

- `template-app-tracker` — every Galley Dues page (Subscriptions, Detail, Renewing this week)
- `template-app-creator-studio` — every Easel page (Project, Asset, Export)
- `template-saas-pro` — in-app pages (Settings, Billing, Members, Audit log)
- `template-docs-pro` — docs landing page (`size=lg` register), article pages (`size=md` with breadcrumb eyebrow)
- `template-blog-magazine` — article page header (with badge-row eyebrow showing topic tags)

## Use

### Default register (list view)

```html
<header data-pattern="page-header" register="default" size="md">
  <div class="inner">
    <div class="primary-cluster">
      <page-header-title-block>
        <page-header-title>Subscriptions</page-header-title>
        <page-header-subtitle>Every recurring charge — auto-detected from your bank feeds or added manually.</page-header-subtitle>
      </page-header-title-block>
    </div>
    <page-header-actions role="group" aria-label="Page actions">
      <action-button intent="ghost">Filter</action-button>
      <action-button intent="ghost">Export</action-button>
      <action-button intent="primary">Add subscription</action-button>
    </page-header-actions>
  </div>
</header>
```

### Extended register (document page)

```html
<header data-pattern="page-header" register="extended" size="md">
  <div class="inner">
    <div class="primary-cluster">
      <nav data-pattern="page-header-eyebrow" register="breadcrumb" aria-label="Breadcrumb">
        <a href="/notes">Notes</a>
        <span class="separator" aria-hidden="true">/</span>
        <a href="/notes/quoin">Quoin spec drafts</a>
        <span class="separator" aria-hidden="true">/</span>
        <span aria-current="page">Phase Pattern Packs</span>
      </nav>
      <page-header-title-block>
        <page-header-title>Phase Pattern Packs · scratch</page-header-title>
        <page-header-subtitle>Working notes for P0 pattern pack design.</page-header-subtitle>
      </page-header-title-block>
      <page-header-meta layout="inline">
        <avatar-stack aria-label="Owned by Elena Park, shared with 4 collaborators">
          <!-- 3 avatars + 1 overflow -->
        </avatar-stack>
        <span class="separator" aria-hidden="true">·</span>
        <span class="meta-item">Last updated 2 min ago</span>
        <span class="separator" aria-hidden="true">·</span>
        <span class="status-pill" tone="success">Live</span>
      </page-header-meta>
    </div>
    <page-header-actions role="group" aria-label="Page actions">
      <action-button intent="ghost">Export</action-button>
      <action-button intent="secondary">Share</action-button>
      <action-button intent="primary">Publish</action-button>
    </page-header-actions>
  </div>
  <app-page-tabs aria-label="Page sections">
    <ul>
      <li><a href="#" aria-current="page">Overview</a></li>
      <li><a href="#">Activity</a></li>
      <li><a href="#">Comments</a></li>
      <li><a href="#">Versions</a></li>
      <li><a href="#">Settings</a></li>
    </ul>
  </app-page-tabs>
</header>
```

## Specimen

Open `examples/index.html` in a browser. Includes:

- **Extended register — document page** (Galley Notes "Phase Pattern Packs · scratch" with breadcrumb eyebrow, h1 + subtitle, avatar-stack with 4 members + last-updated + Live status pill, Export/Share/Publish action cluster, 5-tab sub-nav with a "Comments 3" badge)
- **Default register — list page** (Galley Dues subscriptions list)
- **Minimal register — settings sub-page** (Billing)
- **All 3 eyebrow registers** (text / breadcrumb / badge-row) for direct comparison
- **All 3 sizes** (sm / md / lg with hero-style "Track every charge that hits your card" headline)
- **Loading + error states** with skeleton shimmer and `role="alert"` title
- **Composition lineage table** with the 6 consumed primitives — including 2 cross-pack compositions (app-page-tabs + app-breadcrumb both from nav-app-chrome)
- **12-item accessibility checklist** covering no-banner-role discipline, heading hierarchy, breadcrumb ARIA, current-page marker, separator aria-hidden, avatar-stack composition, action cluster role="group", icon-only labels, loading aria-busy, error role="alert", text-wrap balance/pretty, editable-title contract

## License

MIT.
