# @quoin/pattern-hero-gradient-mesh

**P1 OKLCH gradient-mesh marketing hero.** Third of 5 hero variants. Inherits the canonical hero anatomy (eyebrow + headline + subhead + actions + meta) and layers it over a procedural radial-gradient mesh background. Seven primitives. Five palettes × three intensities × two textures. Uses **CSS Color Module Level 4 OKLCH** for perceptually-uniform color blending, with `@supports` fallback for older browsers.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-mesh-actions` primary | Solid `--accent` fill stays visually anchored regardless of mesh palette. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-mesh-actions` secondary | On mesh backgrounds, ghost gets `color-mix(in oklch, --surface-elevated 70%, transparent)` + `backdrop-filter: blur(8px)` for legibility against blob colors. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Typography / spacing / motion. The pattern uses CSS Color Module Level 4 features (`oklch()`, `color-mix(in oklch, …)`) which are baseline-supported in modern browsers. |

### Hero category position

3 of 5 hero variants. Independent of hero-type-only and hero-animated — does not compose them. Shares the canonical 5-element anatomy as a category convention.

---

## What this pattern adds

Seven primitives:

- **`<hero-mesh-section>`** — top-level wrapper. 5 palettes × 3 intensities × 2 textures × 2 registers.
- **`<hero-mesh-background>`** — the gradient mesh layer. Always `aria-hidden`. Stacked radial-gradients in OKLCH.
- **`<hero-mesh-eyebrow>`** — small uppercase pre-heading. 3 tones (neutral / accent / on-mesh).
- **`<hero-mesh-headline>`** — h1. Always `--text-emphasis` for guaranteed contrast.
- **`<hero-mesh-subhead>`** — subhead. Optional `--surface-elevated 50%` tint underlay on dramatic backgrounds.
- **`<hero-mesh-actions>`** — CTA cluster composing button-system. Ghost-intent gets backdrop-blur on mesh.
- **`<hero-mesh-meta>`** — optional small-print row.

## Reference lineage

| Aspect | Source |
|---|---|
| OKLCH gradient mesh | CSS Color Module Level 4 (W3C), Linear.app marketing experiments, web.dev OKLCH primer |
| Multi-blob radial-gradient layering | Stripe marketing background, Vercel home, classic Photoshop blob-mesh aesthetic |
| `color-mix(in oklch, ...)` | CSS Color Module Level 5; baseline in Chrome 111, Firefox 113, Safari 16.2 |
| `@supports` fallback for color features | CSS Conditional Rules Module Level 4 |
| SVG feTurbulence grain overlay | Classic film-grain technique, used in broadsheet/vellum design systems |
| `backdrop-filter: blur()` for ghost button on busy background | iOS material design, macOS Big Sur aesthetic |
| Perceptually-uniform color interpolation | Björn Ottosson's OKLab paper (2020), CSS Color spec author |

## Tokens consumed

Canonical only:

- **Colour**: `--surface`, `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis`, `--text-recede`, `--accent`, `--accent-hover`, `--accent-recede`, `--text-on-accent`, `--border`, `--border-emphasis`, `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / pill`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display`, `--type-size-xs / sm / md / lg / xl / 2xl / 3xl / 4xl`, `--font-weight-medium / semibold`, `--leading-display / tight / prose`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`
- **CSS Color L4/L5 features** (not tokens, but documented contract): `oklch()`, `color-mix(in oklch, …)`. Both fall back to `--accent-recede` solid background via `@supports`.

## Palettes

| Palette | Use | OKLCH blob composition |
|---|---|---|
| `cool` | Calm, tech-forward (Galley Notes) | Blue (240) / Cyan (200) / Violet (270) |
| `warm` | Approachable, consumer (Galley Dues) | Orange (40) / Coral (20) / Pink (0) |
| `monochrome` | Editorial / B2B (Galley Keys) | `--accent-recede` + `color-mix` accent variations |
| `accent` | Default — adapts to theme (Galley flagship) | `--accent-recede` + `color-mix(--accent 12%, --surface)` |
| `playful` | Consumer-creative (Galley Easel) | Green (130) / Yellow (90) / Pink (340) / Cyan (200) |

## Intensities × textures

### Intensities

| Intensity | Mesh opacity | When to use |
|---|---|---|
| `subtle` | 50% | Editorial / B2B — barely-perceptible color wash |
| `default` | 80% | The 80% choice |
| `dramatic` | 100% | Consumer flagship — strong color statement. Auto-promotes subhead + meta to `--text-emphasis` for contrast |

### Textures

| Texture | Effect | When to use |
|---|---|---|
| `smooth` | Pure gradient mesh, no noise | Modern / techy aesthetics |
| `grained` | SVG feTurbulence noise overlay at 8% opacity, mix-blend overlay | Broadsheet / vellum / film-grain aesthetics |

## Templates that consume this pattern

- `template-marketing` — flagship product pages with palette matching the product
- `template-saas-pro` — pricing page, feature subpages
- `template-portfolio-designer` — case-study landing heroes
- `template-blog-magazine` — feature article tops in subtle intensity

## Use

```html
<section data-pattern="hero-mesh-section"
         palette="accent"
         intensity="default"
         texture="smooth"
         register="centered"
         aria-labelledby="hero-headline">
  <hero-mesh-background aria-hidden="true" />
  <div class="inner">
    <hero-mesh-eyebrow tone="accent">GALLEY</hero-mesh-eyebrow>
    <hero-mesh-headline id="hero-headline">
      Documents, notes, dues, keys, easel. Five tools, one Galley.
    </hero-mesh-headline>
    <hero-mesh-subhead>
      A multi-tool SaaS umbrella with one subscription and one sign-in.
    </hero-mesh-subhead>
    <hero-mesh-actions role="group" aria-label="Sign up actions">
      <action-button intent="primary">Start free trial</action-button>
      <action-button intent="ghost">View pricing</action-button>
    </hero-mesh-actions>
    <hero-mesh-meta>
      No credit card required · 14-day trial
    </hero-mesh-meta>
  </div>
</section>
```

On dramatic intensity, the subhead may opt into a tint underlay for guaranteed contrast:

```html
<hero-mesh-subhead data-background-tint="subtle">
  Strong color background — subhead gets a soft tint underlay.
</hero-mesh-subhead>
```

## Specimen

Open `examples/index.html` in a browser. Includes:

- **Canonical accent / default / smooth** — full Galley flagship layout
- **All 5 palettes** — cool (Notes) / warm (Dues) / monochrome (Keys) / accent (Galley flagship) / playful (Easel) with per-tool copy
- **All 3 intensities** — subtle / default / dramatic with auto contrast promotion on dramatic
- **Grained texture** — broadsheet aesthetic demo
- **OKLCH rationale block** — actual CSS shown with @supports fallback
- **Composition lineage table** with hero-category position
- **10-item accessibility checklist** covering single-h1, aria-labelledby, decorative background aria-hidden, WCAG 1.4.3 contrast policy, ghost-CTA backdrop-blur, OKLCH @supports fallback, reduced-motion stillness, grain overlay aria-hidden, trust-badge alt-text, focus styles

## License

MIT.
