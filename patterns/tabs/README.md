# @quoin/pattern-tabs

A tablist with two or more tabs that switch between matched tabpanels. Two activation modes (automatic vs manual) and two orientations (horizontal vs vertical).

> **Source attribution.** This pattern's anatomy is sourced from the [W3C ARIA Authoring Practices Guide — Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) (W3C Document License). The translation expresses ARIA APG's anatomy in Quoin's specification format. As ARIA APG and W3C standards bodies adopt or align with the Quoin specification — a path Quoin actively pursues — this translation will be retired in favor of native specification publication. The pattern itself — its anatomy, ARIA roles, keyboard behavior — derives from ARIA APG's authoritative reference.

**Shipped:** Phase 22.7 · 2026-05-21.

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| `tabs-container` | `<div>` | Outer wrapper; carries `data-orientation` + `data-activation`. | — |
| `tabs-tablist` | `<div role="tablist">` | The tab strip. Carries `aria-label` describing the tab set. | `--border`, `--space-1`, `--space-card` |
| `tabs-tab` | `<button role="tab">` | One tab. Carries `aria-selected`, `aria-controls`, roving `tabindex`. | `--text-recede` (inactive), `--text-emphasis` (active), `--accent` (selected indicator), `--focus-ring` |
| `tabs-tabpanel` | `<div role="tabpanel">` | One tabpanel. `id` referenced by tab's `aria-controls`; `aria-labelledby` references the tab. `tabindex="0"`. `hidden` when inactive. | `--text`, `--focus-ring` |

### Conditional slots

(none — pattern is foundational and single-pattern-shape; visual variations belong to aesthetic packs)

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens | Notes |
|--------------|--------|------------------------------|-------------------|-------|
| `data-orientation` | `horizontal` (default) / `vertical` | — | — | Tab strip layout. Vertical switches tablist to flex-column and selected indicator from border-bottom to border-inline-end. Tablist also carries `aria-orientation="vertical"` when set. |
| `data-activation` | `automatic` (default) / `manual` | — | — | Per ARIA APG. Automatic: arrow-key navigation immediately activates. Manual: arrow keys move focus only; Enter or Space activates. Use manual when activation has cost (network fetch, heavy render). |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| (none) | — | — | Self-contained. The tabs pattern owns the tablist + tab + tabpanel anatomy completely; no peer-pack composition. |

## Translation notes

- **Direct ARIA APG translation.** The tabs pattern is one of ARIA APG's most stable reference patterns; the translation preserves the contract exactly. The keyboard contract, roles, properties, and roving tabindex all come from ARIA APG without modification.
- **Both activation modes shipped.** ARIA APG documents both automatic and manual activation as valid choices. The translation exposes both via `data-activation`. Operators choose per use-case; ARIA APG's guidance is automatic for cheap panels, manual for expensive ones.
- **Both orientations shipped.** Horizontal is the default; vertical works identically with the keyboard contract swapped (ArrowDown/Up instead of ArrowRight/Left). The CSS recipes for both layouts are in the specimen.
- **Disabled tab support.** ARIA APG addresses disabled tabs (arrow-key navigation skips them; the tab itself is not focusable). The translation supports this via `aria-disabled="true"` on the disabled tab; companion JS skips them in the keyboard loop.
- **`tabindex="0"` on the tabpanel is required.** This is the ARIA APG-recommended pattern for tabpanels — the panel itself takes focus when Tab arrives from the active tab, then Tab moves through the panel's own focusable contents. Operators who skip this break the expected keyboard flow.
- **No conditional slots in v1.0.** Some design systems add a "more" overflow menu when tabs exceed available width. That's a separate composition (tabs + overflow-menu, where overflow-menu is its own pattern); not part of the base tabs anatomy.

## What this pattern is NOT

- **Not a navigation menu.** Navigation menus traverse between distinct pages or routes; tabs swap content within a single view. If activation should change the URL, consider `pattern-nav` instead.
- **Not an accordion.** Accordions reveal/hide content panels via disclosure-style toggles; multiple panels can be open at once. Tabs always have exactly one panel visible.
- **Not a stepper / wizard.** Steppers express a sequence with order semantics. Tabs are peers without sequence; activation doesn't progress through them.
- **Not Bootstrap's "pills."** Visual variations of the tab register (pills, segmented control, underline-only) are aesthetic-pack concerns. The tabs pattern's anatomy is the same regardless of visual treatment.

## Keyboard contract

| Key (horizontal) | Key (vertical) | Behavior |
|------------------|----------------|----------|
| ArrowRight | ArrowDown | Move focus to next tab (wrap at end). Auto mode also activates. |
| ArrowLeft | ArrowUp | Move focus to previous tab (wrap at start). Auto mode also activates. |
| Home | Home | Move focus to first tab. Auto mode also activates. |
| End | End | Move focus to last tab. Auto mode also activates. |
| Enter or Space | Enter or Space | Activate focused tab. (Manual mode only — auto mode activates on navigation.) |
| Tab | Tab | Exit tablist. Roving `tabindex` means one stop inside the tablist; Tab moves to the active tabpanel next. |

## ARIA contract

- **Tablist** — `role="tablist"`, `aria-label` (required when not contextually obvious), `aria-orientation="vertical"` when applicable.
- **Tab** — `role="tab"`, `aria-selected` (true on exactly one tab), `aria-controls` (panel id), `tabindex` (roving: 0 on active, -1 on others), `aria-disabled="true"` when disabled.
- **Tabpanel** — `role="tabpanel"`, `aria-labelledby` (controlling tab id), `tabindex="0"` (required per ARIA APG), `hidden` when inactive.

## Performance budget

Tabs render synchronously; companion JS is ~40 lines per instance. The pattern supports lazy-loading panel content (operators may defer panel inner-content rendering until activation, especially for manual-activation tabs).

## License

MIT. Source attribution above governs the upstream's contribution to this pattern's anatomy.
