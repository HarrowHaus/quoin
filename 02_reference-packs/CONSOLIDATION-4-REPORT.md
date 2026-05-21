# Consolidation 4 — Unified nav pattern (closed)

**Phase 22 / Unification Audit · Consolidation 4**
**Status: CLOSED · 2026-05-20**
**Resolution: Single `@quoin/pattern-nav` pack with 4 variants (mechanical application of Cons. 3 Q1-Q8 cascade)**

---

## What Cons. 4 fixed

Before Cons. 4, Quoin shipped 4 separate nav packs (nav-marketing, nav-app-chrome, nav-docs, nav-editorial). The audit confirmed all 4 share core anatomy (section + brand) but diverge substantially in variant-specific structure. Maintaining 4 parallel packs cost the same duplication tax Cons. 3 fixed for hero.

## What shipped

- Audit + Proposal (`CONSOLIDATION-4-{AUDIT,PROPOSAL}.md`) — Session 2 commit `bfb9ff7`
- Pack scaffolding (`patterns/nav/`) — Session 2 commit `bfb9ff7`
- editorial.html migration — Session 2 commit `bfb9ff7`
- marketing.html migration — Session 3 (this commit)
- app-chrome.html migration — Session 3 (this commit)
- docs.html migration — Session 3 (this commit)
- bootstrap-integrity gate extension — `nav` added to `DATA_REGISTER_DEPRECATED_IN` (v3.G.16) and `COMPOSITION_REALITY_ENFORCED_FOR` (v3.G.17) — this commit
- 4 deprecated `patterns/nav-{variant}/` directories removed — this commit
- content-completeness.js — 4 enrollments re-routed to `nav/{variant}` paths with `path` override
- Reverse-lineage tables updated per D.82: button-system / modal-dialog / form-fields README files now list nav as consumer
- Discoverability surface updated: README pattern count 18 → 15; pattern catalog grid restructured to 5 rows; llms.txt nav section unified; llms-full.txt nav block rewritten with full anatomy; registry.json items 19 → 16 (4 nav-* items → 1 nav item)

## Data-variant collision resolution (Cons. 3 Q3 cascade)

Per the brief, existing per-pack `data-variant` values across nav variants renamed to `data-mode`:
- marketing: `data-variant="default | sticky | transparent | compact"` → `data-mode="..."`
- app-chrome: `data-variant="standard | with-subnav | condensed"` → `data-mode="..."`
- docs: `data-register="topbar-only | with-sidebar"` → `data-mode="..."`
- editorial: `data-register="stacked | single-row"` → `data-mode="..."`

The new top-level `data-variant` carries one of `marketing | app-chrome | docs | editorial`. Section-level mode/style modifiers live on the orthogonal `data-mode` attribute per Cons. 3 Q3.

## Sub-slot data-register collapses

All `data-register` usage on sub-slots renamed per the gate:
- `data-register="simple | mega"` on nav-dropdown-panel → `data-kind`
- `data-register="pill | outline"` on nav-subscribe-cta → `data-kind`
- `data-register="underline | pill | boxed"` on nav-page-tabs → `data-kind`
- `data-register="extended"` on nav-utility (editorial) → `data-kind`

## Naming-prefix collapse (v3.G.15)

All `nav-{variant}-X` and `app-X` sub-slot prefixes collapsed to `nav-X`:
- nav-marketing → nav-section + data-variant="marketing"
- nav-app-chrome → nav-section + data-variant="app-chrome"
- nav-docs-section → nav-section + data-variant="docs"
- nav-editorial-section → nav-section + data-variant="editorial"
- app-workspace-switcher / app-breadcrumb / app-global-search / app-action-cluster / app-notification-bell / app-user-menu / app-page-tabs → nav-workspace-switcher / nav-breadcrumb / nav-search / nav-secondary-actions / nav-notification-bell / nav-avatar / nav-page-tabs
- nav-cta-cluster → nav-secondary-actions
- nav-primary-list → nav-primary-links (per primitives JSON — flag-and-continue resolved per operator instruction)
- nav-editorial-categories → nav-sections
- All other `nav-{variant}-X` sub-slots collapsed to `nav-X`

## Composition lineage (real, per v3.G.17)

- nav-secondary-actions (marketing + app-chrome) and nav-subscribe-cta (editorial) and nav-meta-actions (docs) use `class="action-button"` from `@quoin/pattern-button-system`. Class counts: marketing 22, docs 8, editorial 6, app-chrome 4 — all ≥1.
- nav-search (app-chrome + docs) opens `@quoin/pattern-modal-dialog` Cmd-K palette.
- nav-search-inline (editorial) composes `@quoin/pattern-form-fields` text input.

## Verification

| Check | Result |
|---|---|
| `bootstrap-integrity.js` (with `nav` in v3.G.16 + v3.G.17 enforced sets) | 26/26 specimens green |
| `content-completeness.js` | 18/18 enrolled patterns OK (4 nav-* enrollments rerouted to nav/{variant} paths) |
| Registry.json parses; 16 items enumerated | ✓ |
| LICENSE + manifest schemas | ✓ |

## Flagged for future consolidations (not blocking Cons. 4)

1. **`nav-page-tabs` and `nav-breadcrumb`** primitives currently inlined within nav per operator's "leave inlined for now" instruction. Future consolidation (Cons. 6 likely covers breadcrumb under sequence-primitive consolidation; page-tabs may be a separate future consolidation if usage spreads beyond nav).
2. **`nav-notification-bell`** is a new conditional slot in app-chrome that wasn't in the original Cons. 4 audit. Documented in the migrated app-chrome.html but the primitives/index.json doesn't yet include it. Add in a small follow-up if usage stays in app-chrome only; defer to Cons. 6 if it shows up in editorial too.
3. **Mode value enumeration** in primitives/index.json's `data-mode` attribute is implicit (varies per variant). For tighter validation, add a typed enum per variant. Future enhancement.

## Commits

| Commit | Scope |
|---|---|
| `38b3a4e` (Session 2) | Cons. 4 audit |
| `bfb9ff7` (Session 2) | Cons. 4 proposal + pack scaffolding + editorial.html migration |
| _this commit_ (Session 3) | marketing.html + app-chrome.html + docs.html migrations; gate extension; deprecated dir removal; reverse-lineage; discoverability surface; this report |

## Cons. 4 closed. Phase 22 progress: 4 of 9 consolidations complete (Cons. 1, 2, 3, 4).
