# Consolidation 4 Proposal — Unified nav pattern

**Phase 22 / Unification Audit · Consolidation 4**
**Status: Mechanical translation of audit; no operator review halt per Session 2 extended-run authorization.**
**Author: Claude Code (Opus 4.7) · 2026-05-20**
**Reference audit:** `02_reference-packs/CONSOLIDATION-4-AUDIT.md`

---

## 1. Implementation specification

Per the audit, no novel architectural questions surfaced. Cons. 3's Q1–Q8 cascade applies directly. The unified pack mirrors Cons. 3's hero pack structure.

## 2. Pack manifest

**`02_reference-packs/patterns/nav/quoin.pack.json`:**

```json
{
  "$schema": "https://harrow.haus/quoin/schema/pack.json",
  "name": "@quoin/pattern-nav",
  "version": "1.0.0",
  "type": "pattern",
  "quoinVersion": "^0.1.0",
  "description": "Unified nav pattern. Two mandatory slots (section, brand) + 17 conditional slots gated by data-variant. Four variants (marketing / app-chrome / docs / editorial) consolidated from 4 parallel packs per Phase 22 Cons. 4.",
  "category": "navigation",
  "variant": "system",
  "variants": ["marketing", "app-chrome", "docs", "editorial"],
  "exports": { "primitives": "./primitives/index.json" },
  "states": ["default", "scrolled", "menu-open", "search-open"],
  "microStates": ["default", "hover", "active", "focus", "focus-visible", "disabled", "selected"],
  "metadata": {
    "author": "Quoin", "license": "MIT",
    "homepage": "https://harrow.haus/quoin/patterns/nav",
    "tags": ["nav", "navigation", "marketing", "application", "docs", "editorial", "p0", "consolidated"]
  },
  "peerPacks": {
    "@quoin/tokens-baseline": "^0.1.0",
    "@quoin/pattern-button-system": "^1.0.0",
    "@quoin/pattern-form-fields": "^1.0.0",
    "@quoin/pattern-modal-dialog": "^1.0.0"
  },
  "consolidates": [
    "@quoin/pattern-nav-marketing",
    "@quoin/pattern-nav-app-chrome",
    "@quoin/pattern-nav-docs",
    "@quoin/pattern-nav-editorial"
  ],
  "deprecates": "phase-22-cons-4"
}
```

## 3. Primitives — 19 entries (2 mandatory + 17 conditional)

See implementation; full schema lives in `02_reference-packs/patterns/nav/primitives/index.json`. Conditional primitives use the `gatedBy` field per Cons. 3's convention. Examples:

- `nav-section` (mandatory): container; carries `data-variant`, `data-alignment`, `data-state`.
- `nav-brand` (mandatory): wordmark / logo / brand link.
- `nav-primary-links` (gated by `data-variant in [marketing, app-chrome]`).
- `nav-search` (gated by `data-variant in [app-chrome, docs]`): composes modal-dialog Cmd-K palette.
- `nav-search-inline` (gated by `data-variant="editorial"`): composes form-fields email-style input.
- `nav-subscribe-cta` (gated by `data-variant="editorial"`): composes button-system action-button.
- `nav-masthead`, `nav-utility`, `nav-sections` (editorial-only).
- `nav-sidebar`, `nav-sidebar-section`, `nav-topbar`, `nav-meta-actions`, `nav-skip-link` (docs-only).
- `nav-workspace-switcher`, `nav-avatar`, `nav-subnav` (app-chrome-only).
- `nav-dropdown-panel`, `nav-mobile-toggle`, `nav-secondary-actions` (marketing + app-chrome).

## 4. Universal + variant attributes

| Attribute | Scope | Values |
|---|---|---|
| `data-variant` | universal | `marketing` / `app-chrome` / `docs` / `editorial` |
| `data-alignment` | universal where applicable | `centered` / `left` / `right` / `split-anchor` |
| `data-state` | universal | `default` / `scrolled` / `menu-open` / `search-open` |
| `data-sidebar-width` | docs only | `narrow` / `default` / `wide` |
| `data-weight` | editorial only | `default` / `heavy` |
| `data-register` on dropdown-panel | marketing only | `simple` / `mega` (renamed to `data-kind` per Q2) |
| `data-columns` on dropdown-panel | marketing only | `2` / `3` / `4` |

## 5. Composition (real, not aspirational — per Cons. 3 Q5)

| Consumed primitive | Source pack | Used in |
|---|---|---|
| `action-button` | `@quoin/pattern-button-system` | `nav-subscribe-cta`, marketing's primary CTA, app-chrome's primary CTA |
| `form-control` | `@quoin/pattern-form-fields` | `nav-search-inline` (editorial expanded input) |
| modal-dialog (Cmd-K palette) | `@quoin/pattern-modal-dialog` | `nav-search` trigger (app-chrome, docs) — opens modal |
| tokens | `@quoin/tokens-baseline` | every CSS value |

## 6. CSS structure

`@layer quoin.patterns` cascade-layer organization. Base anatomy first; variant-scoped selectors via `[data-pattern="nav-section"][data-variant="..."]`. Conditional-slot CSS scoped under the gating variant.

## 7. Migration plan

5 batches:
- **Batch 1** — Create `patterns/nav/` scaffolding (manifests + primitives + README + empty examples/).
- **Batch 2** — Migrate `marketing.html` (from `patterns/nav-marketing/examples/index.html`).
- **Batch 3** — Migrate `app-chrome.html` (from `patterns/nav-app-chrome/`).
- **Batch 4** — Migrate `docs.html` + `editorial.html` (from respective sources).
- **Batch 5 closing** — Remove 4 deprecated dirs; update gate's `DATA_REGISTER_DEPRECATED_IN` (add 'nav') and `COMPOSITION_REALITY_ENFORCED_FOR` (add 'nav'); update CHANGELOG, content-completeness, registry.json, llms.txt, llms-full.txt, README pattern count; write `CONSOLIDATION-4-REPORT.md`.

Each mechanical translation follows Cons. 3's table:
- `data-pattern="nav-marketing"` → `data-pattern="nav-section" data-variant="marketing"`
- `data-pattern="nav-{variant}-X"` → `data-pattern="nav-X"`
- `data-register="..."` → `data-variant` (where applicable) / `data-kind` (sub-slot kinds) / `data-sidebar-width` / `data-weight`
- JS `querySelector` updates parallel to Cons. 3
- Inline `.cta` references converted to `class="action-button"` if any exist

## 8. Halt conditions during implementation (5 from Cons. 3 + Session 2 #2)

Same as Cons. 3 §11 + the Session 2-specific: "if any peer pack composition requires the peer pack to ship new variants/slots/states, out of scope for this session."

Composition check: nav consumes button-system (already supports primary intent for subscribe CTA), form-fields (already supports text input for nav-search-inline), modal-dialog (already supports the dialog primitive for Cmd-K palette). **No peer pack changes required.** Composition stays in scope.

## 9. Stop condition

Proposal complete. Implementation begins immediately (Session 2 extended-run).
