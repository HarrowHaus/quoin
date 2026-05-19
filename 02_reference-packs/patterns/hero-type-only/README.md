# @quoin/pattern-hero-type-only

**P0 typography-only marketing hero.** The simplest of 5 hero variants. No media, no illustration, no animation — just typography and CTAs. Used as the flagship marketing hero where the headline IS the visual element. Six primitives. Four alignment registers × three sizes × five backgrounds.

This pattern **opens the hero category** in the Quoin catalog. The remaining 4 hero variants (hero-animated, hero-gradient-mesh, hero-brand-photo, hero-video) land at the FRONT of P1 to recover the marketing-surface hole left by the de facto P0 pivot to application-surface patterns. This pattern by itself is a complete, shippable hero — it does not require the other 4 variants to be useful.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-actions` primary CTA | The main conversion button — Start trial / Get started / Sign up. Hero CTAs default to size="md"; oversized hero size uses size="lg". |
| `<action-button intent="ghost">` + `intent="secondary"` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-actions` secondary CTAs | De-escalated CTAs — View pricing / Watch demo / Talk to sales. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Typography (display + sans), spacing scale, surfaces (5 background variants), motion. The dark background variant inverts text + accent + ghost via inline overrides. |

---

## What this pattern adds

Six primitives:

- **`<hero-section>`** — top-level `<section aria-labelledby="...">`. 4 registers (centered / left-aligned / right-aligned / split-anchor) × 3 sizes (compact / default / oversized) × 5 backgrounds.
- **`<hero-eyebrow>`** — small uppercase pre-heading. Renders as `<p>` (NOT a heading element). 3 tones (neutral / accent / success).
- **`<hero-headline>`** — the big display headline. h1 by default. 3 sizes. `text-wrap: balance`. Max-width 22ch.
- **`<hero-subhead>`** — supporting subtitle. 1-2 sentences max. Max-width 60ch. `text-wrap: pretty`.
- **`<hero-actions>`** — CTA cluster. 3 registers (primary-only / primary-plus-secondary / extended). 2 sizes (md / lg).
- **`<hero-meta>`** — optional small-print row. 3 registers (disclaimer / social-proof / trust-badges).

## Reference lineage

| Aspect | Source |
|---|---|
| Centered + big-typography hero | Stripe home, Linear home, Vercel home — the universal modern marketing hero |
| Left-aligned editorial hero | docs landing pages, B2B SaaS feature pages |
| Split-anchor (headline left + CTA right) | Stripe (some pages), Notion home, Mailchimp |
| Dark hero variant | Apple product pages, Vercel marketing flagship |
| `text-wrap: balance` on hero headlines | CSS Text Level 4 — became baseline-supported in 2024 |
| Single h1 per page in the hero | WCAG 1.3.1 + 2.4.6 (page outline integrity) |
| Trust-badge row in hero-meta | SaaS marketing convention (Stripe, Linear, GitHub) |
| Social-proof in hero-meta | Robert Cialdini's Influence (1984) social-proof principle |

## Tokens consumed

Canonical only:

- **Colour**: `--surface` / `--surface-elevated` / `--surface-recessed` (background variants), `--accent-recede` (accent background variant), `--text`, `--text-emphasis` (headline), `--text-recede` (subhead, eyebrow, meta), `--accent` (primary CTA, dark variant ground), `--accent-hover`, `--text-on-accent` (primary CTA text, dark variant text), `--success` (success-tone eyebrow), `--border`, `--border-emphasis`, `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / pill`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-display` (headline), `--font-sans` (everything else), `--type-size-xs / sm / md / lg / xl / 2xl / 3xl / 4xl`, `--font-weight-medium / semibold`, `--leading-display / tight / prose`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`

## Registers × content matrix

| Register | Alignment | Headline max-width | Layout | Typical use |
|---|---|---|---|---|
| `centered` | center | 22ch | inner max-width 720px | The 80% choice — Stripe / Linear / Vercel home heroes |
| `left-aligned` | left | 22ch | inner max-width 1080px | Editorial heroes, docs landings, B2B SaaS feature pages |
| `right-aligned` | right | 22ch | inner max-width 1080px | Art-direction-heavy marketing (uncommon in type-only) |
| `split-anchor` | left + right | 22ch | 2-col grid 1.4fr 1fr | Dense flagship pages, headline + CTA visually balanced |

## Sizes × backgrounds

### Sizes

| Size | Headline | Subhead | Padding | Typical use |
|---|---|---|---|---|
| `compact` | 2xl (~2rem) | md (1rem) | section / panel reduced | Page-internal heros, feature subpages, blog categories |
| `default` | 3xl (~2.5rem) | lg (~1.125rem) | section / panel | The 80% choice |
| `oversized` | 4xl (~3.5rem) | xl (~1.5rem) | 1.5x section | Flagship marketing home, no-fold-cutoff treatment |

### Backgrounds

| Background | Visual | Typical use |
|---|---|---|
| `surface` | Same as page surface | Default — no visual distinction from page |
| `surface-elevated` | Subtle elevation | Soft hero highlight |
| `surface-recessed` | Subtle recession | Used when hero sits between high-contrast sections |
| `accent-recede` | Tinted accent | Colour-anchored hero — soft brand stamp |
| `dark` | Inverted (`--accent` ground + `--text-on-accent`) | High-impact flagship; overrides all typography colours |

## Templates that consume this pattern

- `template-marketing` — top-of-page hero on every marketing page; defaults to `centered + default + surface`
- `template-saas-pro` — flagship home (`oversized + dark`), product subpages (`left-aligned + default`)
- `template-blog-magazine` — article page top (`compact + accent-recede`)
- `template-docs-pro` — docs landing (`left-aligned + default`)

## Use

### Canonical Galley flagship hero

```html
<section data-pattern="hero-section" register="centered" size="default" background="surface" aria-labelledby="hero-headline">
  <div class="inner">
    <hero-eyebrow tone="accent">Now in public beta</hero-eyebrow>
    <hero-headline id="hero-headline">
      Five tools that compose.<br>One subscription. One sign-in.
    </hero-headline>
    <hero-subhead>
      Galley is a multi-tool SaaS umbrella for PDF workflows, fast notes, subscription tracking, password storage, and image editing.
    </hero-subhead>
    <hero-actions role="group" aria-label="Sign up actions">
      <action-button intent="primary" as="a" href="/signup">Start free trial →</action-button>
      <action-button intent="ghost" as="a" href="/pricing">View pricing</action-button>
    </hero-actions>
    <hero-meta>No credit card required · 14-day trial · Cancel anytime</hero-meta>
  </div>
</section>
```

### Dark + oversized flagship

```html
<section data-pattern="hero-section" register="centered" size="oversized" background="dark" aria-labelledby="hero-dark-headline">
  <div class="inner">
    <hero-eyebrow>GALLEY · For everyone who works in their browser</hero-eyebrow>
    <hero-headline id="hero-dark-headline">
      Documents.<br>Notes. Dues. Keys. Easel.<br>Five tools, one Galley.
    </hero-headline>
    <hero-subhead>
      Compose your daily workflow from five purpose-built tools under one subscription.
    </hero-subhead>
    <hero-actions size="lg" role="group">
      <action-button intent="primary" as="a" href="/signup">Start free trial →</action-button>
      <action-button intent="ghost" as="a" href="/tour">Watch the 90-second tour</action-button>
    </hero-actions>
    <hero-meta>No credit card required · Free tier forever · Trusted by 14,000 households</hero-meta>
  </div>
</section>
```

## Specimen

Open `examples/index.html` in a browser. Five Galley hero treatments + supporting matrices:

- **Canonical centered/default/surface** — flagship Galley home with "Five tools that compose. One subscription. One sign-in." + primary+ghost CTAs + disclaimer meta
- **Left-aligned product subpage** — Galley Dues "Track every charge that hits your card." with category eyebrow and trust-badge meta
- **Split-anchor flagship** — Quoin v1.0 launch positioning with headline left + CTA cluster right
- **Oversized dark flagship** — "Documents. Notes. Dues. Keys. Easel. Five tools, one Galley." on inverted ground with lg-size CTAs
- **Compact + accent-recede** — Galley Easel feature announcement (page-internal hero)
- **All 3 action registers** stacked (primary-only / primary-plus-secondary / extended)
- **All 3 meta registers** (disclaimer / social-proof / trust-badges)
- **Composition lineage table** with the hero-category note positioning this as 1 of 5
- **10-item accessibility checklist** covering single-h1-per-page, aria-labelledby, eyebrow-is-not-a-heading, text-wrap balance/pretty, action cluster role="group", CTA size discipline, trust-badge alt-text, social-proof verifiability, dark variant contrast, reduced-motion

## License

MIT.
