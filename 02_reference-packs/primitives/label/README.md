# @quoin/prim-label

Label primitive — single bounded text with optional icon and optional dismiss affordance. 5 variants (`badge` / `status` / `tag` / `chip` / `dismissible`).

**Shipped:** Phase 22 / Consolidation 5 / 2026-05-20. Consolidates inlined `.badge` and `.status-pill` contracts that appeared across hero, pricing-tiers, nav, and page-header.

---

## Why this primitive exists

Before Cons. 5, the Quoin catalog had multiple patterns each declaring their own `.badge` / `.status-pill` CSS class with slightly different visual treatments. The audit (`02_reference-packs/CONSOLIDATION-5-AUDIT.md`) catalogued the duplication and confirmed the dossier's prediction that badge / tag / status-pill / chip are near-isomorphic primitives.

`@quoin/prim-label` promotes the inlined contract to a foundational primitive. Consumers reference `class="label"` with `data-role` semantic-role attribute.

## Anatomy (v3.G.18 — structured markdown)

### Mandatory slot

| Slot | Element | Role | Key tokens |
|---|---|---|---|
| `label` | `<span>` (default) or `<button>` (dismissible variant) | Single bounded text | `--surface-elevated`, `--text-emphasis`, `--border`, `--radius-pill`, `--space-1`, `--space-2`, `--type-size-xs`, `--font-weight-medium`, `--tracking-wide` |

### Universal attributes

| Attribute | Values | Default | Purpose |
|---|---|---|---|
| `data-role` | `badge` / `status` / `tag` / `chip` / `dismissible` | `badge` | Semantic role; selects visual treatment |
| `data-tone` | `neutral` / `accent` / `success` / `warning` / `critical` / `info` / `new` / `beta` | `neutral` | Color tone via status tokens |
| `data-size` | `sm` / `md` | `md` | Size scale |

### Composition lineage

| Consumes | Source pack | How |
|---|---|---|
| canonical tokens | `@quoin/tokens-baseline` | every CSS value |
| action-button (dismissible variant only) | `@quoin/pattern-button-system` | dismiss trigger inside dismissible labels |

### Consumed by (reverse lineage per D.82)

| Consumer pack | Used as | Phase |
|---|---|---|
| `@quoin/pattern-hero` (type-only variant, hero-meta trust-badges) | `<span class="label" data-role="badge">` for SOC 2 / GDPR / ISO 27001 / E2E encrypted indicators | Phase 22 Cons. 5 / 2026-05-20 |
| `@quoin/pattern-pricing-tiers` | `<span class="label" data-role="badge">` for "Most popular" / "Best for teams" featured-tier badges | Phase 22 Cons. 5 / 2026-05-20 |
| `@quoin/pattern-nav` (docs variant — sidebar items) | `<span class="label" data-role="badge" data-tone="new \| beta">` for NEW / BETA release-stage labels | Phase 22 Cons. 5 / 2026-05-20 |
| `@quoin/pattern-nav` (app-chrome variant — notification bell) | `<span class="label" data-role="badge">` for notification counts | Phase 22 Cons. 5 / 2026-05-20 |
| `@quoin/pattern-page-header` | `<span class="label" data-role="status">` (Live indicator) + `<span class="label" data-role="badge">` for project tags | Phase 22 Cons. 5 / 2026-05-20 |

## Minimal markup

```html
<!-- Badge (default) -->
<span class="label" data-role="badge">NEW</span>

<!-- Status indicator -->
<span class="label" data-role="status" data-tone="success">Live</span>

<!-- Tag with accent tone -->
<span class="label" data-role="tag" data-tone="accent">Project</span>

<!-- Dismissible chip -->
<button class="label" data-role="dismissible" type="button" aria-label="Remove tag: Marketing">
  Marketing <span aria-hidden="true">×</span>
</button>
```

## Migration from inlined contracts

| Before | After |
|---|---|
| `class="badge"` | `class="label" data-role="badge"` |
| `class="badge" data-tone="X"` | `class="label" data-role="badge" data-tone="X"` |
| `class="status-pill"` | `class="label" data-role="status"` |
| `class="status-pill" data-tone="X"` | `class="label" data-role="status" data-tone="X"` |
| CSS: `.badge { ... }` | CSS: `.label[data-role="badge"] { ... }` (or just `.label`) |
| CSS: `.status-pill { ... }` | CSS: `.label[data-role="status"] { ... }` |

## Cross-references

- Audit: [`02_reference-packs/CONSOLIDATION-5-AUDIT.md`](../../CONSOLIDATION-5-AUDIT.md)
- Report: [`02_reference-packs/CONSOLIDATION-5-REPORT.md`](../../CONSOLIDATION-5-REPORT.md)
- Architectural locks: `PHASE_GATES.md` — Cons. 5 inherits Cons. 3's v3.G.15-G.20.
