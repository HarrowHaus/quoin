# @quoin/aesthetic-default

A tasteful neutral aesthetic. Intentionally low-character.

**Shipped:** Session 5 Track A · 2026-05-21.

## Why this exists

The third aesthetic in the swap demo at `demos/aesthetic-swap/`. It serves as the neutral comparison baseline — the rendering against which Boeing Watch's instrument-panel feel and Harrow Haus's editorial restraint look distinctive.

There's nothing wrong with this aesthetic. It's a fine default. It just doesn't have a strong opinion, and that's the point.

## Palette

- **Surfaces:** Neutral grays — pure white elevated, slight gray recessed, near-black inverse
- **Text:** Standard dark gray on light surface; standard light gray on dark
- **Accent:** Deep blue (`oklch(55% 0.18 245)`) — the contemporary "trustworthy SaaS" blue
- **Status:** Standard red / amber / green / blue

## Typography

- **Sans / display:** Inter Variable — the contemporary system feel
- **Mono:** IBM Plex Mono — clean, readable, consistent
- **Serif:** System fallback (no opinion shipped)

## Motion

Standard easings (`cubic-bezier(0.4, 0, 0.2, 1)`), baseline durations (50 / 100 / 200 / 400 / 800 ms). The aesthetic carries no motion personality — it ships the same motion any contemporary design system would.

## Loading

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/harrowhaus/quoin@main/02_reference-packs/tokens-baseline/tokens.css">
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/harrowhaus/quoin@main/aesthetics/default/tokens.css">

<html data-aesthetic="default">
```

## Fonts

Both OFL via Google Fonts:

```html
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
```

## License

MIT.
