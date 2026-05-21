# @quoin/pattern-button-system

**Foundational P0 button pattern.** Five intents × four sizes × eight microstates + button-group composition. Every other pattern that triggers an action composes this one.

## What it is

- `<action-button>` — single button primitive.
  - 5 intents: `primary` (filled accent), `secondary` (outline), `ghost` (transparent + hover-tint), `destructive` (filled critical), `link` (inline anchor).
  - 4 sizes: `xs` (28 min-height, chrome contexts only), `sm` (36), `md` (44 — default + minimum WCAG hit target), `lg` (52).
  - 8 microstates: `default`, `hover`, `active`, `focus`, `focus-visible`, `disabled`, `loading`, `selected`.
  - 4 pattern-level states: `default`, `loading`, `success`, `error`.
  - 4 icon-position variants: `none`, `leading`, `trailing`, `only` (icon-only — `aria-label` required).
  - Polymorphic: renders as `<button>` by default, `<a>` when `href` is provided.
- `<button-group>` — horizontal cluster.
  - 2 registers: `gapped` (separate; toolbar / action cluster) and `connected` (segmented; view switcher / paginator / radio group).
  - 2 orientations: `horizontal` (default), `vertical`.

## Reference lineage

| Aspect | Source |
|---|---|
| Five-intent taxonomy | shadcn/ui, Mantine, Radix Themes |
| Sizes scale (xs/sm/md/lg) | Tailwind UI, shadcn/ui Blocks |
| 44×44 hit target floor | Apple HIG, WCAG 2.5.5 |
| Focus-visible-only ring | Tab-key vs mouse-click discrimination — Modern A11Y guidance |
| `aria-busy` + `aria-live` loading pattern | Vercel Web Interface Guidelines |
| Connected segmented register | iOS UISegmentedControl, GitHub repo tab bar |

## Tokens consumed

All canonical (no hardcoded values):

- **Colour**: `--accent`, `--accent-recede`, `--text-on-accent`, `--critical`, `--text-on-critical`, `--success`, `--text-emphasis`, `--text-disabled`, `--surface-elevated`, `--surface-recessed`, `--border`, `--border-emphasis`, `--focus-ring`, `--shadow-tint`
- **Dimension**: `--space-1 / 2 / 3 / 4 / 6`, `--radius-sm / md`, `--border-width-sm`, `--focus-ring-width`, `--focus-ring-offset`
- **Type**: `--font-sans`, `--type-size-xs / sm / md`, `--font-weight-medium`, `--leading-tight`, `--tracking-normal`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`
- **Shadow**: `--shadow-focus` (composite — focus ring recipe)

The pack consumes hover/active variations of accent + critical via:
`--accent-hover`, `--accent-active`, `--critical-hover`, `--critical-active`. If the active theme pack doesn't declare these, the consumer's impl pack derives them programmatically (e.g. `oklch(from var(--accent) calc(l - 0.08) c h)`).

## States & microstates

| Microstate | DOM signal | ARIA |
|---|---|---|
| `default` | (no modifier) | — |
| `hover` | `:hover` | — |
| `active` | `:active` | — |
| `focus` | `:focus` | — |
| `focus-visible` | `:focus-visible` | (keyboard-only ring) |
| `disabled` | `[disabled]` (skip-focus) OR `[aria-disabled="true"]` (retain-focus) | `aria-disabled="true"` |
| `loading` | `[aria-busy="true"]` | `aria-busy="true"`, `aria-live="polite"` |
| `selected` | `[aria-pressed="true"]` (toggle) OR `[aria-checked="true"]` (radio in group) | `aria-pressed` or `aria-checked` |

| State | Description |
|---|---|
| `default` | Normal interactive — buttons respond to input |
| `loading` | Primary spins (preserves width via transparent label); secondary disables |
| `success` | Primary momentarily shows success-affordance (`Saved ✓`); reverts ~1500ms |
| `error` | Primary stays active for retry; error message lives in surrounding form, not in the button |

## Use

```ts
import { compile, loadTokenPack, loadPatternPack, loadVocabularyPack, loadImplementationPack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const vocab = await loadVocabularyPack("./node_modules/@quoin/vocab-editorial");
const buttons = await loadPatternPack("./node_modules/@quoin/pattern-button-system");
const impl = await loadImplementationPack("./node_modules/@quoin/impl-tailwind");

compile({
  source: `
    <action-button intent="primary" size="md">Save changes</action-button>
    <button-group register="connected" aria-label="View">
      <action-button intent="secondary" selected="true">Grid</action-button>
      <action-button intent="secondary">List</action-button>
    </button-group>
  `,
  tokenPack,
  vocabularyPacks: [vocab],
  patternPacks: [buttons],
  implementationPack: impl
});
```

## Templates that consume this pattern

Every P0+P1 template depends on `pattern-button-system`. Specifically:

- `template-saas-pro` — hero CTA, pricing-tier select, footer newsletter submit
- `template-pricing` — every tier CTA + annual/monthly switch
- `template-marketing` — hero + CTA banner buttons
- `template-app-tracker` — top action bar, multi-select bulk, drawer save/cancel
- `template-dashboard-app` — topbar primary action, settings save/discard
- `template-docs-pro` — copy-button on code blocks, version-switcher dropdown trigger
- `template-portfolio-designer` — contact CTA
- `template-portfolio-developer` — RSS subscribe, project link
- `template-longform` — RSS subscribe, prev/next page nav

## Consumed by (reverse lineage)

Per Phase 22 Consolidation 3 (Q5 — composition reality), this pack tracks
its declared consumers. The first explicit consumer:

| Consumer pack | Used as | Phase |
|---|---|---|
| `@quoin/pattern-hero` (all 5 variants: type-only, animated, gradient-mesh, brand-photo, video) | `<a class="action-button" data-intent="primary"&#124;ghost&#124;secondary" href="...">` in the `hero-actions` slot. The hero pack adds context-scoped backdrop-blur overrides on ghost CTAs when sitting over media (brand-photo's image-full-bleed / image-overlay layouts, and the video variant) — button-system stays unchanged; the overrides ride on cascade specificity. | Phase 22 Cons. 3 / 2026-05-20 |
| `@quoin/pattern-nav` (all 4 variants: marketing, app-chrome, docs, editorial) | `<a class="action-button" data-intent="primary"&#124;ghost&#124;secondary" href="...">` in `nav-secondary-actions` (marketing + app-chrome), `nav-subscribe-cta` (editorial), `nav-meta-actions` (docs version switcher + theme toggle + GitHub trigger). | Phase 22 Cons. 4 / 2026-05-20 |

This list grows as more patterns formally declare button-system as a peer
pack and consume `<action-button>` directly (v3.G.17 gate enforces the
reality for enrolled consumers).

## Specimen

Open `examples/index.html` in a browser to render the full intent × size × microstate matrix + button-group compositions. The specimen is a self-contained HTML page seeded with `tokens-baseline` light + auto-dark values; in a real consumer the active token + theme pack supplies these via the compiler pipeline.

## License

MIT.
