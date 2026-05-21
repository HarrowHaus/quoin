# @quoin/prim-decoration-overlay

Decoration overlay primitive — positioned-absolute decorative layer over a container. 4 variants (`grain` / `texture` / `pattern` / `gradient`).

**Shipped:** Phase 22 / Consolidation 7 / 2026-05-20. Forward-looking infrastructure — no existing inlined contracts; primitive ready for future Boeing Watch aesthetic pack + paper-grain hero variants + brand-specific surface decorations.

## Anatomy (v3.G.18)

| Slot | Element | Role | Key tokens |
|---|---|---|---|
| `decoration-overlay` | `<div aria-hidden="true">` | Positioned-absolute decorative layer | `--text-emphasis`, `--opacity-recede`, `--blur-sm` |

### Universal attributes

| Attribute | Values | Default |
|---|---|---|
| `data-role` | `grain` / `texture` / `pattern` / `gradient` | `grain` |
| `data-intensity` | `subtle` / `default` / `dramatic` | `default` |
| `data-blend` | `normal` / `overlay` / `multiply` / `screen` / `soft-light` | `overlay` |

## Performance budget (v3.G.14)

**5% LCP impact maximum.** Overlays must paint AFTER critical content. Consumers:

- Use CSS-generated decoration over SVG / image references where possible
- Apply `will-change: opacity` sparingly (composited layers cost GPU memory)
- Prefer `mix-blend-mode` over heavy filters
- Lazy-load any image references via `loading="lazy"` if used

## Anticipated consumers

| Consumer (forthcoming) | Use case |
|---|---|
| `@quoin/aesthetic-boeing-watch` (D.65 locked) | Texture + grain overlays on dashboard surfaces |
| `@quoin/aesthetic-manuscript-future` | Paper-grain on prose surfaces |
| Future hero variants | Paper-grain composed alongside gradient-mesh |

## Minimal markup

```html
<!-- Grain overlay on a hero background -->
<section class="hero-section">
  <div class="hero-background"></div>
  <div class="decoration-overlay" data-role="grain" data-intensity="subtle" data-blend="overlay" aria-hidden="true"></div>
  <!-- ... hero content ... -->
</section>
```

## Cross-references

- Audit: [`02_reference-packs/CONSOLIDATION-7-AUDIT.md`](../../CONSOLIDATION-7-AUDIT.md)
- Report: [`02_reference-packs/CONSOLIDATION-7-REPORT.md`](../../CONSOLIDATION-7-REPORT.md)
