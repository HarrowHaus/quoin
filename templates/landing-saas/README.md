# @quoin/template-landing-saas

Six-section SaaS landing page composing currently-shipped Quoin patterns. Aesthetically neutral by default — drop in any aesthetic pack to re-skin without rewriting markup.

**Shipped:** Session 5 Track D · 2026-05-21.

## Composition order

1. **`@quoin/pattern-nav`** — `marketing` variant. Brand wordmark + primary link list + sign-in / sign-up actions.
2. **`@quoin/pattern-hero`** — `type-only` variant. Eyebrow + headline + subhead + primary/ghost CTA pair. Centered.
3. **`@quoin/pattern-feature-grid`** — `three-up` variant. Three feature cells (icon + title + body).
4. **`@quoin/pattern-testimonial`** — `single-quote` variant. Pull-quote + attribution with avatar.
5. **`@quoin/pattern-pricing-tiers`** — `three-tier` variant. Starter / Team (highlighted) / Enterprise.
6. **`@quoin/pattern-footer-mega`** — `full` variant. Brand block + 3 link groups + legal row.

All six are currently shipped patterns (Phase 22 closed); no editorial-pattern dependencies.

## Customization points

| What | Where |
|------|-------|
| Brand wordmark, tagline, social handles | nav + footer |
| Brand colours (accent, status) | tokens override (`--accent`, `--critical`, `--success`, `--warning`) |
| Font stack (sans, display, mono) | tokens override (`--font-sans`, `--font-display`, `--font-mono`) |
| Headline, subhead, CTA destinations | hero section in `index.html` |
| Three feature cells (icon, title, body) | feature-grid section |
| Quote text, author, role/company, avatar | testimonial section |
| Three tier names, prices, feature lists, CTA destinations | pricing-tiers section |
| Footer link groups, legal links | footer-mega section |

## Token overrides

The template loads `@quoin/aesthetic-default` by default. Swap aesthetics by changing the second stylesheet link in `<head>`:

```html
<!-- swap "default" for "boeing-watch" or "harrow-haus" -->
<link rel="stylesheet" href=".../aesthetics/{aesthetic-name}/tokens.css">

<!-- and update the data-aesthetic attribute on <html> -->
<html data-aesthetic="{aesthetic-name}">
```

For brand-specific colours without forking an aesthetic pack, override `--accent` (and friends) in a `<style>` block after the aesthetic stylesheet:

```html
<style>
  :root {
    --accent: oklch(58% 0.20 145); /* your brand colour */
    --accent-hover: oklch(52% 0.22 145);
  }
</style>
```

## Recommended aesthetics

- `@quoin/aesthetic-default` — neutral baseline (loaded by default)
- `@quoin/aesthetic-boeing-watch` — for technical / infra products
- `@quoin/aesthetic-harrow-haus` — for editorial / studio products
- (any future aesthetic pack)

## Dependencies

```
@quoin/tokens-baseline           ^0.1.0
@quoin/pattern-nav                ^1.0.0
@quoin/pattern-hero               ^1.0.0
@quoin/pattern-feature-grid       ^1.0.0
@quoin/pattern-testimonial        ^1.0.0
@quoin/pattern-pricing-tiers      ^1.0.0
@quoin/pattern-footer-mega        ^1.0.0
@quoin/pattern-button-system      ^1.0.0
```

## License

MIT.
