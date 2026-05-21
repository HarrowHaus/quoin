# @quoin/prim-searchable-list

Searchable list primitive — search input + filtered result list with combobox/listbox ARIA pattern. 3 variants (`command-palette` / `autocomplete-results` / `filter-dropdown`).

**Shipped:** Phase 22 / Consolidation 8 / 2026-05-20. Forward-looking infrastructure for future modal-dialog command variant, nav search overlay, data-table column-filter consumers.

## Anatomy (v3.G.18)

### Mandatory slots

| Slot | Element | Role |
|---|---|---|
| `searchable-list` | `<div role="combobox">` | Container; carries `data-role`, `data-state` |
| `searchable-list-input` | `<input type="search">` | Composes form-fields' text input |
| `searchable-list-results` | `<ul role="listbox">` | Result list |
| `searchable-list-item` | `<li role="option">` | Single result |

### Conditional slots

| Slot | Gated by | Role |
|---|---|---|
| `searchable-list-empty` | `data-state="empty"` | Empty state |
| `searchable-list-loading` | `data-state="loading"` | Loading state |

### Variants

| Variant | Use case |
|---|---|
| `command-palette` | Full-overlay Cmd-K palette (hosted in modal-dialog command variant) |
| `autocomplete-results` | Inline dropdown below a text input |
| `filter-dropdown` | Column filter for data-table |

### Composition

| Consumes | Role |
|---|---|
| `@quoin/pattern-form-fields` | Required — `searchable-list-input` composes text input |
| `@quoin/prim-label` | Optional — `searchable-list-item` composes label for category badges |

## ARIA contract (WAI-ARIA Authoring Practices 1.2)

- Container: `role="combobox" aria-haspopup="listbox" aria-expanded="true"`
- Input: `role="searchbox" aria-autocomplete="list" aria-controls="<results-id>"`
- Results: `role="listbox"`
- Items: `role="option" aria-selected="true|false"`
- Keyboard: Arrow keys navigate; Enter activates; Esc closes (in command-palette + filter-dropdown variants).

## Minimal markup (command-palette variant)

```html
<div class="searchable-list" data-role="command-palette" data-state="default"
     role="combobox" aria-haspopup="listbox" aria-expanded="true">
  <input class="searchable-list-input" type="search" role="searchbox"
         aria-autocomplete="list" aria-controls="palette-results"
         placeholder="Search commands...">
  <ul class="searchable-list-results" id="palette-results" role="listbox">
    <li class="searchable-list-item" role="option" aria-selected="true">
      Create new project
      <span class="label" data-role="badge">⌘N</span>
    </li>
    <li class="searchable-list-item" role="option">
      Open settings
      <span class="label" data-role="badge">⌘,</span>
    </li>
  </ul>
</div>
```

## Anticipated consumers

| Consumer | Use case | Status |
|---|---|---|
| `@quoin/pattern-modal-dialog` (command variant) | Cmd-K palette body | Future — modal-dialog will declare prim-searchable-list as peerPack when populated |
| `@quoin/pattern-nav` (search overlay) | Nav search activation opens command-palette | Future — composes via modal-dialog |
| `@quoin/pattern-data-table` (column-filter variant) | Per-column filter dropdown | Future |

## Cross-references

- Audit: [`02_reference-packs/CONSOLIDATION-8-AUDIT.md`](../../CONSOLIDATION-8-AUDIT.md)
- Report: [`02_reference-packs/CONSOLIDATION-8-REPORT.md`](../../CONSOLIDATION-8-REPORT.md)
