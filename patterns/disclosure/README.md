# @quoin/pattern-disclosure

A button that toggles the visibility of an associated content region. Foundational expand/collapse anatomy used by accordions, FAQs, settings panels, expand-for-detail surfaces.

> **Source attribution.** This pattern's anatomy is sourced from the [W3C ARIA Authoring Practices Guide — Disclosure (Show/Hide)](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) (W3C Document License). The translation expresses ARIA APG's anatomy in Quoin's specification format. As ARIA APG and W3C standards bodies adopt or align with the Quoin specification — a path Quoin actively pursues — this translation will be retired in favor of native specification publication. The pattern itself — its anatomy, ARIA roles, keyboard behavior — derives from ARIA APG's authoritative reference.

**Shipped:** Phase 22.7 · 2026-05-21.

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| `disclosure-container` | `<div>` | Outer wrapper; carries `data-state` reflecting expanded/collapsed. Optional in degenerate cases (single sibling trigger + content) but recommended. | — |
| `disclosure-trigger` | `<button>` | The toggle. Always `<button type="button">`. Carries `aria-expanded` + `aria-controls`. | `--text`, `--border`, `--surface-elevated` (hover), `--focus-ring` |
| `disclosure-content` | `<div>` | The toggled region. Uses HTML `hidden` attribute when collapsed. `id` referenced by trigger's `aria-controls`. | `--text`, `--surface-elevated` (panel background) |

### Conditional slots

(none — pattern is foundational and single-variant)

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens | Notes |
|--------------|--------|------------------------------|-------------------|-------|
| (none) | — | — | — | This pattern has no variant axes. The trigger has microstates (default / hover / active / focus / focus-visible / disabled) but no major variants — multiple visual registers would either be aesthetic-pack overrides (which work across the pack's existing tokens) or compositions where disclosure is wrapped in another pattern (accordion, FAQ list). |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| `@quoin/prim-stack` (optional) | `@quoin/prim-stack` | content slot | When `disclosure-content` holds multiple stacked children, compose `prim-stack` inside for consistent gap. Declared in `optionalPeerPacks`. |

## Translation notes

- **No variant axes in v1.0.** ARIA APG's disclosure reference is intentionally minimal — one trigger, one content region. Adding variant axes (e.g., `data-side` for the caret direction, `data-density` for padding scale) would be adding Quoin's invention on top of the source's spec, which violates the translation skill's "discard source's design opinions, preserve source's anatomy" rule. Variant axes can be added in a future minor when consumer demand surfaces concrete needs.
- **The `hidden` attribute carries the closed state.** ARIA APG's reference toggles `hidden` via JS; we preserve that contract. Specimen ships minimal companion JS that handles toggle behavior via event delegation.
- **`data-state` mirrors `aria-expanded` for CSS-selector convenience.** The truth is in `aria-expanded` (and the trigger's state); `data-state` on the container exists only to make CSS selectors more ergonomic (`[data-state="expanded"] .panel { … }` reads more clearly than chaining off the trigger). The companion JS sets both in sync.
- **Token mapping.** Source ARIA APG specimen uses unstyled defaults; the translation maps to baseline tokens (`--text`, `--border`, `--surface-elevated`, `--focus-ring`). Aesthetic packs override these tokens to fully restyle without touching the anatomy.

## What this pattern is NOT

- **Not an accordion.** Multiple disclosures composed together with "only-one-open" semantics would be a separate pattern (`pattern-accordion`). Disclosure is the single-toggle primitive accordions compose.
- **Not a popover.** Disclosure reveals content in-flow (below or beside the trigger, displacing surrounding content). Popovers reveal floating content via the `popover` attribute or anchor positioning. Different anatomy, different ARIA contract.
- **Not a dropdown menu.** Dropdown menus use `role="menu"` + `role="menuitem"` and a separate keyboard contract (arrow-key navigation). Disclosure is button + region; menus are menu + items.
- **Not the native `<details>` element.** `<details>` implements similar semantics with a fixed disclosure-widget visual register. Use `<details>` when the native register works; use this pattern when full aesthetic control is needed.

## Keyboard contract

| Key | Behavior |
|-----|----------|
| Enter or Space (focused on trigger) | Toggles content visibility; flips `aria-expanded`. Native `<button>` provides this without JS — companion JS only updates state. |
| Tab | Standard tab order; trigger sits in DOM order. |

## ARIA contract

- **Trigger** — `<button type="button">` with `aria-expanded` reflecting current state (always set; default `false`) and `aria-controls` referencing the content's `id` (required).
- **Content** — element with `id` matching trigger's `aria-controls`. Uses HTML `hidden` attribute for closed state (removes from layout AND accessibility tree).
- **No role overrides.** `<button>` already conveys button role. Container is structural — no role.

## Performance budget

Single disclosure renders synchronously; companion JS is ~15 lines. No external dependencies. LCP impact negligible.

## License

MIT. Source attribution above governs the upstream's contribution to this pattern's anatomy.
