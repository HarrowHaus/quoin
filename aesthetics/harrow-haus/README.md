# @quoin/aesthetic-harrow-haus

The house aesthetic of Harrow Haus. Post-industrial minimalism with editorial roots.

**Shipped:** Session 5 Track A · 2026-05-21.

## Aesthetic philosophy

Paper + ink + signal red. Generous outer margins. Serifs that take their typography seriously. Restraint where most brands gesture; precision where most brands soften.

Palette in plain reading:

| Token | Reads as | Source hex |
|---|---|---|
| `--surface` (paper) | Warm off-white parchment | `#f4efe6` |
| `--text` (ink) | Deep neutral, almost black, faintly warm | `#1d1a16` |
| `--accent` (signal red) | Restrained editorial red, held in reserve | `#7a2f22` |

Typography is the free-and-licensed stack:

- **Junicode 2** for the wordmark and display headlines — an OFL editorial face descended from medieval manuscript hands
- **Source Serif 4** for body prose — Adobe's open-source serif optimized for reading
- **IBM Plex Mono** for code — clear at small sizes, integrates with the IBM Plex family for technical readouts
- **Recursive** for variable-axis surfaces — a single OFL variable face that handles sans + cursive + mono via axis controls

Motion philosophy: restrained, slow, considered. 240ms / 360ms / 520ms durations. No spring overshoot, no iOS snap — the easings are `cubic-bezier(0.3, 0.1, 0.3, 1)` standard with no bounce. The aesthetic suggests an editorial reading room more than a SaaS dashboard.

Spacing: 1.5× baseline on outer margins (3rem panel padding, 6rem section spacing), baseline preserved on inner card padding. Van de Graaf canon-informed proportions for page-frame compositions.

## Use cases

- Personal portfolios and editorial projects where seriousness reads as care
- Brands deliberately stepping away from the contemporary Inter-and-emerald default
- Long-form prose surfaces, journals, retrospectives
- The house style for Harrow Haus's own product surfaces

## Variant-token slots this pack overrides

| Slot family | Override style |
|---|---|
| `--surface*` | Paper warm off-white + recessed cream + ink inverse |
| `--text*` | Deep ink figure on paper ground; paper figure on ink (dark mode) |
| `--accent*` | Signal red (`#7a2f22`) — primary chrome, hover/active variations |
| `--focus-ring` | Signal red — restrained but visible |
| `--font-display / serif / sans / mono` | Junicode 2 / Source Serif 4 / Recursive / IBM Plex Mono |
| `--space-panel / section` | 1.5× baseline (3rem / 6rem) |
| `--radius-*` | 0-2px maximum (editorial squared) |
| `--motion-* / --ease-*` | Restrained timing + no-bounce easings |
| `--leading-prose` | 1.65 (slightly looser than baseline for editorial reading rhythm) |

## Loading

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/harrowhaus/quoin@main/02_reference-packs/tokens-baseline/tokens.css">
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/harrowhaus/quoin@main/aesthetics/harrow-haus/tokens.css">

<html data-aesthetic="harrow-haus">
```

## Fonts

| Face | Source | Availability |
|---|---|---|
| Junicode 2 | psb1558 / Junicode website | OFL — direct download, self-host |
| Source Serif 4 | Google Fonts | OFL — `https://fonts.googleapis.com/css2?family=Source+Serif+4` |
| IBM Plex Mono | Google Fonts | OFL — `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono` |
| Recursive | Google Fonts | OFL — `https://fonts.googleapis.com/css2?family=Recursive` |

Specimens load Junicode 2 from the maintainer's CDN; production usage should self-host the Junicode 2 WOFF2 from `https://psb1558.github.io/Junicode-font/`.

## Specimen

`specimen/index.html` renders the same four patterns as Boeing Watch's specimen (nav-marketing + hero-gradient-mesh + feature-grid + footer-mega) under the Harrow Haus aesthetic — direct visual contrast against Boeing Watch's instrument-panel feel.

## License

MIT. Copyright (c) 2026 Donald Pilger / Harrow Haus.
