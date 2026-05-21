# Consolidation 8 — Searchable-list primitive (closed)

**Phase 22 / Unification Audit · Consolidation 8**
**Status: CLOSED · 2026-05-20**
**Resolution: New `@quoin/prim-searchable-list` primitive shipped. No existing consumers to migrate (forward-looking infrastructure).**

---

## Shipped

- `02_reference-packs/primitives/searchable-list/` — `@quoin/prim-searchable-list` (3 variants: command-palette / autocomplete-results / filter-dropdown; mandatory + conditional slots; combobox/listbox ARIA pattern)
- `peerPacks` declared: form-fields (text input — required)
- `optionalPeerPacks` declared: prim-label (category badges — variant-conditional)
- `CONSOLIDATION-8-{AUDIT,REPORT}.md`

## No gate extension

`prim-searchable-list` not yet in `COMPOSITION_PRIMITIVES` — no current consumers. Add `'@quoin/prim-searchable-list': ['searchable-list']` when the first consumer (likely modal-dialog command variant) ships.

## Verification

- bootstrap-integrity: 22/22 specimens green (unchanged)
- Primitive manifest JSON parses; `optionalPeerPacks` field accepted by updated schema

## Consolidation 8 closed. Phase 22 progress: 8 of 9 complete.
