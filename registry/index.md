# Quoin Registry — shadcn-compatible distribution

Catalog of 38 items derived from canonical USML pack manifests.

**Consumption:**

```
npx shadcn@latest add --registry=https://harrowhaus.github.io/quoin/registry/index.json <item-name>
```

## Items

### article-meta (`registry:component`)

**Article Meta** — Article meta strip. Author (with optional avatar) + published date + reading-time, with conditional category, tag-list, and share-actions. Three density variants × three position variants. Reading time computed at build time, not runtime. Composes prim-label for tag-list.

URL: https://harrowhaus.github.io/quoin/registry/items/article-meta.json

### button-system (`registry:component`)

**Button System** — Full button system — 5 intents (primary/secondary/ghost/destructive/link) × 4 sizes (xs/sm/md/lg) × 8 microstates + button group composition. Foundational P0 pattern.

URL: https://harrowhaus.github.io/quoin/registry/items/button-system.json

### center (`registry:component`)

**Center** — Layout primitive — center content within parent on one or both axes. Used by hero content centered in section, modal centered in viewport, empty-state centered in container. Phase 22.6.

URL: https://harrowhaus.github.io/quoin/registry/items/center.json

### cluster (`registry:component`)

**Cluster** — Layout primitive — horizontal grouping with wrapping. Universal for nav links, button groups, tag clouds, action bars, breadcrumbs. Phase 22.6 layout-primitive layer.

URL: https://harrowhaus.github.io/quoin/registry/items/cluster.json

### combobox (`registry:component`)

**Combobox** — Combobox pattern. A single-line text input paired with a popup listbox of suggestions. The text input is editable; the listbox provides selectable options that filter as the user types (or remain static, depending on variant). Translation from W3C ARIA Authoring Practices Guide. 

Depends on: form-fields

URL: https://harrowhaus.github.io/quoin/registry/items/combobox.json

### data-table (`registry:component`)

**Data Table** — Sortable / filterable / selectable data table — 8 primitives, 3 densities, 7 states. Composes form-fields (search, filters, row selection) + button-system (sort, pagination, bulk).

Depends on: button-system, form-fields

URL: https://harrowhaus.github.io/quoin/registry/items/data-table.json

### decoration-overlay (`registry:component`)

**Decoration Overlay** — Decoration overlay primitive — positioned-absolute decorative layer over a container. 4 variants (grain / texture / pattern / gradient). Shipped forward-looking per Phase 22 Cons. 7; ready for Boeing Watch and other aesthetic packs.

URL: https://harrowhaus.github.io/quoin/registry/items/decoration-overlay.json

### disclosure (`registry:component`)

**Disclosure** — Disclosure pattern. A button that toggles the visibility of an associated content region. Foundational expand/collapse anatomy used by accordions, FAQs, settings panels, expand-for-detail surfaces. Translation from W3C ARIA Authoring Practices Guide. Phase 22.7.

URL: https://harrowhaus.github.io/quoin/registry/items/disclosure.json

### empty-state (`registry:component`)

**Empty State** — Reusable empty-state primitive — promoted from data-table's empty cell. 4 variants (empty / filtered-empty / error / forbidden) × 3 sizes (sm / md / lg). Composes button-system.

Depends on: button-system

URL: https://harrowhaus.github.io/quoin/registry/items/empty-state.json

### feature-grid (`registry:component`)

**Feature Grid** — Feature-grid pattern — 3-column + 4-tile + 6-tile + bento variants for marketing feature sections. Composes feature-cell primitives. P0.

URL: https://harrowhaus.github.io/quoin/registry/items/feature-grid.json

### footer-mega (`registry:component`)

**Footer Mega** — Universal marketing footer — brand block + multi-column link grid + newsletter + legal row. 4 variants (minimal/default/mega/compact). Composes form-fields + button-system siblings.

Depends on: button-system, form-fields

URL: https://harrowhaus.github.io/quoin/registry/items/footer-mega.json

### footnote (`registry:component`)

**Footnote** — Editorial footnote pattern. Inline trigger that reveals footnote content via four position variants (sidenote-margin · footnote-bottom · popup-on-hover · popup-on-click). Sidenote-margin variant uses CSS Anchor Positioning (Baseline January 2026); polyfill via OddBird's css-ancho

URL: https://harrowhaus.github.io/quoin/registry/items/footnote.json

### form-fields (`registry:component`)

**Form Fields** — Form-fields pattern — 9 widget types (text / textarea / select / combobox / checkbox / radio / switch / file / date) × 8 microstates + form-row + form-section composition. P0 foundational.

URL: https://harrowhaus.github.io/quoin/registry/items/form-fields.json

### form-validation (`registry:component`)

**Form Validation** — Error-summary + field-level validation messages + status icons. WCAG 2.4.6 / 3.3.1 / 3.3.3 patterns. 7 form-level states + 4 validate-on policies. Composes form-fields + button-system.

Depends on: button-system, form-fields

URL: https://harrowhaus.github.io/quoin/registry/items/form-validation.json

### grid (`registry:component`)

**Grid** — Layout primitive — auto-fit grid with min-width per cell. Foundation for any card-grid surface (feature-grid, pricing-tiers, future product grids). Cells wrap responsively without media queries. Phase 22.6.

URL: https://harrowhaus.github.io/quoin/registry/items/grid.json

### hero (`registry:component`)

**Hero** — Unified hero pattern. Six mandatory slots (section / eyebrow / headline / subhead / actions / meta) + five conditional slots (accent / background / media / overlay / controls) gated by five variants (type-only / animated / gradient-mesh / brand-photo / video). Consolidates the fi

Depends on: button-system

URL: https://harrowhaus.github.io/quoin/registry/items/hero.json

### label (`registry:component`)

**Label** — Label primitive — single bounded text with optional icon and optional dismiss affordance. Variants represent semantic role (badge / status / tag / chip / dismissible). Promoted from inlined badge / status-pill contracts across hero, pricing-tiers, nav, page-header per Phase 22 Co

URL: https://harrowhaus.github.io/quoin/registry/items/label.json

### modal-dialog (`registry:component`)

**Modal Dialog** — Modal dialogs — alert / form / panel / command (Cmd+K palette). Focus trap, inert background, Escape + backdrop dismiss, restore focus on close. Composes button-system + form-fields.

Depends on: button-system, form-fields

URL: https://harrowhaus.github.io/quoin/registry/items/modal-dialog.json

### nav (`registry:component`)

**Nav** — Unified nav pattern. Two mandatory slots (section, brand) + 17 conditional slots gated by data-variant. Four variants (marketing / app-chrome / docs / editorial) consolidated from 4 parallel packs per Phase 22 Cons. 4.

Depends on: button-system, form-fields, modal-dialog

URL: https://harrowhaus.github.io/quoin/registry/items/nav.json

### page-header (`registry:component`)

**Page Header** — In-app page-header strip below nav-app-chrome. Eyebrow + title + subtitle + breadcrumb + meta + actions. 3 registers × 3 sizes. Composes button-system + avatar-stack.

Depends on: button-system, label

URL: https://harrowhaus.github.io/quoin/registry/items/page-header.json

### pricing-tiers (`registry:component`)

**Pricing Tiers** — Pricing-tiers pattern — 4 tier variants × 3 grid layouts + billing toggle + comparison matrix. First pattern to compose sibling packs (button-system + form-fields + feature-grid).

Depends on: button-system, form-fields, feature-grid, label

URL: https://harrowhaus.github.io/quoin/registry/items/pricing-tiers.json

### prose-aside (`registry:component`)

**Prose Aside** — Prose aside (callout / admonition) for editorial and docs prose. Six semantic registers: note, tip, warning, danger, success, info. Token-driven colour + icon mapping per semantic; aria-label per role for screen readers.

URL: https://harrowhaus.github.io/quoin/registry/items/prose-aside.json

### searchable-list (`registry:component`)

**Searchable List** — Searchable list primitive — search input + filtered result list with combobox/listbox ARIA pattern. 3 variants (command-palette / autocomplete-results / filter-dropdown). Composes form-fields (input) + prim-label (optional result categories). Phase 22 Cons. 8.

Depends on: form-fields

URL: https://harrowhaus.github.io/quoin/registry/items/searchable-list.json

### sequence (`registry:component`)

**Sequence** — Sequence primitive — ordered/contextual list of items with separator + position-semantic state. Variants represent sequence semantics (breadcrumb / ordered-list / unordered-list / sidebar-vertical). Consolidated from inlined breadcrumb + sidebar-section contracts per Phase 22 Con

URL: https://harrowhaus.github.io/quoin/registry/items/sequence.json

### sidebar (`registry:component`)

**Sidebar** — Layout primitive — sidebar + main content layout that responds to container width via container queries. Used by docs page (TOC sidebar + content), settings page (nav + form), dashboard (nav + main). Phase 22.6.

URL: https://harrowhaus.github.io/quoin/registry/items/sidebar.json

### stack (`registry:component`)

**Stack** — Layout primitive — vertical stack of children with consistent gap between them. Universal foundation for any vertical content composition. Phase 22.6 layout-primitive layer.

URL: https://harrowhaus.github.io/quoin/registry/items/stack.json

### stat-card (`registry:component`)

**Stat Card** — KPI tile for dashboards. Label + big numeric value + delta indicator + optional sparkline + context caption. 3 variants × 3 sizes × 4 states. Pairs with data-table.

Depends on: button-system

URL: https://harrowhaus.github.io/quoin/registry/items/stat-card.json

### switcher (`registry:component`)

**Switcher** — Layout primitive — switch from row to column when container width drops below a threshold. Used for two-column heroes that go single-column, side-by-side comparisons that stack, any responsive 'side by side or stacked' composition. Phase 22.6.

URL: https://harrowhaus.github.io/quoin/registry/items/switcher.json

### table-of-contents (`registry:component`)

**Table Of Contents** — Table of contents for long-form articles or docs. Three position variants (sticky-side · inline-top · floating-overlay), three depth registers (h1-h2 / h1-h3 / h1-h6). Active-section detection via IntersectionObserver on heading elements. Composes prim-sequence for the list rende

Depends on: sequence

URL: https://harrowhaus.github.io/quoin/registry/items/table-of-contents.json

### tabs (`registry:component`)

**Tabs** — Tabs pattern. A tablist with two or more tabs that switch between matched tabpanels. Two activation modes (automatic vs manual) and two orientations (horizontal vs vertical) per ARIA APG. Translation from W3C ARIA Authoring Practices Guide. Phase 22.7.

URL: https://harrowhaus.github.io/quoin/registry/items/tabs.json

### testimonial (`registry:component`)

**Testimonial** — Testimonial pattern — single card + grid + featured pull-quote variants. Composes avatar-stack for attribution. P0.

URL: https://harrowhaus.github.io/quoin/registry/items/testimonial.json

### toast-notifier (`registry:component`)

**Toast Notifier** — Toast notifications — aria-live region for transient app status. 4 tones × 6 positions × auto-dismiss / persistent. Pauses on hover + focus per WCAG 2.2.1. Composes button-system.

Depends on: button-system

URL: https://harrowhaus.github.io/quoin/registry/items/toast-notifier.json

### boeing-watch (`registry:style`)

**Boeing Watch** — Precision-instrumental aesthetic. Aerospace cockpit feel: deep navy panel ground, signal amber accent reserved for live indicators, instrument cream surfaces, control gray for chrome. IBM Plex Sans + IBM Plex Mono typography stack. Tight density per instrument-panel discipline. D

URL: https://harrowhaus.github.io/quoin/registry/items/boeing-watch.json

### default (`registry:style`)

**Default** — Tasteful neutral aesthetic. Neutral grays + single accent (deep blue). Inter Variable + IBM Plex Mono. Standard easings, no opinion. Intentionally low-character — serves as the comparison baseline against which more opinionated aesthetics (Boeing Watch, Harrow Haus) look distinct

URL: https://harrowhaus.github.io/quoin/registry/items/default.json

### harrow-haus (`registry:style`)

**Harrow Haus** — Harrow Haus house aesthetic. Post-industrial minimalism with editorial roots: paper #f4efe6 ground, ink #1d1a16 figure, signal red #7a2f22 reserved. Junicode 2 + Source Serif 4 + IBM Plex Mono + Recursive typography stack. Restrained motion (no spring overshoot, no iOS snap). Gen

URL: https://harrowhaus.github.io/quoin/registry/items/harrow-haus.json

### blog-with-prose (`registry:block`)

**Blog With Prose** — Long-form blog post template. Composes nav (editorial variant) + page-header + article-meta + prose-body + pull-quote + figure-with-caption + footnote + footer-mega. SCAFFOLD ONLY — full composition lands after Track B (prose-body, pull-quote, figure-with-caption) ships.

URL: https://harrowhaus.github.io/quoin/registry/items/blog-with-prose.json

### docs-site (`registry:block`)

**Docs Site** — Docs site template. Two-column layout: sticky TOC sidebar + main content. Composes nav (docs variant) + page-header + prose-body + code-block + prose-aside + table-of-contents + footer-mega. SCAFFOLD ONLY — full composition lands after Track B (prose-body, code-block) ships.

URL: https://harrowhaus.github.io/quoin/registry/items/docs-site.json

### landing-saas (`registry:block`)

**Landing Saas** — Six-section SaaS landing page: nav (marketing) + hero (type-only) + feature-grid + testimonial + pricing-tiers + footer-mega. Composes currently-shipped patterns; aesthetically neutral by default.

URL: https://harrowhaus.github.io/quoin/registry/items/landing-saas.json
