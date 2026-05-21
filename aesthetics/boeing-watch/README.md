# @quoin/aesthetic-boeing-watch

Precision-instrumental aesthetic. The aerospace-cockpit aesthetic that lives in Quoin's catalog under D.65.

**Shipped:** Session 5 Track A · 2026-05-21.

## Aesthetic philosophy

Boeing Watch evokes the instrumental discipline of a 1970s cockpit panel — surfaces in instrument cream and control gray; ink in deep navy; signal amber reserved for live indicators and focus rings; signal red reserved for criticality. Type sets in IBM Plex Sans and IBM Plex Mono — both OFL-licensed faces with the technical clarity the aesthetic demands. Density is preserved at baseline scale (not compressed), but radii are squared to 2px maximum, motion is faster than baseline, and easings are mechanical (no spring overshoot — instruments don't bounce).

The aesthetic suits:

- Internal tooling and dashboards where precision reads as expertise
- Developer-facing surfaces (status pages, debug consoles, monitoring UIs)
- Aerospace, scientific, or industrial product brands
- Any context where signal-amber on instrument-cream feels less performative than a neon brand color

## Variant-token slots this pack overrides

| Slot family | Override style |
|---|---|
| `--surface*` | Instrument cream (warm off-white) + recessed warmer + navy inverse |
| `--text*` | Deep navy ink + control gray recede + cream on accent (for amber chrome contexts) |
| `--accent*` | Deep navy (light mode) / signal amber (dark mode) |
| `--critical / --warning / --success / --info` | Signal red / signal amber / status green / instrument blue |
| `--focus-ring` | Signal amber — aerospace convention for active-attention indicator |
| `--font-sans / display / mono / serif` | IBM Plex Sans / Sans Condensed / Mono / Serif |
| `--radius-*` | 0-2px maximum (instruments are squared) |
| `--motion-* / --ease-*` | Faster timing + mechanical easings (no spring overshoot) |
| Hero gradient-mesh palette enums | Targeted by future aesthetic-pack work — anchored on instrument-amber tints |

## Loading

```html
<!-- Load baseline tokens first -->
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/harrowhaus/quoin@main/02_reference-packs/tokens-baseline/tokens.css">

<!-- Then load this aesthetic -->
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/harrowhaus/quoin@main/aesthetics/boeing-watch/tokens.css">

<!-- Activate via data-aesthetic attribute -->
<html data-aesthetic="boeing-watch">
```

The aesthetic also responds to `prefers-color-scheme: dark` for the inverted navy-panel night mode.

## Fonts

IBM Plex Sans + IBM Plex Sans Condensed + IBM Plex Mono are OFL-licensed and available via Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Sans+Condensed:wght@500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
```

## Specimen

`specimen/index.html` renders four patterns (nav-marketing + hero-gradient-mesh + feature-grid + footer-mega) under the Boeing Watch aesthetic. Open it locally or via raw.githack.com to see the cohesion.

## License

MIT.
