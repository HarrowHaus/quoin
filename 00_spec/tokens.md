# Token Architecture

**Version:** 0.1 (draft)

Quoin uses a three-layer token model conforming to **Tailwind v4** conventions and the **W3C Design Tokens Community Group (DTCG)** file format. The canonical semantic token namespace defined here is the contract that makes any Quoin token pack interoperable with any vocabulary pack.

## 1. Layers

### 1.1 Base tokens

Raw values. Provided by token packs. No semantic meaning attached — they are the palette.

Naming convention: `--{category}-{name}-{scale}`

Examples:
```css
--color-stone-50: oklch(98% 0 0);
--color-stone-500: oklch(50% 0 0);
--color-stone-900: oklch(15% 0 0);

--space-1: 0.25rem;
--space-4: 1rem;
--space-16: 4rem;

--type-size-sm: 0.875rem;
--type-size-lg: 1.125rem;
--type-size-display: 4.5rem;
```

### 1.2 Semantic tokens

Purpose-bound references to base tokens. **This layer is the canonical interoperability contract.** Every token pack MUST implement every semantic token name in the canonical namespace below.

Naming convention: `--{purpose}` or `--{purpose}-{variant}`

Examples:
```css
--surface: var(--color-stone-50);
--text: var(--color-stone-700);
--text-emphasis: var(--color-stone-900);
--accent: var(--color-stone-900);
```

### 1.3 Component tokens

Vocabulary-specific tokens. Typically supplied by vocabulary packs as defaults that reference semantic tokens. A project may override component tokens without forking the vocabulary pack.

Naming convention: `--{primitive}-{property}`

Examples:
```css
--authority-mark-size: var(--type-size-display);
--primary-action-bg: var(--accent);
--emphasis-card-radius: var(--radius-card);
```

## 2. Canonical semantic token namespace

Every Quoin token pack MUST provide values for every token in this namespace. A pack that omits any required token fails validation.

### 2.1 Surface

| Token | Purpose |
|-------|---------|
| `--surface` | Default page or container background |
| `--surface-elevated` | Raised surfaces (cards, panels, modals) |
| `--surface-recessed` | Sunken surfaces (insets, code blocks, aside backgrounds) |
| `--surface-inverse` | Inverted background (dark on light themes, vice versa) |

### 2.2 Text

| Token | Purpose |
|-------|---------|
| `--text` | Default body text |
| `--text-emphasis` | Headlines, primary emphasis |
| `--text-recede` | De-emphasized text (metadata, captions, secondary info) |
| `--text-disabled` | Inactive or unavailable text |
| `--text-on-accent` | Text rendered over accent backgrounds |
| `--text-on-critical` | Text rendered over critical backgrounds |
| `--text-on-success` | Text rendered over success backgrounds |
| `--text-on-warning` | Text rendered over warning backgrounds |
| `--text-on-info` | Text rendered over info backgrounds |

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
| `--type-size-xs` through `--type-size-display` | Size scale (8 steps) |
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
| `--space-0` through `--space-32` | Step scale |
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

### 2.9 Elevation (optional)

A token pack MAY supply elevation tokens (`--elevation-0` through `--elevation-4`) for systems that use shadow-based depth (Material 3, etc.). If supplied, they MUST be supplied as a complete set. If omitted, the implementation pack uses border-based depth via the border tokens.

## 3. DTCG file format

Tokens are stored as DTCG-format JSON. The exact format is specified in `pack-format.md`. A single token entry looks like:

```json
"surface": {
  "$value": "{color.stone.50}",
  "$type": "color",
  "$description": "Default page background."
}
```

References use `{path.to.token}` syntax, resolved at compile time.

## 4. Light and dark themes

A token pack MAY supply theme variants. Each variant is a complete semantic-token override:

```
@quoin/tokens-baseline/
├── tokens/
│   ├── base.json           Shared base palette
│   ├── semantic.light.json Light theme semantic mapping
│   ├── semantic.dark.json  Dark theme semantic mapping
│   └── index.json          Entry point declaring themes
```

The compiler emits CSS that switches between themes via the `[data-theme]` attribute or `prefers-color-scheme` media query. Implementation packs control the exact mechanism.

## 5. Project overrides

A project MAY supply a project-local token file that overrides specific tokens from the active pack:

```
project-root/
└── quoin.tokens.json
```

Overrides apply to any token, base or semantic. A project override of `--accent` is the primary mechanism for branding without forking a token pack.

## 6. Validation

A token pack is valid if and only if:
1. It supplies every token in the canonical semantic namespace (section 2).
2. All token references resolve.
3. All `$value` strings parse against their declared `$type`.
4. No circular references exist.

A reference validator is provided as `@quoin/validate-tokens`.

## 7. Cross-references

- Authoring syntax and how primitives reference tokens: `spec.md` (section 3.2)
- Token pack manifest schema: `pack-format.md` (section 4)
- Which primitives reference which tokens: `primitives.md`
