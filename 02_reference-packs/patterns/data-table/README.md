# @quoin/pattern-data-table

**P0 data-table pattern.** The universal admin / dashboard / list primitive. Sortable columns, multi-row selection with bulk actions, filter chips, pagination, and three densities. Eight primitives. Seven pattern states. The most composite-dependent pattern in the catalog so far — peers on `pattern-button-system`, `pattern-form-fields`, and the `avatar-stack` primitive from `vocab-app-shell`.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<form-control type="search">` | `@quoin/pattern-form-fields` | `^1.0.0` | `data-table-toolbar` | Search input with leading magnifier icon. Inherits 33 tokens + leading/trailing slot system + 4 field-level states. Debounced input fires filter; row-count change announced via aria-live region. |
| `<form-control type="checkbox">` | `@quoin/pattern-form-fields` | `^1.0.0` | `data-table-row` + header master checkbox | Selection checkbox per row. Header master supports indeterminate state when some-but-not-all rows are selected. Shift+Click on a row checkbox selects the range from the last-selected row. |
| `<form-control type="select">` | `@quoin/pattern-form-fields` | `^1.0.0` | `data-table-pagination` (extended register) | Rows-per-page selector. Inherits select-input ARIA. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | sort triggers · pagination prev/next/page numbers · row action cluster · most bulk actions | The dominant button intent for in-table actions. All 8 microstates inherited including `aria-busy` for loading and `aria-disabled` for unreachable pages. |
| `<action-button intent="critical">` | `@quoin/pattern-button-system` | `^1.0.0` | `data-table-bulk-actions` Delete · `data-table-empty-state` error-variant Retry | Destructive bulk operations. Must open a `pattern-modal-dialog` confirmation; never executes on first click. |
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `data-table-empty-state` empty-variant primary CTA | "Create first record" primary CTA for the first-run empty state. |
| `<avatar-stack>` primitive | `@quoin/vocab-app-shell` | `0.2.0` | `data-table-cell` content-type="avatar-stack" | For "Shared with" / "Members" / "Assigned to" columns. 3–5 avatars with +N overflow indicator. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Surfaces / typography / borders / motion / shadows / focus-ring. Table aesthetic flips with aesthetic-pack swaps; structure is invariant. |

This pattern also **anticipates a P1 composition** with `pattern-modal-dialog` for destructive bulk-action confirmation flows. The contract is open today (Delete bulk action's `onClick` should invoke a modal); the modal itself ships in the next P0 pattern after this one.

---

## What this pattern adds

Eight primitives unique to this pack:

- **`<data-table>`** — top-level `<div role="region">` wrapper. 3 densities × 3 registers × 3 selection modes × 7 pattern states.
- **`<data-table-toolbar>`** — search + filter chips + meta-actions. 3 registers (search-only / search-plus-filter / full).
- **`<data-table-header>`** — `<thead><tr>` with `aria-sort` on sortable columns. Sticky to viewport top within the table scroll container.
- **`<data-table-row>`** — `<tr>` with optional selection checkbox + `aria-selected`. Shift+Click range selection. Hover reveals row-action cluster.
- **`<data-table-cell>`** — `<td>` with 6 content types (text / number / status-badge / avatar-stack / actions / link). Tabular-nums on numbers. Right-align on numbers by default.
- **`<data-table-empty-state>`** — empty-row spanning all columns. 3 variants (empty / filtered-empty / error). Error variant uses `role="alert"`.
- **`<data-table-pagination>`** — `<nav aria-label="Pagination">`. 3 registers (compact / default / extended).
- **`<data-table-bulk-actions>`** — `<div role="group">` revealed when rows are selected. Count in `aria-live`. Critical actions open modal confirmation.

## Reference lineage

| Aspect | Source |
|---|---|
| Sortable column headers with aria-sort | WAI-ARIA Authoring Practices 1.3 Sortable Table pattern |
| Master checkbox with indeterminate state | HTML spec (`indeterminate` property), Linear / GitHub / Notion admin tables |
| Bulk-actions bar revealed on selection | Gmail multi-select, Linear admin, Notion table view |
| Status badge with dot indicator | Linear status pills, GitHub PR labels, Stripe dashboard statuses |
| Hover-reveal row actions | Linear, Notion, Figma table interactions |
| Skeleton shimmer for loading rows | LinkedIn / Slack / most modern app shells |
| Tabular-nums for number columns | OpenType TNUM feature; Stripe dashboard, Linear billing |
| 3-tier density scale | Salesforce Lightning, Microsoft Fluent, Carbon Design System |

## Tokens consumed

Canonical only:

- **Colour**: `--surface` (table ground), `--surface-elevated` (row hover), `--surface-recessed` (header, striped row, skeleton bg), `--text`, `--text-emphasis` (header, row-title, current page), `--text-recede` (subtitle, caption), `--text-disabled` (cancelled rows), `--accent` (current page, primary CTA, sort indicator active), `--accent-recede` (selected row, bulk-actions bg, primary chip), `--accent-hover`, `--success/-recede` (active status), `--warning/-recede` (renews-soon), `--critical/-recede` (payment-failed, destructive bulk action), `--border`, `--border-emphasis` (header bottom), `--focus-ring`, `--text-on-accent`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / card / pill`, `--border-width-sm / md`, `--focus-ring-width / offset`
- **Type**: `--font-sans` (everything), `--font-display` (empty-state heading), `--font-mono` (composition lineage code), `--type-size-xs / sm / md / lg`, `--font-weight-medium / semibold / bold`, `--leading-prose`, `--tracking-tight / wide`
- **Motion**: `--motion-fast`, `--motion-normal`, `--ease-standard`, `--transition-default`
- **Numeric**: `font-variant-numeric: tabular-nums` on number cells (not a token; CSS feature)

## States × microstates

### Pattern states

| State | DOM signal | When |
|---|---|---|
| `default` | (no modifier) | Idle. |
| `loading` | `[data-state="loading"]` + `[aria-busy="true"]` on table | Initial load or refetch. Skeleton rows visible. |
| `empty` | `[data-state="empty"]` | No rows ever — first-run state. Shows empty-state CTA. |
| `filtered-empty` | `[data-state="filtered-empty"]` | Filter applied; zero matches. `aria-live` announces "No matches". |
| `error` | `[data-state="error"]` | Load failed. `role="alert"` heading announces. |
| `selected` | `[data-state="selected"]` on table; `[aria-selected="true"]` on rows | One or more rows selected. Bulk-actions bar visible. |
| `sorted` | `[aria-sort="ascending\|descending"]` on the sorted `<th>` | A column is actively sorting. Only one column has non-`none` aria-sort at a time (single-column sort). |

### Microstates (apply to sort triggers, row checkboxes, pagination buttons, row actions)

| Microstate | DOM signal | ARIA |
|---|---|---|
| `default` | (no modifier) | — |
| `hover` | `:hover` | — |
| `active` | `:active` | — |
| `focus` | `:focus` | — |
| `focus-visible` | `:focus-visible` | — |
| `disabled` | `[aria-disabled=true]` | `aria-disabled="true"` |
| `loading` | `[aria-busy=true]` | `aria-busy="true"` |
| `selected` | `[aria-selected=true]` (rows) OR `[aria-current="page"]` (pagination) | varies |

## Templates that consume this pattern

- `template-app-tracker` — primary surface; `subscriptions` table is the homepage
- `template-app-creator-studio` — assets / exports list
- `template-saas-pro` — admin / billing / audit-log views
- `template-portfolio-developer` — case-study list (lightweight register)

## Use

```html
<data-table density="default" register="minimal" selection="multi" role="region" aria-label="Subscriptions table">
  <data-table-toolbar role="toolbar" aria-label="Table controls">
    <form-control type="search" placeholder="Search subscriptions…" />
    <button class="filter-chip" aria-pressed="true">Status: Active</button>
    <!-- … -->
  </data-table-toolbar>

  <table>
    <caption>Subscriptions in Galley Dues — 12 active services</caption>
    <thead>
      <tr>
        <th class="select-col" scope="col"><input type="checkbox" aria-label="Select all rows"></th>
        <th scope="col" aria-sort="none">
          <button type="button" class="sort-trigger" aria-label="Service, not sorted. Activate to sort ascending.">
            Service <icon name="sort-indicator" />
          </button>
        </th>
        <th scope="col" aria-sort="descending">
          <button type="button" class="sort-trigger" aria-label="Monthly cost, sorted descending. Activate to sort ascending.">
            Monthly cost <icon name="sort-indicator" />
          </button>
        </th>
        <!-- … -->
      </tr>
    </thead>
    <tbody>
      <tr aria-selected="true">
        <td class="select-col"><input type="checkbox" checked aria-label="Select Linear row"></td>
        <td><span class="row-title">Linear</span><span class="row-subtitle">linear.app</span></td>
        <td data-content-type="number">$16.00</td>
        <!-- … -->
      </tr>
      <!-- more rows -->
    </tbody>
  </table>

  <data-table-pagination aria-label="Pagination">
    <p class="count" aria-live="polite">Showing <strong>1–10</strong> of <strong>12</strong></p>
    <action-button intent="ghost" size="sm" aria-label="Previous page" aria-disabled="true">←</action-button>
    <a class="page-link" href="#" aria-current="page">1</a>
    <a class="page-link" href="#">2</a>
    <action-button intent="ghost" size="sm" aria-label="Next page">→</action-button>
  </data-table-pagination>
</data-table>
```

## Specimen

Open `examples/index.html` in a browser to render every variant + state. The specimen is built around Elena Park's **Galley Dues** subscription ledger — 10 realistic subscriptions (AWS, Linear, Notion, Figma, GitHub Pro, 1Password, Adobe CC archived, Stripe usage-billed, Anthropic, Vercel payment-failed) covering every content type, status tone, and microstate combination. Includes:

- **Full standard table** with toolbar (search + filter chips + export), sortable headers (one with active descending sort), 10 rows with mixed content types, pagination at the bottom, hover-reveal row actions, master-checkbox + indeterminate state via 2 pre-selected rows, one disabled (Cancelled) row that's not selectable, and one row in the critical-tone Payment Failed status
- **With bulk-actions bar** — 2 rows selected; the bulk-actions bar replaces the filter cluster and includes Deselect/Export/Change-date/Cancel(critical) actions
- **All 3 densities** stacked (compact / default / comfortable) for direct comparison
- **All 3 registers** (striped / bordered / minimal)
- **All 3 empty states** (empty / filtered-empty / error) with appropriate CTAs and ARIA semantics (filtered-empty heading is `aria-live`, error heading is `role="alert"`)
- **Loading state** with 4 skeleton rows + shimmer animation that respects `prefers-reduced-motion`
- **All 3 pagination registers** (compact / default with ellipsis / extended with page-size selector)
- **Microstate matrix** for both sort header (`aria-sort` ascending/descending/none + focus-visible) and row (default/hover/selected/disabled)
- **Composition lineage table** documenting which DOM elements come from which sibling/peer pack
- **Full accessibility checklist** covering region landmark, table semantics, aria-sort, aria-selected, master-checkbox indeterminate, pagination ARIA, live regions, role="alert" on error, role="toolbar" / role="group", destructive-confirmation policy

## License

MIT.
