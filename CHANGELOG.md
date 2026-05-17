# Changelog

All notable changes to the Quoin language, compiler, reference packs, and
docs site. Format follows [Keep a Changelog](https://keepachangelog.com/),
versioning follows pre-1.0 conventions until v1.0.0 publication.

## [Unreleased]

### Phase 3.5d — Per-pack source-faithful composite refinement (2026-05-17)

Extends the Phase 3.5b fidelity framework to refine composite tokens
(shadow, border, typography, transition) and atomic geometric tokens
(border widths, motion durations) from each design system's published
specs. Three packs received source-faithful composite refinement in
this round; the framework is in place for the remaining 27 packs to
be promoted whenever the upstream publishes extractable data.

#### Changed

- **`03_harvest/fidelity/extract.js`** — `processSpec()` now merges
  optional `semantic`, `composites`, and `fonts` fields from
  `spec.map()` into the saved `sources/<name>.json`, alongside the
  existing `base` color palette. Today's specs continue to work
  unchanged; specs that opt into composite refinement add the new
  return-shape fields.
- **`03_harvest/fidelity/specs/tailwind.js`** — extended with
  composite shadow recipes (sm/md/lg/xl/2xl/inner) matching Tailwind
  v4's published box-shadow scale, motion durations matching the
  utility-class set (75/150/200/300/500 ms), and border widths.
- **`03_harvest/fidelity/specs/material3.js`** — extended with the
  M3 elevation level 1-5 key-light/ambient-light shadow recipe per
  `m3.material.io/styles/elevation/tokens`, motion durations matching
  `md.sys.motion.duration.*` (50/150/300/500/1000 ms), and emphasized
  easing for the `transition-emphasis` composite.
- **`03_harvest/fidelity/specs/bootstrap.js`** — extended with the
  `$box-shadow*` variants from `scss/_variables.scss` verbatim, plus
  motion durations.

#### Status

- 3 packs refined: tokens-tailwind, tokens-material3, tokens-bootstrap.
- 27 packs remain on programmatic defaults from `build.js`. Each
  satisfies the canonical contract but doesn't yet ship source-
  specific composite values.
- A follow-up 3.5d-cont can extend the remaining specs as data is
  available — the framework no longer needs changes.

#### Validation

- All 40 packs pass strict validation.
- Compiler test suite 77/77 still passes.
- All three reference demos build cleanly.
- Docs site builds clean.

### Phase 3.5c — Geometric & typographic fidelity (2026-05-17)

Fills every harvested token pack with `$value` entries for the ~100
new canonical tokens that Phase 0.5 introduced. All 30 harvested
packs now declare a value for every name in the v1.0 namespace and
pass strict validation; the `"status": "pending-3.5c-fill"` flag is
removed.

#### Changed

- **`03_harvest/build.js`** — added DEFAULT_* tables for the new
  atomic tokens (border widths, focus-ring metrics, icon sizes,
  containers, blur, opacity, z-index, aspect ratios, font weights,
  motion-instant/slower, ease-linear/emphasized/spring, stroke
  solid/dotted) and DEFAULT_COMPOSITES for the seven shadow tokens,
  three border composites, thirteen typography composites, three
  transition composites, and the dashed strokeStyle composite.
- **`buildSemanticTokens`** applies the new defaults; sources can
  override any of them via `source.semantic[<name>]` (atomics) or
  `source.composites[<name>]` (composites).
- **`normaliseRef`** heuristic refined: dot-less refs (`{accent}`,
  `{text-recede}`, `{border}`, `{shadow-tint}`) resolve at top level;
  refs with dots (`{stone.50}`) get the `color.` prefix. Composite
  tokens can therefore reference other top-level semantic tokens
  without the awkward `{color.shadow-tint}` form.
- **`renderCssValue`** new function — converts composite DTCG values
  into single CSS-ready shorthand strings (box-shadow, border, font,
  transition) so each pack's tokens.css stays directly usable.
- **`buildManifest`** stops emitting `status: pending-3.5c-fill`.
- **04_docs/scripts/copy-assets.js** — Phase 0.5 transitional compat
  layer disabled (kept as documentation comment); tokens-geist now
  ships the full v1.0 namespace.

#### Pack obligations

After Phase 3.5c: every token pack (reference + harvested) supplies
a `$value` for all 164 canonical names. Strict validation passes
across the catalog; no warnings.

#### Caveat

The new-token values are programmatic defaults, not byte-faithful
extractions from each source system. A subsequent fidelity sweep
(3.5d) could refine each pack's shadow recipes, border widths, and
typography composites to match each source system's actual specs.
This is incremental polish, not a blocker — the namespace contract
is satisfied.

### Phase 0.5 — Canonical Namespace Expansion (2026-05-17)

**Major pre-1.0 spec change.** The canonical semantic-token namespace
in `00_spec/tokens.md` is expanded from its v0 sketch (~30 tokens across
4 DTCG types) to its v1.0 surface area (164 tokens across 11 DTCG types).
After this phase the namespace is **frozen** for v1.0 — further additions
become minor versions; renames and removals become major.

#### Added

- **35 new color tokens** beyond the original 22: `scrim`, `highlight`,
  `focus-ring`, `link`, `link-visited`, `link-hover`, `shadow-tint`.
- **Spacing scale expanded** with `space-5`, `space-10`, `space-20`,
  `space-inline-loose`.
- **Type sizes** now run xs → 5xl + display (added `4xl`, `5xl`).
- **New dimension families**: `border-width-*` (4), `focus-ring-width`
  + `focus-ring-offset`, `icon-size-*` (5), `container-*` (4),
  `blur-*` (3), `radius-xl`.
- **`number` type** (21 tokens): `opacity-*` (5), `z-*` (8),
  `aspect-*` (4), `leading-*` (4) — all unitless multipliers/indices
  per DTCG number type.
- **`fontWeight` type** (6 tokens) — 300/400/500/600/700/900.
- **Motion** expanded with `motion-instant` + `motion-slower`.
- **Easing** expanded with `ease-linear`, `ease-emphasized`,
  `ease-spring`.
- **Composite types** (DTCG 2025.10 §9):
  - `shadow` — 7 tokens (xs / sm / md / lg / xl / 2xl / inner)
  - `border` — 3 tokens (default / emphasis-stroke / divider)
  - `typography` — 13 tokens (display + 3 headlines + 3 titles + 3 bodies + 3 labels)
  - `transition` — 3 tokens (default / emphasis / fast)
- **`strokeStyle` type** — 3 tokens (solid / dashed / dotted).
- **Pack manifest `status` field** — `"pending-3.5c-fill"` marker that
  allows packs to emit validation warnings rather than errors during
  the Phase 3.5c transitional window.

#### Changed

- **`type-size-base` renamed to `type-size-md`** — aligns with the
  `xs / sm / md / lg / xl` shape used elsewhere in the namespace.
  Internal vocab packs and emit code updated mechanically.
- **`flattenDtcg`** now accepts object-shaped `$value` (composite
  tokens) and serialises them to JSON for the resolved-map. Reference
  resolution inside composites continues to work via the kebab-case
  reference regex.
- **`resolveReferences` regex** tightened to match only kebab-case
  identifier paths inside `{...}` so JSON-stringified composite values
  aren't mis-matched as references.
- **`finalizeTokenPack` and the compiler** now soft-fail for packs
  declaring `"status": "pending-3.5c-fill"` — missing canonical tokens
  emit warnings, and primitive-level token references fall back to
  `var(--name)` rather than throwing.

#### Pack obligations

After Phase 0.5: every token pack MUST supply a `$value` for all 164
canonical names. Reference pack `@quoin/tokens-baseline` is fully
populated; harvested packs (`03_harvest/packs/tokens-*`) are flagged
`pending-3.5c-fill` and will be filled in during Phase 3.5c.

#### Migration notes

- Vocabulary packs that referenced `--type-size-base` should switch to
  `--type-size-md`. (Internal reference packs updated.)
- New composite tokens (`text-display`, `text-headline-md`, etc.)
  provide a single-reference shortcut for primitives that previously
  composed 4-5 atomic tokens. Existing primitives continue to work; the
  composite refs are an optimisation.
- The pack manifest schema accepts a new optional `status` field with
  enum value `"pending-3.5c-fill"`. Other status values are not yet
  defined.

#### DTCG conformance

Quoin token packs now use DTCG 2025.10 types exactly — no Quoin-specific
extensions. Any DTCG 2025.10 tooling can read a Quoin pack.

Reference: <https://www.designtokens.org/tr/drafts/format/>.

---

### Phase 4.5 — Docs site refresh + playground REPL

See `PHASE_GATES.md` §Phase 4.5 for the full feature list. Highlights:

- New `/showcase/` page rendering one source against four token packs.
- Three-pane playground REPL with all 30 token packs, shareable URL
  state, token-efficiency badge, 10 example presets.
- Pack browser fidelity-tier badges + filter chips.
- Theme toggle in the wayfinder.

### Phase 3.5b — Comprehensive Fidelity Pass

27 of 30 harvested token packs upgraded to byte-faithful extraction
via three methods (static parse, algorithm execution, per-file). Three
documented Tier C packs (clarity, geist, workday) remain.

### Phase 3.5 — Token Fidelity Pass

Initial fidelity framework + 6 packs upgraded.

### Phases 0–4 + 5a–5d

Spec, compiler, reference packs, harvested packs, docs site, polish
(companion.css/js), variants, vocab-essentials + vocab-app-shell.
