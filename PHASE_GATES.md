# Phase Gates

Exit criteria for each phase. A phase is complete when **every** criterion in its section is demonstrably met. The operator advances phases; agents stop at gates and request review.

---

## Phase 0.5-extension — New Pack Types

**Output location:** `00_spec/{pack-types,theme-pack,template-pack,pattern-pack,icon-pack}.md` (specs), `01_compiler/src/schema/pack-manifest.json` + `types.ts` + `pack-loader.ts` + `compiler.ts` + `errors.ts` + `index.ts` (compiler), `02_reference-packs/{theme-baseline-reference,pattern-button-reference,icons-reference,template-blank-reference}/` (4 reference packs), `02_reference-packs/validate-extension.js` (validator), `01_compiler/test/extension.test.ts` (tests).

**Goal:** add 4 new pack types (theme / template / pattern / icon) to the distribution model alongside the existing 3 (token / vocabulary / implementation). Ship spec docs, manifest schema, compiler hooks, reference packs, and tests in a single phase.

**Exit criteria:**

- [x] Spec docs written for all 4 new pack types + a catalogue (`pack-types.md`).
- [x] `pack-manifest.json` schema extended with `type` enum + 4 discriminated `if/then` branches.
- [x] Compiler `types.ts` adds `ThemePack`, `PatternPack`, `IconPack`, `IconDefinition` interfaces and `themePack` / `patternPacks` / `iconPacks` on `CompileOptions`.
- [x] `loadThemePack`, `loadPatternPack`, `loadIconPack` implemented and exported.
- [x] Theme override resolution applied at compile time (between token pack and project tokens).
- [x] Pattern primitives merged into the same primitive registry as vocabulary primitives.
- [x] Icon-pack tag resolution (default `icon`) intercepts before primitive lookup; size, aria-label, role, decorative handling all work.
- [x] 4 reference packs ship under `02_reference-packs/` with manifests, payloads, READMEs, LICENSEs.
- [x] `validate-extension.js` passes all checks for the new packs.
- [x] Compiler test suite — 96/96 passes (was 77/77; +19 new tests for theme/pattern/icon).
- [x] Original `validate.js` still passes 80/80 checks.
- [x] All 40 harvested packs still pass strict validation.
- [x] All 3 reference demos still build cleanly.
- [x] Docs site builds clean.
- [ ] Operator review.

**Status:** complete pending operator review.

---

## Phase 3.5d — Per-pack source-faithful composite refinement

**Output location:** `03_harvest/fidelity/extract.js` (framework extension), `03_harvest/fidelity/specs/{tailwind,material3,bootstrap}.js` (extended specs), `03_harvest/sources/{tailwind,material3,bootstrap}.json` (composite + semantic override fields).

**Goal:** refine programmatic 3.5c defaults to source-faithful values per pack. Targets the canonical composite tokens (shadow, border, typography, transition) and atomic geometric/motion tokens.

**Exit criteria:**

- [x] Fidelity framework accepts `semantic`, `composites`, `fonts` overrides from `spec.map()` return — not just `base`.
- [x] At least 3 packs refined with source-faithful composite values.
- [x] All 40 packs still pass strict validation.
- [x] Compiler test suite 77/77 still passes.
- [x] Demo build 3/3 still passes.
- [x] Docs site builds clean.
- [ ] Optional continuation (3.5d-cont) — extend specs for the medium-feasibility candidates (open-props, mantine, uswds, polaris, spectrum, mui, carbon, fluent, atlassian).
- [ ] Operator review.

**Status:** complete — framework + 3 packs refined (tailwind, material3, bootstrap). The remaining 27 packs satisfy the canonical contract via 3.5c programmatic defaults; per-pack source refinement is incremental polish that can land any time without blocking launch.

---

## Phase 3.5c — Geometric & typographic fidelity

**Output location:** `03_harvest/build.js` (expanded DEFAULT_* tables + composite emission), all 30 packs in `03_harvest/packs/tokens-*/` regenerated with full v1.0 namespace.

**Goal:** populate every harvested token pack with `$value` entries for the ~100 new canonical tokens that Phase 0.5 added. Remove the `pending-3.5c-fill` flag.

**Exit criteria:**

- [x] All 30 harvested token packs declare a `$value` for every name in `00_spec/tokens.md` §3.
- [x] `pending-3.5c-fill` status removed from every pack manifest.
- [x] Strict validation passes for all 40 packs (no warnings).
- [x] Compiler test suite 77/77 still passes.
- [x] Demo build (`02_reference-packs/demos/build.js`) still passes.
- [x] Docs site builds clean; transitional compat layer disabled.
- [ ] Optional follow-up (3.5d) — refine per-pack shadow recipes / border widths / typography composites to match each source system's actual specs.
- [ ] Operator review.

**Status:** complete. v1.0 namespace fully populated across the catalog.

---

## Handoff cross-check (2026-05-17)

A `quoin-handoff` package was delivered describing the v1.0 launch plan. Mapping its phases against shipped work:

| Handoff phase | Status |
|---------------|--------|
| **Phase 0.5 — Canonical Namespace Expansion** | **Done** via Phase 0.5 + handoff additive. 175-token namespace across 11 DTCG types. Identity typography (Junicode + Ranade + Monaspace + Departure Mono) wired into `tokens-baseline`. |
| **Phase 3.5c — Composite Token Fidelity** | **Done** via Phase 3.5c + 3.5d. All 30 packs validate against the expanded namespace. 3 packs (tailwind, material3, bootstrap) refined with source-faithful composite values; 27 on programmatic defaults. |
| **Phase 0.5-extension — New pack types** | **Done** — 4 pack types (theme/template/pattern/icon) defined; manifest schema extended; compiler hooks land theme override resolution, pattern registry merge, and icon resolution; 4 reference packs ship; 96/96 tests pass. |
| **Phase Theme Packs** (10 packs) | Unblocked — next phase. Ship 9 additional theme packs against the harvested token catalogue. |
| **Phase Template Packs** (10 packs) | Unblocked — can ship after theme packs land. |
| **Phase Pattern Packs** (~80–150) | Unblocked — depends on impl-pack pattern emission story (Phase 5a-cont / 5c-cont). |
| **Phase Icon Packs** (17–18) | Blocked on 0.5-extension. |
| **Phase 6 — Marketing site** | Independent; can start after themes. |
| **Phase 6.5 — harrow.haus rebuild** | Independent; can start after templates. |
| **Phase 7 — Examples gallery** | Blocked on templates + patterns. |
| **Phase 8 — Docs refresh** | Independent. |
| **Phase 9 — Blog + changelog** | Independent. |
| **Phase 10 — Showcase wall** | Blocked on all content phases. |
| **Phase 5e — CLI + npm publish + launch** | Final. Blocked on all prior. |

**Next blocking phase**: `handoff/prompts/02_phase_0.5_extension_new_pack_types.md` — define theme, template, pattern, icon pack types in spec + manifest schemas + validator support.

---

## Phase 0.5 — Canonical Namespace Expansion

**Output location:** `00_spec/tokens.md` (rewritten), `01_compiler/src/token-resolver.ts` (expanded canonical list), `02_reference-packs/tokens-baseline/` (full reference implementation), all 30 harvested token packs flagged `"status": "pending-3.5c-fill"`.

**Goal:** expand the canonical semantic-token namespace from the v0 sketch (~30 tokens across 4 DTCG types) to its v1.0 surface area (164 tokens across 11 DTCG 2025.10 types). Freeze the namespace at v1.0 after this phase.

**Exit criteria:**

- [x] `00_spec/tokens.md` rewritten with full 164-token namespace organized by DTCG type, with composite-structure documentation in §4.
- [x] Compiler `CANONICAL_SEMANTIC_TOKENS` list expanded; `flattenDtcg` handles composite `$value` objects; `resolveReferences` reference regex tightened.
- [x] Pack-manifest schema accepts `"status": "pending-3.5c-fill"`.
- [x] Compiler + pack-loader soft-fail for `pending-3.5c-fill` packs (warning instead of throwing for missing canonical tokens; `var(--name)` fallback for primitive-level token refs).
- [x] `tokens-baseline` reference pack fully populated for all 164 names.
- [x] All 30 harvested token packs flagged `pending-3.5c-fill`.
- [x] Compiler test suite 77/77 still passes.
- [x] Demo build (`02_reference-packs/demos/build.js`) still passes.
- [x] Validator (`03_harvest/validate.js`) recognises `pending-3.5c-fill` status — outputs warnings rather than failures.
- [x] CHANGELOG.md created with this phase as the first entry.
- [ ] Operator review completed.

**Status:** complete. Namespace frozen at v1.0 surface area; Phase 3.5c (geometric & typographic fidelity) is the next phase to populate harvested packs with values for the new tokens.

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
- [x] **≤5 Tier C packs** (final: 3 Tier C — within Phase 3.5b's tighter ≤3 target).
- [ ] Visual smoke tests rendered for each pack against the showcase-tailwind demo.
- [ ] Operator review completed.

**Status:** **complete** via Phase 3.5b. Framework shipped (Methods A + B + C), 27 packs upgraded (1 A + 26 B), 3 Tier C with documented unresolvable reasons.

---

## Phase 3.5b — Comprehensive Fidelity Pass

**Output location:** `03_harvest/fidelity/specs/` (per-pack specs) + `03_harvest/fidelity/runner.js` (Method A/B/C dispatcher).

**Goal:** bring every harvested token pack to byte-faithful fidelity using three extraction methods. Target: 0-3 Tier C packs.

**Extraction methods:**

- **Method A** — static fetch + format parser. The original 3.5 path. Extended with new parsers: `primer-json5` (Primer's nested `$value.hex` shape), `value-wrapped-ts` (Chakra v3 / Style Dictionary `name: { value: '#hex' }`).
- **Method B** — algorithm execution at extract time. Authorized to `npm install` source-system generation libraries as dev dependencies of the harvest pipeline. Used for Material 3 (`@material/material-color-utilities`), Ant Design (`@ant-design/colors`), Carbon (`@carbon/colors`), Polaris (`@shopify/polaris-tokens`), Atlassian (`@atlaskit/tokens`), Spectrum (`@adobe/spectrum-tokens`), shadcn (custom fetch + HSL→OKLCH conversion), GOV.UK (Sass-map regex pass), USWDS (per-family SCSS).
- **Method C** — per-file structured extraction. For systems whose values are static but split across multiple files in patterns that defeat concatenated parsing. Used for MUI (per-colour modules) and Orbit (per-family palette JSON).

**Exit criteria:**

- [x] All 30 token packs declare `attribution.fidelityTier` ∈ {A, B, C} in their manifest.
- [x] **≤3 Tier C packs** (final: clarity, geist, workday — all with documented unresolvable reasons).
- [x] All 30 packs still pass `03_harvest/validate.js`.
- [x] All 30 packs still build cleanly through the Phase 1 compiler.
- [x] Compiler test suite still passes (77/77).
- [x] Demo build (`02_reference-packs/demos/build.js`) still passes for all three demos.
- [x] New parsers documented in `03_harvest/fidelity/README.md`.
- [x] `03_harvest/REPORT.md` updated with new tier table + method per pack.
- [ ] Visual smoke tests rendered for each pack against the showcase-tailwind demo (operator-side; cannot run in this env).
- [ ] Operator review completed.

**Final counts:** Tier A 1 (tailwind), Tier B 26, Tier C 3 (clarity, geist, workday).

---

## Phase 4 — Documentation

**Output location:** `04_docs/`

**Exit criteria:**

- [x] Docs site builds and runs locally.
- [x] Spec reference is generated from `00_spec/` (auto-generated, not hand-duplicated).
- [x] A live playground exists: user types semantic markup, sees compiled output.
- [x] A pack browser exists that lists all packs published under `@quoin/*` on npm.
- [x] Getting-started guide and migration guides (from Tailwind, from DaisyUI) exist.
- [x] All documentation has been reviewed for accuracy against the spec.
- [ ] Operator review completed.

---

## Phase 4.5 — Docs site refresh + playground REPL

**Output location:** `04_docs/showcase/` (new), `04_docs/src/playground/` (rewritten), `04_docs/src/packs/` (filters + tier badges), `04_docs/public/theme-toggle.js` (new).

**Goal:** bring the docs site to the standard of a modern language REPL. Showcase the strongest claim (one source, many aesthetics) on its own page. Surface fidelity tiers prominently.

**Exit criteria:**

- [x] New `/showcase/` page — one Quoin source rendered against 4 token packs (Tailwind, Radix, Geist, Material 3) live in the browser.
- [x] Playground: three-pane layout (source / compiled HTML / preview).
- [x] Playground: all 30 token packs available with fidelity-tier badges.
- [x] Playground: 10-preset example gallery (article, hero, pricing, dashboard, app-shell, navigation, form, empty-state, alert, blank).
- [x] Playground: shareable URL state — encode source + active packs in URL hash.
- [x] Playground: token-efficiency badge (Quoin tags → Tailwind classes ratio).
- [x] Pack browser: fidelity-tier badges + filter chips (Type, Tier, License).
- [x] Pack browser: "Try in playground" deep-link encodes pack into playground URL.
- [x] Theme toggle in wayfinder — switch between Default / Tailwind / Radix skins, persisted to localStorage.
- [x] Migration guides updated with "Closest Quoin pack to your current stack" section.
- [x] Build clean; compiler tests 77/77; harvest validate 40/40; demos 3/3.
- [ ] Operator review completed.

**Status:** complete.

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
