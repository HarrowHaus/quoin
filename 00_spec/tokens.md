# Token Architecture

**Version:** 0.1
**Status:** Phase 0 — canonical token model.

Quoin uses a three-layer token model conforming to **Tailwind v4** conventions and the **W3C Design Tokens Community Group (DTCG)** file format. The canonical semantic-token namespace defined here is the **interoperability contract**: every Quoin token pack MUST implement every name in §2, and every Quoin vocabulary pack MUST reference only names in §2 (plus optional capabilities in §2.9).

### 0.1 Intellectual lineage

- **Tailwind v4** — three-tier tokens exposed as native CSS custom properties, with utility-class generation against the same token graph. Quoin's `base → semantic → component` layering and the use of CSS custom-property names follow Tailwind v4's convention.
- **W3C Design Tokens Community Group** — `$value` / `$type` / `$description` JSON schema, `{path.to.token}` reference syntax. Quoin token files validate as DTCG.
- **Christopher Alexander, *A Pattern Language*** — separation of vocabulary (the patterns themselves) from grammar (rules of composition). The semantic-token layer is the vocabulary; the cascade rules in `spec.md` §3 are the grammar.

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
--space-16: 4rem;

--type-size-sm:      0.875rem;
--type-size-lg:      1.125rem;
--type-size-display: 4.5rem;
```

### 1.2 Semantic tokens

Purpose-bound references to base tokens. **This layer is the canonical interoperability contract.** A token pack that omits any name in §2 fails validation (`pack-format.md` §9).

Naming convention: `--{purpose}` or `--{purpose}-{variant}`.

```css
--surface:        var(--color-stone-50);
--text:           var(--color-stone-700);
--text-emphasis:  var(--color-stone-900);
--accent:         var(--color-stone-900);
```

### 1.3 Component tokens

Vocabulary-specific tokens, typically supplied by vocabulary packs as defaults that reference semantic tokens. Projects may override component tokens without forking the vocabulary pack.

Naming convention: `--{primitive}-{property}`.

```css
--authority-mark-size:    var(--type-size-display);
--primary-action-bg:      var(--accent);
--emphasis-card-radius:   var(--radius-card);
```

### 1.4 Worked end-to-end example

How the layers cooperate for a single rendered button:

```
@quoin/tokens-baseline (base):       --color-stone-900: oklch(15% 0 0);
@quoin/tokens-baseline (semantic):   --accent: var(--color-stone-900);
@quoin/vocab-editorial  (component): --primary-action-bg: var(--accent);
@quoin/impl-tailwind   (emit):       class="bg-stone-900"

Result HTML:                          <button class="bg-stone-900 ...">Save</button>
```

Override flow: a project that sets `--accent: oklch(60% 0.2 250)` in `quoin.tokens.json` (§5) propagates through every primitive that references `--accent` without touching any pack.

## 2. The canonical semantic token namespace

Every Quoin token pack MUST provide values for **every** token below. A pack that omits any required token fails validation. Optional capabilities are flagged.

### 2.1 Surface

| Token | Purpose |
|-------|---------|
| `--surface` | Default page or container background |
| `--surface-elevated` | Raised surfaces (cards, panels, modals) |
| `--surface-recessed` | Sunken surfaces (insets, code blocks, aside backgrounds) |
| `--surface-inverse` | Inverted background |

### 2.2 Text

| Token | Purpose |
|-------|---------|
| `--text` | Default body text |
| `--text-emphasis` | Headlines, primary emphasis |
| `--text-recede` | De-emphasized text (metadata, captions, secondary info) |
| `--text-disabled` | Inactive or unavailable text |
| `--text-on-accent` | Text rendered over `--accent` backgrounds |
| `--text-on-critical` | Text rendered over `--critical` backgrounds |
| `--text-on-success` | Text rendered over `--success` backgrounds |
| `--text-on-warning` | Text rendered over `--warning` backgrounds |
| `--text-on-info` | Text rendered over `--info` backgrounds |

### 2.3 Border

| Token | Purpose |
|-------|---------|
| `--border` | Default border |
| `--border-emphasis` | Highlighted border (focus rings, active states) |
| `--border-recede` | Subtle border (low-emphasis separators) |

### 2.4 Accent and status

| Token | Purpose |
|-------|---------|
| `--accent` | Primary brand or action color |
| `--accent-recede` | Soft accent (hover backgrounds, tints) |
| `--critical` | Destructive / error |
| `--success` | Positive resolution |
| `--warning` | Caution |
| `--info` | Neutral informational |

### 2.5 Typography

| Token | Purpose |
|-------|---------|
| `--font-sans` | Default sans-serif family |
| `--font-serif` | Serif family |
| `--font-mono` | Monospace family |
| `--font-display` | Display family (headlines) |
| `--type-size-xs` | Type scale step |
| `--type-size-sm` | Type scale step |
| `--type-size-base` | Type scale step |
| `--type-size-lg` | Type scale step |
| `--type-size-xl` | Type scale step |
| `--type-size-2xl` | Type scale step |
| `--type-size-3xl` | Type scale step |
| `--type-size-display` | Type scale step (largest) |
| `--leading-tight` | Tight line-height |
| `--leading-normal` | Default line-height |
| `--leading-prose` | Relaxed line-height for body prose |
| `--leading-loose` | Loose line-height |
| `--tracking-tight` | Tight letter-spacing |
| `--tracking-normal` | Default letter-spacing |
| `--tracking-wide` | Wide letter-spacing |
| `--measure-prose` | Optimal reading-line width (≈ 65ch) |

### 2.6 Spacing

| Token | Purpose |
|-------|---------|
| `--space-0` | Step scale (0) |
| `--space-1` | Step scale |
| `--space-2` | Step scale |
| `--space-3` | Step scale |
| `--space-4` | Step scale |
| `--space-6` | Step scale |
| `--space-8` | Step scale |
| `--space-12` | Step scale |
| `--space-16` | Step scale |
| `--space-24` | Step scale |
| `--space-32` | Step scale (largest) |
| `--space-stack-compact` | Vertical rhythm — compact |
| `--space-stack-normal` | Vertical rhythm — normal |
| `--space-stack-loose` | Vertical rhythm — loose |
| `--space-inline-tight` | Inline gap — tight |
| `--space-inline-normal` | Inline gap — normal |
| `--space-card` | Inner padding for card-class components |
| `--space-panel` | Inner padding for panel-class components |
| `--space-frame` | Inner padding for frame-class components |

### 2.7 Radius

| Token | Purpose |
|-------|---------|
| `--radius-none` | 0 |
| `--radius-sm` | Subtle rounding |
| `--radius-md` | Default rounding |
| `--radius-lg` | Pronounced rounding |
| `--radius-pill` | Fully rounded |
| `--radius-card` | Card-class default |
| `--radius-frame` | Frame-class default |
| `--radius-media` | Media frame default |

### 2.8 Motion

| Token | Purpose |
|-------|---------|
| `--motion-fast` | Fast transitions (≤ 150ms) |
| `--motion-normal` | Default transitions |
| `--motion-slow` | Deliberate transitions |
| `--ease-standard` | Default easing |
| `--ease-decelerate` | Entrance easing |
| `--ease-accelerate` | Exit easing |

### 2.9 Elevation (optional capability)

A token pack MAY supply elevation tokens for systems that use shadow-based depth (Material 3, Fluent, Carbon, etc.). If supplied, the **full** set MUST be supplied. If omitted, implementation packs fall back to border-based depth via §2.3.

| Token | Purpose |
|-------|---------|
| `--elevation-0` | Flush with the surface |
| `--elevation-1` | Subtle raise (cards) |
| `--elevation-2` | Hover / active raise |
| `--elevation-3` | Modal / popover |
| `--elevation-4` | Highest (toasts) |

A token pack that supplies elevation MUST also list `"elevation"` in its `capabilities` array (`pack-format.md` §3.3). Implementation packs declare matching support via their metadata (`pack-format.md` §6.4). Capability negotiation is defined in `spec.md` §4.4.

## 3. DTCG file format

Tokens are stored as DTCG-format JSON. A single token entry:

```json
"surface": {
  "$value": "{color.stone.50}",
  "$type": "color",
  "$description": "Default page background."
}
```

References use `{path.to.token}` syntax. They are resolved at compile time; circular references fail the build (`spec.md` §5.3). The complete token-file example is in `pack-format.md` §4.4.

## 4. Light and dark themes

A token pack MAY supply theme variants. Each variant is a complete semantic-token override:

```
@quoin/tokens-baseline/
└── tokens/
    ├── base.json              Shared base palette
    ├── semantic.light.json    Light theme semantic mapping
    ├── semantic.dark.json     Dark theme semantic mapping
    └── index.json             Entry point declaring themes
```

The compiler emits CSS that switches between themes via `[data-theme]` or `prefers-color-scheme`. The exact mechanism is the implementation pack's choice (see `pack-format.md` §6.4 — `capabilities: ["data-theme"]`).

Themes override the **semantic** layer only. Base palettes are typically shared between themes; component tokens cascade through unchanged.

## 5. Project overrides

A project MAY supply a project-local token file:

```
project-root/
└── quoin.tokens.json
```

Overrides apply to any token — base, semantic, or component. The precedence chain (highest to lowest):

1. `quoin.tokens.json` (project).
2. Active token pack (semantic + base).
3. Active vocabulary pack (component-token defaults).
4. Implementation-pack fallback (tokens outside the canonical namespace only).

A project that overrides `--accent` and `--font-display` rebrands every Quoin primitive that references them, without forking any pack. This is the primary white-label mechanism.

## 6. Validation

A token pack is valid if and only if:

1. It supplies every token in the canonical semantic namespace (§2.1–2.8).
2. If `capabilities` includes `"elevation"`, the full §2.9 set is supplied.
3. All `{path.to.token}` references resolve.
4. All `$value` strings parse against their declared `$type`.
5. No circular references exist in the token graph.

Reference validator: `@quoin/validate-tokens`. Cross-reference: `pack-format.md` §9.

## 7. Cross-references

- Authoring syntax and how primitives reference tokens: `spec.md` §3.2.
- Token pack manifest schema and DTCG file example: `pack-format.md` §4.
- Which primitives reference which tokens: `primitives.md`.
- Capability negotiation between token and implementation packs: `spec.md` §4.4.
