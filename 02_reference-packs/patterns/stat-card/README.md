# @quoin/pattern-stat-card

**P0 KPI tile.** The companion to `pattern-data-table` in dashboard surfaces — a row of 3-6 stat-cards typically sits above the table to surface the high-level numbers. Six primitives. Three variants × three sizes × four pattern states. Tabular-nums on values for clean column-alignment when stacked.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | Optional in-card actions · info-tip trigger on stat-label | Ghost buttons for inline "View detail" links and the info-tip "?" trigger that opens a tooltip explaining the metric. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Surfaces / typography / borders / motion / shadows / focus-ring. Delta tones (`--success` / `--critical` / `--text-recede`) and their `*-recede` backgrounds drive the three delta tones. |

### Composition decision: does NOT compose `validation-status-icon` from `pattern-form-validation`

Despite some semantic overlap (success / critical tones), stat-card does **not** compose `validation-status-icon`. The icon vocabularies are different:

- `validation-status-icon` → check (✓) / x (✕) / warning (⚠) / spinner — for form-field validation states
- `stat-delta` arrow → up / down / flat — for metric trend direction

Visual literacy is clearer when these vocabularies stay separate. Forcing one composition would mean using a check-mark for a positive trend, which is semantically wrong — a check-mark conveys "validated" / "passed", not "trending up". stat-card ships its own arrow SVGs inside `stat-delta`.

This documents an explicit **non-composition** decision: the operator hinted at the composition possibility, but inspection found the icon families were too different to share. Future patterns weighing similar overlaps can reference this decision.

---

## What this pattern adds

Six primitives:

- **`<stat-card>`** — top-level KPI tile. 3 variants (bordered / flat / elevated) × 3 sizes (sm / md / lg) × 4 states (default / loading / error / no-data). Optionally interactive (whole-card clickable).
- **`<stat-label>`** — small uppercase caption. Optional info-tip trigger for metric definition tooltip.
- **`<stat-value>`** — the big numeric value. `tabular-nums` for column alignment. Optional aria-hidden unit prefix/suffix + visually-hidden sr-only full announcement.
- **`<stat-delta>`** — change indicator. 3 tones (positive / negative / neutral) × 3 directions (up / down / flat). **Tone is explicit, not derived from direction** — for spend / cost / latency, "up = negative".
- **`<stat-trendline>`** — optional inline sparkline. `role="img"` + `aria-labelledby` to inline `<title>` + `<desc>`.
- **`<stat-context>`** — small caption below for period / source / freshness notes.

## Reference lineage

| Aspect | Source |
|---|---|
| 4-tile KPI row above a data-table | Stripe Dashboard, Linear Insights, Notion analytics |
| Tabular-nums for column-aligned digits | OpenType TNUM feature; Stripe / Linear billing UIs |
| Tone-coloured delta pills with arrow + magnitude + period | Stripe / Linear / Notion / Vercel dashboard conventions |
| Inline sparkline with no axes | Edward Tufte sparklines (canonical 2006 definition), GitHub contribution graph |
| `role="img"` + `<title>` + `<desc>` on SVG charts | WAI-ARIA Authoring Practices 1.3 SVG patterns |
| Explicit tone-per-metric (not auto-derived from direction) | Apple Numbers / Google Sheets sparkline conventions |

## Tokens consumed

Canonical only:

- **Colour**: `--surface`, `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis` (value), `--text-recede` (label, context), `--text-disabled` (no-data), `--success` / `--success-recede` (positive delta), `--critical` / `--critical-recede` (negative delta, error state), `--border`, `--border-emphasis` (interactive hover), `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel`, `--radius-sm / card / pill`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display` (value), `--type-size-xs / sm / md / lg / xl / 2xl / 3xl`, `--font-weight-medium / semibold`, `--leading-tight / display`, `--tracking-tight / wide`
- **Motion**: `--motion-normal`, `--ease-standard`, `--transition-default`. Skeleton shimmer animation collapses under `prefers-reduced-motion`.
- **Shadow**: `--shadow-sm` (elevated variant), `--shadow-md` (interactive hover)
- **CSS feature**: `font-variant-numeric: tabular-nums` on stat-value (not a token, but documented contract)

## States × variants

### States

| State | DOM signal | Meaning |
|---|---|---|
| `default` | (no modifier) | Live data displayed. |
| `loading` | `[data-state="loading"]` + `[aria-busy="true"]` | Skeleton shimmer placeholders. |
| `error` | `[data-state="error"]` | Load failed. stat-context wraps in `role="alert"` with retry link. |
| `no-data` | `[data-state="no-data"]` | Value renders as `—`; stat-value has `aria-label` naming the absence. |

### Variants

| Variant | Use | Visual |
|---|---|---|
| `bordered` | Default | Border, no fill |
| `flat` | Tight stacking inside a container | No border, no fill |
| `elevated` | Standalone or hero cards | Filled `--surface-elevated` + `--shadow-sm` |

### Delta tone × direction matrix

| Tone | Direction | Example | Visual |
|---|---|---|---|
| `positive` | up | New signups +8.4% (more = good) | Green up-arrow |
| `positive` | down | Avg cost −$1.20 (less = good) | Green down-arrow |
| `negative` | up | Monthly spend +$24 (more = bad) | Red up-arrow |
| `negative` | down | Active users −12 (less = bad) | Red down-arrow |
| `neutral` | up / down / flat | New subscriptions +1 (no inherent good/bad) | Grey arrow |

## Templates that consume this pattern

- `template-app-tracker` — Galley Dues dashboard KPI row above the subscriptions table
- `template-app-creator-studio` — Easel exports / storage / API usage tiles
- `template-saas-pro` — admin dashboard, billing overview
- `template-portfolio-developer` — case-study metrics ("$2.4M raised", "47 customers")

## Use

```html
<div class="stat-grid" data-cols="4">
  <stat-card variant="bordered" size="md">
    <stat-label>Monthly recurring</stat-label>
    <stat-value>
      <span class="unit-prefix" aria-hidden="true">$</span>
      <span class="value">310.18</span>
      <span class="unit-suffix" aria-hidden="true">/mo</span>
      <span class="sr-only">$310.18 per month</span>
    </stat-value>
    <stat-delta tone="negative" direction="up" aria-label="Increased by $24 this month — higher spend">
      <icon name="arrow-up" aria-hidden="true" />
      <span class="magnitude">+$24</span>
      <span class="period">this month</span>
    </stat-delta>
    <stat-context>From bank feeds · Updated 2 min ago</stat-context>
  </stat-card>

  <stat-card variant="elevated" size="md">
    <stat-label>API requests today</stat-label>
    <stat-value><span class="value">14,283</span></stat-value>
    <stat-delta tone="positive" direction="up">
      <icon name="arrow-up" aria-hidden="true" />
      <span class="magnitude">+12%</span>
      <span class="period">vs yesterday</span>
    </stat-delta>
    <stat-trendline tone="positive" role="img" aria-labelledby="tr-api-title tr-api-desc">
      <title id="tr-api-title">24-hour trend</title>
      <desc id="tr-api-desc">API requests rose from 1,400 to 14,283 over 24 hours.</desc>
      <!-- sparkline path -->
    </stat-trendline>
  </stat-card>
  <!-- more cards -->
</div>
```

Interactive (clickable for drilldown):

```html
<a href="/billing/monthly-recurring" data-pattern="stat-card" data-interactive="true" variant="bordered" size="md">
  <stat-label>Monthly recurring →</stat-label>
  <stat-value>$310.18</stat-value>
  <stat-delta tone="negative" direction="up">+$24 this month</stat-delta>
</a>
```

## Specimen

Open `examples/index.html` in a browser. Includes:

- **Dashboard pairing** — 4-tile KPI row above a data-table stand-in, demonstrating the canonical layout (Monthly recurring / Active subscriptions / Renewing this week / Avg cost per service — all sourced from the Galley Dues dataset)
- **Tone × direction policy** — 3 cards showing positive/up, negative/up, positive/down — illustrating that tone is explicit per metric
- **With trendlines** — 3 elevated cards with sparklines (Monthly recurring, API requests today, Storage used) demonstrating `role="img"` + `<title>` + `<desc>` accessibility
- **All 3 variants** — bordered / flat / elevated rendered as parallel 3-card rows
- **All 3 sizes** — sm / md / lg side by side
- **All 4 states** — default / loading (skeleton) / error (role="alert" context) / no-data (— with aria-label)
- **Interactive cards** — 3 clickable cards demonstrating whole-card link semantics
- **Composition lineage table** with the explicit non-composition decision documented
- **12-item accessibility checklist** covering tabular-nums, aria-hidden units, sr-only full announcement, delta tone explicit-not-derived, arrow aria-hidden, sparkline ARIA, loading aria-busy, error role="alert", no-data aria-label, interactive whole-card semantics, focus styles, composition-decision rationale

## License

MIT.
