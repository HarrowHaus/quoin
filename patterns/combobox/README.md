# @quoin/pattern-combobox

A single-line text input paired with a popup listbox of selectable options. The text input is editable; the listbox filters as the user types (or remains static, depending on variant).

> **Source attribution.** This pattern's anatomy is sourced from the [W3C ARIA Authoring Practices Guide — Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) (W3C Document License). The translation expresses ARIA APG's anatomy in Quoin's specification format. As ARIA APG and W3C standards bodies adopt or align with the Quoin specification — a path Quoin actively pursues — this translation will be retired in favor of native specification publication. The pattern itself — its anatomy, ARIA roles, keyboard behavior — derives from ARIA APG's authoritative reference (ARIA 1.2 pattern).

**Shipped:** Phase 22.7 · 2026-05-21.

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| `combobox-container` | `<div>` | Outer wrapper; positions the popup relative to the input. Carries `data-variant` (autocomplete behavior) + `data-state`. | — |
| `combobox-label` | `<label>` | Accessible label. `for` references the input id. | `--text`, `--font-sans`, `--type-size-sm` |
| `combobox-input` | `<input>` | The text input. `role="combobox"`, carries `aria-expanded`, `aria-controls`, `aria-autocomplete`, `aria-activedescendant`. | `--text`, `--surface`, `--border`, `--accent` (focus), `--focus-ring` |
| `combobox-listbox` | `<ul role="listbox">` | The popup option list. `id` referenced by input's `aria-controls`. Uses `hidden` when closed. | `--surface-elevated`, `--border`, `--shadow-md` |
| `combobox-option` | `<li role="option">` | One option in the listbox. Has unique `id` (referenced by `aria-activedescendant` when active). | `--text`, `--surface-recessed` (hover), `--accent-recede` (active) |

### Conditional slots

| Slot | Gated by | Role | Tokens |
|------|----------|------|--------|
| `combobox-empty-state` | data-state="loading" OR zero filter matches | Rendered inside the listbox when there are no matches. May compose `pattern-empty-state`. | `--text-recede` |

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens | Notes |
|--------------|--------|------------------------------|-------------------|-------|
| `data-variant` | `autocomplete-list` (default) / `autocomplete-inline` / `autocomplete-both` / `no-autocomplete` | — | — | ARIA APG's four combobox variants per ARIA 1.2 pattern. Drives the input's `aria-autocomplete` value and the filter/auto-completion behavior. |
| `data-state` | `default` / `open` / `loading` / `error` | `combobox-empty-state` (when `loading` or zero results) | — | Mirrors the listbox visibility and current loading/error condition. |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| `@quoin/pattern-form-fields` | `@quoin/pattern-form-fields` | label + input styling | The combobox's label + input follow form-fields' token conventions (focus ring, error state, disabled state). Declared in `peerPacks`. |
| `@quoin/prim-searchable-list` (optional) | `@quoin/prim-searchable-list` | listbox slot when doing live-filter | When autocomplete-list variant performs live-filtering on a large option set, the listbox slot may compose `prim-searchable-list` to delegate the result-rendering contract. Declared in `optionalPeerPacks`. |
| `@quoin/prim-label` (optional) | `@quoin/prim-label` | option decorations | Options may include `prim-label` chips for category badges (e.g., grouped results). Declared in `optionalPeerPacks`. |

## Translation notes

- **ARIA 1.2 pattern, not ARIA 1.1.** The ARIA 1.1 combobox used a wrapping `<div role="combobox">` with an inner `<input>`. The ARIA 1.2 pattern (current, what ARIA APG documents now) places `role="combobox"` directly on the `<input>`. We translate the 1.2 pattern. Operators implementing against 1.1-era references should update.
- **Four variants captured; behavior differences not styled differently.** The four variants (autocomplete-list / autocomplete-inline / autocomplete-both / no-autocomplete) differ in *behavior*, not visual register. The same CSS works for all four. The companion JS implements the autocomplete-list variant; the other variants follow ARIA APG's published JS examples.
- **`aria-activedescendant` over moving DOM focus.** ARIA APG's combobox pattern keeps DOM focus on the input while a listbox option is "virtually" focused via `aria-activedescendant`. This is preserved in the translation; moving DOM focus into the listbox would change the keyboard contract (Backspace would no longer reach the input).
- **Empty-state slot is conditional + composable.** ARIA APG doesn't define a specific empty-state; we add the slot as a gated affordance and let it compose `pattern-empty-state` when needed.
- **`prim-searchable-list` as optional peer.** When the autocomplete-list variant performs live-filtering on a large option set, the operator can compose `prim-searchable-list` inside the listbox slot. This is `optionalPeerPacks` because only that one variant + use-case needs it.

## What this pattern is NOT

- **Not a select element.** `<select>` has different keyboard semantics (type-ahead by first letter, no popup filter). Use `<select>` for short option lists where no filtering is needed; use combobox when the option set is large or when free-text entry is valid.
- **Not a dropdown menu.** Dropdown menus use `role="menu"` + `role="menuitem"` for action lists (commands the user invokes). Combobox is for value selection from a set.
- **Not autocomplete on `<input>` via HTML's `list`/`<datalist>`.** HTML's native datalist autocompletion is uncustomizable. Combobox is the customizable equivalent with the same ARIA contract.
- **Not a typeahead search input.** A typeahead search input that navigates the user to a result page on selection is a related but distinct pattern — its listbox options are search results, not selectable values. Such a pattern would compose this combobox plus routing on selection.

## Keyboard contract

| Key | Behavior |
|-----|----------|
| ↓ ArrowDown | If listbox closed, open it. If open, move `aria-activedescendant` to next option. |
| ↑ ArrowUp | If listbox closed, open it (active = last option). If open, move `aria-activedescendant` up (wrapping). |
| Enter | Select active option (close listbox, fill input). |
| Escape | If listbox open, close it (return focus to input, retain input value). If closed, clear input (per ARIA APG; operator may disable). |
| Home / End | If listbox open: jump active descendant to first/last. If closed: standard text-cursor behavior. |
| Tab | Standard tab order. If listbox open, closes without selecting (Enter is required for selection). |

## ARIA contract

- **Input** — `role="combobox"`, `aria-expanded` (true/false), `aria-controls` (listbox id), `aria-autocomplete` (variant value), `aria-activedescendant` (active option id or empty string).
- **Listbox** — `role="listbox"`. `id` referenced by input's `aria-controls`. `hidden` attribute when closed.
- **Option** — `role="option"`, unique `id` (referenced by `aria-activedescendant`), `aria-selected` (true when the option is the committed value).
- **Label** — `<label for="<input-id>">`. NEVER use placeholder as label.

## Performance budget

Listbox renders only the visible option range when option count exceeds ~50 (virtualization is operator responsibility for very long lists; the pattern's anatomy supports it via the `prim-searchable-list` composition).

## License

MIT. Source attribution above governs the upstream's contribution to this pattern's anatomy.
