# Quoin Phase Ledger

This file is the single source of truth for phase status across the Quoin project. It supersedes scattered references in CONSOLIDATION reports, DECISIONS_UPDATES, and session-closing reports. Every future session that opens, closes, or modifies a phase updates this file in its closing batch.

**Last updated:** Phase 22.6 closing — Layout Primitive Layer complete (2026-05-21)

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

### Phase 22.6 — Layout Primitive Layer

**Status:** ✅ Complete (Phase 22.6 — 2026-05-21)
**Goal:** Ship the spatial-logic primitive layer (stack / cluster / center / grid / sidebar / switcher) that future patterns compose for layout instead of redeclaring layout CSS in each pack. Peers of the content primitives shipped in Phase 22 (prim-label, prim-sequence, prim-decoration-overlay, prim-searchable-list) but on a different concern axis — spatial relationships rather than visual elements.
**Output:** six primitive packs at root `patterns/prim-<name>/`, each with `quoin.pack.json` + `quoin.toml` + `primitives/index.json` + `examples/index.html` + `README.md` + `LICENSE` + `package.json`:
- `patterns/prim-stack/` — vertical stack with consistent gap. 5 gap variants × 4 align × optional recursive mode. Universal foundation for vertical rhythm.
- `patterns/prim-cluster/` — horizontal wrapping group. 4 gap × 5 justify × 5 align × 2 wrap. For nav links, button groups, tag clouds, action bars, breadcrumbs.
- `patterns/prim-center/` — center one or both axes with max-width. 3 axes × 4 max-width × 3 padding. The canonical max-width prose column.
- `patterns/prim-grid/` — auto-fit grid with min-width per cell. 4 min-cell × 4 gap × 4 max-columns × 3 align. Foundation for feature-grid / pricing-tiers / card lists.
- `patterns/prim-sidebar/` — sidebar + main, container-query responsive (Baseline 2024). 2 sides × 3 widths × 3 thresholds. Used by docs / settings / dashboard.
- `patterns/prim-switcher/` — row that flips to column below container threshold. 3 thresholds × 4 gap × 4 align. For two-column blocks that stack on narrow containers.
**Discoverability surface touched (overrides Track E convention per brief):**
- `/registry.json` — 6 new entries added in the `foundation/primitive/layout` category.
- `/llms.txt` — new "Layout primitives (6, Phase 22.6)" section between content primitives and patterns. Architectural-locks list extended to include v3.G.21.
- `/llms-full.txt` — new "Layout primitives (Phase 22.6)" section with full anatomy for each of the six packs inserted before the token reference.
- `/README.md` — catalog grid restructured: "Layout primitives (6, Phase 22.6)" subgrid added above the production-patterns grid; AI-tools section updated to enumerate counts correctly (15 + 4 + 6 + tokens-baseline).
**Closure ref:** commit `c9379f85dcb6b7892a69de95f98ded644e34b91c` (2026-05-21).
**What unblocks:** Session 6's editorial pattern batch (Track B from the prior conversation) — `prose-body`, `code-block`, `pull-quote`, `figure-with-caption` — can author on top of layout primitives. The aesthetic-swap demo (Session 6 Track A) can use prim-grid or prim-stack as its composition shell.
**Scope boundary:** This phase owns `patterns/prim-{stack,cluster,center,grid,sidebar,switcher}/` plus the discoverability files explicitly enumerated above. No existing patterns are refactored — that's deferred to Phase 22.7 (Layout Composition Consolidation, queued).
**Halts encountered:** none. Container-query convention (v3.G.11) handled cleanly for prim-sidebar + prim-switcher with documented graceful-degradation behavior for browsers earlier than Baseline 2024.
**Naming clarification:** the brief stated "quoin.toml … per v3.G.21" but v3.G.21 is the `optionalPeerPacks` lock. The quoin.toml Cargo-style mirror is a separate D.85 emerging convention (first appeared in `patterns/hero/quoin.toml` + `patterns/nav/quoin.toml`); all six new primitive packs adopt the same format, advancing the convention from 2 → 8 packs. Format is still draft.
**Closure ref filled:** commit `c9379f85dcb6b7892a69de95f98ded644e34b91c` (2026-05-21).

### Phase 22.5.B — Editorial Patterns Batch 1 (Track B)

**Status:** 🟡 Queued (not yet started — placeholder pending operator scheduling)
**Goal:** Ship the first half of the editorial pattern batch: `prose-body`, `code-block`, `pull-quote`, `figure-with-caption`. Required by templates D.2 (docs-site) and D.3 (blog-with-prose) for full composition.
**Blocks:** completion of `templates/docs-site/` and `templates/blog-with-prose/` (currently scaffold-only, awaiting these patterns).

### Phase 22.5.C — Editorial Patterns Batch 2 (Track C)

**Status:** ✅ Complete (Session 5 Track C — 2026-05-21)
**Goal:** Ship the second half of the editorial pattern batch: `footnote`, `table-of-contents`, `article-meta`, `prose-aside`.
**Output:** four pattern packs at root `patterns/`, each with `quoin.pack.json`, `primitives/index.json`, `examples/index.html`, `README.md`, `LICENSE`, `package.json`:
- `patterns/footnote/` — four position variants (`sidenote-margin` · `footnote-bottom` · `popup-on-hover` · `popup-on-click`). CSS Anchor Positioning (Baseline January 2026); OddBird polyfill consumption documented in README.
- `patterns/table-of-contents/` — three position variants (`sticky-side` · `inline-top` · `floating-overlay`) × three depth registers (`h1-h2` · `h1-h3` · `h1-h6`). IntersectionObserver active-section detection (rootMargin `0px 0px -70% 0px`). Composes `prim-sequence` for list rendering (declared in `peerPacks`).
- `patterns/article-meta/` — author + date + reading-time + conditional category, tag-list, share-actions. Three density variants × three position variants. Reading time computed at **build time**, never runtime. `prim-label` declared in `optionalPeerPacks` (required only when tag-list renders).
- `patterns/prose-aside/` — six semantic registers (`note` · `tip` · `warning` · `danger` · `success` · `info`); three visual registers (`inline` · `bordered` · `filled`). Token-driven colour mapping; `aria-label` per role.
**Closure ref:** commit `4c5161da36a790c25364a4a8cdf01a063a4b797d` (2026-05-21).
**Scope boundary:** Track C owns `patterns/{footnote,table-of-contents,article-meta,prose-aside}/` only. Discoverability surface untouched (Track E).
**Halts encountered:** none. CSS Anchor Positioning anatomy in footnote was scoped to static anchoring (no scroll-tracking semantics); flagged as out-of-scope in pack notes.

### Phase 22.5.D — Page Templates Batch 1 (Track D)

**Status:** ✅ Partial complete (Session 5 Track D — 2026-05-21). D.1 shipped; D.2 + D.3 scaffolded pending Track B.
**Goal:** Ship the first batch of page templates and introduce the `quoin.template.json` template format. Three templates: `landing-saas`, `docs-site`, `blog-with-prose`. Coordinate with Tracks B + C: only D.1 can ship complete now; D.2 and D.3 ship as scaffolds awaiting Track B prose-body/code-block/pull-quote/figure-with-caption.
**Output:** three template packs at root `templates/`, each with `quoin.template.json`, `index.html`, `README.md`, `LICENSE`, `package.json`:
- `templates/landing-saas/` (✅ complete, v1.0.0). Composes 6 shipped patterns in order: nav (marketing) + hero (type-only) + feature-grid (three-up) + testimonial (single-quote) + pricing-tiers (three-tier) + footer-mega (full). Aesthetically neutral; recommended aesthetics include all three v1.0 packs.
- `templates/docs-site/` (✅ scaffolded, v0.1.0-scaffold). Two-column sticky-TOC layout. Stand-ins for `prose-body` + `code-block` (pending Track B); real `table-of-contents` and `prose-aside` rendered from Track C.
- `templates/blog-with-prose/` (✅ scaffolded, v0.1.0-scaffold). Long-form layout. Stand-ins for `prose-body` + `pull-quote` + `figure-with-caption` (pending Track B); real `article-meta` and `footnote` rendered from Track C.
**Template format (new this phase):** `quoin.template.json` separate from `quoin.pack.json`. Declares: `composition.order` (array of `{ slot, pack, variant, status }`), `dependencies` (shipped), `pendingDependencies` (when scaffold), `recommendedAesthetics`, `customizationPoints`. Schema URL: `https://harrow.haus/quoin/schema/template.json` (TBD; placeholder per the brief).
**Closure ref:** commit `4c5161da36a790c25364a4a8cdf01a063a4b797d` (2026-05-21).
**What unblocks:** Track E discoverability surface can announce 1 complete + 2 scaffolded templates. Track B remains the blocker for full D.2 + D.3 composition.
**Scope boundary:** Track D owns `templates/{landing-saas,docs-site,blog-with-prose}/` and this PHASES.md entry only. Discoverability surface untouched (Track E).
**Halts encountered:** none. Template format introduced inline; no architectural questions surfaced.
**harrow.haus initial scaffolding:** mentioned in the operator brief header but no explicit deliverables listed — interpreted as out-of-scope for this track. Flagged in closing report for operator clarification.

### Phase 22.5.A — Aesthetic Packs v1.0 + Aesthetic-Swap Demo

**Status:** ✅ Complete (Session 5 Track A — 2026-05-21)
**Goal:** Ship the first three production aesthetic packs (Boeing Watch · Harrow Haus · Default) at root `aesthetics/`, plus a live `demos/aesthetic-swap/` specimen that crossfades between them via the View Transitions API. First production proof of the v3.G.20 architecture (aesthetic packs declare token values; never anatomy).
**Output:**
- `aesthetics/boeing-watch/` — precision-instrumental aerospace; IBM Plex Sans/Condensed/Mono; navy + cream + signal amber; tight density; mechanical easings; radius ≤2px. Full pack: `quoin.pack.json`, `tokens.css`, `overrides/{light,dark}.json`, `README.md`, `LICENSE`, `package.json`, `specimen/index.html`.
- `aesthetics/harrow-haus/` — operator's house; post-industrial editorial minimalism; paper/ink/signal-red palette; Junicode 2 + Source Serif 4 + Recursive + IBM Plex Mono; 1.5× baseline outer margins; civil motion. Full pack.
- `aesthetics/default/` — tasteful neutral baseline; Inter Variable + IBM Plex Mono; neutral grays + deep-blue accent; standard easings and durations. The comparison register against which the opinionated packs read as distinctive. Full pack.
- `demos/aesthetic-swap/index.html` — self-contained 749-line specimen. 4 patterns composed (nav-marketing + hero-gradient-mesh + feature-grid-three-up + footer-compact). Three buttons swap aesthetic via `document.startViewTransition()` with 400ms crossfade. Respects `prefers-reduced-motion` (collapses animation to 1ms). Keyboard navigable (`role="radiogroup"`, Arrow keys move focus + activate). Per-aesthetic hero gradient-mesh backgrounds.
- Three per-aesthetic specimen pages (`aesthetics/{boeing-watch,harrow-haus,default}/specimen/index.html`) — same 4 patterns under a locked aesthetic, each consuming the pack's own `tokens.css` directly.
**Closure ref:** commit `e610c1c42c0373d42e13cf6431dd395f89013ee3` (2026-05-21).
**What unblocks:** the aesthetic-pack architecture is now production-proven. Future aesthetic packs follow this template (`overrides/{light,dark}.json` + `tokens.css` + `specimen/`). The Aesthetic Packs (beyond v1.0) ongoing workstream is now live with three reference packs to model against. Track E (catalog discoverability sweep — `/llms.txt`, `/llms-full.txt`, `/registry.json`, `README.md`) is unblocked.
**Scope boundary:** This phase owns `aesthetics/{boeing-watch,harrow-haus,default}/`, `demos/aesthetic-swap/`, and this PHASES.md entry only. The discoverability surface (`/llms.txt`, `/llms-full.txt`, `/registry.json`, `README.md`) is owned by Track E and not touched in this phase.

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

**Status:** 🔄 Ongoing (v1.0 first batch shipped Phase 22.5.D — 1 complete, 2 scaffolded)
**Goal:** Ship page templates that compose existing patterns into ready-to-deploy pages.
**v1.0 batch (shipped/scaffolded Phase 22.5.D, 2026-05-21):**
- ✅ `templates/landing-saas/` — complete (composes 6 shipped patterns).
- ✅ `templates/docs-site/` — scaffolded; full composition blocks on Phase 22.5.B (Track B prose-body + code-block).
- ✅ `templates/blog-with-prose/` — scaffolded; full composition blocks on Phase 22.5.B (Track B prose-body + pull-quote + figure-with-caption).
**Template format introduced:** `quoin.template.json` separate from `quoin.pack.json`. Declares `composition.order` array, `dependencies`, `pendingDependencies`, `recommendedAesthetics`, `customizationPoints`.
**Next:** Phase 22.5.B closure unblocks D.2 + D.3 full composition. Beyond that, additional templates can land per the new format.

### Aesthetic Packs (beyond v1.0)

**Status:** 🔄 Ongoing (v1.0 shipped Phase 22.5.A — three packs)
**Goal:** Ship aesthetic packs that target the variant axes declared by pattern packs (per v3.G.20).
**v1.0 packs (shipped Phase 22.5.A, 2026-05-21):**
- `aesthetics/boeing-watch/` — precision-instrumental aerospace
- `aesthetics/harrow-haus/` — operator's house, post-industrial editorial
- `aesthetics/default/` — tasteful neutral baseline
**Next candidates (queued):** Manuscript Future (Junicode 2 + Ranade + Monaspace per Cons. 2 Option D), terminal-monochrome, expressive-motion-heavy.
**Closure dependency:** none — three reference packs now exist; future packs follow the v1.0 template (`tokens.css` + `overrides/{light,dark}.json` + `specimen/`).

---

## Phase 22.6 outcome (2026-05-21) — Layout Primitive Layer

Brief: ship the spatial-logic primitive layer (stack/cluster/center/grid/sidebar/switcher) that should have existed before extensive pattern authoring. Single-session execution. The existing 15 patterns are NOT refactored in this phase (deferred to Phase 22.7); the new layer is authored fresh and immediately consumable by Session 6's editorial pattern batch.

**Architectural framing:** Layout primitives are peers of the content primitives shipped in Phase 22 (prim-label, prim-sequence, prim-decoration-overlay, prim-searchable-list). Same conventions (v3.G.18 anatomy documentation, v3.G.19 pack-code-lives-once, v3.G.20 variants-in-pattern-packs-tokens-in-aesthetic-packs, v3.G.21 optionalPeerPacks). Different concern axis: spatial relationships rather than visual elements. Both compose into patterns; neither is a pattern itself.

**Shipped:**
- **`patterns/prim-stack/`** — vertical stack with consistent gap. `<div data-pattern="stack-container" data-gap="xs|sm|md|lg|xl" data-align="start|center|end|stretch" data-recursive="true|false">`. Optional `<hr data-pattern="stack-separator">` for visible breaks. The lobotomized-owl-equivalent in primitive form.
- **`patterns/prim-cluster/`** — horizontal wrapping group. `<div data-pattern="cluster-container" data-gap data-justify data-align data-wrap>`. Default `align="center"` matches the common case (mixed-height items at optical center).
- **`patterns/prim-center/`** — center one or both axes with max-width. Two slots (`center-container` + `center-content`) so the operator can wrap content in a semantic landmark without coupling centering to semantics. Default `data-max-width="standard"` = 66ch (readable column).
- **`patterns/prim-grid/`** — auto-fit grid with min-width per cell. CSS recipe `repeat(auto-fit, minmax(min(var(--prim-grid-min-cell), 100%), 1fr))` — the inner `min(min-cell, 100%)` prevents overflow on viewports narrower than min-cell. `data-max-columns="2|3|4|unlimited"` caps the count.
- **`patterns/prim-sidebar/`** — sidebar + main, container-query responsive. Three slots: `sidebar-container` (container-query host) + `sidebar-aside` (<aside>, role=complementary) + `sidebar-main` (<main> or <div>). `data-threshold="narrow|standard|wide"` controls the container-width below which the layout stacks.
- **`patterns/prim-switcher/`** — row that flips to column below container threshold. Single slot with N peer children that all flip together. Children get `flex: 1` in row mode for equal-width split.

**Discoverability surface (touched per brief's explicit override of Track E convention):**
- `/registry.json` — six new `foundation/primitive/layout` entries added before the `tokens-baseline` entry; JSON validated.
- `/llms.txt` — header tagline updated to "15 patterns + 4 content primitives + 6 layout primitives"; new "Layout primitives (6, Phase 22.6)" section inserted between content primitives and patterns. Architectural-locks list extended from 6 → 7 to include v3.G.21.
- `/llms-full.txt` — new "Layout primitives (Phase 22.6)" section before the Token reference; each primitive documented per the standard format (Identity / Anatomy / Attributes / Minimal markup), with CSS recipes for prim-grid (the inner-min trick) and prim-sidebar (container-query gating).
- `/README.md` — catalog grid restructured with a new "Layout primitives" 3-column subgrid above the production-patterns grid; badge updated to "15 + 4 content + 6 layout primitives"; AI-tools section reflects the corrected count.

**Architectural proof points:**
- **v3.G.18 holds for primitives.** Each pack ships the four README anatomy tables (mandatory slots / conditional slots / variants / composition lineage). Composition lineage is `(none)` for all six — they are foundational, consume only tokens.
- **v3.G.20 holds for layout.** Layout primitives declare token references (`--space-*`, container-query thresholds). Aesthetic packs can override the underlying tokens (e.g., a tight aesthetic narrows the `--space-card`) without touching primitive anatomy.
- **v3.G.11 container-query convention adopted.** prim-sidebar and prim-switcher use `container-type: inline-size`. Documented Baseline 2024 support + graceful degradation per the brief's halt-condition #2.
- **D.85 quoin.toml convention advanced.** From 2 packs (hero, nav) → 8 packs (hero, nav, + six new primitives). Format still draft; iterates when adoption reaches the operator-set ratification threshold.

**Out of scope (deferred):**
- Refactoring existing patterns to compose layout primitives. Feature-grid, hero, page-header, pricing-tiers, footer-mega all inline some layout CSS that prim-grid / prim-stack / prim-cluster could replace. Deferred to **Phase 22.7 — Layout Composition Consolidation** (queued).
- Adding a `prim-frame` primitive for figure-with-caption / pull-quote framing concerns. Flagged for future addition if Session 6 surfaces the need.
- Aesthetic-pack overrides demonstrating layout-primitive tuning (e.g., a Harrow-Haus tight-margin aesthetic overriding `--space-card`). Operator-driven.

**Halts encountered:** none.

**Unblocks:**
- Session 6 editorial pattern batch (`prose-body`, `code-block`, `pull-quote`, `figure-with-caption`, plus the article-meta / footnote / table-of-contents / prose-aside already shipped in Track C) can author on top of layout primitives.
- Session 6's aesthetic-swap demo (Track A from the prior conversation, now part of the maximized Session 6 brief) can use prim-grid or prim-stack as its composition shell.
- Phase 22.7 (Layout Composition Consolidation) is queued.

---

## Session 5 outcome (2026-05-21) — Phases 22.5.C + 22.5.D (Tracks C + D)

Brief: Session 5 Tracks C and D ran sequentially in this batch. Track C shipped the second half of the editorial pattern batch (footnote · table-of-contents · article-meta · prose-aside); Track D shipped 1 complete + 2 scaffolded page templates and introduced the new `quoin.template.json` format. Track E (discoverability sweep) remains owned separately and is now unblocked for both phases.

**Shipped — Track C (Phase 22.5.C):**
- **`patterns/footnote/`** — four position variants. `sidenote-margin` and `popup-*` variants depend on CSS Anchor Positioning (Baseline January 2026); README documents OddBird polyfill consumption for older browsers. `footnote-bottom` works without any platform-feature dependency and is the recommended fallback. ARIA: `role="note"` with `aria-describedby` linking trigger ↔ content; `aria-label="Footnote {n}"` on triggers; back-references with `aria-label="Back to text"`.
- **`patterns/table-of-contents/`** — `peerPacks` declares `@quoin/prim-sequence ^1.0.0` (the ordered-list rendering is delegated entirely). Active-section detection via IntersectionObserver with `rootMargin: '0px 0px -70% 0px'`. ARIA: single `<nav aria-label="Table of contents">` per page; `aria-current="location"` on the active link (NOT `aria-current="page"`).
- **`patterns/article-meta/`** — `optionalPeerPacks` declares `@quoin/prim-label ^1.0.0` (required only when `tag-list` slot is rendered). Reading time computed at build time; runtime computation is forbidden. ARIA: `rel="author"` on author link, `rel="category"` on category link, `<time datetime="ISO-8601">` required.
- **`patterns/prose-aside/`** — six semantic registers map to token-driven colours (`--success`, `--warning`, `--critical`, `--info` accents with `*-soft` surfaces). Default `role="note"`; operators may elevate to `role="alert"` for `danger` semantic explicitly. Icon slot defines colour but not glyphs (consumer's icon-pack responsibility); recommended glyph mapping is in README.

**Shipped — Track D (Phase 22.5.D):**
- **`templates/landing-saas/`** (✅ v1.0.0). Six-section SaaS landing demo composing nav (marketing) + hero (type-only) + feature-grid (three-up) + testimonial (single-quote) + pricing-tiers (three-tier) + footer-mega (full). Aesthetically neutral; loads `aesthetics/default/` by default but swappable to Boeing Watch or Harrow Haus.
- **`templates/docs-site/`** (✅ v0.1.0-scaffold). Two-column docs layout with sticky TOC sidebar. Real `table-of-contents` and `prose-aside` rendered from Track C; stand-ins for `prose-body` + `code-block` (pending Track B). Scaffold banner in `index.html` flags the pending sections to consumers.
- **`templates/blog-with-prose/`** (✅ v0.1.0-scaffold). Long-form blog layout. Real `article-meta` and `footnote` rendered from Track C; stand-ins for `prose-body` + `pull-quote` + `figure-with-caption` (pending Track B). Scaffold banner in `index.html`.

**New format introduced (Track D):**
- `quoin.template.json` is the template manifest. Distinct from `quoin.pack.json` (which patterns and aesthetics use). Declares:
  - `composition.order` — ordered array of `{ slot, pack, variant, status }` entries
  - `dependencies` — shipped peer packs (semver)
  - `pendingDependencies` — when `status === "scaffold"`, the packs whose closure unblocks full composition
  - `recommendedAesthetics` — which aesthetic packs the template was designed against
  - `customizationPoints` — array of `{ id, what, where }` documenting what consumers tune
- Each template ships `index.html` (the deployable demo) + README (composition + customization notes) + LICENSE + npm package.json.

**Architectural proof points:**
- **v3.G.20 still holds.** Track C patterns declare anatomy only; never anatomy + values. Reading time as a `data-minutes` attribute is structural, not styled.
- **v3.G.21 holds in action.** `article-meta` uses `optionalPeerPacks` for `prim-label` (only when tag-list renders). `table-of-contents` uses `peerPacks` for `prim-sequence` (always required).
- **Scaffold pattern established.** Templates D.2 and D.3 ship as deployable HTML with banner + stand-ins, not as empty directories. Operators get a runnable demo of the partial composition immediately; Track B closure swaps stand-ins for real patterns without changing the template format.

**Out of scope for Tracks C + D (handed off to Track E):**
- `/llms.txt`, `/llms-full.txt`, `/registry.json`, `README.md` updates announcing 4 new patterns + 3 new templates.
- Per-pack screenshots in `docs/screenshots/`.

**Deferred:**
- Track B (Phase 22.5.B) — Block B editorial patterns batch 1 (`prose-body`, `code-block`, `pull-quote`, `figure-with-caption`). Blocks full D.2 + D.3 composition.
- Phase 23 (Compiler IR) — still unblocked, still queued.

**Operator-clarification item:**
- Track D brief mentions "harrow.haus initial scaffolding" in the section header but the deliverable list only enumerates D.1/D.2/D.3. Interpreted as out-of-scope for this commit; flagged for clarification before the next session.

---

## Session 5 outcome (2026-05-21) — Phase 22.5.A (Aesthetic Packs v1.0)

Brief: Session 5 ran in parallel tracks. **Track A** (this entry) shipped the first three production aesthetic packs and a live aesthetic-swap demo proving the v3.G.20 boundary in production. Track E (catalog discoverability sweep for aesthetics — `/llms.txt`, `/llms-full.txt`, `/registry.json`, `README.md`) runs separately and is now unblocked.

**Shipped — Track A:**
- **Three aesthetic packs** at root `aesthetics/`. Each pack ships `quoin.pack.json` (manifest declaring `type: "aesthetic"`, `peerPacks: ["tokens-baseline"]`, light/dark overrides + tokens.css exports), `tokens.css` (the actual `[data-aesthetic="X"]`-scoped overrides), `overrides/{light,dark}.json` (DTCG 2025.10-format compiler-consumable overrides), `README.md` (philosophy + variant-token-slot table + loading instructions), `LICENSE`, `package.json`, and `specimen/index.html` (4-pattern static specimen).
  - **Boeing Watch.** Precision-instrumental aerospace. IBM Plex Sans / Plex Sans Condensed / Plex Mono. Navy (`oklch(22% 0.04 245)`) + cream (`oklch(94% 0.014 85)`) + signal amber accent (dark mode). Tight density, mechanical easings (`cubic-bezier(0.32, 0.08, 0.12, 1)`), radius ≤2px, wide tracking on labels.
  - **Harrow Haus.** Operator's house — post-industrial editorial minimalism. Paper `oklch(94.5% 0.015 80)` (#f4efe6) / ink `oklch(15% 0.008 60)` (#1d1a16) / signal red `oklch(38% 0.13 25)` (#7a2f22). Junicode 2 display + Source Serif 4 prose + Recursive sans + IBM Plex Mono. 1.5× baseline outer margins (`--space-panel: 3rem; --space-section: 6rem`). Civil motion — no spring overshoot.
  - **Default.** Tasteful neutral baseline. Inter Variable + IBM Plex Mono. Neutral grays + deep-blue accent `oklch(55% 0.18 245)`. Standard easings, baseline durations. The comparison register.
- **Live aesthetic-swap demo** at `demos/aesthetic-swap/index.html`. 749-line self-contained HTML page composing 4 patterns: nav-marketing + hero-section gradient-mesh + feature-grid three-up + footer-mega compact. Three buttons in a sticky control surface (`role="radiogroup"`) swap the `data-aesthetic` attribute via `document.startViewTransition()` for a 400ms crossfade. Per-aesthetic hero gradient-mesh backgrounds (different OKLCH coordinates per aesthetic). Respects `prefers-reduced-motion` (collapses animation to 1ms). Keyboard navigable (Arrow keys move focus + click).
- **Per-aesthetic specimen pages** at `aesthetics/{boeing-watch,harrow-haus,default}/specimen/index.html`. Same 4 patterns under a locked aesthetic; each loads the pack's own `tokens.css` directly via `<link rel="stylesheet" href="../tokens.css">`. Lighter than the swap demo (~350 lines each) since they don't carry the three-aesthetic crossfade machinery.
- PHASES.md updated (this entry + Phase 22.5.A in the phase index + dependency graph update + Aesthetic Packs workstream update).

**Architectural proof points:**
- **v3.G.20 in production.** Same pattern markup ships under all three aesthetics; only `data-aesthetic` changes. Anatomy lives in pattern packs; values live in aesthetic packs. The aesthetic boundary holds.
- **v3.G.21 ready.** Each pack's manifest models the `peerPacks: ["tokens-baseline"]` + (forthcoming) `optionalPeerPacks` shape from Session 4 Prelude.
- **View Transitions API as Baseline 2026.** First Quoin-shipped use; degrades gracefully on browsers without `document.startViewTransition`.
- **Cons. 2 Option D in action.** `tokens-baseline` ships system-stack fallbacks; aesthetic packs override with specific brand fonts (Junicode 2, IBM Plex, Inter Variable, Recursive, Source Serif 4) loaded from OFL sources (Google Fonts + psb1558 CDN for Junicode 2).

**Out of scope for Track A (handed off to Track E):**
- `/llms.txt`, `/llms-full.txt`, `/registry.json`, `README.md` discoverability surface updates reflecting the three new packs.
- The Aesthetic Packs Catalog Extension skill template (analog of `skills/quoin-pattern-extension-author.md`).

**Deferred:**
- Block B from Session 2 (8 editorial patterns) — still queued.
- Block C from Session 2 (3 page templates) — still queued.
- Phase 23 (Compiler IR) — unblocked since Session 4; not yet started.

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
              → Phase 22.5.A (Aesthetic Packs v1.0 + swap demo — ✅)
                → Aesthetic Packs beyond v1.0 [UNBLOCKED, ongoing]
                → Track E (discoverability sweep for aesthetics) [UNBLOCKED]
              → Phase 22.5.B (Editorial Patterns Batch 1 — 🟡 queued)
                → Phase 22.5.D template-docs-site composition [BLOCKED on 22.5.B]
                → Phase 22.5.D template-blog-with-prose composition [BLOCKED on 22.5.B]
              → Phase 22.5.C (Editorial Patterns Batch 2 — ✅)
                → Catalog Extension (editorial slice) [unblocked]
              → Phase 22.5.D (Page Templates Batch 1 — ✅ partial)
                → Track E (discoverability sweep for templates) [UNBLOCKED]
                → Templates layer beyond v1.0 [UNBLOCKED, ongoing]
              → Phase 22.6 (Layout Primitive Layer — ✅)
                → Session 6 editorial pattern batch [UNBLOCKED to compose on layout primitives]
                → Phase 22.7 (Layout Composition Consolidation — refactor existing patterns to compose layout primitives) [QUEUED]
              → Phase 23 (Compiler IR) [BLOCKED on Phase 22 closure]
                → Phase 24 (Build Pipeline) [BLOCKED on Phase 23]
                → Phase 25 (MCP + Distribution) [BLOCKED on Phase 23]
              → Templates layer [BLOCKED on Cons. 4 nav unification]
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
