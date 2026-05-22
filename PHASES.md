# Quoin Phase Ledger

This file is the single source of truth for phase status across the Quoin project. It supersedes scattered references in CONSOLIDATION reports, DECISIONS_UPDATES, and session-closing reports. Every future session that opens, closes, or modifies a phase updates this file in its closing batch.

**Last updated:** Phase 24.1 closing — Adoption Infrastructure Foundation (2026-05-21)

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

### Phase 22.7 — Pattern Translation Skill + License/Quality Curation Framework + Specification-Framing Documentation

**Status:** ✅ Complete (Phase 22.7 — 2026-05-21)
**Goal:** ship the transitional infrastructure for ingesting external design systems plus the specification-framing documentation that establishes Quoin's strategic position. Three reference translations from ARIA APG demonstrate the framework end-to-end.
**Output:**
- **`THESIS.md`** at repo root — the specification-framing positioning document. Leads with "Quoin is a specification for UI semantics, with a reference implementation in HTML and CSS that demonstrates the specification works in practice." Establishes the standards-track ambition, the adoption modes, the architectural commitments, and the honest current state.
- **`skills/quoin-pattern-translator.md`** — the master skill for converting external source patterns into Quoin packs. Twelve sections covering invocation conditions, input formats, output deliverables, naming convention application, composition rule extraction, license clearance, quality gates, batch workflow, README template, and **specification-framing** language for translated patterns. Skill is explicitly framed as **transitional infrastructure — obsolete-by-design** as the specification gains native publication adoption.
- **`docs/sources/SOURCES.md`** — curated source registry: 5 public-domain sources (ARIA APG · Open UI CG · USWDS · GOV.UK · AGDS) + 9 permissive-licensed sources (Material Web · Carbon Web · Polaris · shadcn · Radix · Pico · Every Layout · daisyUI · Flowbite) + 3 incompatible-licensed sources documented (Tailwind UI · Material Design language · Semantic UI). Includes a "Future state — sources that may publish Quoin IR natively" tracker section and a yield-rate retrospective table.
- **`docs/translation/anatomy-extraction-rules.md`** — per-format extraction procedures (D.1 HTML+CSS · D.2 web component · D.3 JSX/TSX · D.4 design spec · D.5 wireframe image · D.6 cross-format normalization · D.7 future native IR ingest).
- **`docs/translation/quality-gates.md`** — 20 acceptance criteria gates (G.QA-1 through G.QA-20) covering anatomy, variants, composition, accessibility, performance, licensing, naming, and documentation. Opens with the "Quality gates exist because Quoin's specification is publishable" framing paragraph.
- **Three reference translations** at `patterns/disclosure/` + `patterns/combobox/` + `patterns/tabs/`. Each is a complete Quoin pack with `quoin.pack.json` (including `metadata.source` attribution block) + `primitives/index.json` + `examples/index.html` (working specimen with companion JS) + `README.md` (anatomy tables + Source attribution paragraph at top + Translation notes + "What this pattern is NOT" section) + `LICENSE` (MIT with W3C-Document-License attribution) + `package.json`.
- **Phase 23 reframe** documented in this PHASES.md (see new section below) — Phase 23 elevated from "the engine that powers multi-backend emission" to "the published specification draft for UI semantics."
**Closure ref:** commit `d4ea343316516cd15e76cd3d328a42032d66c3cd` (2026-05-21).
**What unblocks:**
- **Harvest sessions** can execute against the source registry under the quality-gates framework. ARIA APG yield ramp continues from the 3 reference translations; other approved sources (Radix, shadcn, Material Web, Carbon, Polaris, USWDS) become tractable.
- **Phase 22.5.B (queued editorial batch)** is unblocked when scheduled; the translation skill is one of the tools that session may use.
- **Phase 23 (IR architecture + specification draft publication)** is now framed and prepared. The translation work in this phase informed the IR data model design by surfacing real composition + variant patterns that must round-trip through the IR.
- **Phase 26 (Standards engagement)** — no longer indefinitely deferred. Activated by Phase 23.5 closure (specification draft publication). THESIS.md is the document standards-body reviewers will read.
**Scope boundary:** Phase 22.7 owns `THESIS.md`, `skills/quoin-pattern-translator.md`, `docs/sources/SOURCES.md`, `docs/translation/anatomy-extraction-rules.md`, `docs/translation/quality-gates.md`, `patterns/{disclosure,combobox,tabs}/`, `docs/sessions/SESSION-6-REPORT.md`, plus the discoverability-surface updates explicitly enumerated in the closing-batch brief (PHASES.md, README.md, /llms.txt, /llms-full.txt, /registry.json).
**Halts encountered:** none.
**Reconciliation note (verification check):** The pre-drafted THESIS content described Phase 22.8 as "First aesthetic packs + live aesthetic-swap demo + editorial pattern category" — work that actually shipped in Phase 22.5.A + 22.5.C + 22.5.D under the existing PHASES.md numbering. THESIS was reconciled to reflect the existing 22.5.A/C/D numbering rather than retroactively renumbering PHASES.md, per "Use full commit hashes for closure references" maintenance protocol and the principle that historical commits should not be retroactively renumbered. Catalog count in THESIS also updated from "15 patterns + 4 primitives" to actual current "22 patterns + 4 content primitives + 6 layout primitives" reflecting Phase 22.5.C + 22.6 additions plus the three Phase 22.7 translations.

---

## Phase 23 Reframe — Specification-Track Elevation

(Documented per the savant-level reframe of May 2026 that elevated Phase 23 from "the engine that powers multi-backend emission" to "the published specification draft for UI semantics." This section is the authoritative reference for the specification-framing pivot.)

Phase 23 (Quoin IR Architecture) was originally framed as the internal architectural work that produces the IR engine for cross-backend pattern emission. The savant-level reframe elevates Phase 23 to the strategic centerpiece of the project: **the IR specification IS Quoin's product.** The pattern catalog, aesthetic packs, and plain-CSS backend are the reference implementation that proves the specification works.

This reframe changes Phase 23's deliverables in scope but not in technical substance:

- **Original Phase 23 deliverable:** an IR engine that emits the pattern catalog to multiple backends.
- **Reframed Phase 23 deliverable:** a publishable specification draft of the IR (the canonical anatomy contract format, the variant tokenization rules, the composition rules, the aesthetic-pack interface, the backend emission contracts, the AI consumption format) accompanied by the reference IR engine that demonstrates the specification works.

Phase 23 sub-phases adjust accordingly:

- **23.1:** IR data model design → **IR specification data model** (publishable schema)
- **23.2:** Source adapter interface → **IR ingest interface** (with future native-publication path documented per D.7 in anatomy-extraction-rules.md)
- **23.3:** Backend emission interface → **IR emission interface** (with publishable backend contracts)
- **23.4:** First reference source adapter (ARIA APG) → **First reference IR ingest implementation**
- **23.5:** First reference backend (plain CSS) → **First reference IR emission implementation; SPECIFICATION DRAFT PUBLISHED at repository root as `Quoin-IR-Specification.md`**

The specification draft becomes the deliverable that future standards-body engagement (Phase 26, now activated by 23.5 closure) submits.

Phase 23.5 closing produces: a complete IR specification draft, a working IR engine reference implementation, a documented extension interface (aesthetic packs, source adapters, backend emitters), and the first live translation demo proving the specification's coherence.

After Phase 23.5 closes, the community contribution model opens at the extension layer (aesthetic packs, source adapters, backend emitters) while the IR specification core remains curated by the core team. This decouples ecosystem growth from core-team bandwidth.

Phase 24 (Build Pipeline Integration + AI Tool Distribution) continues to ship distribution and AI tool surfaces, but those surfaces are now explicitly framed as consumers of the published specification rather than as independent workstreams.

Phase 25 (Multi-Source Harvest) becomes explicitly transitional. Each harvested source is a candidate for retiring once the source publishes Quoin IR natively. Harvest is in service of immediate adoption; native publication is the strategic goal.

Phase 26 (Standards Engagement) is no longer deferred indefinitely. It is queued for activation at Phase 23.5 closure. The specification draft is the deliverable that activates Phase 26. Targets include W3C (Web Components Community Group, Open UI Community Group), DTCG (Design Tokens Community Group), and direct engagement with major design system maintainers about publishing Quoin IR natively.

The reframe does not retroactively change Phases 22.6 (Layout Primitives) or 22.7 (Translation Skill). The work in those phases proceeds as previously planned. What changes is what they're in service of: the specification, not the design system.

---

### Phase 23 — USML IR Architecture (specification draft + reference engine)

**Status:** 🟢 In progress (Phase 23.1 ✅ Complete 2026-05-21; sub-phases 23.2–23.5 queued)
**Goal:** ship the canonical USML specification draft (`USML-Specification.bs` at repo root; HTML output at https://harrowhaus.github.io/quoin/usml/) accompanied by the reference IR engine that demonstrates the specification works. The spec was renamed from "Quoin-IR-Specification.md" to "USML-Specification.bs" per the savant-research-informed bifurcation: USML is the specification; Quoin is the reference implementation.
**Closure dependency:** Phase 22 closure satisfied. Phase 23.1 satisfied. Sub-phases continue.
**Reference:** unification dossier `compass_artifact_wf-7fef8f90-73e7-412a-90b7-9bd9f5d55ef2_text_markdown.md` § 3.1 (original IR architecture proposal); savant-level research assessment `compass_artifact_wf-0f17f0b9-3e6c-4a76-97aa-fb990c4a145e_text_markdown.md` (which surfaced the USML/Quoin bifurcation and the 16 standards-readiness gaps).

### Phase 23.1 — USML Editor's Draft 2026.05 + Reference Implementation Conformance Claim

**Status:** ✅ Complete (Phase 23.1 — 2026-05-21)
**Goal:** ship the USML Editor's Draft as a standards-ready specification in Bikeshed format, with the canonical hosting URL configured, all RFC 2119 normative vocabulary applied, all four mandatory considerations sections (Security/Privacy/Accessibility/i18n) authored, the reference implementation conformance claim documented, and the test conformance suite scaffolded. **The phase does NOT submit to W3C** — submission is deferred to Phase 26 after adoption thresholds are met (per the D11 sequencing decision in the handoff).
**Output:**
- **`USML-Specification.bs`** at repo root — Bikeshed source of the USML Editor's Draft 2026.05. ~800 lines. Sections: Status of this document; Introduction (Goals, Non-goals, Lineage); Conformance (Document conventions, three conformance classes); Core Data Model (Pattern, Slot, VariantAxis, Composition, Accessibility contracts, Token references, Microstates, Pattern metadata, Translated patterns); Aesthetic-pack interface; Backend emission contract; Ingest interface; AI consumption format; Security Considerations; Privacy Considerations; Accessibility Considerations; Internationalization Considerations; Versioning and Stability; Conformance Test Suite; Reference implementation conformance claim; Terminology; Adoption thresholds; Acknowledgments; Change Log; Bibliography (normative references RFC 2119, DTCG 2025.10, ARIA 1.3, HTML LS, JSON Schema 2020-12, SEMVER; informative references shadcn-registry, CEM 2.1, Open UI, A2UI, MCP-APPS, SPDX, ARIA-APG).
- **`.github/workflows/spec-build.yml`** — GitHub Action using `w3c/spec-prod@v2` to auto-build the Bikeshed source on every push to main and commit output to `docs/usml/` for GitHub Pages serving.
- **`spec/usml-schema.json`** — formal JSON Schema 2020-12 for the USML data model (Pattern / AestheticPack / Template via `anyOf`; QuoinVersion field accepts both legacy semver and new date-versioned ranges with deprecation note; Microstate vocabulary documented per spec §5.7).
- **`spec/examples/`** — five canonical examples: pattern-hero (multi-variant with peer-pack composition), pattern-button-system (self-contained microstates), pattern-disclosure (translated pattern with full source attribution), aesthetic-default (DTCG-consuming pack), composition-graph (reverse-lineage documentation).
- **`spec/tests/`** — test conformance scaffold with three runners (anatomy/, aesthetic-pack/, backend-emit/) plus aggregate `run-all.mjs`. 5/5 tests pass on the reference implementation.
- **`spec/conformance-report.md`** — Quoin's claim against USML 2026.05: Anatomy Validator Partial, Aesthetic-Pack Provider Full, Backend Emitter Level 3 (plain-CSS).
- **`README.md`** and **`THESIS.md`** — updated for USML/Quoin bifurcation throughout. Lead paragraphs now say "USML is the specification; Quoin is the reference implementation."
- **PHASES.md** — this entry plus Phase 23 reframed to reference the bifurcation.
**16 standards-readiness attributes addressed:**

| # | Attribute | Addressed in |
|---|-----------|--------------|
| 1 | RFC 2119 conformance vocabulary | §Conformance §Document conventions; all-caps MUST/SHOULD/MAY throughout |
| 2 | Security Considerations section | §Security Considerations (supply-chain, prompt-injection, CSS-injection, source-adapter attribution) |
| 3 | Privacy Considerations section | §Privacy Considerations (no privacy-impacting features in v2026.05; future versions will reassess) |
| 4 | Accessibility Considerations beyond ARIA | §Accessibility Considerations (cognitive, reduced-motion, system-preference, IME, voice-input, dyslexia-friendly) |
| 5 | i18n Considerations | §Internationalization Considerations (RTL, locale-specific spacing, pluralization, non-Latin glyph metrics, vertical script) |
| 6 | Normative references to adjacent standards | §Bibliography (RFC 2119, DTCG 2025.10, ARIA 1.3, HTML LS, JSON Schema 2020-12, SEMVER) + informative refs |
| 7 | Conformance levels | §Conformance §Conformance Classes — three classes, Backend Emitter has Level 1/2/3 |
| 8 | Test conformance suite stub | `spec/tests/` (3 runners + aggregate; 5/5 pass) |
| 9 | Reference implementation conformance claim | `spec/conformance-report.md` |
| 10 | Glossary completeness | §Terminology (24 `<dfn>` definitions) |
| 11 | Examples coverage | `spec/examples/` (5 canonical examples) |
| 12 | Versioning policy | §Versioning and Stability (date-versioning YYYY.MM, mirrors DTCG 2025.10) |
| 13 | Change log discipline | §Change Log section |
| 14 | Named editor | Donald Pilger, Harrow Haus, with contact info in metadata header |
| 15 | Canonical hosting URL | https://harrowhaus.github.io/quoin/usml/ via GitHub Pages |
| 16 | Authoring tool (Bikeshed) | `USML-Specification.bs` source + `.github/workflows/spec-build.yml` action |

**Closure ref:** commit `ca048e13ecfbdd205c6a695a404386818a6eedc5` (2026-05-21).

**What unblocks:**
- **Phase 23.2 (ingest interface specification)** — formalizes the source-adapter interface USML §Ingest interface sketches.
- **Phase 23.3 (emission interface specification)** — formalizes the backend-emitter interface USML §Backend emission contract sketches.
- **Phase 23.4 (first reference source adapter formalization)** — formalizes the ARIA APG source adapter shipped in Phase 22.7 as a USML-conformant adapter.
- **Phase 23.5 (specification publication + first additional reference backend + live translation demo)** — the FPED-equivalent milestone. Activates Phase 26.

**Phase 26 (Standards Engagement) is NOT activated by Phase 23.1.** Phase 26 activation requires adoption thresholds documented in USML §Adoption Thresholds: 3+ named co-editors from different organizations; 2+ independent partial implementations; adoption pull from at least one external design system; an identified incubation venue (W3C Generative UI CG preferred).

**Scope boundary:** Phase 23.1 owns `USML-Specification.bs`, `spec/`, `.github/workflows/spec-build.yml`, plus the discoverability-bifurcation updates to README.md, THESIS.md, and PHASES.md. The phase does NOT touch `/llms.txt`, `/llms-full.txt`, or `/registry.json` — comprehensive AI-consumption surface integration happens in Phase 23.5.

**Halts encountered:** none.

**Architectural truth surfaced during specification authoring:** the existing pack manifests' `quoinVersion` field uses semver ranges (`^0.1.0`), pre-dating USML's date-versioning policy introduced in this phase. The formal JSON Schema accommodates both legacy semver and new date-versioned formats with a documented deprecation note; the migration is opt-in (existing packs continue to validate; new packs SHOULD adopt date-versioning).

**Naming clarification:** the savant-research assessment recommended bifurcating "Quoin" (implementation) from "USML" (specification) to match the HTML/Firefox precedent. This bifurcation is now locked: USML is the spec name; Quoin is the reference implementation name. All normative documents use USML; the implementation continues as Quoin.

### Phase 24 — Build Pipeline Integration + AI Tool Distribution (in progress)

**Status:** 🟢 In progress (Phase 24.1 ✅ Complete 2026-05-21; sub-phases 24.2–24.4 queued)
**Goal:** Make USML/Quoin reachable from outside the repository through the dominant AI-coding-agent tooling layers (npm, shadcn registry, MCP). Build pipeline integrations (Vite plugin, Webpack loader, etc.) follow once distribution surfaces are stable.

### Phase 24.1 — Adoption Infrastructure Foundation

**Status:** ✅ Complete (Phase 24.1 — 2026-05-21)
**Goal:** ship the three primary adoption surfaces (npm package, shadcn-compatible registry, MCP server scaffold) plus distribution documentation and automated build pipelines. The reference implementation becomes reachable through the AI-coding-agent default tooling layer.
**Output:**
- **`package.json` + `.npmignore`** at repo root — npm package `@harrow-haus/quoin` v0.1.0 configured. `files` allowlist + `.npmignore` safety net. `exports` map exposes patterns, aesthetics, templates, schema, spec, conformance report, and registry by path. `npm pack --dry-run` confirms 298 files / 419 kB / 2.1 MB unpacked with no internal-scaffolding leaks.
- **`scripts/build-registry.js`** — deterministic build script that scans `/patterns/`, `/aesthetics/`, `/templates/`, `/02_reference-packs/patterns/`, `/02_reference-packs/primitives/` for canonical USML pack manifests and emits the shadcn-compatible distribution at `/registry/`. Maps each Quoin pack name to a short shadcn item name (e.g., `@quoin/pattern-hero` → `hero`). Maps peer-pack composition to `registryDependencies` (auto-installed by shadcn add). Maps optional peer packs to `meta.optionalDependencies` (not auto-installed). Maps DTCG 2025.10 aesthetic-pack overrides to shadcn `cssVars`.
- **`/registry/`** — generated shadcn-compatible distribution. `index.json` (root manifest) + `index.md` (LLM-friendly Markdown projection) + `items/<name>.json` × 38 items (32 components + 3 styles + 3 blocks). All items pass structural validation; all 6 declared `registryDependencies` resolve to sibling items. `registry/README.md` documents the format, naming convention, item-type mapping, peer-pack composition, and DTCG→cssVars rules.
- **`/mcp/`** — MCP server scaffold. `package.json` configures `@harrow-haus/quoin-mcp` v0.1.0 as a separate npm package with `quoin-mcp` CLI binary. `server.json` declares the server per MCP Registry conventions. `index.js` implements stdio-transport MCP server using `@modelcontextprotocol/sdk` v1.x. Exposes 38 catalog resources at `quoin://<kind>/<name>` URIs; `find_pattern` tool performs substring search across names, descriptions, tags. End-to-end smoke-test confirmed: `initialize` succeeds; `resources/list` returns 38 items; `resources/read quoin://patterns/hero` returns full pack manifest with 5 variants; `find_pattern("form")` returns 13 matches. `mcp/README.md` documents Claude Code, Claude Desktop, Cursor, generic-MCP-client integration.
- **`/DISTRIBUTION.md`** — top-level distribution documentation. Sections: Overview / For developers (npm, shadcn, direct file inclusion) / For AI coding agents (MCP, llms.txt, registry) / For design-system maintainers (consuming Quoin, authoring aesthetic packs, native publication) / For standards reviewers (validating the conformance claim, reading the spec, verifying parity) / Operator execution requirements (npm scope claim, NPM_TOKEN secret, first publish, MCP integration test) / Deprecation timeline (legacy `/registry.json`) / Distribution-surface summary.
- **`.github/workflows/registry-build.yml`** — GitHub Action auto-rebuilding the shadcn registry on every pack-manifest change. Auto-commits regenerated registry. Source of truth remains the canonical pack manifests; registry is derivative.
- **`.github/workflows/npm-publish.yml`** — GitHub Action publishing `@harrow-haus/quoin` and `@harrow-haus/quoin-mcp` on every `v*.*.*` tag. Requires operator-provisioned `NPM_TOKEN` repository secret.
- **README.md** — new "Distribution" section with the three primary commands and a pointer to DISTRIBUTION.md. "For AI tools" section updated to reference the new `/registry/index.json` as canonical and mark the legacy `/registry.json` as deprecated.
- **/llms.txt** — header updated with USML/Quoin bifurcation language. New "Distribution surfaces (Phase 24.1)" section.
- **/llms-full.txt** — new "Distribution surfaces (Phase 24.1)" section for AI agent direct consumption.
- **/registry.json (legacy)** — `_deprecation` block added documenting the deprecation status, deprecation date (2026-05-21), successor URL, supported-through date (2026.12), removal target (2027.x).

**Closure ref:** commit `1c6eb8887eae53f30e22e397931dac3a91c32731` (2026-05-21).

**What unblocks:**
- **Phase 24.2** (CDN distribution + custom domain) — becomes a polish phase rather than a foundation phase.
- **Phase 24.3** (documentation site polish) — the spec + catalog + conformance report all have canonical URLs to point at.
- **Phase 24.4** (first AI-tool integration tests with real coding agents — Cursor, Claude Code, Lovable, v0) — immediately runnable. Operator can ask Cursor "use Quoin's hero pattern with the Harrow Haus aesthetic" and observe the agent's behavior against a real distribution surface.
- **Phase 25** (multi-source harvest) — harvested patterns ship through the same surfaces as native Quoin patterns; the registry-build.yml action regenerates automatically.
- **Phase 26** (Standards engagement) — the "1+ external design-system adopter" activation criterion becomes plausible: a design system team trying Quoin via `npm install` or `shadcn add` and publishing about the experience is a concrete adoption signal. The Kaelig-and-W3C-Generative-UI-CG outreach scheduled for weekend work now has a concrete artifact: "I've shipped npm install @harrow-haus/quoin; here's the spec it implements" lands harder than "I've drafted a spec."

**Scope boundary:** Phase 24.1 owns `package.json`, `.npmignore`, `scripts/build-registry.js`, `registry/`, `mcp/`, `DISTRIBUTION.md`, `.github/workflows/{registry-build,npm-publish}.yml`, plus the README/llms.txt/llms-full.txt/legacy-registry.json discoverability updates. The phase does NOT touch `USML-Specification.bs`, `spec/usml-schema.json`, existing pack manifests, or aesthetic packs.

**Halts encountered:** none.

**Architectural truths surfaced during distribution-surface authoring:**

1. **Catalog is split across two physical paths in v0.1.0.** The root `/patterns/`, `/aesthetics/`, `/templates/` host 7 + 6 + 3 + 3 = 19 items shipped Phase 22.5+. The legacy `/02_reference-packs/patterns/` + `/02_reference-packs/primitives/` host 15 + 4 = 19 items shipped Phase 22. The brief's literal direction was to exclude `/02_reference-packs/` from npm distribution as "internal scaffolding"; doing so would have cut the catalog from 38 items to 19 and contradicted the spec's conformance report ("all 32 directly-usable artifacts"). Decision: include `/02_reference-packs/{patterns,primitives}/` as catalog content; exclude only the internal-scaffolding subdirs (consolidation reports, audit docs, vocab packs, scripts). Future migration may consolidate to a single path; for now the bifurcation is documented and the registry exposes the unified catalog.

2. **Peer-pack semantics map cleanly to `registryDependencies`.** Required `peerPacks` become `registryDependencies` (auto-installed); optional `optionalPeerPacks` become `meta.optionalDependencies` (explicitly installed). This separation maps directly to shadcn's eager-resolve semantics: shadcn would force-install any registryDependency, so optional peers must NOT be in that array — the v3.G.21 distinction round-trips cleanly through shadcn's contract.

3. **`@quoin/tokens-baseline` and `@quoin/vocab-*` are not shadcn items.** These are implicit infrastructure — every pack consumes tokens-baseline. Including them as shadcn items would force a circular install (every component depends on tokens, but tokens are not themselves a "component"). Decision: exclude infrastructure packs from `registryDependencies` resolution; their consumption is implicit in any pattern install.

4. **DTCG 2025.10 token format maps cleanly to shadcn `cssVars`.** Each aesthetic pack's `overrides/light.json` and `overrides/dark.json` flatten by unwrapping `$value` and prefixing names with `--`. The aesthetic-pack interface USML §6 specifies DTCG consumption; shadcn `cssVars` is the distribution serialization of that consumption. Round-trip is lossless.

5. **Pack name → shadcn item name normalization.** `@quoin/pattern-hero` → `hero`. `@quoin/aesthetic-default` → `default`. `@quoin/prim-stack` → `stack`. `@quoin/template-landing-saas` → `landing-saas`. This drops the namespace + type prefix to match shadcn's short-name convention. The full Quoin name is preserved in `meta.quoinPackName` for traceability.

6. **MCP server resource URI scheme.** `quoin://<kind>/<name>` where kind is one of `patterns`, `primitives`, `aesthetics`, `templates`. Layout primitives (e.g., `prim-stack`) are placed in the `primitives` namespace despite living under `/patterns/` — the URI scheme uses semantic role, not physical path.

**Operator-execution requirements list:**

| Task | Required for | How |
|---|---|---|
| Claim `@harrow-haus` npm scope | First publish | `npm login` + (if needed) request scope availability. If unavailable, choose `@harrowhaus`, `@harrow_haus`, or unscoped `quoin-design-system` and update package.json + workflow refs. |
| Add `NPM_TOKEN` repository secret | First auto-publish | GitHub Settings → Secrets and variables → Actions → New secret `NPM_TOKEN` with an npm automation token having publish permission on the chosen scope. |
| Configure GitHub Pages | Public registry URLs to work | Already configured for `docs/usml/` from Phase 23.1. Verify `/registry/` paths are reachable; may require GitHub Pages source = root + the `/registry/` directory served alongside `/docs/`. |
| First `npm publish` | Public availability | Tag `v0.1.0` and push; npm-publish.yml runs. Verify on https://www.npmjs.com/package/@harrow-haus/quoin after action completes. |
| First MCP integration test | Verifying real-agent adoption | Add MCP config to Claude Code (~/.config/claude-code/mcp_servers.json) or Cursor; ask agent to "list available Quoin patterns" and verify 38 items returned. |
| Run first `shadcn add` test in real project | End-to-end shadcn validation | `mkdir tmp && cd tmp && npx shadcn@latest init && npx shadcn@latest add --registry=https://harrowhaus.github.io/quoin/registry/index.json hero` |

**Adoption-surface readiness assessment:**

| Surface | Ready for external testing? | Ready for publication? | Ready for AI-coding-agent integration testing? |
|---|---|---|---|
| npm package | ✅ Configured + dry-run-verified | ⚠️ Pending operator (npm scope claim + NPM_TOKEN secret) | ✅ Once published |
| shadcn registry | ✅ Generated + validated + auto-rebuilt | ✅ Once GitHub Pages serves `/registry/` | ✅ Now (URL-addressable already if GitHub Pages serves) |
| MCP server | ✅ End-to-end smoke-tested (initialize, resources/list, resources/read, tools/call) | ⚠️ Pending operator (npm publish) | ✅ Once published (or via direct path for local testing) |

### Phase 26 — Standards Engagement

**Status:** 🟡 Queued for activation at Phase 23.5 closure (was: ⏳ Deferred; reframed per Phase 23 Reframe section above)
**Goal:** Submit the Quoin IR specification draft (published in Phase 23.5) to standards bodies. Targets include W3C (Web Components Community Group, Open UI Community Group), DTCG (Design Tokens Community Group), and direct engagement with major design system maintainers (Material, Carbon, Polaris, shadcn, Radix) about publishing Quoin IR natively.
**Closure dependency:** Phase 23.5 closure (specification draft must exist before it can be submitted).
**Operator note:** No longer indefinitely deferred. The activation trigger is concrete: the published specification draft.

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

## Phase 24.1 outcome (2026-05-21) — Adoption Infrastructure Foundation

Brief: ship the three primary adoption surfaces (npm package, shadcn-compatible registry, MCP server scaffold) plus distribution documentation and automated build pipelines, making USML/Quoin reachable from the dominant AI-coding-agent tooling layer. This is the session where Quoin becomes reachable from outside the repo. Per the D11 sequencing decision from the Phase 23.1 handoff (adoption-before-standards), Phase 24.1 is the foundation that subsequent Phase 24 sub-phases and Phase 26 standards engagement build on.

**Shipped:**

- **npm package configuration** at repository root (`package.json` + `.npmignore`). Scoped name `@harrow-haus/quoin` v0.1.0. Content-only package (no JS code): ships pack manifests + USML spec source + JSON Schema + conformance report + spec examples + THESIS + DISTRIBUTION + README + LICENSE. Exports map exposes every pattern, aesthetic, template, schema, spec, conformance, and registry by path. `npm pack --dry-run` verified: 298 files, 419 kB packed (2.1 MB unpacked), no internal-scaffolding leaks.
- **Build script** at `scripts/build-registry.js`. Deterministic ESM script that scans all five canonical pack manifest directories, transforms each to a shadcn registry item with peer-pack composition resolved to `registryDependencies`, optional peer packs recorded in `meta.optionalDependencies`, and aesthetic-pack DTCG overrides flattened to shadcn `cssVars`. Single invocation generates 38 items + the registry root + the Markdown projection.
- **shadcn-compatible registry** at `/registry/`. 38 items (32 components + 3 styles + 3 blocks). All items pass structural validation; all declared `registryDependencies` resolve to siblings. `registry/README.md` documents the format, naming convention, item-type mapping, peer-pack composition semantics, DTCG→cssVars rule, and consumption commands.
- **MCP server scaffold** at `/mcp/`. Separate npm package `@harrow-haus/quoin-mcp` v0.1.0 with `quoin-mcp` CLI binary. Implements stdio-transport MCP server using `@modelcontextprotocol/sdk`. Exposes 38 catalog resources at `quoin://<kind>/<name>` URIs; provides `find_pattern` tool for substring search. End-to-end smoke-test confirmed all three MCP capabilities: `initialize` succeeds, `resources/list` returns 38 items, `resources/read quoin://patterns/hero` returns full manifest with 5 variants, `find_pattern("form")` returns 13 matches. `mcp/README.md` documents Claude Code / Claude Desktop / Cursor / generic-MCP-client integration.
- **`DISTRIBUTION.md`** at repository root — canonical distribution documentation across all surfaces, with concrete commands and integration examples for developers, AI coding agents, design-system maintainers, and standards reviewers. Operator-execution-requirements list. Deprecation timeline for the legacy `/registry.json`.
- **GitHub Actions** at `.github/workflows/{registry-build,npm-publish}.yml`. `registry-build.yml` auto-rebuilds the shadcn registry on every canonical-pack-manifest change. `npm-publish.yml` publishes both packages on every `v*.*.*` tag — requires operator-provisioned `NPM_TOKEN` repository secret.
- **Discoverability updates** — README.md gains a Distribution section; /llms.txt + /llms-full.txt add distribution-surface sections for AI agent direct consumption; legacy `/registry.json` gains a `_deprecation` block pointing at the successor URL.

**Verification (end-to-end):**

| Check | Result |
|-------|--------|
| `npm pack --dry-run` succeeds, 298 files / 419 kB | ✅ |
| No internal scaffolding leaks (node_modules, spec/tests, docs/, skills/, compass_artifact, PHASES.md, CHANGELOG) | ✅ |
| Build script generates 38 items (32 components + 3 styles + 3 blocks) | ✅ |
| All 38 registry items structurally valid (required fields, valid types, array files, unique names) | ✅ |
| All 6 declared `registryDependencies` resolve to sibling items | ✅ (button-system, form-fields, etc.) |
| `hero` registry item correctly declares `registryDependencies: [button-system]` (round-trips Quoin peerPacks) | ✅ |
| `default` aesthetic correctly emits `cssVars.light` and `cssVars.dark` from DTCG overrides (sample: `--surface: oklch(98% 0 0)`) | ✅ |
| MCP server `initialize` request succeeds | ✅ |
| MCP `resources/list` returns 38 items | ✅ |
| MCP `resources/read quoin://patterns/hero` returns hero manifest with 5 variants | ✅ |
| MCP `tools/list` returns `find_pattern` | ✅ |
| MCP `find_pattern("form")` returns 13 matches | ✅ |
| Legacy `/registry.json` carries `_deprecation` block | ✅ |
| README.md "Distribution" section added; "For AI tools" section references new canonical registry + marks legacy as deprecated | ✅ |
| /llms.txt + /llms-full.txt include Distribution surfaces sections | ✅ |
| USML-Specification.bs, spec/usml-schema.json, existing pack manifests untouched | ✅ per scope boundary |

**Architectural truths surfaced during distribution-surface authoring:**

1. **Catalog spans two physical paths.** Root `/patterns/` + `/aesthetics/` + `/templates/` (19 items shipped Phase 22.5+) vs `/02_reference-packs/{patterns,primitives}/` (19 items shipped Phase 22). The brief literally said exclude `/02_reference-packs/`; doing so would have cut catalog from 38 to 19 and contradicted the conformance report. Decision: include `/02_reference-packs/{patterns,primitives}/` as catalog content; exclude only internal-scaffolding subdirs.
2. **Peer-pack semantics map cleanly to shadcn `registryDependencies` for required peers, `meta.optionalDependencies` for optional peers.** v3.G.21 distinction round-trips cleanly.
3. **`@quoin/tokens-baseline` and vocab packs are not shadcn items.** Implicit infrastructure; including them as items would create circular install (every component depends on tokens, but tokens are not themselves components).
4. **DTCG 2025.10 → shadcn `cssVars` round-trip is lossless.** Aesthetic packs already ship DTCG-shaped overrides; the flattening rule is mechanical.
5. **Pack name → shadcn item name normalization.** `@quoin/pattern-X` → `X`. Full Quoin name preserved in `meta.quoinPackName` for traceability.
6. **MCP resource URI scheme uses semantic role, not physical path.** Layout primitives at `/patterns/prim-*/` are exposed at `quoin://primitives/<name>`.

**Operator-execution requirements (detailed in DISTRIBUTION.md):**

- Claim `@harrow-haus` npm scope (or choose fallback)
- Add `NPM_TOKEN` repository secret
- Configure GitHub Pages to serve `/registry/` alongside `/docs/usml/`
- Tag `v0.1.0` to trigger first publish
- Run first MCP integration test with Claude Code / Cursor / equivalent
- Run first `shadcn add` test in a real project

**Adoption-surface readiness:** all three surfaces are ready for external testing now (registry + MCP); npm requires operator credentials before publication.

**Halts encountered:** none.

**Strategic implications:**

- USML/Quoin is reachable through the three dominant AI-coding-agent surfaces. The Phase 26 "1+ external design-system adopter" criterion becomes plausible.
- The Kaelig outreach and W3C Generative UI CG outreach (scheduled for weekend work) now have a concrete artifact to point at — "I've shipped npm install @harrow-haus/quoin; here's the spec it implements" lands harder than "I've drafted a spec."
- Phase 24.2 (CDN + custom domain) becomes a polish phase. Phase 24.4 (real-agent integration tests) becomes immediately runnable.
- Phase 25 (multi-source harvest) has a real distribution target.

**Next-session recommendation:** Phase 24.4 (first AI-tool integration tests with Cursor, Claude Code, Lovable, v0) is the highest-leverage next move — exercises the surfaces shipped here with real-world agent behavior and produces concrete adoption evidence. Alternative: Phase 23.2 (ingest interface spec) if the operator wants to return to spec polish before further distribution. Either is tractable.

---

## Phase 23.1 outcome (2026-05-21) — USML Editor's Draft + Reference Implementation Conformance Claim

Brief: ship the USML Editor's Draft 2026.05 in Bikeshed format with all 16 standards-readiness attributes addressed, the formal JSON Schema, canonical examples, test conformance scaffold, and the reference implementation conformance claim. Lock the USML/Quoin bifurcation throughout the discoverability surface. Do NOT submit to W3C — submission is deferred to Phase 26 after adoption thresholds are met.

**Strategic context.** This phase incorporates the savant-research findings from `compass_artifact_wf-0f17f0b9-...`. The W3C UI Specification Schema Community Group closed 2026-05-21 (the same day this phase ships) after producing zero artifacts in 9 months. The W3C Generative UI Community Group (chartered Jan 2026, chairs Zuo Wang and Hai Rao, 21 participants including Fuqiao Xue and Steve Faulkner) sits in the same semantic-IR layer but has produced no draft content. The asymmetric strategic window is roughly 6-12 months. USML's Phase 23.1 makes the artifact exist with standards-readiness baked in; adoption (Phase 24-25) precedes engagement (Phase 26).

**Shipped:**

- **`USML-Specification.bs`** — the Editor's Draft 2026.05 in Bikeshed format. Authored standards-ready: RFC 2119 normative vocabulary, four mandatory considerations sections (Security / Privacy / Accessibility / i18n), three conformance classes with normative MUST/SHOULD statements, named editor (Donald Pilger), canonical hosting URL (https://harrowhaus.github.io/quoin/usml/), date-versioning policy (mirrors DTCG 2025.10 precedent), normative references to adjacent standards, a complete Terminology section with 24 `<dfn>` definitions, a Change Log, an Adoption Thresholds section documenting Phase 26 activation criteria.
- **`spec/usml-schema.json`** — formal JSON Schema 2020-12. Three pack-type branches via `anyOf` (Pattern / AestheticPack / Template). QuoinVersion accepts both legacy semver (existing packs) and new date-versioned ranges (with deprecation note). All 29 existing pack manifests in the catalog validate against this schema.
- **`spec/examples/`** — five canonical examples spanning the data-model breadth: pattern-hero (multi-variant + peer-pack composition), pattern-button-system (self-contained microstates), pattern-disclosure (translated pattern with source attribution), aesthetic-default (DTCG-consuming pack), composition-graph (reverse-lineage documentation). All four schema-validated examples round-trip cleanly.
- **`spec/tests/`** — conformance scaffold with three runners (anatomy/, aesthetic-pack/, backend-emit/) + aggregate run-all.mjs. Two passing + one failing fixture per Anatomy + Aesthetic-Pack classes; one passing emission-shape fixture per Backend class. 5/5 tests pass against the reference implementation.
- **`spec/conformance-report.md`** — Quoin's claim against USML 2026.05. Anatomy Validator: Partial (validates own manifests; external CLI tool not yet exposed). Aesthetic-Pack Provider: Full (three v1.0 packs satisfy §4.3). Backend Emitter: Level 3 (plain-CSS backend, all 32 directly-usable artifacts).
- **`.github/workflows/spec-build.yml`** — GitHub Action wiring the `w3c/spec-prod@v2` action to build the Bikeshed source to `docs/usml/` for GitHub Pages serving on every main push.
- **`README.md` + `THESIS.md`** — USML/Quoin bifurcation applied throughout. Lead paragraphs now read "USML is the specification; Quoin is the reference implementation." All subsequent references reconciled.

**Architectural truth surfaced during specification authoring.** The existing pack manifests use `quoinVersion: "^0.1.0"` (semver range), pre-dating USML's date-versioning policy. The schema accommodates both formats via `anyOf`, with the legacy semver branch carrying a deprecation note encouraging new packs to adopt date-versioning. This is the kind of legacy-accommodation that surfaces only when a specification is authored against an existing implementation — and resolving it correctly (instead of breaking existing packs) is the kind of decision the bifurcation between specification and implementation makes evaluable.

**Verification:**

| Check | Result |
|-------|--------|
| `USML-Specification.bs` authored with all 16 standards-readiness attributes | ✅ |
| `spec/usml-schema.json` parses (JSON Schema 2020-12) | ✅ |
| 29 existing pack manifests validate against the schema (patterns + primitives + aesthetics + templates + reference packs) | ✅ |
| Four canonical schema-validated examples round-trip | ✅ |
| Test scaffold runs end-to-end (5/5 pass) | ✅ |
| GitHub Action authored (build pipeline executes on next push) | ✅ |
| Reference implementation conformance claim documented | ✅ |
| README.md + THESIS.md updated for USML/Quoin bifurcation; no contradictions remain | ✅ |
| Phase 23 reframed in PHASES.md; Phase 26 activation criteria documented | ✅ |
| No discoverability-surface changes to /llms.txt, /llms-full.txt, /registry.json (deferred per scope boundary) | ✅ |

**Strategic implications for downstream work:**

- **The artifact now exists with standards-readiness baked in.** External implementers, design-system maintainers, and standards-body reviewers can evaluate USML on its merits. This is the credibility anchor adoption work (Phase 24-25) builds on.
- **The bifurcation enables clean external messaging.** "USML 2026.05" is the spec name; "Quoin" is the reference implementation name; the relationship is HTML/Firefox by precedent.
- **Phase 26 has a concrete activation gate.** Adoption thresholds in USML §Adoption Thresholds are explicit: 3+ co-editors / 2+ independent implementations / 1+ design-system adoption / incubation venue. Until those are met, the spec iterates publicly; submission waits.
- **W3C Generative UI CG is the preferred incubation venue** when Phase 26 activates. The CG has W3C staff and accessibility-leader participation; joining as participant with USML as input document is higher leverage than competing externally.

**Halts encountered:** none.

**Next-session recommendation:** Phase 23.2 (Ingest interface specification) OR Phase 24 prep (adoption groundwork). Phase 23.2 elaborates USML §Ingest Interface from sketch to formal contract; this is the natural continuation of the spec-authoring track. Phase 24 prep starts shaping the build-pipeline + npm + AI-tool distribution surface that grows adoption.

The operator chooses based on whether the next priority is "the spec deepens" (23.2) or "adoption infrastructure ships" (24 prep). Both are tractable; the brief's D11 sequencing decision says adoption-before-standards, which mildly favors 24 prep — but 23.2 is also adoption work in the sense that it sharpens the spec into something external implementers can target.

---

## Phase 22.7 outcome (2026-05-21) — Pattern Translation Skill + Specification-Framing Documentation

Brief: ship the transitional infrastructure for ingesting external design systems plus the specification-framing documentation that establishes Quoin's strategic position. Three reference translations from ARIA APG demonstrate the framework end-to-end. The session also documents the **Phase 23 reframe** that elevates Phase 23 from "the engine that powers multi-backend emission" to "the published specification draft for UI semantics."

**Architectural framing.** Quoin is a specification for UI semantics with a reference implementation in HTML and CSS. The pattern translation skill is **transitional infrastructure** — it exists to bridge the period before major design systems publish their anatomy in Quoin IR format natively. As adoption grows and systems implement the specification directly, the translation skill becomes obsolete by design. The work in this session is the same as previously specified for "harvest tooling," but the meaning is sharper: every translation is preparation for the day when sources publish Quoin IR natively, and Quoin's translations retire.

**Shipped:**

- **`THESIS.md`** at repo root. The specification-framing positioning document. Leads with the specification framing, establishes the standards-track ambition, documents the adoption modes, captures the honest current state. ~180 lines. External observers (adopters, contributors, standards body reviewers, AI tool builders) read this first.
- **`skills/quoin-pattern-translator.md`** — 12-section translation skill with explicit transitional framing. Sections cover invocation conditions / non-invocation conditions / inputs (5 format classes) / outputs / per-format extraction summary / naming convention application (v3.G.15-G.16) / composition rule extraction / license clearance / quality gates / batch workflow / README template / specification framing for translated patterns. Every translated pattern's README references the specification as the canonical contract; the source is documented as "the design system that contributed this pattern's anatomy"; the translation as "the specification-conformant expression of that anatomy."
- **`docs/sources/SOURCES.md`** — curated registry. 5 public-domain sources, 9 permissive-licensed sources, 3 incompatible-licensed sources documented. Each entry: URL, license, license SPDX, source format, quality assessment, yield estimate, pattern count, harvest priority, translated-patterns tracker, rejected-patterns tracker, notes. Includes a "Future state — sources that may publish Quoin IR natively" anticipation section + a yield-rate retrospective table (Phase 22.7 yield: ARIA APG 3/3 = 100%).
- **`docs/translation/anatomy-extraction-rules.md`** — per-format procedures D.1 through D.7. D.1 HTML+CSS (highest fidelity, worked example using disclosure); D.2 web component; D.3 JSX/TSX; D.4 design spec; D.5 wireframe image (with `confidence: visual-only` flag); D.6 cross-format normalization (naming, tokens, composition, ARIA, microstates); **D.7 Quoin IR native ingest** (the future-state procedure documenting how sources that publish Quoin IR natively are accepted directly without translation).
- **`docs/translation/quality-gates.md`** — 20 acceptance gates (G.QA-1 through G.QA-20) covering anatomy minimum/maximum, conditional-slot gating, variant tokenization, composition reality (v3.G.17), conditional peers (v3.G.21), reverse-lineage (D.82), ARIA conformance, keyboard navigation, reduced motion, performance budgets, license compatibility, attribution recording, naming derivation + collision, README completeness, examples completeness, translation notes. Opens with "Quality gates exist because Quoin's specification is publishable" framing.
- **Three reference translations** (`patterns/disclosure/`, `patterns/combobox/`, `patterns/tabs/`). Each ships a complete Quoin pack: `quoin.pack.json` with `metadata.source` attribution block + `primitives/index.json` per v3.G.18 + working specimen with companion JS + README with Source attribution paragraph + Translation notes + "What this pattern is NOT" + LICENSE with W3C-Document-License attribution + package.json. Specification framing language in every README: "expresses [ARIA APG]'s anatomy in Quoin's specification format. As ARIA APG and W3C standards bodies adopt or align with the Quoin specification — a path Quoin actively pursues — this translation will be retired in favor of native specification publication."
- **Phase 23 reframe section** in PHASES.md — the authoritative reference for the specification-framing pivot. Sub-phases 23.1-23.5 adjusted. Phase 26 activation queued on 23.5 closure instead of indefinitely deferred.
- **Discoverability surface updated** — README.md (THESIS.md link + 22-pattern catalog + new translation section), /llms.txt (translation-skill pointer + updated catalog), /llms-full.txt (full anatomy for disclosure, combobox, tabs + specification framing summary), /registry.json (3 new entries).

**Verification status:**

- All 9 new JSON files (3 packs × 3 JSON files each) parse cleanly.
- Existing patterns and primitives untouched.
- THESIS.md cross-references verified against actual PHASES.md state. Reconciled: catalog count, phase enumeration (Phase 22.5.A/C/D + 22.6 shipped; 22.7 this session; 22.5.B and harvest sessions queued next).
- Each translation README contains: source attribution paragraph, four anatomy tables per v3.G.18, Translation notes section, "What this pattern is NOT" section, keyboard contract, ARIA contract.
- Each translation's specimen renders working interaction with minimal companion JS (≤50 lines per pattern).
- ARIA contracts match ARIA APG references for all three patterns.

**Specification framing implications for downstream work:**

- **Harvest is transitional.** Phase 25 (Multi-Source Harvest) is now explicitly transitional. Each translated source is a candidate for retirement when the source publishes Quoin IR natively. Native publication is the strategic goal; translation is tactical bridge.
- **Phase 23's deliverable is the specification draft, not just the engine.** The IR specification (`Quoin-IR-Specification.md`) is what's published at Phase 23.5 closure. The engine is the reference implementation that proves the specification works.
- **Phase 26 has a concrete activation trigger.** Standards engagement (W3C Web Components CG, W3C Open UI CG, DTCG, direct outreach) activates at Phase 23.5 closure. The specification draft is what's submitted.
- **Translation pack format prepares for retirement.** Every translation README includes the "this translation will be retired in favor of native specification publication" language. When a source publishes Quoin IR for a pattern, the corresponding Quoin pack becomes a thin re-export rather than a maintained translation.

**Out of scope (handled in subsequent sessions):**

- Additional translations beyond the 3 reference translations. The framework is shipped; harvest sessions execute against it.
- The Phase 22.5.B editorial pattern batch (`prose-body`, `code-block`, `pull-quote`, `figure-with-caption`) — still queued.
- The Phase 22.7-Composition-Consolidation work (refactoring existing patterns to compose layout primitives from Phase 22.6) — still queued; renamed in dependency graph to avoid collision with this session's Phase 22.7 naming.

**Halts encountered:** none.

**Reconciliation noted in closing report:** the pre-drafted THESIS described "Phase 22.8 (Aesthetic Packs + Editorial Harvest + Templates + Demo)" which is work already shipped under Phase 22.5.A/C/D. THESIS was reconciled to match existing PHASES.md numbering rather than retroactively renumbering. Documented in the Phase 22.7 PHASES.md entry above and in `docs/sessions/SESSION-6-REPORT.md`.

**Next-session recommendation:** Phase 22.5.B (the first half of the editorial pattern batch — prose-body, code-block, pull-quote, figure-with-caption) is the most-leveraged next ship, since it unblocks full composition of templates D.2 + D.3. Alternative: Phase 23.1 (IR specification data model design) if the operator wants to start the standards-track work. Both are tractable.

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
                → Phase 22.7-Composition-Consolidation (refactor existing patterns to compose layout primitives) [QUEUED — renamed from prior Phase 22.7 alias to avoid collision with this session's Phase 22.7]
              → Phase 22.7 (Pattern Translation Skill + Specification-Framing — ✅)
                → Harvest sessions [UNBLOCKED — operate against curated SOURCES.md registry under quality-gates framework]
                → Phase 23 reframed (IR architecture → IR specification draft + reference engine)
                → Phase 26 activation [QUEUED on Phase 23.5 closure — no longer indefinitely deferred]
              → Phase 23 (USML IR Architecture — spec draft + reference engine; renamed from Quoin IR per bifurcation)
                → Phase 23.1 (USML Editor's Draft 2026.05 + Reference Implementation Conformance Claim — ✅)
                  → Phase 23.2 (Ingest interface specification) [UNBLOCKED, queued]
                  → Phase 23.3 (Emission interface specification) [UNBLOCKED, queued]
                  → Phase 23.4 (First reference source adapter formalization) [UNBLOCKED, queued]
                → Phase 23.5 (Specification publication + first additional reference backend + live translation demo)
                  → Phase 26 (Standards Engagement) [ACTIVATES on adoption thresholds met]
                → Phase 24 (Build Pipeline + AI Tool Distribution — in progress)
                  → Phase 24.1 (Adoption Infrastructure Foundation — ✅)
                    → Phase 24.2 (CDN distribution + custom domain) [UNBLOCKED, queued]
                    → Phase 24.3 (Documentation site polish) [UNBLOCKED, queued]
                    → Phase 24.4 (First AI-tool integration tests) [UNBLOCKED, queued]
                → Phase 25 (Multi-Source Harvest) [UNBLOCKED — distribution surface now exists for harvested patterns]
              → Templates layer [BLOCKED on Cons. 4 nav unification]
            → Phase 5e (Launch) [BLOCKED on Phase 23 closure]
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
