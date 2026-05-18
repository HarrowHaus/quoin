# Token Architecture

**Version:** 1.0 (canonical namespace frozen)
**Status:** Phase 0.5 — canonical namespace expanded to its v1.0 surface area.

Quoin uses a three-layer token model conforming to **Tailwind v4** conventions and the **W3C Design Tokens Community Group (DTCG) 2025.10 format**. The canonical semantic-token namespace defined here is the **interoperability contract**: every Quoin token pack MUST implement every name in §3, and every Quoin vocabulary pack MUST reference only names in §3.

This namespace is **frozen at v1.0** after Phase 0.5. Further additions are minor versions; renames or removals are major.

### 0.1 Intellectual lineage

- **Tailwind v4** — three-tier tokens exposed as native CSS custom properties, with utility-class generation against the same token graph. Quoin's `base → semantic → component` layering and the use of CSS custom-property names follow Tailwind v4's convention.
- **W3C Design Tokens Community Group 2025.10** — `$value` / `$type` / `$description` JSON schema, `{path.to.token}` reference syntax, atomic types (`color`, `dimension`, `number`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `strokeStyle`) and composite types (`shadow`, `border`, `typography`, `transition`). Quoin token files validate as DTCG 2025.10.
- **Christopher Alexander, *A Pattern Language*** — separation of vocabulary (the patterns) from grammar (rules of composition). The semantic-token layer is the vocabulary; the cascade rules in `spec.md` §3 are the grammar.

## 1. Layers

### 1.1 Base tokens

Raw values. Supplied by token packs. No semantic meaning attached — the palette.

Naming convention: `--{category}-{name}-{scale}`.

```css
--color-stone-50:  oklch(98% 0 0);
--color-stone-500: oklch(50% 0 0);
--color-stone-900: oklch(15% 0 0);

--space-1:  0.25rem;
--space-4:  1rem;

--type-size-sm:  0.875rem;
--type-size-lg:  1.125rem;
```

Per-pack discretion. A pack may ship any base palette shape that suits its source aesthetic.

### 1.2 Semantic tokens

Purpose-bound references to base tokens. **This layer is the canonical interoperability contract.** A token pack that omits any name in §3 fails validation (`pack-format.md` §9). The full list is in §3; the composite structures are in §4.

```css
--surface:        var(--color-stone-50);
--text:           var(--color-stone-700);
--text-emphasis:  var(--color-stone-900);
--accent:         var(--color-stone-900);
```

### 1.3 Component tokens

Vocabulary-pack-defined, downstream of the semantic layer. Default values reference semantic tokens; projects may override.

```css
--authority-mark-typography: var(--text-display);
--primary-action-bg:         var(--accent);
--emphasis-card-radius:      var(--radius-card);
--emphasis-card-shadow:      var(--shadow-sm);
```

### 1.4 Worked end-to-end example

```
@quoin/tokens-baseline (base):       --color-stone-900: oklch(15% 0 0);
@quoin/tokens-baseline (semantic):   --accent: var(--color-stone-900);
@quoin/vocab-editorial  (component): --primary-action-bg: var(--accent);
@quoin/impl-tailwind   (emit):       class="bg-stone-900"
```

Override flow: a project that sets `--accent: oklch(60% 0.2 250)` in `quoin.tokens.json` (§6) propagates through every primitive that references `--accent`.

## 2. Layer definitions

Each layer is defined by the rules above. The canonical contract — what every pack must supply — is the semantic layer only. Base tokens are discretionary; component tokens are vocabulary-pack-defined.

## 3. The canonical semantic-token namespace

Every Quoin token pack MUST provide a `$value` for **every** token listed below. The validator fails on missing names. Composite-token `$value` objects MUST follow the DTCG 2025.10 composite syntax in §4.

CSS custom-property name for each canonical token is the kebab-case form of the semantic name with `--` prefix. `text-headline-lg` → `--text-headline-lg`.

### 3.1 `color` — surfaces (5)

| Token | $type | Purpose |
|-------|-------|---------|
| `surface` | color | Default page/container background. |
| `surface-elevated` | color | Raised surfaces (cards, panels, modals). |
| `surface-recessed` | color | Sunken surfaces (insets, code blocks, aside backgrounds). |
| `surface-inverse` | color | Inverted background (dark on light themes, vice versa). |
| `scrim` | color | Overlay color for modal backdrops and dismissive layers. |

### 3.2 `color` — text (10)

| Token | $type | Purpose |
|-------|-------|---------|
| `text` | color | Default body text. |
| `text-emphasis` | color | Headlines, primary emphasis. |
| `text-recede` | color | De-emphasized text (captions, metadata). |
| `text-disabled` | color | Inactive or unavailable text. |
| `text-on-accent` | color | Text rendered over `accent` backgrounds. |
| `text-on-critical` | color | Text rendered over `critical` backgrounds. |
| `text-on-success` | color | Text rendered over `success` backgrounds. |
| `text-on-warning` | color | Text rendered over `warning` backgrounds. |
| `text-on-info` | color | Text rendered over `info` backgrounds. |
| `highlight` | color | Selection background and search-match highlight. |

### 3.3 `color` — borders (3)

| Token | $type | Purpose |
|-------|-------|---------|
| `border` | color | Default border color. |
| `border-emphasis` | color | Highlighted borders (focus, active states). |
| `border-recede` | color | Subtle borders (low-emphasis separators). |

### 3.4 `color` — accent and status (6)

| Token | $type | Purpose |
|-------|-------|---------|
| `accent` | color | Primary brand or action color. |
| `accent-recede` | color | Soft accent (hover backgrounds, tints). |
| `critical` | color | Destructive / error semantic color. |
| `success` | color | Positive resolution. |
| `warning` | color | Caution. |
| `info` | color | Neutral informational. |

### 3.5 `color` — focus, links, shadow tint (5)

| Token | $type | Purpose |
|-------|-------|---------|
| `focus-ring` | color | Focus indicator color, often distinct from accent. |
| `link` | color | Link text default. |
| `link-visited` | color | Visited link text. |
| `link-hover` | color | Hovered link text. |
| `shadow-tint` | color | Color underneath shadow recipes. Material 3 uses non-neutral shadow tints; most systems use a neutral grey. |

### 3.6 `dimension` — spacing scale (14)

| Token | Reference value |
|-------|-----------------|
| `space-0` | `0` |
| `space-1` | `0.25rem` |
| `space-2` | `0.5rem` |
| `space-3` | `0.75rem` |
| `space-4` | `1rem` |
| `space-5` | `1.25rem` |
| `space-6` | `1.5rem` |
| `space-8` | `2rem` |
| `space-10` | `2.5rem` |
| `space-12` | `3rem` |
| `space-16` | `4rem` |
| `space-20` | `5rem` |
| `space-24` | `6rem` |
| `space-32` | `8rem` |

### 3.7 `dimension` — semantic spacing (9)

| Token | Purpose |
|-------|---------|
| `space-stack-compact` | Vertical rhythm — compact. |
| `space-stack-normal` | Vertical rhythm — normal. |
| `space-stack-loose` | Vertical rhythm — loose. |
| `space-inline-tight` | Inline gap — tight. |
| `space-inline-normal` | Inline gap — normal. |
| `space-inline-loose` | Inline gap — loose. |
| `space-card` | Inner padding for card-class components. |
| `space-panel` | Inner padding for panel-class components. |
| `space-frame` | Inner padding for frame-class components. |

### 3.8 `dimension` — type sizes (10)

| Token | Purpose |
|-------|---------|
| `type-size-xs` | Smallest body / caption. |
| `type-size-sm` | Small body. |
| `type-size-md` | Default body. (Was `type-size-base` pre-1.0.) |
| `type-size-lg` | Large body / small title. |
| `type-size-xl` | Title. |
| `type-size-2xl` | Subhead. |
| `type-size-3xl` | Headline. |
| `type-size-4xl` | Major headline. |
| `type-size-5xl` | Hero headline. |
| `type-size-display` | Display class — largest. |

### 3.9 `dimension` — tracking (3)

| Token | Purpose |
|-------|---------|
| `tracking-tight` | Tight letter-spacing. |
| `tracking-normal` | Default letter-spacing. |
| `tracking-wide` | Wide letter-spacing. |

### 3.10 `dimension` — radius (9)

| Token | Purpose |
|-------|---------|
| `radius-none` | `0`. |
| `radius-sm` | Subtle rounding. |
| `radius-md` | Default rounding. |
| `radius-lg` | Pronounced rounding. |
| `radius-xl` | Strong rounding. |
| `radius-pill` | Fully rounded. |
| `radius-card` | Card-class default. |
| `radius-frame` | Frame-class default. |
| `radius-media` | Media frame default. |

### 3.11 `dimension` — border widths (4)

| Token | Reference value |
|-------|-----------------|
| `border-width-hairline` | `0.5px` equivalent (actual rendering varies by device). |
| `border-width-sm` | `1px`. |
| `border-width-md` | `2px`. |
| `border-width-lg` | `4px`. |

### 3.12 `dimension` — focus ring metrics (2)

| Token | Purpose |
|-------|---------|
| `focus-ring-width` | Focus-ring stroke thickness. |
| `focus-ring-offset` | Offset between element and ring. |

### 3.13 `dimension` — icon sizes (5)

| Token | Purpose |
|-------|---------|
| `icon-size-xs` | Extra-small icon. |
| `icon-size-sm` | Small icon. |
| `icon-size-md` | Default icon. |
| `icon-size-lg` | Large icon. |
| `icon-size-xl` | Extra-large icon. |

### 3.14 `dimension` — containers (4)

| Token | Purpose |
|-------|---------|
| `container-narrow` | Narrow content column (≈40rem). |
| `container-default` | Default content column (≈64rem). |
| `container-wide` | Wide layout (≈80rem). |
| `container-full` | Full-width layout (`100%`). |

### 3.15 `dimension` — measure + blur (4)

| Token | Purpose |
|-------|---------|
| `measure-prose` | Optimal reading-line width (≈65ch). |
| `blur-sm` | Subtle blur radius (backdrop tints, hover states). |
| `blur-md` | Default blur radius (modals over scrim). |
| `blur-lg` | Heavy blur radius (cinematic overlays). |

### 3.16 `number` — opacity (5)

| Token | Reference value |
|-------|-----------------|
| `opacity-disabled` | `0.38` |
| `opacity-recede` | `0.6` |
| `opacity-hover-layer` | `0.08` |
| `opacity-active-layer` | `0.12` |
| `opacity-scrim` | `0.5` |

### 3.17 `number` — z-index (8)

| Token | Reference value |
|-------|-----------------|
| `z-base` | `0` |
| `z-raised` | `1` |
| `z-sticky` | `100` |
| `z-dropdown` | `1000` |
| `z-modal` | `2000` |
| `z-popover` | `3000` |
| `z-tooltip` | `4000` |
| `z-toast` | `5000` |

### 3.18 `number` — aspect ratios (4)

| Token | Reference value |
|-------|-----------------|
| `aspect-square` | `1.0` |
| `aspect-video` | `1.7778` (16:9) |
| `aspect-portrait` | `0.75` (3:4) |
| `aspect-banner` | `3.0` (3:1) |

### 3.19 `number` — leading multipliers (4)

DTCG number type, unitless.

| Token | Reference value |
|-------|-----------------|
| `leading-tight` | `1.15` |
| `leading-normal` | `1.4` |
| `leading-prose` | `1.6` |
| `leading-loose` | `1.9` |

### 3.20 `fontFamily` (9)

Each token's `$value` is an array of family names with fallbacks per DTCG `fontFamily` type.

| Token | Purpose |
|-------|---------|
| `font-sans` | Default sans-serif family (body copy). |
| `font-serif` | Serif family. |
| `font-mono` | Monospace family (primary UI mono). |
| `font-display` | Display family (headlines, hero copy). |
| `font-mono-warm` | Warmer monospace variant (inline code in marketing copy). |
| `font-mono-slab` | Slab-style monospace (`<kbd>` labels, terminal frames). |
| `font-mono-script` | Script-style monospace (annotations, handwritten feel). |
| `font-mono-mechanical` | Mechanical monospace (AI suggestion / diff hunks). |
| `font-mono-pixel` | Pixel/retro monospace (caption mono, terminal aesthetic). |

The Quoin identity baseline pairs Junicode 2 (`font-display`/`font-serif`) + Ranade (`font-sans`) + the Monaspace family (`font-mono*`) + Departure Mono (`font-mono-pixel`). Packs may override any slot via their `fonts` block.

### 3.21 `fontWeight` (6)

| Token | Reference value |
|-------|-----------------|
| `font-weight-light` | `300` |
| `font-weight-regular` | `400` |
| `font-weight-medium` | `500` |
| `font-weight-semibold` | `600` |
| `font-weight-bold` | `700` |
| `font-weight-black` | `900` |

### 3.22 `duration` — motion (5)

| Token | Reference value |
|-------|-----------------|
| `motion-instant` | `50ms` |
| `motion-fast` | `100ms` |
| `motion-normal` | `200ms` |
| `motion-slow` | `400ms` |
| `motion-slower` | `800ms` |

### 3.23 `cubicBezier` — easing (6)

| Token | Reference value |
|-------|-----------------|
| `ease-linear` | `[0, 0, 1, 1]` |
| `ease-standard` | `[0.4, 0, 0.2, 1]` |
| `ease-decelerate` | `[0, 0, 0.2, 1]` (entrance) |
| `ease-accelerate` | `[0.4, 0, 1, 1]` (exit) |
| `ease-emphasized` | `[0.2, 0, 0, 1]` (Material-style emphasized) |
| `ease-spring` | `[0.5, 1.5, 0.5, 1]` (bouncy / spring-physics feel) |

### 3.24 `shadow` (composite, 10)

`$value` follows DTCG `shadow` composite. See §4.1 for the object shape. Where source systems layer multiple shadows for one elevation step, encode as an array of composite objects.

| Token | Purpose |
|-------|---------|
| `shadow-xs` | Subtle — input fields, micro elevation. |
| `shadow-sm` | Resting cards. |
| `shadow-md` | Hover state, dropdown menus. |
| `shadow-lg` | Modals, popovers. |
| `shadow-xl` | Toasts, prominent overlays. |
| `shadow-2xl` | Maximum emphasis — rare. |
| `shadow-inner` | Inset — sunken surfaces. |
| `shadow-none` | Explicit "no shadow" reset (transparent). |
| `shadow-focus` | Focus-ring composite — color `focus-ring`, spread `focus-ring-width`. |
| `shadow-focus-error` | Focus-ring composite in critical state. |

### 3.25 `border` (composite, 3)

`$value` follows DTCG `border` composite. See §4.2.

| Token | Composite |
|-------|-----------|
| `border-default` | `{color: {border}, width: {border-width-sm}, style: "solid"}` |
| `border-emphasis-stroke` | `{color: {border-emphasis}, width: {border-width-md}, style: "solid"}` |
| `border-divider` | `{color: {border-recede}, width: {border-width-sm}, style: "solid"}` |

Note: `border-emphasis-stroke` is the composite token (border-style spec); `border-emphasis` (in §3.3) is the color-only token. Both exist; the color one is referenced by the composite one.

### 3.26 `typography` (composite, 13)

`$value` follows DTCG `typography` composite. See §4.3. Primitives that render text reference a `typography` composite rather than composing four atomic tokens.

| Token | Purpose |
|-------|---------|
| `text-display` | Hero-class, single-use display type. |
| `text-headline-lg` | Major page heading. |
| `text-headline-md` | Page heading. |
| `text-headline-sm` | Sub-heading. |
| `text-title-lg` | Section title. |
| `text-title-md` | Card / panel title. |
| `text-title-sm` | Small title. |
| `text-body-lg` | Large body prose. |
| `text-body-md` | Default body prose. |
| `text-body-sm` | Small body / footnote. |
| `text-label-lg` | Large label (buttons, badges). |
| `text-label-md` | Default label (form labels, captions). |
| `text-label-sm` | Small label (chips, fine metadata). |

### 3.27 `transition` (composite, 6)

`$value` follows DTCG `transition` composite. See §4.4.

| Token | Composite |
|-------|-----------|
| `transition-default` | `{duration: {motion-normal}, delay: "0ms", timingFunction: {ease-standard}}` |
| `transition-emphasis` | `{duration: {motion-slow}, delay: "0ms", timingFunction: {ease-emphasized}}` |
| `transition-fast` | `{duration: {motion-fast}, delay: "0ms", timingFunction: {ease-standard}}` |
| `transition-color` | Color-property hover/focus transitions. Default duration `motion-fast`. |
| `transition-transform` | Transform-property animations (scale, translate). Default duration `motion-normal`. |
| `transition-opacity` | Opacity-property fades. Default duration `motion-fast`. |

CSS emission for the per-property tokens uses the matching CSS property name in shorthand (e.g. `--transition-transform: transform 200ms cubic-bezier(...)`), not `all`. This keeps the GPU rasteriser path tight.

### 3.28 `strokeStyle` (3)

| Token | Reference value |
|-------|-----------------|
| `stroke-solid` | `"solid"` |
| `stroke-dashed` | `{dashArray: ["4px", "2px"], lineCap: "butt"}` |
| `stroke-dotted` | `"dotted"` |

### Namespace summary

| DTCG type | Token count |
|-----------|-------------:|
| `color` | 29 |
| `dimension` | 64 |
| `number` | 21 |
| `fontFamily` | 9 |
| `fontWeight` | 6 |
| `duration` | 5 |
| `cubicBezier` | 6 |
| `shadow` | 10 |
| `border` | 3 |
| `typography` | 13 |
| `transition` | 6 |
| `strokeStyle` | 3 |
| **Total** | **175** |

The fontFamily / shadow / transition increases over v0.5's original 164 reflect the handoff additive — Quoin's identity typography stack (Junicode + Ranade + Monaspace family + Departure Mono) plus focus-ring and per-property transition composites. No tokens renamed or removed from v0.5.

## 4. DTCG composite structures

### 4.1 `shadow`

Single shadow:

```json
{
  "shadow-sm": {
    "$type": "shadow",
    "$value": {
      "color": "{color.black}",
      "offsetX": "0",
      "offsetY": "1px",
      "blur": "2px",
      "spread": "0",
      "inset": false
    }
  }
}
```

Layered shadow (array of composites):

```json
{
  "shadow-md": {
    "$type": "shadow",
    "$value": [
      { "color": "{shadow-tint}", "offsetX": "0", "offsetY": "4px",  "blur": "6px",  "spread": "-1px", "inset": false },
      { "color": "{shadow-tint}", "offsetX": "0", "offsetY": "2px",  "blur": "4px",  "spread": "-1px", "inset": false }
    ]
  }
}
```

### 4.2 `border`

```json
{
  "border-default": {
    "$type": "border",
    "$value": {
      "color": "{border}",
      "width": "{border-width-sm}",
      "style": "solid"
    }
  }
}
```

`style` accepts any DTCG `strokeStyle` value (string keyword or `{dashArray, lineCap}` object).

### 4.3 `typography`

```json
{
  "text-headline-md": {
    "$type": "typography",
    "$value": {
      "fontFamily": "{font-display}",
      "fontSize": "{type-size-3xl}",
      "fontWeight": "{font-weight-bold}",
      "lineHeight": "{leading-tight}",
      "letterSpacing": "{tracking-tight}"
    }
  }
}
```

### 4.4 `transition`

```json
{
  "transition-default": {
    "$type": "transition",
    "$value": {
      "duration": "{motion-normal}",
      "delay": "0ms",
      "timingFunction": "{ease-standard}"
    }
  }
}
```

## 5. Pack obligations

Every Quoin token pack MUST supply a `$value` for every name in §3. The validator (`@quoin/validate-pack` and `03_harvest/validate.js`) enforces completeness.

A pack manifest MAY declare `"status": "pending-3.5c-fill"` during the Phase 3.5c transitional window. Packs with that status emit validation warnings rather than errors for missing tokens, so the compiler test suite and reference demos continue to function while harvested packs are being filled in. After Phase 3.5c, that flag is removed and every pack must pass strict validation.

Reference pack `@quoin/tokens-baseline` is the canonical complete implementation of the namespace. Every harvested pack must match its name surface — values per-pack.

## 6. Project overrides

A project MAY supply a project-local `quoin.tokens.json`. Override-precedence chain (highest to lowest):

1. `quoin.tokens.json` (project).
2. Active token pack (semantic + base).
3. Active vocabulary pack (component-token defaults).
4. Implementation-pack fallback (tokens outside the canonical namespace only).

A project that overrides `--accent` and `--font-display` rebrands every primitive that references them, without forking any pack. This is the primary white-label mechanism.

## 7. Validation

A token pack is valid if and only if:

1. It supplies a `$value` for every name in §3 (or declares `"status": "pending-3.5c-fill"`).
2. All `{path.to.token}` references resolve.
3. All atomic-type `$value` strings parse against their declared `$type`.
4. All composite-type `$value` objects conform to the structures in §4.
5. No circular references exist in the token graph.

Reference validators:

- `@quoin/compiler/findMissingSemanticTokens` — compile-time check.
- `03_harvest/validate.js` — pack-publication check (full validation).

## 8. DTCG conformance

Quoin token packs are valid DTCG 2025.10 files. The canonical namespace uses only DTCG atomic types (`color`, `dimension`, `number`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `strokeStyle`) and DTCG composite types (`shadow`, `border`, `typography`, `transition`). No Quoin-specific extensions are required; any DTCG 2025.10 tooling can read a Quoin pack.

Reference: <https://www.designtokens.org/tr/drafts/format/>.

## 9. Cross-references

- Authoring syntax and how primitives reference tokens: `spec.md` §3.2.
- Token pack manifest schema and DTCG file example: `pack-format.md` §4.
- Which primitives reference which tokens: `primitives.md`.
- Capability negotiation between token and implementation packs: `spec.md` §4.4.
