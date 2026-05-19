# @quoin/pattern-hero-video

**P1 background-video marketing hero.** Fifth and final of 5 hero variants. Auto-playing muted looping video behind the canonical hero anatomy. Nine primitives.

**WCAG 2.2.2 (Pause, Stop, Hide) compliance is non-negotiable.** The `hero-video-controls` primitive provides the required user-controllable pause affordance and is part of the pattern's hard contract — it is not optional.

**External-resource policy: this pack does NOT bundle video assets.** Production hosts source their own licensed video. The pack ships only the layout, `<video>` contract, controls primitive, and overlay scaffolding. The specimen uses CSS-animated gradient placeholder fixtures.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-video-actions` primary | Solid `--accent` fill stays anchored against motion. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | `hero-video-actions` secondary, `hero-video-controls` | Ghost gets backdrop-filter blur for legibility on video. The pause control itself follows the same backdrop-blur recipe. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Typography / spacing / borders / focus-ring. `--text-on-accent` drives content color over video. |

### External resources — host-provided

| Resource | Status | Notes |
|---|---|---|
| Video files (`.webm`, `.mp4`) | host-supplied | Pack provides `<source>` contract; host licenses + serves the files |
| Poster image | host-supplied | Pack provides `poster` attribute contract; host licenses + serves |

### Hero category position

5 of 5 — the highest-bandwidth, highest-attention-cost variant. Completes the hero category.

---

## What this pattern adds

Nine primitives:

- **`<hero-video-section>`** — top-level wrapper. 2 registers (background-loop / embed-with-controls), 2 sizes, 5 states (default / playing / paused / video-error / reduced-motion).
- **`<hero-video-media>`** — `<video>` element with `<source>` cascade + poster.
- **`<hero-video-overlay>`** — optional decorative overlay (gradient/tint). 4 registers × 3 tones × 3 strengths. Always aria-hidden.
- **`<hero-video-controls>`** — **REQUIRED** WCAG 2.2.2 pause/play button. 4 positions.
- **`<hero-video-eyebrow>`** / **`<hero-video-headline>`** / **`<hero-video-subhead>`** / **`<hero-video-actions>`** / **`<hero-video-meta>`** — canonical hero anatomy with auto color promotion to `--text-on-accent` against video.

## WCAG 2.2.2 compliance contract

This is the **hard contract** for this pattern:

1. ANY auto-playing video that lasts more than 5 seconds AND is presented alongside other content MUST have a user-controllable pause mechanism.
2. The pause control MUST be visible (not on-hover-only).
3. The pause control MUST be keyboard-accessible (focus-visible, Enter+Space activation).
4. The pause control's `aria-label` MUST be state-aware ("Pause hero video" / "Play hero video").
5. Under `prefers-reduced-motion: reduce`, the video MUST start in the paused state. Host JS detects the preference and toggles `data-state="paused"` + calls `.pause()` on the video element.

Failing any of these is a WCAG 2.2.2 violation.

## Reference lineage

| Aspect | Source |
|---|---|
| Background-video hero pattern | Apple product launch pages, Stripe customer stories |
| WCAG 2.2.2 pause control | WCAG 2.2 spec (W3C Recommendation, Oct 2023) |
| `<video muted autoplay loop playsinline>` for backgrounds | HTML Living Standard; browser autoplay policies (Chrome, Safari) |
| WebM (vp9) + MP4 (h.264) source cascade | web.dev video performance guide |
| `preload="metadata"` for performance | HTML spec, web.dev |
| Poster image as LCP candidate | web.dev LCP guidance |
| `prefers-reduced-motion` video pause | WCAG 2.3 motion guidance + apple.com / stripe.com implementations |

## Tokens consumed

Canonical only:

- **Colour**: `--surface`, `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis`, `--text-recede`, `--text-on-accent`, `--accent`, `--accent-hover`, `--border`, `--border-emphasis`, `--focus-ring`, `--warning`, `--warning-recede`, `--critical`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / pill`, `--border-width-sm / md`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display`, `--font-mono`, `--type-size-xs / sm / md / lg / xl / 2xl / 3xl / 4xl`, `--font-weight-medium / semibold / bold`, `--leading-display / tight / prose`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`. Pause control toggle respects `prefers-reduced-motion`.
- **Pattern-local**: `--overlay-strength` (0.2 / 0.4 / 0.6 per data-strength).

## States × registers

### States

| State | DOM signal | Meaning |
|---|---|---|
| `default` | (no modifier) | Pre-mount, video not yet started. |
| `playing` | `[data-state="playing"]` | Video is auto-playing the loop. Pause control shows pause icon. |
| `paused` | `[data-state="paused"]` | User pressed pause OR reduced-motion default. Pause control shows play icon. |
| `video-error` | `[data-state="video-error"]` | Video failed to load. Poster fills bounds; no controls (poster IS the content). |
| `reduced-motion` | `[data-state="reduced-motion"]` | Initial state under `prefers-reduced-motion: reduce`. Equivalent to paused with explicit reduced-motion marker. |

### Registers

| Register | Behaviour |
|---|---|
| `background-loop` | Video auto-plays muted+looped. WCAG 2.2.2 controls required. The 80% choice. |
| `embed-with-controls` | Video uses native browser controls. User initiates playback. No autoplay; audio allowed. |

## Templates that consume this pattern

- `template-marketing` — flagship marketing home (background-loop oversized)
- `template-saas-pro` — product launch page (background-loop default)
- `template-portfolio-developer` / `template-portfolio-designer` — case-study reel (embed-with-controls)

## Use

```html
<section data-pattern="hero-video-section" register="background-loop" data-state="playing" aria-labelledby="hero-headline">
  <video data-pattern="hero-video-media"
         autoplay muted loop playsinline
         preload="metadata"
         poster="hero-poster.jpg"
         aria-label="Time-lapse of designers using Galley Easel">
    <source src="hero.webm" type="video/webm">
    <source src="hero.mp4" type="video/mp4">
    <img src="hero-poster.jpg" alt="Time-lapse of designers using Galley Easel" width="1920" height="1080" fetchpriority="high">
  </video>

  <hero-video-overlay register="gradient-from-bottom" tone="dark" strength="strong" aria-hidden="true" />

  <div class="inner">
    <div class="content-column">
      <hero-video-eyebrow tone="on-video">GALLEY</hero-video-eyebrow>
      <hero-video-headline id="hero-headline">Where creative work lives.</hero-video-headline>
      <hero-video-subhead>Five tools across one subscription.</hero-video-subhead>
      <hero-video-actions role="group" aria-label="Sign up actions">
        <action-button intent="primary">Start free trial</action-button>
        <action-button intent="ghost">Watch full tour →</action-button>
      </hero-video-actions>
    </div>
  </div>

  <!-- WCAG 2.2.2 REQUIRED pause control -->
  <button data-pattern="hero-video-controls"
          data-position="bottom-right"
          type="button"
          aria-label="Pause hero video">
    <icon name="pause" aria-hidden="true" />
    <span>Pause</span>
  </button>
</section>

<script>
  // Host JS: detect reduced-motion preference
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelector('[data-pattern="hero-video-media"]').pause();
    document.querySelector('[data-pattern="hero-video-section"]').dataset.state = 'paused';
  }
</script>
```

## Specimen

Open `examples/index.html` in a browser. Includes:

- **WCAG 2.2.2 callout** at the top making the hard contract explicit
- **License callout** stating that placeholder fixtures are used in lieu of bundled video
- **Background-loop canonical** (Galley) with working pause/play toggle
- **Oversized variant** (Quoin) with primary + ghost CTAs + solid-tint overlay
- **Paused state demo** showing the control state change
- **Production `<video>` contract** as a code block including the reduced-motion JS
- **Composition lineage table** with explicit external-resource callout
- **13-item accessibility checklist** covering WCAG 2.2.2 hard contract, state-aware aria-label, reduced-motion default-pause, muted-is-mandatory, playsinline-is-mandatory-on-iOS, WCAG 1.1.1 poster alt, WCAG 1.4.3 overlay contrast, fallback img inside video, preload=metadata, single-h1, external-resource policy, focus styles

## License

MIT. (Pattern only. Video and poster imagery are host-supplied and host-licensed.)
