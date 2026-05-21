# Consolidation 3 Proposal — Unified hero pattern

**Phase 22 / Unification Audit · Consolidation 3**
**Status: Proposal phase complete. Awaiting operator review before implementation batches open.**
**Author: Claude Code (Opus 4.7) · 2026-05-20**
**Reference audit:** `02_reference-packs/CONSOLIDATION-3-AUDIT.md`
**Operator lockdowns:** Q1–Q8 resolved 2026-05-20 (see audit §5 for the questions; operator's locks documented in §2 below).

---

## 1. What this proposal delivers

Per the operator's per-turn cadence brief, this document is a complete implementation specification for collapsing the 5 parallel hero packs into a single `@quoin/pattern-hero` with variant tokens. After operator approval, implementation proceeds in 5 batches with per-turn review between each (per CADENCE_PROTOCOL).

The proposal applies the operator's Q1–Q8 locks (recorded below) to produce:

- §3. Pack manifest — `quoin.pack.json` + new `quoin.toml` (D.85 Cargo-style)
- §4. Primitives JSON — 6 mandatory + 5 conditional slots
- §5. README anatomy structure — structured-markdown tables (Q6: formal JSON contract deferred)
- §6. CSS structure — cascade layers, variant-scoped selectors, real button-system composition
- §7. Migration plan — pack creation, specimen migration, deprecation, catalog updates
- §8. Bootstrap-integrity gate extensions — v3.G.15, v3.G.16, v3.G.17 (programmatic) + v3.G.18–v3.G.20 (documented architectural locks)
- §9. Batch plan — 5 batches matching the operator's outline

## 2. Operator-locked decisions (recorded for traceability)

| Q | Lock | Generalization |
|---|---|---|
| Q1 | Canonical `data-pattern` prefix: short form `<pattern-name>-<slot>` (e.g. `hero-section`). Never `pattern-<name>-<slot>`. | All patterns adopt this form. New gate v3.G.15. |
| Q2 | Deprecate `data-register` entirely. `data-alignment` is canonical universal content-alignment (centered / left / right / split-anchor). Variant-specific modal attributes (`data-video-mode`, `data-layout`, `data-palette`, `data-motion-mode`) are orthogonal to alignment. | New gate v3.G.16. |
| Q3 | `data-layout` and `data-video-mode` are orthogonal axes — not collapsed into a unified enum. Each axis describes a distinct dimension. | — |
| Q4 | Pattern-local motion tokens stay local (per D.79). Scoped via `[data-pattern="hero-section"][data-variant="animated"]` selector. No promotion to baseline. Promotion conditional on D.79's 3-use threshold being met by other patterns. | — |
| Q5 | Composition lineage drift fixed in this consolidation. Unified hero **actually consumes** `<action-button>` from `@quoin/pattern-button-system`. Inlined `.cta` CSS removed. Halt condition: if button-system needs new variants to support hero, halt and surface as out-of-scope follow-up. | New gate v3.G.17. |
| Q6 | Formal anatomy JSON contract deferred. README documents anatomy in structured markdown tables (extractable to JSON later). Formal contract format becomes future-phase work informed by full structural-consolidation series (hero + nav + label + sequence). | v3.G.18 documents the interim convention. |
| Q7 | Collapse to one pack with five example files: `patterns/hero/examples/{type-only,animated,gradient-mesh,brand-photo,video}.html`. Remove the 5 current `patterns/hero-{variant}/` folders. | v3.G.19 generalizes pack-code-lives-once. |
| Q8 | Variants live in pattern packs; aesthetic packs provide token values for variant-token slots. This consolidation does NOT create aesthetic packs; it establishes the contract that aesthetic packs will later target. | v3.G.20 documents the boundary. |

## 3. Pack manifest

### 3.1 `quoin.pack.json`

```json
{
  "$schema": "https://harrow.haus/quoin/schema/pack.json",
  "name": "@quoin/pattern-hero",
  "version": "1.0.0",
  "type": "pattern",
  "quoinVersion": "^0.1.0",
  "description": "Unified hero pattern. Six mandatory slots (section / eyebrow / headline / subhead / actions / meta) + five conditional slots (accent / background / media / overlay / controls) gated by five variants (type-only / animated / gradient-mesh / brand-photo / video). Consolidates the five parallel hero packs that shipped pre-Cons.3.",
  "category": "marketing",
  "variant": "system",
  "variants": ["type-only", "animated", "gradient-mesh", "brand-photo", "video"],
  "exports": {
    "primitives": "./primitives/index.json"
  },
  "states": ["default", "entering", "settled", "playing", "paused", "video-error", "reduced-motion"],
  "microStates": ["default", "hover", "active", "focus", "focus-visible", "disabled", "loading", "selected"],
  "metadata": {
    "author": "Quoin",
    "license": "MIT",
    "homepage": "https://harrow.haus/quoin/patterns/hero",
    "tags": ["hero", "marketing", "landing", "p0", "consolidated"]
  },
  "peerPacks": {
    "@quoin/tokens-baseline": "^0.1.0",
    "@quoin/pattern-button-system": "^1.0.0"
  },
  "consolidates": [
    "@quoin/pattern-hero-type-only",
    "@quoin/pattern-hero-animated",
    "@quoin/pattern-hero-gradient-mesh",
    "@quoin/pattern-hero-brand-photo",
    "@quoin/pattern-hero-video"
  ],
  "deprecates": "phase-22-cons-3"
}
```

Two new manifest fields:
- `variants` (top-level array): canonical list. Mirrored in the `variant` axis of every primitive.
- `consolidates` (top-level array, optional): packs whose anatomy this pack absorbs. Informational; loader uses it to surface "this pack was previously named X" hints.
- `deprecates` (top-level string, optional): tags this pack with the consolidation phase that produced it.

### 3.2 `quoin.toml` (D.85 — Cargo-style, new)

This consolidation introduces the first `quoin.toml` file. Mirrors `quoin.pack.json` for dependency-resolution-friendly tooling per D.85.

```toml
[package]
name = "@quoin/pattern-hero"
version = "1.0.0"
type = "pattern"
quoin-version = "^0.1.0"
description = "Unified hero pattern. See quoin.pack.json for canonical schema."

[dependencies]
"@quoin/tokens-baseline" = "^0.1.0"
"@quoin/pattern-button-system" = "^1.0.0"

[anatomy]
mandatory-slots = ["section", "eyebrow", "headline", "subhead", "actions", "meta"]
data-pattern-prefix = "hero"

[anatomy.attributes-universal]
data-alignment = { values = ["centered", "left", "right", "split-anchor"], default = "centered" }
data-variant   = { values = ["type-only", "animated", "gradient-mesh", "brand-photo", "video"], default = "type-only" }
data-size      = { values = ["compact", "default", "oversized"], default = "default" }
data-background = { values = ["surface", "surface-elevated", "surface-recessed", "accent-recede", "dark"], default = "surface" }

[variants.type-only]
conditional-slots = []
attributes-variant = {}

[variants.animated]
conditional-slots = ["accent"]
attributes-variant = {
  data-motion-mode = ["fade-up", "spring-overshoot", "word-stagger", "type-in", "scroll-parallax"],
  data-intensity   = ["subtle", "default", "dramatic"],
  data-state       = ["default", "entering", "settled", "paused"]
}
local-tokens = ["--ease-overshoot", "--stagger-step", "--duration-entrance", "--entrance-distance"]

[variants.gradient-mesh]
conditional-slots = ["background"]
attributes-variant = {
  data-palette         = ["cool", "warm", "monochrome", "accent", "playful"],
  data-intensity       = ["subtle", "default", "dramatic"],
  data-texture         = ["smooth", "grained"],
  data-shift-on-hover  = ["true", "false"]
}
local-tokens = []
css-feature-requires = ["oklch", "color-mix-oklch"]
css-feature-fallback = "var(--accent-recede) solid"

[variants.brand-photo]
conditional-slots = ["media", "overlay"]
attributes-variant = {
  data-layout      = ["image-right", "image-left", "image-full-bleed", "image-overlay"],
  data-overlay     = ["none", "gradient-from-bottom", "gradient-from-side", "solid-tint"],
  data-overlay-tone = ["dark", "accent"],
  data-overlay-strength = ["subtle", "default", "strong"]
}
local-tokens = ["--overlay-strength"]

[variants.video]
conditional-slots = ["media", "overlay", "controls"]
attributes-variant = {
  data-video-mode   = ["background-loop", "embed-with-controls"],
  data-overlay      = ["none", "gradient-from-bottom", "gradient-from-side", "solid-tint"],
  data-overlay-tone = ["dark", "accent"],
  data-overlay-strength = ["subtle", "default", "strong"],
  data-state        = ["default", "playing", "paused", "video-error", "reduced-motion"]
}
local-tokens = ["--overlay-strength"]
wcag-mandatory = ["2.2.2"]   # Pause/Stop/Hide — controls slot is non-optional
```

**Open question for proposal review:** the `quoin.toml` format is new with this consolidation. Should the format itself be ratified as part of Cons. 3, or should the consolidation produce a draft to be finalized separately? Recommend the latter — ship Cons. 3 with the draft, then iterate the TOML schema in a follow-up small-phase work item once we have 2-3 packs using it.

## 4. Primitives JSON

The 11 primitives, each with the schema from the existing primitives format (`name / category / role / attributes / tokens / structure / children / scope / meta`). Conditional primitives add a new top-level field `gatedBy` that names the variant(s) that activate them.

The complete JSON is ~250 lines; the structure is summarized here, full text written during Batch 1 implementation.

### 4.1 Mandatory primitives (6)

| Primitive | Element | Role |
|---|---|---|
| `hero-section` | `<section>` | Top-level container. Holds all other primitives. Carries `data-variant` and `data-alignment` attributes. |
| `hero-eyebrow` | `<p>` | Small uppercase pre-heading (`data-tone`: neutral / accent / success / on-image / on-mesh / on-video). |
| `hero-headline` | `<h1>` | Display-tier headline. Token-sized by `data-size`. |
| `hero-subhead` | `<p>` | Supporting subtitle paragraph. Token-sized by `data-size`. |
| `hero-actions` | `<div role="group">` | CTA cluster. **Composes `<action-button>` from button-system.** No inline `.cta` class. |
| `hero-meta` | `<p>` | Trust line — disclaimers / social-proof / trust-badges (`data-register`: disclaimer / social-proof / trust-badges). |

### 4.2 Conditional primitives (5)

| Primitive | Element | Gated by | Role |
|---|---|---|---|
| `hero-accent` | `<div aria-hidden="true">` | `data-variant="animated"` | Ambient decorative motion (`data-register`: pulse / drift). Hidden under reduced-motion. |
| `hero-background` | `<div aria-hidden="true">` | `data-variant="gradient-mesh"` | Procedural OKLCH radial-gradient mesh. `@supports` fallback to solid `var(--accent-recede)`. |
| `hero-media` | `<picture>` or `<video>` | `data-variant in [brand-photo, video]` | Image or video element. Responsive picture for brand-photo; `<video autoplay muted loop playsinline>` for video. |
| `hero-overlay` | `<div aria-hidden="true">` | `data-variant in [brand-photo, video]` | Scrim for text-on-media legibility (`data-register`: gradient-from-bottom / gradient-from-side / solid-tint × `data-tone`: dark / accent × `data-strength`: subtle / default / strong). |
| `hero-controls` | `<button>` | `data-variant="video"` | WCAG 2.2.2 mandatory pause control. Positioned `data-position`: bottom-right / bottom-left / top-right / top-left. **Non-optional when variant=video.** |

### 4.3 Validator behavior

The compiler validator will:

1. **Reject** a `hero-*` markup tree that uses a conditional primitive without the gating variant. E.g., `<hero-section data-variant="type-only">` containing `<hero-controls>` → error: "hero-controls requires data-variant='video'."
2. **Require** `hero-controls` when `data-variant="video"`. Missing → error: "WCAG 2.2.2 violation: data-variant='video' requires <hero-controls>."
3. **Tolerate** the absence of optional mandatory primitives (e.g., a hero without `hero-meta` is fine).
4. **Reject** `data-register` on any hero primitive. Suggested fix in error message: replace with `data-alignment` (universal) or one of the variant-specific attributes.

## 5. README anatomy structure (Q6 — structured markdown)

The pack's `README.md` documents anatomy via four tables. Designed to be JSON-extractable for the future formal contract:

### 5.1 Mandatory slots table

| Slot | Element | Role | Token references |
|---|---|---|---|
| `hero-section` | `<section>` | Container | `--surface`, `--space-section`, `--space-panel`, `--transition-default` |
| `hero-eyebrow` | `<p>` | Pre-heading | `--text-recede`, `--type-size-sm`, `--font-weight-semibold`, `--tracking-wide`, `--leading-tight`, `--space-3` |
| `hero-headline` | `<h1>` | Headline | `--text-emphasis`, `--font-display`, `--type-size-3xl` (default), `--leading-display`, `--tracking-tight` |
| `hero-subhead` | `<p>` | Lede | `--text-recede`, `--font-sans`, `--type-size-lg` (default), `--leading-prose` |
| `hero-actions` | `<div role="group">` | CTA cluster | `--space-3` (gap), `--space-card` (top margin); composes `<action-button>` from button-system |
| `hero-meta` | `<p>` | Trust line | `--text-recede`, `--type-size-xs`, `--font-weight-medium`, `--leading-prose`, `--space-3` |

### 5.2 Conditional slots table

| Slot | Gated by | Role | Token references |
|---|---|---|---|
| `hero-accent` | `data-variant="animated"` | Ambient decoration | `--accent`, `--accent-recede` |
| `hero-background` | `data-variant="gradient-mesh"` | Procedural mesh | OKLCH gradients with `--accent-recede` fallback |
| `hero-media` | `data-variant in [brand-photo, video]` | Visual asset | `--radius-card` (when not full-bleed) |
| `hero-overlay` | `data-variant in [brand-photo, video]` | Text-legibility scrim | `--overlay-strength` (local) |
| `hero-controls` | `data-variant="video"` (mandatory) | WCAG 2.2.2 pause | `--surface-elevated`, `--text-emphasis`, `--border`, `--radius-pill`, `--shadow-focus` |

### 5.3 Variants table

| Variant | Conditional slots | Variant-specific attributes | Local CSS tokens | Notes |
|---|---|---|---|---|
| `type-only` | (none) | — | (none) | The canonical / simplest. Type + CTA only. |
| `animated` | `accent` | `data-motion-mode`, `data-intensity`, `data-state`, per-slot `data-stagger-index` | `--ease-overshoot`, `--stagger-step`, `--duration-entrance`, `--entrance-distance` | Local-token scope: `[data-variant="animated"]`. Honors `prefers-reduced-motion` (motion collapses to 120ms opacity fade). |
| `gradient-mesh` | `background` | `data-palette`, `data-intensity`, `data-texture`, `data-shift-on-hover` | (none — palettes use baseline tokens) | OKLCH; `@supports` fallback to solid `var(--accent-recede)`. |
| `brand-photo` | `media`, `overlay` | `data-layout`, `data-overlay`, `data-overlay-tone`, `data-overlay-strength`, `data-aspect`, `data-crop`, `data-focal-point` | `--overlay-strength` | LCP optimization: `<img fetchpriority="high" decoding="async">`. |
| `video` | `media`, `overlay`, `controls` (mandatory) | `data-video-mode`, `data-state`, `data-overlay-*` | `--overlay-strength` | WCAG 2.2.2 — `<hero-controls>` non-optional. |

### 5.4 Composition lineage table (real, not aspirational)

| Consumed primitive | Source pack | Used in | How |
|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `hero-actions` primary CTA | Direct element consumption. All 8 microstates inherited. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `hero-actions` secondary CTA | Direct element consumption. On `brand-photo[data-layout in [image-full-bleed, image-overlay]]` and on `video` variant, hero adds a context-scoped backdrop-blur override (selector below, §6.3). Button-system pack remains unchanged. |
| `<action-button intent="secondary">` | `@quoin/pattern-button-system` | `hero-actions` extended-register CTA | Direct element consumption. Used in 3-CTA registers. |
| Canonical tokens | `@quoin/tokens-baseline` | every CSS value | Per Quoin convention. Variant-specific local tokens are pattern-local. |

**Reverse-lineage update in button-system:** `@quoin/pattern-button-system`'s reverse-lineage table gains a row listing `@quoin/pattern-hero` as a consumer (currently lists 0 consumers; this is the first declared consumer relationship in the catalog).

## 6. CSS structure

### 6.1 Cascade-layer organization (per D.83)

All hero CSS lands inside `@layer quoin.patterns`. The variant-scoped selectors layer naturally; the base anatomy gets specified first, then each variant adds its overrides + conditional-slot styling.

```css
@layer quoin.patterns {
  /* ─── BASE ANATOMY (applies to all variants) ─────────────── */

  [data-pattern="hero-section"] {
    container-type: inline-size;
    container-name: hero;
    width: 100%;
    padding: var(--space-section) var(--space-panel);
    background: var(--surface);
    color: var(--text);
    transition: var(--transition-default);
    position: relative;
  }
  [data-pattern="hero-section"][data-size="compact"]    { padding: var(--space-card) var(--space-panel); }
  [data-pattern="hero-section"][data-size="oversized"]  { padding: calc(var(--space-section) * 1.5) var(--space-panel); }
  [data-pattern="hero-section"][data-background="surface-elevated"] { background: var(--surface-elevated); }
  /* … other backgrounds … */

  [data-pattern="hero-section"] .inner { max-width: 1080px; margin: 0 auto; }
  [data-pattern="hero-section"][data-alignment="centered"]      .inner { text-align: center; max-width: 720px; }
  [data-pattern="hero-section"][data-alignment="left"]          .inner { text-align: left; }
  [data-pattern="hero-section"][data-alignment="right"]         .inner { text-align: right; }
  [data-pattern="hero-section"][data-alignment="split-anchor"]  .inner { display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--space-section); align-items: end; }

  [data-pattern="hero-eyebrow"]  { /* … */ }
  [data-pattern="hero-headline"] { /* … */ }
  [data-pattern="hero-subhead"]  { /* … */ }
  [data-pattern="hero-actions"]  { display: inline-flex; gap: var(--space-3); margin: var(--space-card) 0 0; flex-wrap: wrap; }
  [data-pattern="hero-meta"]     { /* … */ }

  /* ─── VARIANT: animated ───────────────────────────────────── */

  [data-pattern="hero-section"][data-variant="animated"] {
    /* Pattern-local motion tokens scoped to this variant (Q4). */
    --ease-overshoot:     cubic-bezier(0.34, 1.56, 0.64, 1);
    --stagger-step:       60ms;
    --duration-entrance:  480ms;
    --entrance-distance:  12px;
    overflow: hidden;   /* needed for accent containment */
  }
  [data-pattern="hero-section"][data-variant="animated"][data-intensity="subtle"]   { --entrance-distance: 4px;  --duration-entrance: 320ms; }
  [data-pattern="hero-section"][data-variant="animated"][data-intensity="dramatic"] { --entrance-distance: 24px; --duration-entrance: 720ms; }

  [data-pattern="hero-section"][data-variant="animated"][data-state="entering"] [data-stagger-index] {
    opacity: 0;
    animation: hero-entrance var(--duration-entrance) var(--ease-standard) forwards;
    animation-delay: calc(var(--stagger-step) * var(--stagger-index, 0));
  }
  [data-pattern="hero-section"][data-variant="animated"] [data-stagger-index="0"] { --stagger-index: 0; }
  /* … through 4 … */

  [data-pattern="hero-section"][data-variant="animated"][data-motion-mode="fade-up"]          [data-stagger-index] { animation-name: hero-fade-up; }
  [data-pattern="hero-section"][data-variant="animated"][data-motion-mode="spring-overshoot"] [data-stagger-index] { animation-name: hero-spring; animation-timing-function: var(--ease-overshoot); }
  /* word-stagger, type-in, scroll-parallax follow */

  [data-pattern="hero-section"][data-variant="animated"] [data-pattern="hero-accent"][data-register="pulse"] { /* … */ }
  [data-pattern="hero-section"][data-variant="animated"] [data-pattern="hero-accent"][data-register="drift"] { /* … */ }

  @keyframes hero-fade-up { from { opacity: 0; transform: translateY(var(--entrance-distance)); } to { opacity: 1; transform: translateY(0); } }
  @keyframes hero-spring  { 0% { opacity: 0; transform: translateY(calc(var(--entrance-distance) * 2)); } 100% { opacity: 1; transform: translateY(0); } }

  /* ─── VARIANT: gradient-mesh ──────────────────────────────── */

  [data-pattern="hero-section"][data-variant="gradient-mesh"] { min-height: 480px; overflow: hidden; }
  [data-pattern="hero-section"][data-variant="gradient-mesh"] [data-pattern="hero-background"] { position: absolute; inset: 0; z-index: 0; pointer-events: none; transition: background-position var(--motion-normal) var(--ease-standard); }
  [data-pattern="hero-section"][data-variant="gradient-mesh"][data-palette="cool"]       [data-pattern="hero-background"] { background: /* …OKLCH cool blobs… */ ; }
  [data-pattern="hero-section"][data-variant="gradient-mesh"][data-palette="warm"]       [data-pattern="hero-background"] { background: /* …OKLCH warm blobs… */ ; }
  [data-pattern="hero-section"][data-variant="gradient-mesh"][data-palette="monochrome"] [data-pattern="hero-background"] { background: /* … */ ; }
  /* + accent, playful */

  @supports not (color: oklch(0% 0 0)) {
    [data-pattern="hero-section"][data-variant="gradient-mesh"] [data-pattern="hero-background"] {
      background: var(--accent-recede) !important;
    }
  }

  /* ─── VARIANT: brand-photo ────────────────────────────────── */

  [data-pattern="hero-section"][data-variant="brand-photo"] { padding: 0; min-height: 480px; }
  [data-pattern="hero-section"][data-variant="brand-photo"][data-layout="image-right"]      .inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-section); align-items: center; max-width: 1280px; }
  [data-pattern="hero-section"][data-variant="brand-photo"][data-layout="image-left"]       .inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-section); align-items: center; max-width: 1280px; }
  [data-pattern="hero-section"][data-variant="brand-photo"][data-layout="image-left"] .content-column { order: 2; }
  /* image-full-bleed + image-overlay layouts */

  [data-pattern="hero-section"][data-variant="brand-photo"] [data-pattern="hero-media"] { /* … */ }
  [data-pattern="hero-section"][data-variant="brand-photo"] [data-pattern="hero-overlay"] { /* … */ }
  /* overlay registers / tones / strengths */

  /* ─── VARIANT: video ──────────────────────────────────────── */

  [data-pattern="hero-section"][data-variant="video"] { padding: 0; min-height: 560px; }
  [data-pattern="hero-section"][data-variant="video"][data-size="oversized"] { min-height: 720px; }
  [data-pattern="hero-section"][data-variant="video"] [data-pattern="hero-media"] { position: absolute; inset: 0; z-index: 0; object-fit: cover; width: 100%; height: 100%; }
  [data-pattern="hero-section"][data-variant="video"] [data-pattern="hero-overlay"] { /* same overlay schema as brand-photo */ }
  [data-pattern="hero-section"][data-variant="video"] [data-pattern="hero-controls"] { /* WCAG 2.2.2 pause; positioned via data-position */ }
  [data-pattern="hero-section"][data-variant="video"][data-state="paused"] [data-pattern="hero-media"] { animation-play-state: paused; }

  /* ─── COMPOSITION: ghost button on media backgrounds (§6.3) ─ */

  [data-pattern="hero-section"][data-variant="brand-photo"][data-layout="image-full-bleed"] .action-button[data-intent="ghost"],
  [data-pattern="hero-section"][data-variant="brand-photo"][data-layout="image-overlay"] .action-button[data-intent="ghost"],
  [data-pattern="hero-section"][data-variant="video"] .action-button[data-intent="ghost"] {
    background: color-mix(in oklch, var(--surface-elevated) 30%, transparent);
    color: var(--text-on-accent);
    backdrop-filter: blur(8px);
    border-color: oklch(100% 0 0 / 0.2);
  }

  /* ─── REDUCED MOTION ──────────────────────────────────────── */

  @media (prefers-reduced-motion: reduce) {
    [data-pattern="hero-section"][data-variant="animated"] {
      --duration-entrance: 120ms;
      --stagger-step: 0ms;
    }
    [data-pattern="hero-section"][data-variant="animated"] * { transform: none !important; animation: opacity 120ms ease-out !important; }
    [data-pattern="hero-section"][data-variant="animated"] [data-pattern="hero-accent"] { display: none !important; }
    [data-pattern="hero-section"][data-variant="video"][data-state="default"] [data-pattern="hero-media"] { animation-play-state: paused; }
  }
}
```

### 6.2 Variant token boundary (Q8)

The pattern declares the variant-specific axes. **Aesthetic packs** (future) provide the actual values that customize the rendering. For example, an aesthetic pack might declare:

```css
/* (illustrative — future @quoin/aesthetic-yeezy-donda) */
@layer quoin.tokens {
  [data-pattern="hero-section"][data-variant="gradient-mesh"][data-palette="accent"] [data-pattern="hero-background"] {
    background: /* yeezy-donda's specific blob recipe */ ;
  }
}
```

This consolidation does not create such an aesthetic pack — it establishes the contract that aesthetic packs will later target.

### 6.3 Composition contract — `<action-button>` (Q5)

The unified hero **consumes** `<action-button>` directly. Specimens write:

```html
<div data-pattern="hero-actions" role="group" aria-label="Sign up actions">
  <action-button data-intent="primary" href="/signup">Start free trial</action-button>
  <action-button data-intent="ghost" href="/pricing">View pricing</action-button>
</div>
```

(Note: per the existing button-system spec, when an `href` attribute is provided, `<action-button>` renders as `<a>` not `<button>`.)

The hero pack adds context-scoped overrides (§6.1's "ghost button on media backgrounds" block) that style the ghost button differently on image-full-bleed / image-overlay layouts and on video variants. These overrides apply via cascade ordering and CSS specificity — button-system's pack stays unchanged.

**Halt condition check (Q5):** verified — button-system already supports the intents (primary / secondary / ghost) and sizes (md / lg) that hero needs. No button-system changes required. Composition is in scope.

## 7. Migration plan

### 7.1 Directory transition

**Before:**
```
02_reference-packs/patterns/
├── hero-type-only/
│   ├── quoin.pack.json
│   ├── primitives/index.json
│   ├── examples/index.html
│   ├── README.md
│   ├── LICENSE
│   └── package.json
├── hero-animated/         (same structure)
├── hero-gradient-mesh/    (same structure)
├── hero-brand-photo/      (same structure)
└── hero-video/            (same structure)
```

**After:**
```
02_reference-packs/patterns/
└── hero/
    ├── quoin.pack.json    (unified — see §3.1)
    ├── quoin.toml         (new — see §3.2)
    ├── primitives/index.json  (11 primitives — see §4)
    ├── examples/
    │   ├── type-only.html
    │   ├── animated.html
    │   ├── gradient-mesh.html
    │   ├── brand-photo.html
    │   └── video.html
    ├── README.md
    ├── LICENSE
    └── package.json
```

The 5 prior `patterns/hero-{variant}/` folders are removed in Batch 5 (after all migration is verified).

### 7.2 Specimen migration

For each variant's example file, the migration mechanically translates:

| Old (per-pack specimen) | New (unified-pack example) |
|---|---|
| `data-pattern="hero-animated-section"` | `data-pattern="hero-section" data-variant="animated"` |
| `data-pattern="hero-mesh-section"` | `data-pattern="hero-section" data-variant="gradient-mesh"` |
| `data-pattern="hero-photo-section"` | `data-pattern="hero-section" data-variant="brand-photo"` |
| `data-pattern="hero-video-section"` | `data-pattern="hero-section" data-variant="video"` |
| `data-pattern="hero-animated-eyebrow"` etc | `data-pattern="hero-eyebrow"` (prefix collapses) |
| `data-pattern="hero-mesh-eyebrow"` etc | `data-pattern="hero-eyebrow"` |
| `data-pattern="hero-photo-eyebrow"` etc | `data-pattern="hero-eyebrow"` |
| `data-pattern="hero-video-eyebrow"` etc | `data-pattern="hero-eyebrow"` |
| `data-register="centered"` | `data-alignment="centered"` |
| `data-register="left-aligned"` | `data-alignment="left"` |
| `data-register="right-aligned"` | `data-alignment="right"` |
| `data-register="background-loop"` _(hero-video)_ | `data-video-mode="background-loop"` |
| `data-register="embed-with-controls"` _(hero-video)_ | `data-video-mode="embed-with-controls"` |
| `<a class="cta" data-intent="primary" href="/x">Y</a>` | `<action-button data-intent="primary" href="/x">Y</action-button>` |
| Inline `.cta` CSS in `<style>` block | _(removed — button-system supplies)_ |

### 7.3 Catalog index update

The pattern catalog index HTML lives at `02_reference-packs/index.html` (verified during implementation). Cons. 3 updates this to:

- Remove 5 entries for `pattern-hero-{variant}`
- Add 1 entry for `pattern-hero` with 5 sub-links to the variant example pages

The link table in catalog index changes from 5 rows to 1 row + 5 nested links per row. Cosmetic-only update; no anatomy change.

### 7.4 Deprecation notice for downstream

External consumers may have imported the 5 deprecated packs. Cons. 3 commits a deprecation note in each old pack folder's README before removal in Batch 5 (one-batch lead time). Actually — since the old folders are being removed entirely, the deprecation goes elsewhere:

- `CHANGELOG.md` entry documenting the rename: `pattern-hero-type-only → pattern-hero (variant=type-only)`, etc.
- `@quoin/pattern-hero`'s README "Migration from pre-Cons.3 packs" section provides the mechanical translation table from §7.2.

### 7.5 button-system reverse-lineage update

After Cons. 3, button-system gains a documented consumer. Update:

- `02_reference-packs/patterns/button-system/README.md` — add "Consumed by" section listing `@quoin/pattern-hero` as the first registered consumer.
- (Optional: a `consumers` field in button-system's `quoin.pack.json` if the schema supports it. If not, defer to a separate metadata schema work item.)

## 8. Bootstrap-integrity gate extensions

Cons. 3 introduces three programmatic gates and three documented architectural locks.

### 8.1 v3.G.15 — data-pattern naming convention (programmatic)

**Rule:** `data-pattern` values follow the form `<pattern-name>-<slot>`. No `pattern-<name>-<slot>` (old form). No `<pattern>--<slot>` (double-dash).

**Implementation:** new `DATA_PATTERN_NAMING_CONTRACT` in `scripts/bootstrap-integrity.js`:

```js
const DATA_PATTERN_NAMING_CONTRACT = {
  // Forbidden prefixes — old long-form
  forbiddenPrefixes: ['pattern-'],
  // Forbidden separators
  forbiddenSeparators: ['--'],
  // Pattern-pack registry — names of currently consolidated patterns
  registeredPatterns: ['hero', 'button-system', 'form-fields', 'modal-dialog', /* etc. */],
};
```

The gate scans every served specimen's HTML, extracts all `data-pattern="…"` values, and fails on any that start with a forbidden prefix.

### 8.2 v3.G.16 — data-register deprecation (programmatic)

**Rule:** Within a unified pattern pack's examples (e.g., `patterns/hero/examples/*.html`), `data-register` is forbidden on the `hero-section` primitive. Other patterns may keep `data-register` until they migrate. The gate is path-aware.

**Implementation:** new check in `auditSpecimen()`:

```js
// Pattern-specific deprecated attributes (per-consolidation)
const DEPRECATED_ATTRIBUTES = {
  'hero': {
    'data-register': 'data-alignment (and data-video-mode for video variant)',
  },
  // future entries as other consolidations land
};
```

Gate looks up the pattern from the specimen's path; for matching patterns, flags any occurrence of the deprecated attribute with a suggested replacement.

### 8.3 v3.G.17 — composition reality (programmatic)

**Rule:** A pattern that declares a peer-pack dependency must demonstrably consume that pack's primitives in its specimens. Inlined re-implementations of a peer pack's contract fail the gate.

**Implementation:** new check that:

1. Reads the pattern pack's `quoin.pack.json` and extracts `peerPacks` entries.
2. For each peer pack that exports primitives (excludes `tokens-baseline`), scans the specimen HTML for actual element occurrences of those primitives' element names or `data-pattern` values.
3. If a peer pack is declared but its primitives don't appear in any specimen → fail.

For hero specifically: peerPacks includes `@quoin/pattern-button-system`; the gate checks that specimens contain `<action-button …>` elements. If a specimen uses `<a class="cta" …>` or `<button class="cta" …>` instead → fail with message "composition lineage drift: declared peer pack `@quoin/pattern-button-system` but specimen uses inlined `.cta` instead of `<action-button>`."

### 8.4 v3.G.18 — anatomy documentation convention (documented)

**Rule:** Until a formal JSON anatomy contract ships (deferred per Q6), pattern packs document their anatomy via four structured-markdown tables in their README: mandatory slots / conditional slots with gating / variants with tokens / composition lineage. Tables use the column schema established in §5 of this proposal.

Not directly enforceable by a programmatic gate today; documented as a convention. May become enforceable when the JSON contract format ships.

### 8.5 v3.G.19 — pack code lives once, examples demonstrate variants (documented)

**Rule:** A pattern pack's CSS / primitives / manifest live in one place. Multiple example files demonstrate variants. No parallel pattern packs for stylistic variants.

This is the architectural decision Cons. 3 itself embodies. Future structural consolidations (4–9 of the dossier) must follow this pattern.

### 8.6 v3.G.20 — variants in pattern packs; values in aesthetic packs (documented)

**Rule:** Pattern packs declare variant *axes* (e.g., `data-palette` with allowed values). Aesthetic packs supply specific *values* that customize the rendering (e.g., a yeezy-donda aesthetic pack provides a specific `cool` palette recipe).

Enforced via the aesthetic-pack boundary lock from PHASE_GATES.md §2.3 #3 (already locked: "Aesthetic-pack boundary may declare only token values and named variants; not anatomy"). Cons. 3 extends this with the variant-axis-vs-value distinction.

### 8.7 PHASE_GATES.md addition (closing-batch task)

The closing batch (Batch 5) appends to `PHASE_GATES.md`:

```md
## Phase 22 — Cons. 3 architectural locks (v3.G.15 through v3.G.20)

### v3.G.15 — data-pattern naming convention (programmatic)
[full text per §8.1 above]

### v3.G.16 — data-register deprecation (programmatic)
[full text per §8.2 above]

### v3.G.17 — composition reality (programmatic)
[full text per §8.3 above]

### v3.G.18 — anatomy documentation convention (documented)
[full text per §8.4 above]

### v3.G.19 — pack code lives once (documented)
[full text per §8.5 above]

### v3.G.20 — variants in pattern packs, values in aesthetic packs (documented)
[full text per §8.6 above]
```

## 9. Batch plan

Per the operator's outline. Each batch has per-turn review at the boundary.

### Batch 1 — Create unified `@quoin/pattern-hero` pack

**Deliverables:**
- `patterns/hero/quoin.pack.json` (per §3.1)
- `patterns/hero/quoin.toml` (per §3.2)
- `patterns/hero/primitives/index.json` (11 primitives per §4)
- `patterns/hero/README.md` (anatomy tables per §5)
- `patterns/hero/LICENSE` + `package.json` (boilerplate copies)
- `patterns/hero/examples/` directory (empty placeholder; examples land in batches 2–4)

**Gate:** the new pack manifest loads cleanly; primitives JSON parses; README anatomy tables conform to v3.G.18 convention.

### Batch 2 — Migrate type-only and animated examples

**Deliverables:**
- `patterns/hero/examples/type-only.html` — derived from the prior `patterns/hero-type-only/examples/index.html`, mechanically translated per §7.2
- `patterns/hero/examples/animated.html` — derived from the prior `patterns/hero-animated/examples/index.html`, mechanically translated per §7.2
- Both examples use `<action-button>` for CTAs (Q5)
- Both use `data-alignment` (not `data-register`)
- Verification: bootstrap-integrity gate green for both

### Batch 3 — Migrate gradient-mesh and brand-photo examples

**Deliverables:**
- `patterns/hero/examples/gradient-mesh.html` — mechanical translation
- `patterns/hero/examples/brand-photo.html` — mechanical translation
- Both use `<action-button>` for CTAs (Q5)
- brand-photo retains `data-layout` (orthogonal axis per Q3)
- Verification: gate green

### Batch 4 — Migrate video example

**Deliverables:**
- `patterns/hero/examples/video.html` — mechanical translation
- `<hero-controls>` slot used per WCAG 2.2.2 (Q4 hard contract)
- `data-video-mode` replaces `data-register` (Q2)
- Verification: gate green; controls-mandatory check passes

### Batch 5 (closing) — Catalog index, deprecation, gate extensions

**Deliverables:**
- `02_reference-packs/index.html` — pattern catalog updated to list 1 hero pack with 5 variant links instead of 5 hero packs
- Removal of `patterns/hero-{type-only,animated,gradient-mesh,brand-photo,video}/` directories
- Update of `02_reference-packs/patterns/button-system/README.md` — adds "Consumed by" section listing hero
- `02_reference-packs/scripts/bootstrap-integrity.js` — extended with v3.G.15, v3.G.16, v3.G.17 checks
- `PHASE_GATES.md` — appended with v3.G.15 through v3.G.20 sections
- `CHANGELOG.md` — Cons. 3 entry documenting the rename + migration table
- `02_reference-packs/CONSOLIDATION-3-REPORT.md` — final outcome doc (parallel to Cons. 1 / Cons. 2 reports)
- Verification: gate green across all 22 specimens; smoke-test the new v3.G.15-17 checks with synthetic bad inputs (matching the Cons. 1 / Cons. 2 smoke-test pattern)

## 10. Scope estimates (informational)

| Batch | New code | Removed code | Net lines |
|---|---|---|---|
| 1 | ~700 (pack files + primitives JSON + README) | 0 | +700 |
| 2 | ~750 (two example HTML files) | ~1300 (two prior specimens) | -550 |
| 3 | ~850 (two example HTML files; brand-photo is the largest) | ~1220 | -370 |
| 4 | ~500 (video example) | ~610 (prior specimen) | -110 |
| 5 | ~300 (catalog updates, gate extensions, PHASE_GATES, CHANGELOG, REPORT) | ~5 (catalog rows) | +295 |
| **Total** | ~3100 | ~3135 | **-35** |

Cons. 3 is approximately net-neutral on line count — the unified pack absorbs most of the surface area the 5 specimens previously held — but it eliminates the duplication tax: any future hero work touches one pack, not five.

## 11. Halt conditions during implementation

Per the operator's halt-and-surface protocol, implementation halts and reports if any of:

1. **Button-system insufficient.** Hero needs an intent / size / state / icon-position that button-system doesn't currently expose. Per Q5 lock, button-system changes are out of scope; surface as follow-up consolidation.
2. **WCAG controls primitive incompatibility.** The `<hero-controls>` element doesn't satisfy WCAG 2.2.2 under audit. Surface; halt before video variant ships.
3. **Cascade-layer interference.** The variant-scoped CSS from §6 doesn't compose cleanly with an aesthetic pack's overrides during a smoke test. Surface the conflict.
4. **Migration produces visual regression.** A specimen renders differently after migration to the unified pack. Surface a side-by-side diff.
5. **Gate extension false positives.** A new v3.G.15–17 check fails specimens that should pass. Surface the false-positive case.

## 12. Open questions before Batch 1 opens

These are smaller-scope follow-ups that benefit from operator sign-off before implementation but don't block proposal approval:

1. **`quoin.toml` format ratification path.** Should the schema be ratified in this consolidation, or shipped as draft + iterated separately? Recommendation: ship draft, iterate later.
2. **`<action-button>` polymorphism.** Existing button-system supports `<a>` rendering when `href` is provided. Confirm Cons. 3 specimens should use `<action-button href="…">` directly rather than wrapping in `<a>` externally.
3. **`consumers` field in pack manifest.** Cons. 3 wants to mark button-system's reverse-lineage. Should this be a new top-level field in `quoin.pack.json` (`consumers: [...]`), or stay in README only (with the `consumes` direction still in manifest)? Recommendation: README-only for now; defer field-schema work.
4. **Smoke-test format for gate extensions.** Cons. 1 + Cons. 2 each smoke-tested their gate extensions inline (edit a specimen to introduce drift, run gate, revert). Should Cons. 3's gates be smoke-tested the same way? Recommendation: yes, matching prior convention.

## 13. Stop condition

This proposal halts here. **No code changes. No commits to packs yet.** Awaiting operator review per CADENCE_PROTOCOL (per-turn mandatory for Phase 22 / Unification). Implementation Batch 1 opens upon proposal approval.

---

**Operator review checklist:**
- [ ] Q1–Q8 locks accurately translated into the proposal
- [ ] Pack manifest format (quoin.pack.json + new quoin.toml) acceptable
- [ ] 11-primitive split (6 mandatory + 5 conditional) correctly captures the audit's findings
- [ ] Variant-scoped motion tokens (§6.1 animated block) match Q4 intent
- [ ] `<action-button>` composition (§6.3) matches Q5 intent
- [ ] Migration plan (§7) — directory transition + 22 mechanical translations + button-system reverse-lineage all acceptable
- [ ] v3.G.15–v3.G.20 gate definitions (§8) acceptable; corrections welcomed
- [ ] Batch plan (§9) acceptable; reordering / merging welcomed
- [ ] §12 open questions: 4 small decisions before Batch 1 — answers or defer-to-implementation
- [ ] Any halt conditions in §11 missing
