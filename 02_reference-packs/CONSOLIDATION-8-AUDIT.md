# Consolidation 8 Audit — Searchable-list primitive

**Phase 22 / Unification Audit · Consolidation 8**
**Status: Audit phase complete; mechanical translation per Cons. 5/6 template.**

---

## Scope

Promote `command-palette-content / list-with-search / search-result-list` to a single `@quoin/prim-searchable-list` primitive.

## Audit findings

**No standalone packs exist** for command-palette content. The closest existing artifact is `pattern-modal-dialog`'s `data-variant="command"` register which the modal-dialog README describes as "hosts the searchable list of routes / actions." But the actual searchable-list content is not yet codified as a primitive — it's an implicit expectation in command-variant modal-dialog usage.

Anticipated consumers per brief:
- `pattern-modal-dialog` (command-palette variant) — opens with prim-searchable-list as body content
- `pattern-nav` (search overlay) — Cmd-K palette consumes the same searchable-list primitive
- `pattern-data-table` (column-filter variant) — future filter dropdown uses the same primitive

**No inlined consumers exist today.** Cons. 8 ships the primitive as forward-looking infrastructure, similar to Cons. 7.

## Hard-halt check

| Condition | Status |
|---|---|
| Novel architectural question | ✓ No |
| Peer pack composition needs new variants | ✓ No — searchable-list composes form-fields (text input) + prim-label (result categorization) as optionalPeerPacks |
| Visual regression | ✓ Zero (no consumers to migrate) |

## Proposed `@quoin/prim-searchable-list`

- **Variants** (`data-role`): `command-palette` / `autocomplete-results` / `filter-dropdown`
- **Anatomy**:
  - `searchable-list` (container, `<div role="combobox">`)
  - `searchable-list-input` (composes form-fields' text input)
  - `searchable-list-results` (`<ul role="listbox">`)
  - `searchable-list-item` (`<li role="option">`)
  - (conditional) `searchable-list-empty` (empty state when no results)
  - (conditional) `searchable-list-loading` (loading state while fetching)
- **Real composition**: form-fields (text input) — required; prim-label (result category badges) — optional
- **ARIA contract**: combobox + listbox pattern per WAI-ARIA Authoring Practices 1.2

## Migration

**No consumers to migrate today.** Future consumers (modal-dialog command variant, nav search overlay, data-table column filter) compose this primitive directly.

## Stop condition

Audit complete.
