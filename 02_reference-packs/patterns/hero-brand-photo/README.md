# @quoin/pattern-hero-brand-photo

**P1 photo-led marketing hero.** Fourth of 5 hero variants. Anchors the canonical hero anatomy against a brand photographic image. Eight primitives. Four layouts × four overlay registers × responsive `<picture>` art direction with LCP optimization.

**External-resource policy: this pack does NOT bundle photographic imagery.** Production hosts must source their own licensed brand photography. The pack ships only the layout + responsive `<picture>` contract + overlay scaffolding. The specimen uses CSS-generated gradient placeholder fixtures (labelled "PLACEHOLDER FIXTURE") to avoid licensing entanglement.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-photo-actions` primary | Solid `--accent` fill stays visually anchored across all 4 layouts. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-photo-actions` secondary | On image-overlay / image-full-bleed, ghost gets `backdrop-filter: blur(8px)` + `color-mix(in oklch, --surface-elevated 30%, transparent)` background for legibility on unpredictable image content. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Typography / spacing / borders / focus-ring. `--text-on-accent` drives text color shifts on overlay layouts. |

### External resource — host-provided (not bundled)

Photographic imagery is host-supplied. The pattern ships:

- Layout structure (4 layouts)
- Responsive `<picture>` contract (AVIF / WebP / JPEG cascade with art-direction media queries)
- Overlay scaffolding (4 overlay registers × 3 tones × 3 strengths)
- LCP optimization (fetchpriority="high", decoding="async", width/height attributes for CLS prevention)
- Object-fit + focal-point cropping controls

What the pattern does NOT ship: any actual photos. Hosts source their own licensed brand photography and reference it via `<source srcset="...">` + `<img src="...">` elements.

### Hero category position

4 of 5 hero variants. Independent of hero-type-only, hero-animated, hero-gradient-mesh. Same anatomical convention; no cross-hero composition.

---

## What this pattern adds

Eight primitives:

- **`<hero-photo-section>`** — top-level wrapper. 4 layouts × 2 sizes × 3 states (default / loading / image-error).
- **`<hero-photo-media>`** — `<picture>` wrapper. Manages crop, focal-point, aspect-ratio.
- **`<hero-photo-overlay>`** — optional decorative overlay for text-on-image contrast. 4 registers × 3 tones × 3 strengths. Always `aria-hidden`.
- **`<hero-photo-eyebrow>`** — small pre-heading. 3 tones (neutral / accent / on-image).
- **`<hero-photo-headline>`** — h1. Color shifts to `--text-on-accent` on image-overlay layouts.
- **`<hero-photo-subhead>`** — subhead. Color shifts on overlay layouts.
- **`<hero-photo-actions>`** — CTA cluster. Ghost gets backdrop-blur on overlay layouts.
- **`<hero-photo-meta>`** — small-print row.

## Reference lineage

| Aspect | Source |
|---|---|
| 4-layout system (image-right / image-left / image-full-bleed / image-overlay) | Apple product pages, Stripe customer stories, B2B SaaS marketing |
| AVIF → WebP → JPEG `<source>` cascade | HTML Living Standard, web.dev responsive images |
| `fetchpriority="high"` for LCP optimization | Chrome 101+ feature, baseline since 2023 |
| `decoding="async"` to avoid render-blocking | HTML spec |
| `object-fit: cover` + `object-position` focal-point | CSS Images Module Level 4 |
| Empty `alt=""` for decorative images vs descriptive alt | WCAG 1.1.1, WAI-ARIA Authoring Practices |
| `width` + `height` on `<img>` for CLS prevention | web.dev CLS guidance |
| Gradient overlay for text-on-image contrast | Apple iOS lockscreen tradition; classic editorial design |
| Backdrop-blur for legibility on image | iOS material design, macOS Big Sur aesthetic |

## Tokens consumed

Canonical only:

- **Colour**: `--surface`, `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis`, `--text-recede`, `--text-on-accent`, `--accent`, `--accent-hover`, `--border`, `--border-emphasis`, `--focus-ring`, `--warning`, `--warning-recede`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / card / pill`, `--border-width-sm / md`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display`, `--font-mono`, `--type-size-xs / sm / md / lg / xl / 2xl / 3xl / 4xl`, `--font-weight-medium / semibold`, `--leading-display / tight / prose`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`
- **Pattern-local**: `--overlay-strength` (per data-strength: 0.2 / 0.4 / 0.6) — local to the overlay primitive's CSS, not added to canonical namespace.

## Layouts

| Layout | Composition | Used for |
|---|---|---|
| `image-right` | 50/50 split — text left, image right | The 80% choice — product feature pages |
| `image-left` | Mirrored — image left, text right | Art-direction variety |
| `image-full-bleed` | Image fills hero corner-to-corner, text overlays | Flagship marketing home |
| `image-overlay` | Same as full-bleed + deliberate gradient/tint overlay for contrast | When image content is unpredictable (rotating photography, user-supplied content) |

## Overlay registers × tones × strengths

| Register | Use |
|---|---|
| `none` | Image carries native contrast — light-on-dark or dark-on-light scenes |
| `gradient-from-bottom` | Text sits at bottom; linear-gradient from transparent → dark up |
| `gradient-from-side` | Text on side; gradient from transparent → dark across the text-anchored side |
| `solid-tint` | Full-coverage tint at low opacity; fallback for busy images |

| Tone | Use |
|---|---|
| `dark` | `oklch(0% 0 0)` — default. Text reads as `--text-on-accent` (white) |
| `light` | `oklch(100% 0 0)` — used on dark photography. Text reads as `--text-emphasis` |
| `accent` | Theme `--accent` — color-anchors hero to brand identity |

| Strength | Opacity |
|---|---|
| `subtle` | 0.2 |
| `default` | 0.4 |
| `strong` | 0.6 |

## Templates that consume this pattern

- `template-marketing` — product feature pages (image-right / image-left)
- `template-saas-pro` — customer-story landing (image-full-bleed)
- `template-portfolio-designer` / `template-portfolio-developer` — case-study hero (image-overlay)
- `template-blog-magazine` — feature article top (image-right)

## Use

```html
<section data-pattern="hero-photo-section" layout="image-right" aria-labelledby="hero-headline">
  <div class="inner">
    <div class="content-column">
      <hero-photo-eyebrow tone="accent">GALLEY EASEL</hero-photo-eyebrow>
      <hero-photo-headline id="hero-headline">Brushes that feel like brushes.</hero-photo-headline>
      <hero-photo-subhead>
        Pressure-sensitive, non-destructive, .psd export. All in your browser.
      </hero-photo-subhead>
      <hero-photo-actions role="group" aria-label="Try Easel actions">
        <action-button intent="primary">Try Easel free</action-button>
        <action-button intent="ghost">See examples</action-button>
      </hero-photo-actions>
    </div>

    <picture data-pattern="hero-photo-media" data-aspect="4:3" data-crop="cover" data-focal-point="center">
      <source type="image/avif" media="(min-width: 800px)"
              srcset="hero-easel.avif 1x, hero-easel@2x.avif 2x">
      <source type="image/avif" srcset="hero-easel-mobile.avif">
      <source type="image/webp" media="(min-width: 800px)"
              srcset="hero-easel.webp 1x, hero-easel@2x.webp 2x">
      <source type="image/webp" srcset="hero-easel-mobile.webp">
      <img src="hero-easel.jpg"
           srcset="hero-easel-mobile.jpg 800w, hero-easel.jpg 1600w"
           sizes="(min-width: 800px) 50vw, 100vw"
           alt="Designer's hand drawing on a tablet, Galley Easel UI visible"
           width="800" height="600"
           fetchpriority="high"
           decoding="async">
    </picture>
  </div>
</section>
```

Image-overlay with gradient (text anchored bottom-left):

```html
<section data-pattern="hero-photo-section" layout="image-overlay" aria-labelledby="hero-headline">
  <picture data-pattern="hero-photo-media">…</picture>
  <hero-photo-overlay register="gradient-from-bottom" tone="dark" strength="strong" aria-hidden="true" />
  <div class="inner">
    <div class="content-column">
      <hero-photo-eyebrow tone="on-image">QUOIN</hero-photo-eyebrow>
      <hero-photo-headline id="hero-headline">Semantic markup for the application web.</hero-photo-headline>
      <hero-photo-actions>
        <action-button intent="primary">Read the spec</action-button>
      </hero-photo-actions>
    </div>
  </div>
</section>
```

## Specimen

Open `examples/index.html` in a browser. Includes:

- **License callout** at the top explicitly stating that placeholder fixtures are used in lieu of bundled photography
- **All 4 layouts** — image-right (Galley Easel), image-left (Galley Dues), image-full-bleed oversized (Galley flagship), image-overlay with gradient (Quoin v1.0)
- **All 4 overlay registers** — none / gradient-from-bottom / gradient-from-side / solid-tint
- **Production `<picture>` contract** — full AVIF / WebP / JPEG cascade with `fetchpriority="high"` + LCP comments
- **Composition lineage table** with explicit "external resource — host-provided" callout
- **11-item accessibility checklist** covering WCAG 1.1.1 (alt-text discipline), 1.4.3 (contrast on overlay), LCP optimization, responsive sources, focal-point preservation, ghost CTA on image, external-resource policy, CLS prevention via width/height

## License

MIT. (Pattern only. Photographic imagery is host-supplied and host-licensed.)
