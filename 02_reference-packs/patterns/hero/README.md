# @quoin/pattern-hero

Unified hero pattern — 5 variants (`type-only` / `animated` / `gradient-mesh` / `brand-photo` / `video`) × 6 mandatory + 5 conditional slots.

**Shipped:** Phase 22 / Consolidation 3 / 2026-05-20. Consolidates the 5 prior parallel hero packs.

---

## Why this pack exists

Before Cons. 3, Quoin shipped 5 separate hero packs. The audit (`02_reference-packs/CONSOLIDATION-3-AUDIT.md`) confirmed that all 5 share the same 6-slot core anatomy with structurally identical CSS — the variant difference is *aesthetic*, not *anatomical*. Maintaining 5 parallel packs cost duplication tax: CSS selectors written against `hero-section` didn't match `hero-animated-section`; aesthetic packs had to style every primitive 5× under different prefixes.

`@quoin/pattern-hero` collapses the 5 packs into one. The variant is selected via `data-variant`. Conditional slots activate based on variant. Aesthetic packs target one set of primitives, not five.

---

## Anatomy contract (v3.G.18 — structured markdown until formal JSON contract ships)

### Mandatory slots (6 — present in every variant)

| Slot | Element | Role | Key token references |
|---|---|---|---|
| `hero-section` | `<section>` | Container; carries `data-variant`, `data-alignment`, `data-size`, `data-background` | `--surface`, `--space-section`, `--space-panel`, `--transition-default` |
| `hero-eyebrow` | `<p>` | Pre-heading | `--text-recede`, `--type-size-sm`, `--font-weight-semibold`, `--tracking-wide`, `--leading-tight` |
| `hero-headline` | `<h1>` | Display headline | `--text-emphasis`, `--font-display`, `--type-size-3xl` (default), `--leading-display`, `--tracking-tight` |
| `hero-subhead` | `<p>` | Lede | `--text-recede`, `--font-sans`, `--type-size-lg` (default), `--leading-prose` |
| `hero-actions` | `<div role="group">` | CTA cluster | `--space-3`, `--space-card`; **composes `action-button` from `@quoin/pattern-button-system`** |
| `hero-meta` | `<p>` | Trust line | `--text-recede`, `--type-size-xs`, `--font-weight-medium`, `--leading-prose` |

### Conditional slots (5 — gated by `data-variant`)

| Slot | Gated by | Role | Key tokens |
|---|---|---|---|
| `hero-accent` | `data-variant="animated"` | Ambient decoration (pulse / drift) | `--accent`, `--accent-recede` |
| `hero-background` | `data-variant="gradient-mesh"` | Procedural OKLCH mesh | OKLCH gradients; `--accent-recede` fallback |
| `hero-media` | `data-variant in [brand-photo, video]` | `<picture>` or `<video>` | `--radius-card` (non-bleed) |
| `hero-overlay` | `data-variant in [brand-photo, video]` | Text-legibility scrim | `--overlay-strength` (local) |
| `hero-controls` | `data-variant="video"` (**mandatory** — WCAG 2.2.2) | Pause control | `--surface-elevated`, `--border`, `--radius-pill`, `--shadow-focus` |

### Variants (5)

| Variant | Conditional slots | Variant-specific attributes | Pattern-local CSS tokens | Notes |
|---|---|---|---|---|
| `type-only` | _(none)_ | _(none)_ | _(none)_ | The simplest. Type + CTA only. |
| `animated` | `accent` | `data-motion-mode`, `data-intensity`, `data-state` (entering/settled/paused), per-slot `data-stagger-index` | `--ease-overshoot`, `--stagger-step`, `--duration-entrance`, `--entrance-distance` | Tokens scoped via `[data-variant="animated"]`. Honors `prefers-reduced-motion`. |
| `gradient-mesh` | `background` | `data-palette`, `data-intensity`, `data-texture`, `data-shift-on-hover` | _(none)_ | OKLCH + `@supports` solid fallback. |
| `brand-photo` | `media`, `overlay` | `data-layout` (image-right / image-left / image-full-bleed / image-overlay), media `data-aspect` / `data-crop` / `data-focal-point`, overlay `data-kind` / `data-tone` / `data-strength` | `--overlay-strength` | `<img fetchpriority="high">` for LCP. |
| `video` | `media`, `overlay`, **`controls`** | `data-video-mode`, `data-state` (playing/paused/video-error/reduced-motion), same overlay tri-axis | `--overlay-strength` | WCAG 2.2.2 — controls non-optional. |

### Composition lineage (real, not aspirational — v3.G.17)

| Consumed primitive | Source pack | Used in | How |
|---|---|---|---|
| `action-button` (with `data-intent="primary"`) | `@quoin/pattern-button-system` | `hero-actions` primary CTA | `<button class="action-button" data-intent="primary">` or `<a class="action-button" data-intent="primary" href="...">` |
| `action-button` (with `data-intent="ghost"`) | `@quoin/pattern-button-system` | `hero-actions` secondary CTA | Same as above. On `brand-photo[data-layout in [image-full-bleed, image-overlay]]` and on `video` variant, hero adds a context-scoped backdrop-blur override for legibility against media. **Button-system pack stays unchanged.** |
| `action-button` (with `data-intent="secondary"`) | `@quoin/pattern-button-system` | `hero-actions` extended-cluster | 3-CTA registers. |
| Canonical tokens | `@quoin/tokens-baseline` | every CSS value | Per Quoin convention. Variant-local tokens are scoped, not promoted. |

---

## Universal attributes (every variant)

| Attribute | Values | Default | Purpose |
|---|---|---|---|
| `data-variant` | `type-only` / `animated` / `gradient-mesh` / `brand-photo` / `video` | `type-only` | Selects the variant; activates conditional slots. |
| `data-alignment` | `centered` / `left` / `right` / `split-anchor` | `centered` | Content alignment. Replaces deprecated `data-register` (Cons. 3 Q2). |
| `data-size` | `compact` / `default` / `oversized` | `default` | Padding + headline size scale. |
| `data-background` | `surface` / `surface-elevated` / `surface-recessed` / `accent-recede` / `dark` | `surface` | Surface treatment (primarily for type-only; image-led variants use media instead). |

---

## Migration from pre-Cons.3 packs

If your code consumes one of the 5 prior parallel hero packs, this is the mechanical translation:

### `data-pattern` value remapping

| Before | After |
|---|---|
| `data-pattern="hero-section"` | `data-pattern="hero-section" data-variant="type-only"` |
| `data-pattern="hero-animated-section"` | `data-pattern="hero-section" data-variant="animated"` |
| `data-pattern="hero-mesh-section"` | `data-pattern="hero-section" data-variant="gradient-mesh"` |
| `data-pattern="hero-photo-section"` | `data-pattern="hero-section" data-variant="brand-photo"` |
| `data-pattern="hero-video-section"` | `data-pattern="hero-section" data-variant="video"` |
| `data-pattern="hero-{variant}-eyebrow"` | `data-pattern="hero-eyebrow"` (prefix collapses) |
| `data-pattern="hero-{variant}-headline"` | `data-pattern="hero-headline"` |
| `data-pattern="hero-{variant}-subhead"` | `data-pattern="hero-subhead"` |
| `data-pattern="hero-{variant}-actions"` | `data-pattern="hero-actions"` |
| `data-pattern="hero-{variant}-meta"` | `data-pattern="hero-meta"` |
| `data-pattern="hero-animated-accent"` | `data-pattern="hero-accent"` |
| `data-pattern="hero-mesh-background"` | `data-pattern="hero-background"` |
| `data-pattern="hero-photo-media"` / `data-pattern="hero-video-media"` | `data-pattern="hero-media"` |
| `data-pattern="hero-photo-overlay"` / `data-pattern="hero-video-overlay"` | `data-pattern="hero-overlay"` |
| `data-pattern="hero-video-controls"` | `data-pattern="hero-controls"` |

### Attribute renames (data-register → typed replacements per Cons. 3 Q2)

| Before | After | Where |
|---|---|---|
| `data-register="centered"` | `data-alignment="centered"` | hero-section |
| `data-register="left-aligned"` | `data-alignment="left"` | hero-section |
| `data-register="right-aligned"` | `data-alignment="right"` | hero-section |
| `data-register="split-anchor"` | `data-alignment="split-anchor"` | hero-section |
| `data-register="background-loop"` | `data-video-mode="background-loop"` | hero-section (video variant) |
| `data-register="embed-with-controls"` | `data-video-mode="embed-with-controls"` | hero-section (video variant) |
| `data-register="disclaimer"` etc. | `data-kind="disclaimer"` etc. | hero-meta |
| `data-register="primary-only"` etc. | `data-cluster="primary-only"` etc. | hero-actions |
| `data-register="pulse"` / `"drift"` | `data-kind="pulse"` / `"drift"` | hero-accent |
| `data-register="gradient-from-bottom"` etc. | `data-kind="gradient-from-bottom"` etc. | hero-overlay |

### CTA composition (Cons. 3 Q5)

Before:
```html
<div class="hero-actions">
  <a class="cta" data-intent="primary" href="/signup">Start trial</a>
</div>
```
or with the prior pack's inlined `.cta` CSS class.

After:
```html
<div data-pattern="hero-actions" role="group" aria-label="Sign up actions">
  <a class="action-button" data-intent="primary" href="/signup">Start trial</a>
</div>
```

The pattern consumes `action-button` from `@quoin/pattern-button-system` directly. The local `.cta` class is removed.

---

## Validator behaviour

The compiler validates the hero markup tree:

1. **Variant gating:** a hero specimen using `<div data-pattern="hero-controls">` but without `data-variant="video"` on the parent `hero-section` → error.
2. **WCAG 2.2.2 mandatory:** `data-variant="video"` without a `hero-controls` slot → error: "WCAG 2.2.2 violation."
3. **Deprecated `data-register`:** flagged with a suggested replacement attribute per the table above.
4. **Composition reality (v3.G.17):** if `hero-actions` contains inlined `.cta` instead of `action-button` from button-system → error.

---

## Files

- `quoin.pack.json` — canonical pack manifest
- `quoin.toml` — Cargo-style manifest (D.85 — first pack to adopt; format is draft)
- `primitives/index.json` — 11 primitives with full attribute / token / structure schemas
- `examples/{type-only,animated,gradient-mesh,brand-photo,video}.html` — variant specimens
- `LICENSE`, `package.json` — standard pack metadata

---

## Cross-references

- Architecture audit: [`02_reference-packs/CONSOLIDATION-3-AUDIT.md`](../../CONSOLIDATION-3-AUDIT.md)
- Implementation proposal: [`02_reference-packs/CONSOLIDATION-3-PROPOSAL.md`](../../CONSOLIDATION-3-PROPOSAL.md)
- Implementation report: [`02_reference-packs/CONSOLIDATION-3-REPORT.md`](../../CONSOLIDATION-3-REPORT.md) (ships in Batch 5)
- Architectural gates: `PHASE_GATES.md` — Cons. 3 introduces v3.G.15 through v3.G.20
- Consumed pack: [`@quoin/pattern-button-system`](../button-system/README.md)
