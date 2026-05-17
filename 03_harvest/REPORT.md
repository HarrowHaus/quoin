# Phase 3 + 3.5 + 3.5b — Harvest Report

**Status:** 40 packs ship. 1 in holding. Floor met.

**Phase 3.5b status:** complete. Fidelity extraction across 27 of 30
token packs. Three extraction methods deployed:

- **Method A** (static fetch + parse) — Tailwind, Open Props, Bootstrap,
  Radix, Mantine, Chakra, Fluent, Primer (json5), Paste, Lightning,
  Elastic, USWDS, Polaris (via npm pkg), Bulma, Evergreen, HeroUI,
  Gestalt, Base Web, Spectrum (npm), Atlassian (npm), GOV.UK.
- **Method B** (algorithm execution at extract time) — Material 3
  (`@material/material-color-utilities`), Ant Design (`@ant-design/
  colors`), Carbon (`@carbon/colors`), shadcn (themes.css HSL→OKLCH),
  Polaris (`@shopify/polaris-tokens`), Atlassian (`@atlaskit/tokens`),
  Spectrum (`@adobe/spectrum-tokens`).
- **Method C** (per-file structured extraction) — MUI (per-colour
  module files), Orbit (per-family palette JSON).

**Final tier counts:** 1 Tier A, 26 Tier B, 3 Tier C. Tier C target
(≤3) met. All 40 packs pass `validate.js`. Phase 1 compiler test suite
77/77 green. All 3 demos build cleanly.

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

### Fidelity tiers (Phase 3.5 + 3.5b)

Replaces the original "confidence tiers" with an extraction-based
classification. Each pack now declares `attribution.fidelityTier` in
its manifest.

- **Tier A — byte-faithful extraction.** Values pulled directly from
  the source system's canonical token file at the URL declared in
  `attribution.sourceUrl`, with `attribution.sourceCommit` pinning the
  commit/branch. No interpretation; OKLCH conversion happens at
  extraction time via the culori library. Visual smoke test is a
  formality.
- **Tier B — extracted with mapping notes.** Values pulled directly
  from the canonical source, but the mapping onto Quoin's
  canonical semantic-token namespace required documented decisions
  (more granular palette than Quoin, missing tokens derived from
  base palette, etc.). The `attribution.harvestNotes` field captures
  the per-pack decisions.
- **Tier C — designed approximation, extraction deferred.** Values
  are informed by the source system's published palette structure
  and contrast pattern but have not been byte-faithfully extracted.
  The `attribution.sourceUrl` records the verification target; the
  framework at `03_harvest/fidelity/` ships per-source extraction
  specs ready to run once URL hunting and format-specific parsing
  are completed in a Phase 3.5b follow-up.

| Pack | License | Tier | Method | Notes |
|------|---------|------|--------|-------|
| `tokens-tailwind` | MIT | **A** | A | v4 zinc + red/emerald/amber/sky 500. Native OKLCH preserved verbatim. |
| `tokens-open-props` | MIT | **B** | A | gray + red + orange + green + blue scales from `src/props.colors.css`. Status hues at perceptually balanced steps. |
| `tokens-bootstrap` | MIT | **B** | A | $gray-100..900 + $blue/$red/$green/$yellow/$cyan from `_variables.scss`. SCSS tint-color()/shade-color() approximated. |
| `tokens-radix` | MIT | **B** | A | gray/slate/blue/red/green/amber/sky 12-step scales from `src/light.ts`. Flattened onto Quoin's 4-surface model. |
| `tokens-mantine` | MIT | **B** | A | 10-step ramps from `default-colors.ts`. primaryShade=6 per Mantine default. |
| `tokens-mui` | MIT | **B** | C | Per-colour MUI module files fetched individually and namespaced by family. Material Design v1/v2 ramps. |
| `tokens-material3` | Apache-2.0 | **B** | B | Algorithm execution: `@material/material-color-utilities` with M3 baseline seed #6750A4 + status seeds. 13 tones × 9 palettes. |
| `tokens-carbon` | Apache-2.0 | **B** | B | Library read: `@carbon/colors` per-family exports. Blue 60 accent (Carbon canonical). |
| `tokens-primer` | MIT | **B** | A | Primer json5 base palette via custom `primer-json5` parser. 10-step ramps. |
| `tokens-uswds` | CC0-1.0 | **B** | B | Per-family SCSS files (blue, gray-cool, gray-warm, red, green, yellow, gold, orange). Federal blue accent. |
| `tokens-govuk` | MIT | **B** | B | GOV.UK Sass map (settings/_colours-palette--internal.scss). Deliberately stripped palette — blue/green/red/yellow with primary + tint/shade variants. |
| `tokens-polaris` | MIT | **B** | B | Library read: `@shopify/polaris-tokens` themeDefault.color. 226 named colour tokens. |
| `tokens-fluent` | MIT | **B** | A | Microsoft Fluent 2 colour TS exports. Grey 2-99 + blue/red/green/yellow/orange + communicationBlue. |
| `tokens-atlassian` | Apache-2.0 | **B** | B | Library read: `@atlaskit/tokens` figma/atlassian-light.json. 403 functional tokens. |
| `tokens-spectrum` | Apache-2.0 | **B** | B | Library read: `@adobe/spectrum-tokens` variables.json. Light theme. 666 tokens. |
| `tokens-lightning` | BSD-3-Clause | **B** | A | SLDS color-palettes.yml. Cool-gray + warm-gray + blue/green/red/orange/yellow at 13 steps. |
| `tokens-paste` | MIT | **B** | A | Twilio Paste color-palette.yml. 12-step ramps for gray/blue/red/green/orange/yellow/purple/cyan/pink. |
| `tokens-gestalt` | Apache-2.0 | **B** | A | Pinterest Gestalt classic base-color.json. Pinterest-named ramps (pushpin red, flaminglow pink, etc.). |
| `tokens-chakra` | MIT | **B** | A | Chakra v3 tokens via custom `value-wrapped-ts` parser. 50-950 ramps for 10 colour families. |
| `tokens-ant` | MIT | **B** | B | Library read: `@ant-design/colors` named exports. 10-step ramps for blue/red/green/gold/etc. |
| `tokens-elastic` | Apache-2.0 | **B** | A | EUI semantic_colors.scss. Borealis light theme. 158 colour vars. |
| `tokens-evergreen` | MIT | **B** | A | Segment Evergreen default theme colors.js. 50 colour vars. |
| `tokens-orbit` | MIT | **B** | C | Per-family JSON files (blue/red/green/orange/ink/cloud/white). Semantic variant naming (normal/dark/light/etc.). |
| `tokens-base-web` | MIT | **B** | A | Uber Base Web foundation color tokens. Heavy monochrome with accent blue. |
| `tokens-shadcn` | MIT | **B** | B | Custom fetch: themes.css under `.theme-zinc`; raw HSL components wrapped in hsl() then converted to OKLCH. |
| `tokens-bulma` | MIT | **B** | A | Bulma initial-variables.scss. Semantic step names (lighter/light/base/dark/darker). |
| `tokens-heroui` | MIT | **B** | A | HeroUI semantic.ts. Minimal extraction; falls back to base.DEFAULT for accents. |
| `tokens-clarity` | MIT | **C** | — | Clarity tokens are auto-generated at build time by an internal pipeline; published source tree does not include the static output. @clr/core npm package does not expose tokens as JS exports. |
| `tokens-geist` | MIT | **C** | — | No public canonical token file. Vercel ships Geist as fonts (SIL OFL) but no static colour-tokens module. |
| `tokens-workday` | Apache-2.0 | **C** | — | License incompatibility — @workday/canvas-tokens-web is CC-BY-ND-4.0 (NoDerivatives), prohibiting redistribution of derivative works. Consumers should install the package directly under its own license. |

**Counts:** Tier A 1, Tier B 26, Tier C 3. Total 30. Tier C target (≤3) met.

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

1. **Phase 3.5b complete.** 27 of 30 token packs now extract from
   canonical upstream sources (1 Tier A + 26 Tier B). 3 Tier C packs
   are documented unresolvable: workday (license incompatibility),
   geist (no published token file), clarity (auto-generated tokens
   not published). Tier C target (≤3) met.
2. **Dogfooding test.** The Phase 3 gate includes: *"the operator can
   instruct Claude Code to build a real production page using only
   harvested packs and a custom token pack."* This needs an
   operator-driven turn. Suggested test: `vocab-marketing` +
   `tokens-geist` + `impl-tailwind` with a Harrow Haus
   `quoin.tokens.json`.
3. **Visual smoke tests** cannot be run in this environment.
   Operator-side, opening `03_harvest/packs/tokens-{name}/tokens.css`
   and rendering the canonical Phase-1 sample against each pack is
   the subjective check.
4. **Theme variants.** Should Phase 4 (docs) include theme-variant
   pickers, or should that work happen as a Phase 3a follow-up?

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
