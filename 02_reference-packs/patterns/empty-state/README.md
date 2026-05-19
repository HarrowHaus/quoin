# @quoin/pattern-empty-state

**P0 empty-state pattern.** Reusable surface promoted from the data-table empty cell so any container can render the same affordance. Four variants (empty / filtered-empty / error / forbidden) × three sizes (sm / md / lg) × three illustration modes (icon / illustration / none).

This pattern formalises the empty-state contract that previously lived inside `pattern-data-table`. It's consumed by container patterns across the catalog — data-table, modal-dialog, future sidebar-list, gallery-grid, and template-level full-page takeovers.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `empty-state-actions` primary CTA | Primary action — Add first record / Retry / Request access. All 8 microstates inherited. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | `empty-state-actions` filtered-empty Clear-filters · secondary in pairs | De-escalated secondary CTA. |
| `<action-button intent="secondary">` | `@quoin/pattern-button-system` | `^1.0.0` | `empty-state-actions` extended register | Mid-intent CTA for lg-size onboarding patterns with 3 CTAs. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Surfaces / typography / borders / motion. Tone-coloured illustrations use `--critical` / `--warning` / `--accent` / `--text-disabled`. |

## Consumed by — patterns that use empty-state

This is one of the first P0 patterns explicitly designed as a **building-block dependency**: it ships TO other patterns rather than consuming them. The reverse-lineage:

| Consumer pattern | Where empty-state mounts | Typical variants |
|---|---|---|
| `@quoin/pattern-data-table` | `<tbody><tr><td colspan="all">` when no rows | empty / filtered-empty / error |
| `@quoin/pattern-modal-dialog` | Inside `modal-body` when dialog content is empty (e.g., "No notifications" in a notifications popover) | empty |
| (P1) `@quoin/pattern-sidebar-list` | Inside the list panel when no items | empty / filtered-empty |
| (P1) `@quoin/pattern-gallery-grid` | Inside the grid when no media | empty / filtered-empty / forbidden |
| Template-level surfaces | Full-page takeover on first-run app entry, or 404-like contexts | empty (lg) / forbidden (lg) |

The promotion of empty-state into its own pack closes a duplication risk that existed in P0: data-table had to embed empty-state markup; future container patterns would have had to duplicate that markup. Now they all consume the same primitive.

---

## What this pattern adds

Five primitives:

- **`<empty-state>`** — top-level `<div role="region" aria-labelledby="...">`. 4 variants × 3 sizes × 3 illustration modes.
- **`<empty-state-illustration>`** — visual slot (SVG icon / illustration / none). Always `aria-hidden`. Tone-coloured by variant (neutral / info / warning / critical).
- **`<empty-state-heading>`** — heading inside the empty-state. Auto-selects h2/h3/h4 by parent size. Error variant wraps in `role="alert"`.
- **`<empty-state-body>`** — supporting prose, max 48ch line length.
- **`<empty-state-actions>`** — CTA cluster composing button-system. 3 registers (primary-only / primary-plus-secondary / secondary-only).

## Reference lineage

| Aspect | Source |
|---|---|
| 4-variant empty-state taxonomy | Industry consensus — Stripe / Linear / Notion empty-state guidelines |
| Illustration + heading + body + CTAs as the canonical structure | Material Design empty states, Apple HIG empty views |
| `role="alert"` on error-variant heading | WAI-ARIA Authoring Practices 1.3 |
| `aria-live="polite"` on filtered-empty parent | WCAG 4.1.3 (Status Messages) |
| Constructive copy guidelines | UX Movement, Nielsen Norman writing guidelines |
| Specific error context ("Couldn't reach X" not "Something went wrong") | Surfaces.dev error message guidelines |

## Tokens consumed

Canonical only:

- **Colour**: `--surface`, `--surface-recessed`, `--text`, `--text-emphasis` (heading), `--text-recede` (body), `--text-disabled` (default illustration), `--accent`, `--accent-hover`, `--accent-recede`, `--critical` (error illustration), `--warning` (forbidden illustration), `--border`, `--border-emphasis`, `--focus-ring`, `--text-on-accent`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / card`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display` (heading), `--type-size-xs / sm / md / lg / 2xl`, `--font-weight-medium / semibold`, `--leading-tight / prose`, `--tracking-tight`
- **Motion**: `--motion-normal`, `--ease-standard`, `--transition-default`

## Variants × content matrix

| Variant | Tone | Heading example | Body example | Typical CTAs |
|---|---|---|---|---|
| `empty` | neutral | "No subscriptions yet" | Value-prop + invitation | Primary "Add first…" + optional secondary "Connect bank…" |
| `filtered-empty` | neutral | "No matches" | Total count + suggestion | Ghost "Clear filters" |
| `error` | critical | "Couldn't load subscriptions" | Specific failure context | Primary "Retry" + ghost "View status" |
| `forbidden` | warning | "You don't have access" | Permission context | Primary "Request access" + ghost "Back to home" |

## Sizes

| Size | Heading level | Padding | Illustration | Typical use |
|---|---|---|---|---|
| `sm` | h4 (type-size-md) | compact | 24px icon | Inline within small cards, sidebar panels |
| `md` | h3 (type-size-lg) | section / card | 48px icon | The 80% choice |
| `lg` | h2 (type-size-2xl) | section / panel | 64px icon or large illustration | Full-page takeover, first-run app entry, 404 |

## Use

```html
<!-- Inside a data-table tbody when no rows -->
<tr>
  <td colspan="5">
    <empty-state variant="empty" size="md" role="region" aria-labelledby="es-heading">
      <empty-state-illustration aria-hidden="true">
        <icon name="inbox" />
      </empty-state-illustration>
      <empty-state-heading id="es-heading">No subscriptions yet</empty-state-heading>
      <empty-state-body>Galley Dues tracks every recurring charge in one ledger.</empty-state-body>
      <empty-state-actions role="group" aria-label="Get started">
        <action-button intent="primary">Add first subscription</action-button>
        <action-button intent="ghost">Connect bank account</action-button>
      </empty-state-actions>
    </empty-state>
  </td>
</tr>

<!-- Full-page takeover -->
<empty-state variant="empty" size="lg" illustration="illustration" role="region" aria-labelledby="welcome-heading">
  <empty-state-illustration aria-hidden="true">
    <!-- large SVG -->
  </empty-state-illustration>
  <empty-state-heading id="welcome-heading">Welcome to Galley Dues</empty-state-heading>
  <empty-state-body>One ledger for every recurring charge across all 5 Galley tools.</empty-state-body>
  <empty-state-actions>
    <action-button intent="primary">Add first subscription</action-button>
    <action-button intent="secondary">Connect bank account</action-button>
    <action-button intent="ghost">Watch 90s overview</action-button>
  </empty-state-actions>
</empty-state>

<!-- Error variant -->
<empty-state variant="error" size="md" role="region" aria-labelledby="err-heading">
  <empty-state-illustration data-tone="critical" aria-hidden="true">
    <icon name="circle-error" />
  </empty-state-illustration>
  <empty-state-heading id="err-heading"><span role="alert">Couldn't load subscriptions</span></empty-state-heading>
  <empty-state-body>The Galley Dues sync service is temporarily unreachable.</empty-state-body>
  <empty-state-actions>
    <action-button intent="primary">Retry</action-button>
    <action-button intent="ghost" as="a" href="https://status.galley.harrow.haus" rel="noopener">View status</action-button>
  </empty-state-actions>
</empty-state>
```

## Specimen

Open `examples/index.html` in a browser. Includes:

- **All 4 variants at default (md) size** with Galley-themed copy — empty (Subscriptions first-run), filtered-empty (active filter yielded zero matches), error (sync service unreachable, includes `role="alert"` on heading), forbidden (workspace member without billing access)
- **All 3 sizes** stacked — sm (inline), md (default), lg (full-page Welcome to Galley Dues with 3 CTAs)
- **Composition lineage table** — 4 consumed primitives from button-system + tokens-baseline
- **Reverse lineage table** — 5 patterns / templates that consume this primitive
- **9-item accessibility checklist** covering region landmark, error role="alert", filtered-empty aria-live, illustration aria-hidden, heading hierarchy, action cluster role="group", constructive-copy guidelines

## License

MIT.
