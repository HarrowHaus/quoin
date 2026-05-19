# @quoin/pattern-hero-animated

**P1 motion-led marketing hero.** Second of 5 hero variants. Inherits hero-type-only's anatomy (eyebrow + headline + subhead + actions + meta) but adds entrance choreography and optional ambient motion. Seven primitives. Five motion modes × three intensities. **Full WCAG 2.3.3 compliance** — every animation collapses to a single 120ms opacity fade under `prefers-reduced-motion: reduce`.

This is **hero category 2 of 5**. Per operator strategic note, this batch starts marketing-surface recovery: P1 lands hero-animated → hero-gradient-mesh → hero-brand-photo → hero-video → nav-docs → nav-editorial before resuming normal P1 priority.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-animated-actions` primary CTA | Main conversion button. Participates in the parent's entrance choreography via the actions cluster's stagger-index. All 8 microstates inherited. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-animated-actions` secondary CTA | De-escalated CTA. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Typography / spacing / motion / focus-ring. The pattern declares two animation-local tokens (`--ease-overshoot`, `--stagger-step`) inside its own CSS — NOT added to the canonical namespace. |

### Hero category position

| Hero variant | Status | Notes |
|---|---|---|
| `pattern-hero-type-only` | P0 shipped | Typography-only baseline |
| **`pattern-hero-animated`** | **P1 (this pack)** | Motion-led — entrance choreography + ambient accents |
| `pattern-hero-gradient-mesh` | P1 next | CSS mesh + OKLCH gradients |
| `pattern-hero-brand-photo` | P1 next | Photo-led, supports photographic register |
| `pattern-hero-video` | P1 next | Background-video hero |

All 5 hero packs are **independent** — they don't compose each other. They share the canonical 5-element anatomy (eyebrow / headline / subhead / actions / meta) as a category convention.

---

## What this pattern adds

Seven primitives:

- **`<hero-animated-section>`** — top-level wrapper. 5 motion modes × 3 intensities × 2 registers (centered / left-aligned) × 4 states (default / entering / settled / paused).
- **`<hero-animated-eyebrow>`** — small uppercase pre-heading with `data-stagger-index="0"`.
- **`<hero-animated-headline>`** — h1. In word-stagger mode, splits into `<span data-word>`; in type-in mode, splits into `<span data-char>`; in all other modes, animates as a single block.
- **`<hero-animated-subhead>`** — supporting subtitle, block-level entrance with stagger-index="2".
- **`<hero-animated-actions>`** — CTA cluster composing button-system, stagger-index="3".
- **`<hero-animated-meta>`** — optional small-print row, stagger-index="4".
- **`<hero-animated-accent>`** — optional ambient motion element. 3 registers (cursor-follow / drift / pulse). Always `aria-hidden`. Disabled under reduced-motion.

## Reference lineage

| Aspect | Source |
|---|---|
| Word-stagger entrance choreography | Vercel marketing animations, Apple product pages |
| Type-in / typewriter headline | Editorial design tradition; classic typewriter UI tropes |
| Spring-overshoot easing | Apple HIG, iOS spring animations |
| Scroll-parallax (CSS scroll-driven animations + JS fallback) | Stripe scroll-effects, web.dev scroll-driven primer |
| `prefers-reduced-motion` collapse-to-fade | WCAG 2.3.3, Apple HIG, Microsoft Fluent Design motion guidelines |
| Ambient pulse / drift accent motion | Linear, Vercel, Stripe marketing decoration |
| `cubic-bezier(0.34, 1.56, 0.64, 1)` spring curve | popmotion.io spring presets, framer-motion overshoot defaults |

## Tokens consumed

Canonical only (no hardcoded values):

- **Colour**: `--surface`, `--surface-recessed`, `--surface-elevated`, `--accent-recede`, `--text`, `--text-emphasis`, `--text-recede`, `--accent`, `--accent-hover`, `--text-on-accent`, `--success`, `--border`, `--border-emphasis`, `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / pill`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display`, `--type-size-xs / sm / md / lg / xl / 2xl / 3xl / 4xl`, `--font-weight-medium / semibold`, `--leading-display / tight / prose`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`
- **Pattern-local motion tokens (NOT canonical)**: `--ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1)` (spring mode); `--stagger-step: 60ms` (cascade timing); `--duration-entrance` (set per-intensity: 320ms / 480ms / 720ms). These are declared in the pattern's own CSS and never added to `tokens-baseline`.

## States × motion modes

### States

| State | DOM signal | Meaning |
|---|---|---|
| `default` | (no modifier) | Pre-entrance. Elements hidden (opacity:0). Used to reset before re-playing. |
| `entering` | `[data-state="entering"]` | Entrance animation in progress. Elements animate from hidden to final. |
| `settled` | `[data-state="settled"]` | Post-entrance steady state. All elements at final position. |
| `paused` | `[data-state="paused"]` | Animation paused (used when prefers-reduced-motion: reduce OR user-requested pause). |

### Motion modes

| Mode | Behaviour | Best for | Total duration |
|---|---|---|---|
| `fade-up` | Block-level fade + translateY entrance, stagger-cascaded. | **The 80% choice.** Most universal. | ~600ms full cascade |
| `word-stagger` | Headline per-word + block-level cascade for rest. | Short headlines (≤8 words). | ~720ms (depends on word count) |
| `type-in` | Per-character reveal + caret blink. | Very short headlines (≤30 chars). | ~1.2s depending on character count |
| `spring-overshoot` | Block fade + overshoot easing. | Playful aesthetics (arcade, bloom). | ~720ms |
| `scroll-parallax` | Static entrance + scroll-driven Y-shift. | Long-scroll marketing pages. Requires host-provided JS scrollY listener. | n/a (ambient) |

### Intensities

| Intensity | translateY range | Duration | Use |
|---|---|---|---|
| `subtle` | 4px → 0 | 320ms | Editorial / B2B |
| `default` | 12px → 0 | 480ms | The 80% choice |
| `dramatic` | 24px → 0 | 720ms | Playful / consumer |

## Templates that consume this pattern

- `template-marketing` — flagship home page hero in fade-up + default
- `template-saas-pro` — product home in word-stagger or spring-overshoot
- `template-blog-magazine` — article landing in fade-up + subtle
- `template-portfolio-developer` — portfolio entry in fade-up + dramatic with ambient drift accent

## Use

```html
<section data-pattern="hero-animated-section"
         motion-mode="fade-up"
         intensity="default"
         register="centered"
         data-state="entering"
         aria-labelledby="hero-headline">
  <div class="inner">
    <hero-animated-eyebrow data-stagger-index="0" tone="accent">Now in public beta</hero-animated-eyebrow>
    <hero-animated-headline data-stagger-index="1" id="hero-headline">
      Five tools that compose.<br>One subscription. One sign-in.
    </hero-animated-headline>
    <hero-animated-subhead data-stagger-index="2">
      Galley is a multi-tool SaaS umbrella for PDF, notes, subscription tracking, password storage, and image editing.
    </hero-animated-subhead>
    <hero-animated-actions data-stagger-index="3" role="group" aria-label="Sign up actions">
      <action-button intent="primary">Start free trial →</action-button>
      <action-button intent="ghost">View pricing</action-button>
    </hero-animated-actions>
    <hero-animated-meta data-stagger-index="4">
      No credit card required · 14-day trial · Cancel anytime
    </hero-animated-meta>
  </div>
</section>
```

Word-stagger mode (headline splits to spans):

```html
<hero-animated-headline id="hero-headline">
  <span data-word>Five</span>
  <span data-word>tools</span>
  <span data-word>that</span>
  <span data-word>compose.</span>
</hero-animated-headline>
```

## Specimen

Open `examples/index.html` in a browser. Includes:

- **Fade-up default** — canonical Galley flagship with full anatomy + replay button
- **Word-stagger** — "Five tools that compose." with per-word reveal
- **Type-in** — "Track every charge." with per-character reveal + blinking caret
- **Spring-overshoot dramatic** — Galley Easel "Brushes that feel like brushes." on accent-recede background
- **With ambient accents** — pulse + drift orbital accent elements
- **Three intensities side-by-side** — subtle / default / dramatic for direct comparison
- **Reduced-motion compliance block** — the actual CSS code that collapses all motion under `prefers-reduced-motion: reduce`
- **Composition lineage table** with the hero-category position
- **11-item accessibility checklist** covering WCAG 2.3.3, h1 discipline, no-aria-live-on-entrance, word/char span inline layout, decorative accent aria-hidden, trust-badge alt-text, type-in caret pseudo-content, scroll-parallax JS fallback, focus styles steady-state

## License

MIT.
