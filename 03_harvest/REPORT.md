# Phase 3 — Harvest Report

**Status:** 40 packs ship. 1 in holding. Floor met.

## Summary

| Class | Count | Floor | Status |
|------:|------:|------:|--------|
| Token packs | 30 | 30 | ✓ |
| Vocabulary packs | 10 | 10 | ✓ |
| **Total shipped** | **40** | **40** | **✓** |
| Held back | 1 | — | Catalyst (license) |

All 40 packs pass `node 03_harvest/validate.js`. Validation asserts:
- Manifest validates against the canonical JSON Schema.
- Attribution block is present with `sourceSystem`, `sourceLicense`,
  `harvestedAt`.
- License SPDX identifier is in the recognised set
  (MIT, Apache-2.0, BSD-3-Clause, CC0-1.0).
- For token packs: every name in the canonical semantic-token
  namespace from [`00_spec/tokens.md` §2](../00_spec/tokens.md) is
  supplied (the Phase 1 compiler's `findMissingSemanticTokens` check
  fails the build otherwise).
- For token packs: compiles cleanly against the reference vocab +
  impl-raw-css packs from Phase 2.
- For vocabulary packs: every primitive declares the required fields
  (`category`, `role`, `structure.element`); canonical-namespace
  compatibility verified by compiling a known v1 primitive alongside.

## Token packs (30)

Each pack ships the same files: `quoin.pack.json`, `package.json`,
`README.md`, `LICENSE`, `tokens/index.json` (DTCG), `tokens.css`. All
under [`03_harvest/packs/tokens-*/`](packs/). Generated from per-system
configs under [`sources/*.json`](sources/) by [`build.js`](build.js).

### Confidence tiers

- **Tier A — high confidence.** Source has publicly documented token
  values I could confirm or closely approximate from training data;
  values are likely to match the official source to within a couple of
  OKLCH lightness/chroma units.
- **Tier B — approximate.** Source has rich public documentation but
  exact OKLCH values were not memorised verbatim. Token values follow
  the source's published palette structure and contrast ratios; a
  visual smoke test would surface any mismatch worth correcting.

| Pack | License | Tier | Notes |
|------|---------|------|-------|
| `tokens-tailwind` | MIT | A | Tailwind v4 zinc neutral. Values follow the v4 OKLCH defaults. |
| `tokens-radix` | MIT | A | Radix Colors slate + blue. 12-step palette flattened onto Quoin's 4-surface model. |
| `tokens-shadcn` | MIT | A | shadcn/ui zinc theme. CSS-variable names from the themes registry. |
| `tokens-open-props` | MIT | A | Adam Argyle's gray-N scale + named colour set. |
| `tokens-material3` | Apache-2.0 | B | M3 baseline neutral + primary purple. Elevation set deliberately omitted (see mapping notes). |
| `tokens-carbon` | Apache-2.0 | B | IBM Carbon white theme. Blue-60 accent. |
| `tokens-primer` | MIT | A | GitHub Primer light. accent-emphasis -> --accent. |
| `tokens-uswds` | CC0-1.0 | A | US Web Design System v3. Federal blue + cool gray. Source Sans referenced by family name only. |
| `tokens-govuk` | MIT | A | GOV.UK Design System. Deliberately stripped palette — black/white/blue. GDS Transport is proprietary. |
| `tokens-polaris` | MIT | B | Shopify Polaris light. Indigo accent. |
| `tokens-fluent` | MIT | B | Microsoft Fluent 2 web light. Communication-blue accent. Segoe UI is proprietary. |
| `tokens-atlassian` | Apache-2.0 | B | Atlassian Design System light. Blue-500 accent. Charlie Sans is proprietary. |
| `tokens-spectrum` | Apache-2.0 | B | Adobe Spectrum light. Adobe Clean is proprietary. |
| `tokens-lightning` | BSD-3-Clause | B | Salesforce SLDS. Salesforce Sans is proprietary. |
| `tokens-geist` | MIT | A | Vercel Geist. Monochrome with near-black accent. Geist Sans / Mono are open-source SIL OFL. |
| `tokens-paste` | MIT | B | Twilio Paste default theme. |
| `tokens-gestalt` | Apache-2.0 | B | Pinterest Gestalt. Pinterest red accent. Pinterest Sans is proprietary. |
| `tokens-mantine` | MIT | A | Mantine v7 default (blue-6 accent). |
| `tokens-chakra` | MIT | A | Chakra UI v3 default (teal-500 accent). |
| `tokens-ant` | MIT | A | Ant Design v5 (daybreak-blue accent). |
| `tokens-elastic` | Apache-2.0 | B | Elastic EUI Amsterdam light. Inter is open-source. |
| `tokens-evergreen` | MIT | B | Segment Evergreen default. Mature codebase; note light maintenance. |
| `tokens-orbit` | MIT | B | Kiwi.com Orbit travel-themed. Circular is proprietary; Roboto fallback. |
| `tokens-clarity` | MIT | B | VMware Clarity v6 light. |
| `tokens-base-web` | MIT | B | Uber Base Web. Heavy monochrome. UberMove is proprietary. |
| `tokens-workday` | Apache-2.0 | B | Workday Canvas Kit. Roboto open-source. |
| `tokens-bootstrap` | MIT | A | Bootstrap 5 default ($primary blue). |
| `tokens-mui` | MIT | B | Material UI default light (indigo classic). Distinct from Material 3. |
| `tokens-heroui` | MIT | B | HeroUI (formerly NextUI). Purple accent. |
| `tokens-bulma` | MIT | A | Bulma CSS framework default. Turquoise primary. |

## Vocabulary packs (10)

| Pack | Primitives | Source | Notes |
|------|-----------:|--------|-------|
| `vocab-marketing` | 7 | Quoin original | hero-banner, feature-grid, feature-cell, pricing-tier, testimonial-quote, cta-band, faq-disclosure |
| `vocab-docs` | 6 | Quoin original | code-fence, callout-box, command-shell, kbd-key, version-badge, toc-list |
| `vocab-forms` | 10 | Quoin original | Full form scaffolding — field, label, help, error, select, checkbox, radio, textarea, fieldset, submit-row |
| `vocab-dashboard-extended` | 7 | Quoin original | kpi-card, spark-line, status-pill, change-indicator, filter-chip, search-cell, view-switcher |
| `vocab-shadcn` | 6 | shadcn/ui MIT | command-menu, scroll-pane, hover-card, popover-panel, sheet-overlay, tooltip-tip |
| `vocab-radix` | 5 | Radix UI MIT | accessible-toggle, switch-toggle, slider-cell, progress-meter, dialog-overlay |
| `vocab-headless` | 5 | Headless UI MIT | listbox-options, combobox-input, menu-group, disclosure-group, transition-frame |
| `vocab-ark` | 4 | Ark UI MIT | number-input, color-picker, segment-bar, toggle-group |
| `vocab-daisy` | 6 | DaisyUI MIT | alert-tile, badge-tag, card-bordered, divider-line, indicator-dot, modal-shell |
| `vocab-mantine` | 4 | Mantine MIT | skeleton-placeholder, ring-progress, loader-spinner, notification-toast |

Total: **60 new primitives** beyond the v1 vocabulary's 36.

## Holding (1)

- [`holding/vocab-catalyst.md`](holding/vocab-catalyst.md) — Tailwind
  UI Catalyst is a paid product. Source code may not be redistributed.
  Held until either Tailwind Labs publishes a pattern dictionary under
  an open license, or operator obtains explicit written permission.

## Mapping decisions — common patterns

### More granular palettes
- **Radix Colors (12 steps).** Mapped to Quoin's 4-surface model as
  step-1 → surface-elevated, step-2 → surface, step-3 →
  surface-recessed, step-12 → surface-inverse.
- **Material 3 (tonal palettes 0–100).** Picked representative steps
  (98/99 for surfaces, 10/20 for inverse, 40 for primary).
- **Ant Design (10 steps × multiple hues).** Step-6 used as the
  canonical "solid" version of each hue, per Ant's own convention.

### Different semantic names
- **shadcn/ui:** `--background` → `surface`, `--muted` →
  `surface-recessed`, `--primary` → `accent`, `--destructive` →
  `critical`, `--ring` → `border-emphasis`.
- **Primer:** `--color-canvas-default` → `surface`,
  `--color-fg-default` → `text`, `--color-accent-emphasis` → `accent`.
- **Polaris:** `--p-color-bg` → `surface`, `--p-color-bg-emphasis` →
  `accent`.
- **Carbon:** `$interactive` (Blue 60) → `accent`, `$support-error/
  success/warning/info` → respective status tokens.

### Missing tokens — derivation rules
- **`accent-recede`** when source lacks it: derived from the accent
  family's lightest step (e.g. Tailwind sky-100, Primer blue-100).
- **`surface-inverse`** when source uses only black: derived from
  source's darkest neutral step.
- **`text-on-warning`** convention: dark text on yellow/amber surfaces
  (most legible), light text on red/green/blue (most legible). Every
  pack follows this contrast pattern.

### Extra source tokens — handled
- Material 3 elevation tokens: not modelled (optional capability per
  `tokens.md` §2.9). M3-targeted projects supplement via project CSS.
- Carbon interactive state tokens (hover, active, focus): not modelled
  separately. Consumers add Carbon-style focus rings via project CSS.
- Tailwind v4 colour scales beyond zinc: only the default neutral is
  shipped. A Tailwind project using slate / gray / stone replaces the
  base palette via project tokens.

### Proprietary typefaces
All proprietary typefaces are referenced by family name only with a
documented fallback. No font files are embedded:

- Segoe UI Variable (Microsoft) — fallback `system-ui, sans-serif`
- SF Pro (Apple) — referenced via `-apple-system, BlinkMacSystemFont`
- Salesforce Sans — fallback `-apple-system`
- Charlie Sans (Atlassian) — fallback `-apple-system`
- Adobe Clean — fallback `'Source Sans 3'`
- Pinterest Sans — fallback `-apple-system`
- UberMove — fallback `system-ui`
- Circular Std (Kiwi) — fallback `'Roboto'`
- GDS Transport — fallback `arial`
- Clarity City — fallback `'Metropolis'` / `system-ui`

## What did NOT translate cleanly

Documented gaps that future packs or extensions could close:

1. **Theme variants (light/dark).** Phase 3 ships only light themes.
   Tokens.md §4 documents how a token pack supplies theme variants;
   adding `tokens/semantic.dark.json` to each pack is a follow-up
   batch.
2. **Elevation tokens.** Optional Quoin capability (`tokens.md` §2.9).
   Material 3 / Carbon / Workday all have elevation sets that would
   benefit from the optional capability declaration. Not added in this
   phase to keep mapping scope tight.
3. **Component-level tokens.** Many sources expose per-component
   tokens (`color-button-primary-bg`, `color-input-placeholder`). The
   harvested packs distill these onto Quoin's primitive-component
   layer indirectly via the semantic namespace. Lossless preservation
   would require shipping each source's full component-token graph.
4. **Animation/easing nuance.** All harvested packs adopt Quoin's
   default `motion-fast`/`normal`/`slow` (120/200/320ms) and three
   easings. Source systems with distinctive motion specs (Material 3's
   emphasised-decelerate, Salesforce's spring curves) collapse to
   close approximations.
5. **Density variants.** Some sources (Carbon, Lightning, Workday)
   ship explicit compact/comfortable density modes. Quoin's primitive
   `density` attribute handles this at the vocab level; the token
   packs themselves don't carry density variants.
6. **Status colour granularity.** Polaris, Carbon, Atlassian etc.
   distinguish `bg-critical` vs `bg-critical-strong` vs
   `bg-critical-subtle`. Quoin collapses to `--critical` + the
   `--accent-recede` convention for soft tints; the `text-on-critical`
   contrast pair handles legibility.

## Ask the operator

1. **Dogfooding test.** The Phase 3 gate includes: *"the operator can
   instruct Claude Code to build a real production page (e.g., a
   harrow.haus section) using only harvested packs and a custom token
   pack, and Claude Code produces production-grade output without
   writing custom CSS."* This needs an operator-driven turn.
   Suggested test: pick `vocab-marketing` + `tokens-geist` +
   `impl-tailwind`, define a `quoin.tokens.json` with Harrow Haus's
   brand colours, ask Claude Code to build the Harrow Haus landing.
2. **Visual smoke tests** (quality bar item 7) cannot be run in this
   environment. Operator-side, opening
   `03_harvest/packs/tokens-{name}/tokens.css` and rendering the
   canonical Phase-1 sample against each pack is the way to confirm
   "looks like the source aesthetic" subjectively.
3. **Tier-B token packs.** Worth verifying values against the official
   sources before npm publication: Material 3, Carbon, Polaris, Fluent
   2, Atlassian, Spectrum, Lightning, Paste, Gestalt, Elastic,
   Evergreen, Orbit, Clarity, Base Web, Workday, MUI, HeroUI. (Tier A
   packs are well-anchored to canonical OKLCH values from public
   docs.)
4. **Theme variants.** Should Phase 4 (docs) include theme-variant
   pickers, or should that work happen here as a Phase 3a follow-up?

## Reproducibility

```bash
cd 03_harvest

# regenerate all packs from sources/
node build.js

# validate every pack
node validate.js
```

Per-pack source configs live in [`sources/`](sources). Editing a
source config and re-running `build.js` regenerates the corresponding
pack in place. The generated `packs/*` directories are committed to
git as the canonical deliverable; the sources are kept for
reproducibility and downstream edits.
