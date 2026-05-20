# Consolidation 3 Audit — Hero anatomy variants

**Phase 22 / Unification Audit · Consolidation 3**
**Status: Audit phase complete; awaiting operator review of audit + proposal.**
**Author: Claude Code (Opus 4.7) · 2026-05-20**

---

## 1. Scope

The unification dossier §2.1 #1 flagged:

> "Hero anatomy variants — 5 parallel `pattern.hero.*` packs. Almost certainly share: container chrome, title slot, eyebrow slot, lede slot, CTA slot, media slot, decoration slot. The variant is *aesthetic* (kinetic-fold, lockup, layered), not *anatomical*. Ship single `pattern.hero` with variant tokens."

This audit tests that claim against the 5 actual hero specimens shipped to date:

- `pattern-hero-type-only` (the canonical / "first" hero; 6 primitives)
- `pattern-hero-animated` (motion-led; 7 primitives)
- `pattern-hero-gradient-mesh` (OKLCH procedural background; 7 primitives)
- `pattern-hero-brand-photo` (photographic image; 8 primitives)
- `pattern-hero-video` (background video + WCAG 2.2.2 pause control; 9 primitives)

The audit catalogues each specimen's anatomy, cross-tabulates shared vs variant-only structure, and flags naming + composition divergences. It does **not** propose the consolidation itself — that's the next phase.

## 2. Per-specimen anatomy

### 2.1 hero-type-only — the canonical (6 primitives)

| Slot | `data-pattern` value | Purpose |
|---|---|---|
| Outer container | `hero-section` | section, padding, surface |
| Eyebrow | `hero-eyebrow` | uppercase category label |
| Headline | `hero-headline` | display-tier h1 |
| Subhead | `hero-subhead` | lede paragraph |
| Actions | `hero-actions` | CTA cluster |
| Meta | `hero-meta` | trust line (badges / dot-separated facts) |

**Variants:** `data-register` (centered / left-aligned / right-aligned / split-anchor), `data-size` (compact / default / oversized), `data-background` (surface / surface-elevated / surface-recessed / accent-recede / dark).
**Microstates:** focus-visible on CTA only.
**Composition lineage table claims:** consumes `<action-button>` from button-system.

### 2.2 hero-animated — motion choreography (7 primitives)

Same 6 slots as hero-type-only, **+ one new primitive:**

| Slot | `data-pattern` value | Purpose |
|---|---|---|
| Ambient accent | `hero-animated-accent` | optional decorative motion (pulse / drift) |

**Variants:** `data-register` (centered / left-aligned), `data-intensity` (subtle / default / dramatic), `data-motion-mode` (fade-up / spring-overshoot / word-stagger / type-in / scroll-parallax), per-slot `data-stagger-index="0..4"`, `data-state` (default / entering / settled / paused).
**Pattern-local tokens introduced:** `--ease-overshoot`, `--stagger-step`, `--duration-entrance`, `--entrance-distance`. The lineage table explicitly notes these are "local to this pattern's CSS, not added to the canonical namespace" — they would need to either stay local in the unified pattern or get promoted to baseline.

### 2.3 hero-gradient-mesh — procedural background (7 primitives)

Same 6 slots as hero-type-only, **+ one new primitive:**

| Slot | `data-pattern` value | Purpose |
|---|---|---|
| Mesh background | `hero-mesh-background` | OKLCH radial-gradient stack with `@supports` solid fallback |

**Variants:** `data-register` (centered / left-aligned), `data-palette` (cool / warm / monochrome / accent / playful), `data-intensity` (subtle / default / dramatic), `data-texture` (smooth / grained — SVG noise overlay), `data-shift-on-hover` (true / false).
**Per-slot extensions:** eyebrow gains `data-tone="on-mesh"`; subhead gains `data-background-tint="subtle"` (inline backdrop tint for legibility).
**CSS-feature dependency:** OKLCH color space + `color-mix(in oklch, ...)`. `@supports not (color: oklch(0% 0 0))` falls back to a solid `var(--accent-recede)` background.

### 2.4 hero-brand-photo — image-led (8 primitives)

Same 6 slots, **+ two new primitives:**

| Slot | `data-pattern` value | Purpose |
|---|---|---|
| Media | `hero-photo-media` | responsive `<picture>` with srcset, fetchpriority="high" |
| Overlay | `hero-photo-overlay` | optional scrim for text-on-image legibility |

**Variants:** `data-layout` (image-right / image-left / image-full-bleed / image-overlay), `data-size` (default / oversized), media `data-aspect` (16:9 / 4:3 / 1:1 / 3:4) / `data-crop` (cover / contain) / `data-focal-point` (top / bottom / left / right), overlay `data-register` (gradient-from-bottom / gradient-from-side / solid-tint) × `data-tone` (dark / accent) × `data-strength` (subtle / default / strong).
**Auto-promotion under image-full-bleed / image-overlay:** headline + subhead + meta colours flip to `--text-on-accent` family.
**Notable:** This is the ONE specimen that uses `data-layout` rather than `data-register` for content positioning. Anatomical contradiction flagged below.

### 2.5 hero-video — background video (9 primitives)

Same 6 slots, **+ three new primitives:**

| Slot | `data-pattern` value | Purpose |
|---|---|---|
| Media | `hero-video-media` | `<video autoplay muted loop playsinline>` with poster |
| Overlay | `hero-video-overlay` | scrim (same schema as hero-photo-overlay) |
| Controls | `hero-video-controls` | WCAG 2.2.2 pause control (positioned in any of 4 corners) |

**Variants:** `data-register` (background-loop / embed-with-controls), `data-size` (default / oversized), `data-state` (default / playing / paused / video-error / reduced-motion), headline `data-shadow="true"` (text-shadow for video-legibility), controls `data-position` (bottom-right / bottom-left / top-right / top-left).
**WCAG hard contract:** `hero-video-controls` is non-optional. Auto-play background video without a visible pause control violates WCAG 2.2.2.
**Default text colours:** headline / eyebrow / subhead / meta all default to `--text-on-accent` family (since video is the assumed background).

## 3. Cross-tabulation

### 3.1 Shared anatomy — exists in 5/5

| Slot | Function |
|---|---|
| `section` | outer container |
| `eyebrow` | uppercase category label |
| `headline` | display-tier h1 |
| `subhead` | lede paragraph |
| `actions` | CTA cluster |
| `meta` | trust line |

All 5 specimens declare all 6 of these slots with structurally identical CSS:
- eyebrow: `font-size: var(--type-size-sm); font-weight: var(--font-weight-semibold); letter-spacing: var(--tracking-wide); text-transform: uppercase`
- headline: `font-family: var(--font-display); font-size: var(--type-size-3xl); line-height: var(--leading-display); letter-spacing: var(--tracking-tight); max-width: 22ch; text-wrap: balance`
- subhead: `font-size: var(--type-size-lg); line-height: var(--leading-prose); max-width: 60ch; text-wrap: pretty`
- actions: `display: inline-flex; gap: var(--space-3); margin: var(--space-card) 0 0`
- meta: `font-size: var(--type-size-xs); font-weight: var(--font-weight-medium); display: inline-flex; gap: var(--space-3)`

**The dossier's claim of shared anatomy is verified.** All 5 share the same 6-slot skeleton with token-identical typography.

### 3.2 Variant-only anatomy

| Slot | Present in | Function |
|---|---|---|
| `accent` | hero-animated only | decorative ambient motion |
| `background` | hero-gradient-mesh only | procedural OKLCH mesh layer |
| `media` | hero-brand-photo, hero-video | image / video element |
| `overlay` | hero-brand-photo, hero-video | scrim for text-on-media legibility |
| `controls` | hero-video only | WCAG 2.2.2 pause affordance |

`media` and `overlay` are shared between brand-photo + video with identical schema (registers / tones / strengths all match). This is a 2-of-5 "convention pair" rather than a 1-of-5 outlier.

### 3.3 Variants — convergence vs divergence

| Axis | hero-type-only | hero-animated | hero-gradient-mesh | hero-brand-photo | hero-video |
|---|---|---|---|---|---|
| `data-register` | centered / left / right / split-anchor | centered / left | centered / left | _(uses `data-layout` instead)_ | background-loop / embed-with-controls |
| `data-size` | compact / default / oversized | _(absent)_ | _(absent)_ | default / oversized | default / oversized |
| `data-intensity` | _(absent)_ | subtle / default / dramatic | subtle / default / dramatic | _(absent)_ | _(absent)_ |
| `data-state` | _(absent)_ | default / entering / settled / paused | _(absent)_ | _(absent)_ | default / playing / paused / video-error / reduced-motion |

**Two genuine semantic divergences flagged:**
1. **`data-register` in hero-video** has a completely different meaning — it describes *what kind of video pattern* (background-loop vs embed-with-controls), not *content alignment*. Reusing the name for two different concepts is the kind of accumulated drift the dossier warned about.
2. **hero-brand-photo uses `data-layout`** where every other specimen uses `data-register`. Same concept, different attribute name — naming-convention drift.

### 3.4 The naming-prefix problem (the biggest finding)

Every specimen prefixes its primitives differently:

| Specimen | section primitive |
|---|---|
| hero-type-only | `data-pattern="hero-section"` |
| hero-animated | `data-pattern="hero-animated-section"` |
| hero-gradient-mesh | `data-pattern="hero-mesh-section"` |
| hero-brand-photo | `data-pattern="hero-photo-section"` |
| hero-video | `data-pattern="hero-video-section"` |

This propagates: `hero-eyebrow` / `hero-animated-eyebrow` / `hero-mesh-eyebrow` / `hero-photo-eyebrow` / `hero-video-eyebrow` are 5 different selectors styled identically.

CSS selectors written against `[data-pattern="hero-section"]` do **not** match the other 4 specimens. JS that reads the hero by selector has to enumerate all 5. Aesthetic packs that style the hero anatomy must duplicate every rule 5× (once per prefix). **This is the duplication cost the consolidation removes.**

### 3.5 Composition lineage — a separate problem

Every specimen ships a "Composition lineage" table that claims to "compose `<action-button>` from `@quoin/pattern-button-system`." But every specimen actually **re-implements** the button as a local `.cta` CSS class:

```css
[data-pattern="hero-{prefix}-actions"] .cta {
  display: inline-flex; align-items: center; gap: var(--space-2);
  padding: var(--space-3) var(--space-card);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans); font-size: var(--type-size-md); font-weight: var(--font-weight-semibold);
  ...
}
[data-pattern="hero-{prefix}-actions"] .cta[data-intent="primary"] { ... }
[data-pattern="hero-{prefix}-actions"] .cta[data-intent="ghost"] { ... }
```

This is button-system's contract re-inlined, not the button-system pattern composed. Verified in all 5 specimens. The lineage tables are aspirational, not actual. **Cons. 3 should fix this** — the unified hero would actually consume `<action-button>` instead of inlining a `.cta` clone.

## 4. Verdict on the dossier's premise

> "The variant is *aesthetic* (kinetic-fold, lockup, layered), not *anatomical*."

**Mostly correct, with one nuance.**

The 6 core slots (section / eyebrow / headline / subhead / actions / meta) ARE shared across all 5 specimens with structurally identical CSS. That's true anatomical convergence — confirms the dossier's core claim.

The 5 variant-specific primitives (`accent`, `background`, `media`, `overlay`, `controls`) are **conditional anatomy** — slots that exist only when their variant is active. These aren't quite "purely aesthetic" — `controls` is a WCAG-mandated functional element, not an aesthetic flourish; `media` is a structural element required for any visual asset. But they ARE variant-scoped: no hero needs all 5; each variant activates a specific subset.

So the proposal direction is:

- Single `pattern.hero` with **6 mandatory slots** (section / eyebrow / headline / subhead / actions / meta) + **5 optional slots** (accent / background / media / overlay / controls), each gated by a contract boolean or active variant.
- Variant token namespace: `pattern.hero.variant.{type-only, animated, gradient-mesh, brand-photo, video}` — the variant token both activates the optional slots and supplies aesthetic-specific token values.
- Canonical `data-pattern` prefix: `hero-*` (from hero-type-only, the original / shortest).
- Real composition with button-system rather than inlined `.cta` re-implementations.

But the proposal phase needs operator decisions on several open questions before that direction can lock.

## 5. Open questions for the proposal phase (operator decisions)

These are the questions the proposal needs the operator to answer. Each has a default but a meaningful "no" path:

1. **Q-naming — `data-pattern` prefix.** Standardize on `hero-section / hero-eyebrow / ...` (matching hero-type-only)? Or `pattern-hero-section / ...` (more explicit, longer)? Or keep per-variant prefixes for backwards-compat with existing pages already deployed against the current packs?

2. **Q-data-register-collision.** `data-register` in hero-video means something different ("video register": background-loop / embed-with-controls) than in hero-type-only ("alignment": centered / left / right / split). Three options: (a) rename hero-video's attribute to `data-video-register`; (b) unify the semantics ("register = the overall display mode"); (c) split into orthogonal attributes (`data-alignment` × `data-video-mode`).

3. **Q-data-layout-vs-data-register.** hero-brand-photo uses `data-layout` for image-right/image-left/image-full-bleed/image-overlay. Is this an orthogonal axis to `data-register`, or should it collapse into a unified `data-register` with extended value enum?

4. **Q-pattern-local-motion-tokens.** hero-animated declares `--ease-overshoot`, `--stagger-step`, `--duration-entrance`, `--entrance-distance` as pattern-local. Should these (a) stay local to the unified hero; (b) get promoted to canonical baseline (subject to D.79's 3-use threshold); or (c) move into a dedicated motion vocabulary pack referenced by the hero variant?

5. **Q-composition-lineage-fix.** Should Cons. 3 also fix the inlined `.cta` re-implementation across all 5 specimens (replace with actual `<action-button>` composition), or leave that as a follow-up consolidation? Scope-wise: this is a separate refactor but the consolidation is the natural moment to address it.

6. **Q-anatomy-contract-format.** The dossier proposed "anatomy-contract pattern (typed JSON with slots `{type, required}` and `variants`)." Does Cons. 3 introduce this contract format for the hero (and thus establish the template for all future patterns)? Or defer the contract-format design to a separate phase and just collapse the heroes structurally first?

7. **Q-existing-specimen-fate.** The 5 specimens currently live at `patterns/hero-{animated,gradient-mesh,brand-photo,video,type-only}/`. After consolidation, options: (a) replace all 5 specimen folders with a single `patterns/hero/` showing all 5 variants; (b) keep 5 folders but each just demonstrates a different variant of the unified pack; (c) keep 5 folders for backwards-compat with documentation links and add `patterns/hero/` as the new canonical.

8. **Q-aesthetic-pack-boundary.** Variant-as-token: each variant lives in the pattern pack (`pattern.hero.variant.gradient-mesh.palette.cool`)? Or in dedicated aesthetic packs that consumers install (`@quoin/aesthetic-mesh-cool`)? The dossier §2.1 #8 suggests "aesthetic-pack boundary: may declare only token values and named variants; not anatomy" — so variants stay in pattern packs, but the operator should confirm.

## 6. Implementation scope estimate (rough; the proposal phase will firm this up)

- **New pack:** `@quoin/pattern-hero` declaring the 6 mandatory + 5 optional slots and the 5 variant tokens.
- **Migration:** 5 specimen folders → 1 unified `patterns/hero/examples/index.html` demonstrating all 5 variants. Or keep 5 folders with each demonstrating one variant of the unified pack.
- **Deprecation:** 5 existing `@quoin/pattern-hero-*` packs marked deprecated; CSS selectors get a transition period; future commits remove them.
- **Gate:** Add to `bootstrap-integrity.js` a check that hero specimens use the canonical `hero-*` prefix.
- **Documentation:** README updates explaining the variant system and naming convention.
- **Lines of code changed:** rough estimate ~600 lines added (new pack), ~3000 lines removed (5 specimens consolidated to 1), net negative.

## 7. Stop condition

This audit halts here. Per CADENCE_PROTOCOL (per-turn mandatory for Phase 22), the next step is operator review of the audit, then proposal phase, then operator review of the proposal + locked Q&A, then implementation in batches.

**Audit-phase deliverable: this document.** No code changes. No commits to packs yet. Awaiting operator decisions on Q1–Q8 before proposal phase opens.

---

**Operator review checklist:**
- [ ] The 6 shared slots match what's actually structurally shared
- [ ] The 5 variant-only primitives correctly catalogued
- [ ] The naming-prefix problem (the main duplication cost) is correctly characterized
- [ ] The composition-lineage-table-vs-reality gap is worth fixing in Cons. 3 (or deferred)
- [ ] Q1–Q8 are the right open questions; flag any I missed
- [ ] Anything in the proposal direction (§4) that should NOT be done
