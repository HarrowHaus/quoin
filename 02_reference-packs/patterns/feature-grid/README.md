# @quoin/pattern-feature-grid

**P0 marketing-feature pattern.** Four cell variants × five grid layouts. Used in every marketing landing page, every pricing-page feature list, every docs-landing capability grid.

## What it is

- `<feature-cell>` — single feature primitive.
  - 4 variants: `compact` (chip-sized icon + label only), `default` (icon + heading + 2–3 sentence body), `wide` (icon + heading + 3–4 sentences + optional chips), `feature` (bento centerpiece with display-tier heading).
  - 4 leading types: `icon` (SVG via icon pack), `numeral` (mono-numerals 01/02/03 for step rows), `glyph` (single editorial character ▲ ◆ ○), `none`.
  - 3 pattern states: `default`, `loading`, `selected`.
  - All 8 microstates supported.
  - Polymorphic: when `interactive="true"`, the entire card is tabbable + Enter/Space activates as if the trailing link were clicked.

- `<feature-grid>` — composition primitive.
  - 5 layouts: `three-up` (3×1 desktop / 2×2 tablet / stacked mobile), `four-tile` (2×2), `six-tile` (3×2 / 2×3 / stacked), `bento` (irregular spans with one 2×2 feature cell), `steps` (horizontal numbered flow / vertical stack).
  - Density: `sparse` / `normal` / `dense` — controls gap + cell padding.
  - 4 grid-level states: `default`, `empty`, `loading`, `error`.

## Reference lineage

| Aspect | Source |
|---|---|
| Three-up canonical marketing row | Tailwind UI Marketing, Stripe homepage, Linear homepage |
| Bento layout | Apple WWDC 2023 marketing pages, Vercel marketing |
| Numbered steps with mono leading | Linear onboarding, Cursor documentation |
| Compact trust-bar strip | Stripe customer logos rail (variant), shadcn block trust bars |
| Semantic `<article>` + `<figcaption>` for icon-led cells | HTML5 spec |
| `text-wrap: balance` on display headlines | CSS Text Module Level 4 / Modern Type Setting |

## Tokens consumed

Canonical only (no hardcoded values):

- **Colour**: `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis`, `--text-recede`, `--text-disabled`, `--accent`, `--accent-recede`, `--accent-hover`, `--border`, `--border-emphasis`, `--border-recede`, `--critical` (error state), `--success` (loading state if needed), `--shadow-tint`, `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / 6 / 8 / card / panel`, `--radius-sm / card`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-display` (headings), `--font-sans` (body, compact heading), `--font-mono` (numerals, code spans), `--font-serif` (glyph leading), `--type-size-xs / sm / md / lg / xl / 2xl`, `--font-weight-medium / semibold / bold`, `--leading-tight / prose / display`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`
- **Shadow**: `--shadow-tint`, `--shadow-sm`, `--shadow-md` (hover lift)

## Variants × layouts compatibility matrix

| Layout | Default | Compact | Wide | Feature (bento) |
|---|---|---|---|---|
| `three-up` | ✓ canonical | rare (use six-tile dense instead) | ✓ | — (use bento) |
| `four-tile` | ✓ | rare | ✓ | — |
| `six-tile` | dense ✓ | ✓ canonical | rare | — |
| `bento` | ✓ supporting cells | ✓ supporting cells | rare | ✓ canonical centerpiece |
| `steps` | ✓ with numeral leading | rare | rare | — |

## States & microstates

| Microstate | DOM signal | ARIA |
|---|---|---|
| `default` | (no modifier) | — |
| `hover` | `:hover` — shadow lift + 1px translate-Y | — |
| `active` | `:active` | — |
| `focus` | `:focus` (interactive cells only) | — |
| `focus-visible` | outline via `--focus-ring` tokens | — |
| `disabled` | `[aria-disabled=true]` — 40% opacity + pointer-events: none | `aria-disabled="true"` |
| `loading` | `[aria-busy=true]` + `<span class="skeleton">` lines | `aria-busy="true"` |
| `selected` | `[aria-selected=true]` — accent border + 1px ring | `aria-selected="true"` |

| Grid state | Description |
|---|---|
| `default` | Cells render at the active density. |
| `empty` | 1-column dashed-border surface with CTA. |
| `loading` | N skeleton cells at expected count. |
| `error` | `role="alert"` message in critical-tinted surface. |

## Templates that consume this pattern

- `template-saas-pro` — 3-up benefit row + 6-tile capability grid
- `template-marketing` — bento centerpiece + 4-tile supporting features
- `template-pricing` — 4-tile feature comparison per tier
- `template-app-tracker` — onboarding 3-step flow (steps layout)
- `template-docs-pro` — capability grid on `/docs/concepts` landing
- `template-portfolio-developer` — projects-as-features bento
- `template-portfolio-designer` — case-study cards in three-up or bento

## Use

```html
<feature-grid layout="three-up" density="normal" aria-label="Why Quoin">
  <feature-cell variant="default" leading="icon">
    <span class="leading"><icon name="layers" /></span>
    <h4>Authored once, shipped everywhere</h4>
    <p>Write semantic Quoin source one time. Compile to plain CSS, Material Web, Carbon, Polaris.</p>
    <a href="/architecture">Read the architecture →</a>
  </feature-cell>
  <!-- … -->
</feature-grid>

<feature-grid layout="bento">
  <feature-cell variant="feature">
    <span class="leading"><icon name="universe" /></span>
    <h4>Universal semantic addressing layer over the design-system ecosystem</h4>
    <p>Write your UI once. Target Material, Carbon, Polaris, shadcn, plain CSS.</p>
    <a href="/thesis">Read the strategic thesis →</a>
  </feature-cell>
  <feature-cell variant="default">…</feature-cell>
  <feature-cell variant="default">…</feature-cell>
  <feature-cell variant="default">…</feature-cell>
  <feature-cell variant="default">…</feature-cell>
</feature-grid>
```

## Specimen

Open `examples/index.html` in a browser to render every variant × every layout × every state × every microstate. The specimen includes:

- Three-up canonical marketing row (3 default cells)
- Steps layout (3 numbered cells, horizontal/vertical responsive)
- Six-tile dense capability strip (6 cells)
- Bento centerpiece (1 feature + 4 default support cells)
- Compact trust-bar strip (6 compact cells)
- Empty / sparse / loading / error grid states
- Cell-level microstates (default / hover / selected / disabled)
- Accessibility checklist
- Typography precision section

## License

MIT.
