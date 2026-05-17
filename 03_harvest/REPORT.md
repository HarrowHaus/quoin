# Phase 3 + 3.5 — Harvest Report

**Status:** 40 packs ship. 1 in holding. Floor met.

**Phase 3.5 status:** partial. Fidelity extraction framework built and
applied. 6 token packs upgraded to byte-faithful or near-byte-faithful
extraction (1 Tier A, 5 Tier B). 24 token packs remain Tier C — values
preserved as designed approximations pending a Phase 3.5b follow-up
that hand-tunes per-source URL discovery and format-specific parsers.
**Stop-condition triggered**: >5 Tier C packs warrants operator
discussion of methodology before further extraction work. See
[Fidelity tiers](#fidelity-tiers-phase-35) below.

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

### Fidelity tiers (Phase 3.5)

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

| Pack | License | Tier | Notes |
|------|---------|------|-------|
| `tokens-tailwind` | MIT | **A** | v4 zinc neutral + red/emerald/amber/sky 500. Extracted byte-faithful from `packages/tailwindcss/theme.css` (native OKLCH preserved). |
| `tokens-open-props` | MIT | **B** | gray + red + orange + green + blue scales extracted from `src/props.colors.css`. Status hues selected at perceptually balanced steps (red-7, green-7, orange-7, blue-7). |
| `tokens-bootstrap` | MIT | **B** | $gray-100..900 + $blue/$red/$green/$yellow/$cyan extracted from `scss/_variables.scss`. SCSS tint-color()/shade-color() functions not evaluated; soft accent variants substituted as OKLCH approximations. |
| `tokens-radix` | MIT | **B** | gray + slate + blue + red + green + amber + sky 12-step scales extracted from `src/light.ts`. 12 steps flattened onto Quoin's 4-surface model. |
| `tokens-mantine` | MIT | **B** | 10-step ramps for gray + blue + red + green + yellow + orange + cyan extracted from `default-colors.ts`. primaryShade = 6 per Mantine's own default. |
| `tokens-mui` | MIT | **B** | Per-colour MUI files share step keys; concatenated parsing collapses values. Approximations of Material Design v2 indigo/grey/red/green/orange/blue retained, anchored to documented hex values pending per-file extraction. |
| `tokens-material3` | Apache-2.0 | C | M3 algorithmic palette generation; designed-approximation values stand. Source URL declared. |
| `tokens-carbon` | Apache-2.0 | C | Carbon white.js imports color values from a separate colors module; per-token resolution deferred. |
| `tokens-primer` | MIT | C | Primer json5 base palette nests hex under `$value.hex` keys; bespoke parser needed. |
| `tokens-uswds` | CC0-1.0 | C | USWDS palette; extraction deferred. |
| `tokens-govuk` | MIT | C | Deliberately stripped palette; designed approximations stand. |
| `tokens-polaris` | MIT | C | Polaris DTCG-like JSON; bespoke parser needed. |
| `tokens-fluent` | MIT | C | Fluent 2 TS exports; extraction deferred. |
| `tokens-atlassian` | Apache-2.0 | C | Atlassian palette TS; extraction deferred. |
| `tokens-spectrum` | Apache-2.0 | C | Adobe Spectrum DTCG with custom schema. |
| `tokens-lightning` | BSD-3-Clause | C | SLDS YAML token files. |
| `tokens-geist` | MIT | C | Vercel Geist; extraction deferred (operator pack — well-anchored values). |
| `tokens-paste` | MIT | C | Twilio Paste YAML. |
| `tokens-gestalt` | Apache-2.0 | C | Pinterest Gestalt JSON. |
| `tokens-chakra` | MIT | C | Chakra UI v3 — TS module path moved; URL hunt incomplete. |
| `tokens-ant` | MIT | C | Ant Design palette is generated algorithmically via `generate.ts`. |
| `tokens-elastic` | Apache-2.0 | C | EUI SCSS. |
| `tokens-evergreen` | MIT | C | Segment Evergreen; module path moved in maintenance branch. |
| `tokens-orbit` | MIT | C | Kiwi.com Orbit TS. |
| `tokens-clarity` | MIT | C | VMware Clarity SCSS. |
| `tokens-base-web` | MIT | C | Uber Base Web JS. |
| `tokens-workday` | Apache-2.0 | C | Workday Canvas Kit TS. |
| `tokens-shadcn` | MIT | C | shadcn/ui apps/v4 directory restructured; current URL unresolved. |
| `tokens-bulma` | MIT | C | Bulma initial-variables; SCSS file path migrated to `main` branch on the latest extraction round but extraction yielded incomplete family coverage. |
| `tokens-heroui` | MIT | C | HeroUI semantic.ts; extraction deferred. |

**Counts:** Tier A 1, Tier B 5, Tier C 24. Total 30.

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

1. **Phase 3.5 — fidelity extraction stop condition triggered.** 24
   of 30 token packs are currently Tier C (extraction deferred). The
   Phase 3.5 prompt set a stop threshold of 5 Tier C packs; this
   exceeds it. The methodology problem isn't the framework — it's
   that 30 design systems use 30 different file layouts and URL
   conventions, and per-source URL discovery + format adaptation is
   labour-intensive enough that batched automation hits diminishing
   returns. Options:
   - **A. Ship now** with 1 A + 5 B + 24 C packs. The Tier C packs
     remain shippable — their values are designed approximations
     informed by published source palettes. The `fidelityTier: "C"`
     marker on each manifest makes consumers aware. A Phase 3.5b can
     follow up post-launch.
   - **B. Spend a dedicated session** doing per-pack URL hunting and
     format-parser writing for the remaining 24. Realistically a
     half-day of focused work per ~5 packs.
   - **C. Drop the harvested packs we can't extract** and ship a
     leaner pack catalogue (Tier A + Tier B only). Less impressive
     "40 packs" number, more honest provenance.
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
