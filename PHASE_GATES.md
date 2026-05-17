# Phase Gates

Exit criteria for each phase. A phase is complete when **every** criterion in its section is demonstrably met. The operator advances phases; agents stop at gates and request review.

---

## Phase 0 — Specification

**Output location:** `00_spec/`

**Exit criteria:**

- [ ] `00_spec/spec.md` exists and defines: authoring syntax, the attribute system, cascade rules, pack composition rules, compilation model.
- [ ] `00_spec/pack-format.md` exists and defines: pack manifest schema, directory structure, file format conventions for tokens / vocab / impl packs, versioning rules, npm naming conventions.
- [ ] `00_spec/primitives.md` exists and defines a minimum of 30 v1 semantic primitives across editorial, layout, navigation, state, content, and interactive categories. Each primitive has: name, role, accepted attributes, sample compiled output, example HTML usage.
- [ ] `00_spec/tokens.md` exists and defines: the three-layer token architecture, the canonical semantic token namespace all packs must implement, the DTCG-compatible token file format.
- [ ] All four documents cross-reference each other where rules interact.
- [ ] All four documents cite intellectual lineage where the source is non-obvious (Alexander, DTCG, Tailwind v4, DaisyUI, Swiss / Brutalist traditions).
- [ ] Operator review completed.

---

## Phase 1 — Reference compiler

**Output location:** `01_compiler/`

**Exit criteria:**

- [ ] Compiler is implemented and committed.
- [ ] Compiler successfully compiles all 30+ v1 primitives against the baseline token pack using the Tailwind implementation target.
- [ ] Vite plugin works end-to-end on a sample test project.
- [ ] Test suite covers: per-primitive compilation, pack composition, attribute resolution, cascade rules. 90%+ line coverage.
- [ ] Compiler emits standard HTML and CSS only — no runtime dependencies, no proprietary output formats.
- [ ] A sample reference site (one page) builds and renders correctly in current Chrome, Firefox, and Safari.
- [ ] Operator review completed.

---

## Phase 2 — Reference packs

**Output location:** `02_reference-packs/`

**Exit criteria:**

- [ ] `@quoin/tokens-baseline` exists: minimal neutral token pack (greys, system fonts, conservative spacing). Conforms to the canonical semantic token namespace.
- [ ] `@quoin/vocab-editorial` exists: full editorial primitive bundle.
- [ ] `@quoin/vocab-dashboard` exists: dashboard-oriented primitive bundle.
- [ ] `@quoin/impl-tailwind` exists: Tailwind v4 emitter.
- [ ] `@quoin/impl-raw-css` exists: raw CSS emitter (no framework dependency).
- [ ] All five packs validate against the pack manifest schema from phase 0.
- [ ] All five packs build successfully through the phase 1 compiler.
- [ ] Each pack has its own README explaining its scope, target users, and design decisions.
- [ ] Operator review completed.

---

## Phase 3 — Harvest

**Output location:** `03_harvest/`

**Exit criteria:**

- [ ] At minimum 40 harvested packs ship (30 token packs + 10 vocabulary packs). Stretch target 60+.
- [ ] Token packs include the full priority-one set: Material 3, Carbon, Polaris, Fluent 2, Primer, Atlassian, Lightning, Spectrum, Open Props, Radix Colors, plus at least 20 additional from Adele and other curated sources.
- [ ] Vocabulary packs include at minimum: shadcn/ui, Radix UI, Headless UI, Catalyst, DaisyUI, plus four additional domain-specific (dashboard, marketing, docs, forms).
- [ ] Every shipped pack preserves source attribution and license per the methodology in `03_harvest/README.md`.
- [ ] Every shipped pack passes the quality bar in `03_harvest/README.md`: active maintenance, license clarity, token coverage, defensible mapping, clean compile, recognizable visual smoke test.
- [ ] `03_harvest/REPORT.md` documents per-system mapping decisions, ambiguous translations, and any features that did not translate cleanly.
- [ ] `03_harvest/holding/` exists and contains any packs that failed the quality bar with notes.
- [ ] **Operator dogfooding test passes:** the operator can instruct Claude Code to build a real production page (e.g., a `harrow.haus` section) using only harvested packs and a custom token pack, and Claude Code produces production-grade output without writing custom CSS.
- [ ] Operator review completed.

---

## Phase 3.5 — Token Fidelity Pass

**Output location:** `03_harvest/fidelity/` (framework) + per-pack manifest annotations (`attribution.fidelityTier`, `attribution.sourceCommit`).

**Goal:** upgrade harvested token packs from interpretation to extraction — byte-faithful values harvested from each source design system's official token files, mapped onto Quoin's canonical semantic namespace. The canonical namespace is fixed; only the values within it change.

**Exit criteria:**

- [x] Fidelity extraction framework exists (per-source specs, format-aware parsers, OKLCH conversion via culori).
- [x] All 30 token packs declare `attribution.fidelityTier` ∈ {A, B, C} in their manifest.
- [x] All 30 packs still pass `03_harvest/validate.js` after extraction (no regressions in canonical namespace coverage).
- [x] All 30 packs still build cleanly through the Phase 1 compiler (compiler test suite 77/77).
- [x] Demo build (`02_reference-packs/demos/build.js`) still passes for all three demos.
- [x] `03_harvest/REPORT.md` updated with new Tier A/B/C classification and a per-pack table.
- [x] Per-pack harvest notes document the extraction source, commit/version, and any mapping decisions.
- [ ] **≤5 Tier C packs** (current state: 24 Tier C — stop condition triggered; awaiting operator decision per the ask in `03_harvest/REPORT.md`).
- [ ] Visual smoke tests rendered for each pack against the showcase-tailwind demo.
- [ ] Operator review completed.

**Status:** **partial** — framework shipped, 6 packs upgraded (1 A + 5 B), 24 packs awaiting per-source URL discovery and format-specific extraction in a Phase 3.5b follow-up. Stop condition triggered; operator decision required before continuation.

---

## Phase 4 — Documentation

**Output location:** `04_docs/`

**Exit criteria:**

- [ ] Docs site builds and runs locally.
- [ ] Spec reference is generated from `00_spec/` (auto-generated, not hand-duplicated).
- [ ] A live playground exists: user types semantic markup, sees compiled output.
- [ ] A pack browser exists that lists all packs published under `@quoin/*` on npm.
- [ ] Getting-started guide and migration guides (from Tailwind, from DaisyUI) exist.
- [ ] All documentation has been reviewed for accuracy against the spec.
- [ ] Operator review completed.

---

## Phase 5 — Launch

**Output location:** `05_launch/`

**Exit criteria:**

- [ ] All packs published to npm under `@quoin/*` scope.
- [ ] Landing page is deployed to a production domain.
- [ ] Launch essay is published.
- [ ] Demo video shows semantic input → multi-pack output across at least three different aesthetic packs.
- [ ] HN post and X thread drafts exist and are ready to ship on operator's signal.
- [ ] All phase work is pushed to `github.com/harrowhaus/quoin` on `main`, with a release tag at the launch commit.
- [ ] Operator final approval before public launch.

---

## What "operator review completed" means

The operator has read the phase's output, run any provided demos or tests themselves, and explicitly approved advancement. A phase is not complete simply because an agent reports completion. The operator's sign-off is the final criterion at every gate.
