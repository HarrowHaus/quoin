# @quoin/pattern-testimonial

**P0 social-proof pattern.** Single card + grid + featured pull-quote — composes `avatar-stack` from `vocab-app-shell` for attribution. Used across every marketing template.

## What it is

- `<testimonial-card>` — single testimonial primitive.
  - 3 variants: `compact` (chip-sized, 6-up grid), `default` (card-sized, 3-up grid), `featured` (section-anchor pull-quote).
  - 4 attributes: `density`, `weight`, `rating` (none / stars / score), `loading`.
  - All 8 microstates supported (default / hover / active / focus / focus-visible / disabled / loading / selected).
- `<testimonial-grid>` — composition primitive.
  - Density: sparse / normal / dense — controls the grid track sizing.
  - Columns: 2 / 3 / 4 explicit, or `auto-fit` via density.
  - 4 grid-level states: default / empty / loading / error.

## Reference lineage

| Aspect | Source |
|---|---|
| Figure + blockquote + figcaption semantics | HTML5 spec / Vercel WIG |
| Three-variant taxonomy (compact / default / featured) | Tailwind UI Marketing templates |
| Featured pull-quote treatment | Klim foundry / Pangram Pangram editorial register |
| Multi-avatar attribution with overflow indicator | GitHub presence indicators / Linear assignee row |
| CSS `quotes` + `open-quote`/`close-quote` over authored curly quotes | Type-driven punctuation — Practical Typography |
| Skeleton-line loading state | Vercel Web Interface Guidelines / Mantine Skeleton |

## Tokens consumed

Canonical only (no hardcoded values):

- **Colour**: `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis`, `--text-recede`, `--border`, `--border-recede`, `--border-emphasis`, `--accent`, `--warning` (for star ratings), `--critical` (for error state), `--shadow-tint`
- **Dimension**: `--space-1 / 2 / 3 / 4 / 6 / card / panel / 8`, `--radius-sm / card / pill`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-serif` (body), `--font-sans` (attribution), `--font-mono` (rating score), `--type-size-xs / sm / md / 2xl`, `--font-weight-semibold`, `--leading-tight / prose / display`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`
- **Shadow**: `--shadow-sm`, `--shadow-md` (hover lift)

## Vocabulary primitive consumed

This pattern depends on `vocab-app-shell@^0.2.0` for the `avatar-stack` primitive. Single avatars + multi-avatar groups with overflow (`+N`) ship in that vocab pack and compose here for attribution. Bumps the vocab dependency from `^0.1.0` to `^0.2.0`; consumers using older versions will get a peer-dependency warning.

## States & microstates

| Microstate | DOM signal | ARIA |
|---|---|---|
| `default` | (no modifier) | — |
| `hover` | `:hover` — shadow lift + 1px translate-Y | — |
| `active` | `:active` | — |
| `focus` | `:focus-within` (when card contains tabbable child) | — |
| `focus-visible` | outline via `--focus-ring` tokens | — |
| `disabled` | `[aria-disabled=true]` — 40% opacity + pointer-events: none | `aria-disabled="true"` |
| `loading` | `[aria-busy=true]` — skeleton-line replacement | `aria-busy="true"`, `aria-label="Loading testimonial"` |
| `selected` | `[aria-selected=true]` — accent-coloured border + outer ring | `aria-selected="true"` |

| Grid state | Description |
|---|---|
| `default` | Cards render at the active density. |
| `empty` | Empty-state message + optional CTA. 1-column with dashed border. |
| `sparse` | Single card centred in 1-column layout (60ch max). |
| `dense` | 3+ cards, tightened gaps via `--space-card` collapse. |
| `loading` | N skeleton-cards at expected density. |
| `error` | `role="alert"` message in critical-tinted surface. |

## Templates that consume this pattern

- `template-saas-pro` — social-proof rail under hero
- `template-marketing` — testimonial section above CTA banner
- `template-pricing` — single featured testimonial above pricing tiers
- `template-portfolio-designer` — client testimonial in case-study body
- `template-app-tracker` — customer-story sidebar
- `template-dashboard-app` — onboarding success-stories rail

## Use

```html
<testimonial-grid columns="3" density="normal" aria-label="Customer stories">
  <testimonial-card variant="default" rating="score">
    <blockquote>We replaced 4,200 lines of utility-class soup with semantic tags in an afternoon.</blockquote>
    <figcaption>
      <avatar-stack size="md" data-name="Elena Mendez"></avatar-stack>
      <cite>Elena Mendez</cite>
      <span class="role">Principal engineer · Sourcegrid</span>
    </figcaption>
  </testimonial-card>
  <!-- … -->
</testimonial-grid>
```

## Specimen

Open `examples/index.html` in a browser to render every variant × every state × every microstate. The specimen includes:

- Default variant grid (3-up)
- Compact variant grid (4-up dense)
- Featured pull-quote (section-anchor)
- Multi-avatar attribution exercising the avatar-stack overflow indicator
- Empty / sparse / dense / loading / error grid states
- Card-level microstates (default / hover / selected / disabled)
- Accessibility checklist
- Typography precision section

## License

MIT.
