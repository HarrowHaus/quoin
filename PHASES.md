# Quoin Phase Ledger

This file is the single source of truth for phase status across the Quoin project. It supersedes scattered references in CONSOLIDATION reports, DECISIONS_UPDATES, and session-closing reports. Every future session that opens, closes, or modifies a phase updates this file in its closing batch.

**Last updated:** Session 4 closing — Phase 22 complete (2026-05-20)

---

## Status legend

- ✅ **Complete** — closed cleanly, all deliverables shipped, operator-approved
- 🟢 **In progress** — actively executing
- ⏸️ **Paused** — partially complete, waiting on operator decision or dependency
- 🟡 **Queued** — next in sequence, not started
- ⏳ **Deferred** — operator-deferred to later phase
- 🔄 **Ongoing** — never closes (e.g., catalog extension, aesthetic packs)

---

## Phase index (execution order)

### Phase 0 — Specification

**Status:** ✅ Complete
**Goal:** Author the canonical spec documents: tokens, primitives, pack format, pack types.
**Output:** `00_spec/` — `tokens.md`, `primitives.md`, `pack-format.md`, `pack-types.md`, `theme-pack.md`, `template-pack.md`, `pattern-pack.md`, `icon-pack.md`.
**Closure ref:** documented in `PHASE_GATES.md` § Phase 0.

### Phase 0.5 — Canonical Namespace Expansion

**Status:** ✅ Complete
**Goal:** Expand token namespace from ~30 to 175 canonical tokens across 11 DTCG 2025.10 types. Wire identity typography (Junicode + Ranade + Monaspace + Departure Mono) into `tokens-baseline`.
**Output:** `00_spec/tokens.md` v1.0; `02_reference-packs/tokens-baseline/`. Namespace frozen.

### Phase 0.5-ext — New Pack Types

**Status:** ✅ Complete
**Goal:** Add 4 pack types (theme / template / pattern / icon) to the existing 3 (token / vocabulary / implementation). Compiler hooks for theme override resolution + pattern primitive registration + icon resolution. 4 reference packs shipped.
**Output:** spec docs in `00_spec/`; reference packs in `02_reference-packs/`; 19 new compiler tests (96 total).

### Phase 1 — Reference compiler

**Status:** ✅ Complete (Phase 5e launch pending)
**Goal:** TypeScript ESM compiler with Vite plugin and browser entry. Token resolution, vocabulary mapping, impl emission.
**Output:** `01_compiler/` — 96 tests passing.

### Phase 2 — Reference packs

**Status:** ✅ Complete
**Goal:** Ship 7 reference packs (1 token, 4 vocabulary, 2 implementation).
**Output:** `02_reference-packs/{tokens-baseline, vocab-{editorial,dashboard,essentials,app-shell}, impl-{raw-css,tailwind}}/`.

### Phase 3 — Harvest

**Status:** ✅ Complete
**Goal:** Ship 40 harvested packs (30 token + 10 vocabulary) from real production design systems.
**Output:** `03_harvest/` — 30 token packs (Material 3, Carbon, Polaris, Fluent, Primer, Geist, Tailwind defaults, Bootstrap, Mantine, USWDS, and 20 more) + 10 vocab packs.

### Phase 3.5 — Token Fidelity Pass

**Status:** ✅ Complete (stop condition triggered → Phase 3.5b)
**Goal:** Byte-faithful extraction framework + per-pack `fidelityTier` annotation (A/B/C).
**Output:** Initial result 1 Tier A + 5 Tier B + 24 Tier C; triggered comprehensive pass.

### Phase 3.5b — Comprehensive Fidelity Pass

**Status:** ✅ Complete
**Goal:** Three extraction methods (static parse, algorithm exec, per-file). Upgrade ≥27 packs from Tier C.
**Output:** 1 Tier A + 26 Tier B + 3 Tier C (clarity, geist, workday documented as unresolvable). See `03_harvest/REPORT.md`.

### Phase 3.5c — Geometric & typographic fidelity

**Status:** ✅ Complete
**Goal:** All 30 harvested packs filled with `$value` for every v1.0 canonical token; strict validation passes catalog-wide.

### Phase 3.5d — Per-pack source-faithful composite refinement

**Status:** ⏸️ Paused (framework + 3 packs done; remaining 27 on programmatic defaults)
**Goal:** Refine per-pack composite (shadow, border, typography, transition, strokeStyle) and atomic (border-widths, font-weights, motion durations, easings) values to match each source system's actual published specs.
**Closure dependency:** No blocker; can resume any time. 27 packs continue on Phase 3.5c programmatic defaults until refined.
**Reference:** plan file at `~/.claude/plans/cd-01-compiler-cd-warm-cray.md` (the Phase 3.5d plan that was authored but not fully executed).

### Phase 4 — Documentation

**Status:** ✅ Complete
**Goal:** Documentation site with playground, pack browser, migration guides.
**Output:** `04_docs/` — production-ready site.

### Phase 4.5 — Docs site refresh + playground REPL

**Status:** ✅ Complete
**Goal:** New showcase page, three-pane playground REPL with all 30 token packs, shareable URLs, token-efficiency badge, fidelity-tier filters, theme toggle.

### Phase 5a–5d — Visual maturity + interactive behaviors + vocab pack additions

**Status:** ✅ Complete
**Goal:** Visual polish (companion.css), per-primitive variants, companion.js for interactive behaviors (tab-panels keyboard nav, disclosure animation, modal trigger, Cmd-K command menu), 2 additional vocab packs (essentials + app-shell).

### Phase 5e — Launch

**Status:** 🟡 Queued
**Goal:** npm publication, landing page, launch essay, demo video, HN/X drafts, release tag.
**Closure dependency:** Phase 23 (compiler IR architecture) may need to land first depending on operator scoping.
**Reference:** `05_launch/README.md` lists the deliverables.

### Phase Themes / Aesthetic Packs v1.0

**Status:** ✅ Complete (renamed from "Themes" per D.52, 2026-05-18)
**Goal:** Ship 10 aesthetic packs covering the 2026 trend landscape.
**Output:** `02_reference-packs/themes/{vellum, graphite, aurora, letterpress, terminal, broadsheet, bloom, arcade, prism, vapor}/` — each with light + dark + P3 modes, cross-diversity verified.

### Phase Patterns v1.0 (Catalog Extension, original P0 + P1 batches)

**Status:** ✅ Complete (superseded by Phase 22 consolidations + 🔄 ongoing extension)
**Goal:** Ship the initial P0 + P1 pattern catalog — 22 specimens shipped pre-Cons. 1.
**Output:** 22 patterns at `02_reference-packs/patterns/`. Phase 22 then consolidated 5 hero-* packs into 1 unified `pattern-hero` (Cons. 3, 2026-05-20), reducing the count to 18 distinct packs.

### Phase 22 — Unification Audit

**Status:** ✅ Complete (all 9 consolidations shipped 2026-05-20)
**Goal:** Audit catalog for duplication and architectural drift; consolidate 9 identified workstreams. Each consolidation: audit → proposal → batched implementation → closing report.

| Cons. | Scope | Status | Closing commit | Report |
|---|---|---|---|---|
| 1 | Spacing tokens single source | ✅ Complete | `111a240` (5 batches) | (inline closing-commit message; no standalone REPORT.md) |
| 2 | Type-scale tokens single source (Option D — font-family architecture) | ✅ Complete | `c724d95` | `02_reference-packs/CONSOLIDATION-2-REPORT.md` |
| 3 | Hero anatomy variants (5 packs → 1 unified) | ✅ Complete | `f94a662` | `02_reference-packs/CONSOLIDATION-3-REPORT.md` |
| 4 | Nav variants (4 packs → 1 unified) | ✅ Complete (Session 3) | `0e41738` | `02_reference-packs/CONSOLIDATION-4-REPORT.md` |
| 5 | Label primitive (badge / tag / status-pill / chip → prim-label) | ✅ Complete (Session 3) | `b08e2ac` | `02_reference-packs/CONSOLIDATION-5-REPORT.md` |
| 6 | Sequence primitive (breadcrumb / numbered-list / sidebar-list → prim-sequence) | ✅ Complete (Session 4) | _this session_ | `02_reference-packs/CONSOLIDATION-6-REPORT.md` |
| 7 | Decoration overlay (paper-grain-overlay + surface-decoration → prim-decoration-overlay) | ✅ Complete (Session 4) | _this session_ | `02_reference-packs/CONSOLIDATION-7-REPORT.md` |
| 8 | Searchable-list (command-palette-content + list-with-search → prim-searchable-list) | ✅ Complete (Session 4) | _this session_ | `02_reference-packs/CONSOLIDATION-8-REPORT.md` |
| 9 | Boeing Watch boundary audit | ✅ Complete (Session 4 — no-op closure; boundary integrity verified) | _this session_ | `02_reference-packs/CONSOLIDATION-9-REPORT.md` |

**Architectural locks shipped with Cons. 3 (v3.G.15–v3.G.20):** `PHASE_GATES.md` § Phase 22 — Consolidation 3 architectural locks.

**Cons. 4 partial-execution notes (Session 2):**
- Audit + Proposal landed; all 4 hard-halt conditions cleared
- Pack scaffolding shipped (`02_reference-packs/patterns/nav/`): manifest, primitives JSON (21 entries: 2 mandatory + 17 conditional + nav-item + nav-subnav), README anatomy tables, package.json, LICENSE
- 1 of 4 variant examples migrated (`examples/editorial.html`)
- 3 of 4 variant examples copied but not yet migrated (marketing.html, app-chrome.html, docs.html) — each requires `data-variant` collision resolution (existing per-pack `data-variant` values rename to `data-mode` per Cons. 3 Q3 cascade)
- Gate state: 26 specimens green (no regressions). New nav/* files pass v3.G.15-G.17 trivially because 'nav' not yet in enforced sets (deferred to closing batch).
- Next-session resume point: complete the 3 remaining specimen migrations, then closing batch (deprecated dir removal + gate enforcement extension + reports + discoverability updates).

### Phase 22.5 — Discoverability Infrastructure

**Status:** ✅ Complete
**Goal:** Ship public-facing README + LLM consumption files + shadcn-compatible registry + catalog-extension skill template.
**Output:** `README.md`, `LICENSE`, `llms.txt`, `llms-full.txt`, `registry.json`, `docs/screenshots/`, `skills/quoin-pattern-extension-author.md`.
**Closure ref:** commit `5cf8b2b` (2026-05-20). No formal phase number was assigned at the time; retroactively numbered 22.5 in this ledger because it ships between Phase 22's mid-execution (after Cons. 3) and Phase 23.
**Operator action item still outstanding:** 19 screenshots per `docs/screenshots/README.md` checklist.

### Phase 23 — Compiler IR Architecture

**Status:** 🟡 Queued
**Goal:** Refactor compiler with HIR (High-level Intermediate Representation) inspired by React Compiler (Oct 2025) — `BuildQHIR → EnterSSA → InferTokenTypes → InferVariantScopes → ReactiveAesthetic → BackendCodegen` pipeline.
**Closure dependency:** Phase 22 must close first (catalog architecture must be stable before compiler IR can target it cleanly).
**Reference:** unification dossier `compass_artifact_wf-7fef8f90-73e7-412a-90b7-9bd9f5d55ef2_text_markdown.md` § 3.1.

### Phase 24 — Build Pipeline Integrations

**Status:** 🟡 Queued
**Goal:** Vite plugin (exists in MVP form), Webpack loader, Rollup plugin, esbuild plugin. Tooling integrations beyond the reference Vite path.
**Closure dependency:** Phase 23.

### Phase 25 — MCP Server + Distribution

**Status:** 🟡 Queued
**Goal:** Model Context Protocol server exposing the catalog to MCP-aware clients. npm publication under `@quoin/*` scope.
**Closure dependency:** Phase 23.

### Phase 26 — Standards Engagement

**Status:** ⏳ Deferred
**Goal:** DTCG working group participation, W3C-track standardization of relevant Quoin innovations.
**Operator note:** No timing dependency; operator-deferred until project gains adoption traction.

---

## Ongoing workstreams (never close)

### Catalog Extension (Editorial, App, Marketing, Data, Primitives)

**Status:** 🔄 Ongoing
**Goal:** Continually extend the pattern catalog via the per-pattern skill template (`skills/quoin-pattern-extension-author.md`). Until 50-pattern plateau (D.73), core-team-only.
**Active categories:** editorial (queued for Block B of Session 2), marketing, application, forms, data, primitives.

### Templates layer

**Status:** 🔄 Ongoing
**Goal:** Ship page templates that compose existing patterns into ready-to-deploy pages.
**First batch queued:** Session 2 Block C — `template-landing-saas`, `template-docs-site`, `template-blog-with-prose`.
**Closure dependency for first batch:** Phase 22 Cons. 4 (nav unification) — templates compose nav variants, so unified nav must exist first.

### Aesthetic Packs (beyond v1.0)

**Status:** 🔄 Ongoing
**Goal:** Ship aesthetic packs that target the variant axes declared by pattern packs (per v3.G.20). First such pack queued: `@quoin/aesthetic-manuscript-future` covering Junicode 2 + Ranade + Monaspace per the Cons. 2 Option D architecture.
**Closure dependency:** Phase 22 closure (variants in pattern packs need to be stable before aesthetic packs target them).

---

## Session 4 outcome (2026-05-20) — Phase 22 closed

Brief: optionalPeerPacks spec formalization (Prelude) + Cons. 6 + Cons. 7 + Cons. 8 + Cons. 9 + Phase 22 closure ritual.

**Shipped:**
- **Prelude — optionalPeerPacks formalized.** `00_spec/pack-format.md` §3.3 + §3.4 (JSON Schema) updated to recognize the field. `01_compiler/src/schema/pack-manifest.json` updated to match. New gate v3.G.21 documented in `PHASE_GATES.md`.
- **Cons. 6 — Sequence primitive.** `@quoin/prim-sequence` (4 variants: breadcrumb / ordered-list / unordered-list / sidebar-vertical). Consumer migrations via dual-class (nav-app-chrome's nav-breadcrumb, nav-docs's nav-sidebar-section). Gate extension. Manifest declares prim-sequence as optionalPeerPacks on nav.
- **Cons. 7 — Decoration overlay primitive.** `@quoin/prim-decoration-overlay` (4 variants: grain / texture / pattern / gradient). Forward-looking; no current consumers; ready for Boeing Watch aesthetic pack. Performance budget documented per v3.G.14 (5% LCP max).
- **Cons. 8 — Searchable-list primitive.** `@quoin/prim-searchable-list` (3 variants: command-palette / autocomplete-results / filter-dropdown). Real composition with form-fields (required) + prim-label (optional). Forward-looking; future consumers: modal-dialog command variant, nav search overlay, data-table column filter.
- **Cons. 9 — Boeing Watch boundary audit.** No-op closure. Audit confirmed no Boeing Watch tokens fanned out into patterns; boundary intact by virtue of the aesthetic pack not yet existing. Cons. 5/6/7 primitives anticipate Boeing Watch as a future consumer; infrastructure ready.

**Phase 22 closure:**
- All 9 consolidations complete
- v3.G.1 through v3.G.21 in force
- 4 new foundational primitives in catalog (prim-label, prim-sequence, prim-decoration-overlay, prim-searchable-list)
- Pattern catalog architecturally stable

**Deferred (next sessions):**
- Block B from Session 2 brief — 8 editorial patterns (none started yet)
- Block C from Session 2 brief — 3 page templates (none started yet)
- Boeing Watch aesthetic pack (queued under Aesthetic Packs beyond v1.0 ongoing workstream; ready to ship now that Phase 22 closed)
- Phase 23 (Compiler IR) — now unblocked

---

## Session 3 outcome (2026-05-20)

Brief: Cons. 4 closure + Cons. 5 (label primitive). Scope right-sized to single context window per Session 2's lessons learned.

**Shipped:**
- Cons. 4 CLOSED — 3 remaining nav specimen migrations (marketing / app-chrome / docs) + closing batch (deprecated dir removal, gate enforcement of nav in v3.G.16+G.17, reverse-lineage updates in button-system / modal-dialog / form-fields, discoverability surface, REPORT). Commit `0e41738`.
- Cons. 5 CLOSED — new `@quoin/prim-label` foundational primitive (first `prim-*` primitive); 5 consumer migrations (hero, pricing-tiers, nav-docs, nav-app-chrome, page-header) via dual-class approach; gate extension recognizing prim-label primitive; REPORT. Commit: _this commit_.
- PHASES.md updated.

**New conventions established:**
- `optionalPeerPacks` field in pack manifests — for peer packs consumed by only SOME variants of a multi-variant pack. Distinguishes "this pack uses X across all variants" (peerPacks, triggers v3.G.17 per-file enforcement) from "X may be used in some variants" (optionalPeerPacks, informational only). Will need formalization in `00_spec/pack-format.md` and the manifest schema.

**Deferred to Session 4:**
- Cons. 6 (sequence primitive — breadcrumb/numbered-list/sidebar-list → prim-sequence)
- Cons. 7 (decoration overlay — paper-grain-overlay/surface-decoration → prim-decoration-overlay)
- Cons. 8 (searchable-list — command-palette-content/list-with-search → prim-searchable-list)
- Cons. 9 (Boeing Watch boundary audit)
- Block B (8 editorial patterns — see Session 2 brief)
- Block C (3 templates — see Session 2 brief)

---

## Session 2 outcome (2026-05-20)

Session 2's brief was enormous (6 consolidations + 8 editorial patterns + 3 templates + discoverability + ledger). Execution was bounded by context-budget hard halt #6.

**Shipped:**
- `PHASES.md` (this file) — single-source phase ledger; commit `c8d6c8d`
- Cons. 4 audit + proposal + pack scaffolding + 1 of 4 specimen migrations — commit `bfb9ff7`

**Deferred to Session 3:**
- Cons. 4 — finish 3 remaining specimen migrations + closing batch (deprecation, gate enforcement, discoverability, REPORT.md)
- Cons. 5 (label primitive) — audit + execution
- Cons. 6 (sequence primitive) — audit + execution
- Cons. 7 (decoration overlay primitive) — audit + execution
- Cons. 8 (searchable-list primitive) — audit + execution
- Cons. 9 (Boeing Watch boundary audit) — audit + closure
- Block B — 8 editorial patterns (none started)
- Block C — 3 page templates (none started)
- Block D — discoverability updates reflecting A + B + C output

**Halt rationale:** context-budget hard halt #6. Cons. 4's marketing/app-chrome migrations involve coordinated `data-variant` collision-resolution renamings (existing per-pack `data-variant` for sticky/transparent/compact/standard/with-subnav/condensed must rename to `data-mode` per Cons. 3 Q3 cascade). Each file's migration is mechanical but substantial (~10-20 Edit operations per file). Halting at clean sub-boundary preserves Session 3 resume point cleanly.

---

## Decisions that have shifted phases

This section documents cases where the ledger's structure doesn't match the chronological order of original-phase numbering.

- **Phase 22.5 (Discoverability Infrastructure)** inserted in Session 1 (2026-05-20) between Phase 22's mid-execution (Cons. 3 complete) and Phase 23. At the time, the work shipped without a phase number; this ledger retroactively assigns 22.5 to capture the chronology cleanly.
- **Phase Themes → Aesthetic Packs rename** per D.52 (2026-05-18). The pack type discriminator changed from `"theme"` to `"aesthetic"` with backward-compatible deprecation alias. Documented in `CHANGELOG.md` § D.52.
- **Phase 22 ordering** — Cons. 8 (spacing) and Cons. 9 (type-scale) of the dossier shipped first as Cons. 1 and Cons. 2 of execution. This was deliberate: token consolidations are higher leverage + lower risk than structural ones. Cons. 3 then started the structural series (hero anatomy).

---

## Phase dependency graph

```
Phase 0 (spec)
  → Phase 0.5, 0.5-ext
    → Phase 1 (compiler), Phase 2 (reference packs)
      → Phase 3 (harvest), Phase 4 (docs)
        → Phase 3.5, 3.5b, 3.5c, 3.5d (fidelity passes — partial-OK)
        → Phase 4.5 (docs refresh)
        → Phase 5a–5d (visual maturity + interactive + vocab additions)
        → Phase Patterns v1.0 (catalog extension P0 + P1)
        → Phase Themes / Aesthetic Packs v1.0
          → Phase 22 (Unification — 9 consolidations)
            → Phase 22.5 (Discoverability — inserted, ✅)
              → Phase 23 (Compiler IR) [BLOCKED on Phase 22 closure]
                → Phase 24 (Build Pipeline) [BLOCKED on Phase 23]
                → Phase 25 (MCP + Distribution) [BLOCKED on Phase 23]
              → Templates layer [BLOCKED on Cons. 4 nav unification]
              → Aesthetic Packs beyond v1.0 [BLOCKED on Phase 22 closure]
            → Phase 5e (Launch) [BLOCKED on Phase 23 closure]
            → Phase 26 (Standards) [DEFERRED]
            → Catalog Extension [UNBLOCKED, ongoing]
```

---

## Maintenance protocol

This file is updated at the close of every session that opens, closes, or modifies a phase. Updates happen in the closing batch of the relevant session. The session closing report references the PHASES.md update as a deliverable.

When updating:

1. **Verify status against the actual repo state** — read CHANGELOG.md, the relevant CONSOLIDATION reports, the `02_reference-packs/` and `01_compiler/` directories. Do not rely on session-summary memory.
2. **Use one of the legend status values** — not free-form text.
3. **Use full commit hashes** for closure references — not short hashes.
4. **Document any phase-order shifts** in the "Decisions that have shifted phases" section. Do not silently renumber.
5. **Mark ambiguous statuses ⏸️** with a note explaining the ambiguity, rather than guessing complete or queued.
6. **Update the dependency graph** if a phase's blockers change.

For future contributors who find this file: it is the canonical phase ledger. If `CHANGELOG.md` or a CONSOLIDATION report shows newer information, update this file. If `PHASE_GATES.md` shows newer gate definitions, that file is canonical for gates — but the *phase-status* axis lives here.
