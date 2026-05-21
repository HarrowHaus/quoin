# Consolidation 6 — Sequence primitive (closed)

**Phase 22 / Unification Audit · Consolidation 6**
**Status: CLOSED · 2026-05-20**
**Resolution: New `@quoin/prim-sequence` foundational primitive; nav consumer migrated via dual-class approach.**

---

## Shipped

- `02_reference-packs/primitives/sequence/` — `@quoin/prim-sequence` (4 variants: breadcrumb / ordered-list / unordered-list / sidebar-vertical; configurable separator + size)
- Consumer migrations (dual-class per Cons. 5 template):
  - `patterns/nav/examples/app-chrome.html` — `class="sequence" data-role="breadcrumb"` added to `nav-breadcrumb` element
  - `patterns/nav/examples/docs.html` — `class="sequence" data-role="sidebar-vertical"` added to `nav-sidebar-section` containers
- Gate extension: `prim-sequence` added to `COMPOSITION_PRIMITIVES` mapping (class `sequence`)
- Nav manifest: `@quoin/prim-sequence` declared under `optionalPeerPacks` (only app-chrome + docs variants use it; v3.G.21)

## Verification

- bootstrap-integrity: 22/22 specimens green
- v3.G.17 enforcement now reads peerPacks AND optionalPeerPacks correctly for nav (no false positives)

## Consolidation 6 closed. Phase 22 progress: 6 of 9 complete.
