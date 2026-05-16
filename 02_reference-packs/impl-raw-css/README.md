# @quoin/impl-raw-css

Raw CSS implementation pack for Quoin. Emits HTML elements with inline
`style` attributes referencing the canonical semantic-token CSS custom
properties. Zero framework dependency.

## Why it exists

Quoin is not Tailwind-bound. The Tailwind impl pack is convenient when
you're already inside a Tailwind project, but it is one option among
several. `impl-raw-css` is the other end of the spectrum — it proves
the same Quoin source can compile to vanilla HTML + inline styles with
nothing but a `<link>` to the token pack's stylesheet, and renders
correctly in any browser.

```
<primary-action>Save</primary-action>

  ↓ @quoin/impl-tailwind

<button class="px-4 py-2 font-medium bg-[var(--accent)] text-[var(--text-on-accent)] rounded-[var(--radius-md)]">
  Save
</button>

  ↓ @quoin/impl-raw-css

<button type="button" style="padding-left: var(--space-4); padding-right: var(--space-4); padding-top: var(--space-2); padding-bottom: var(--space-2); font-weight: 500; background: var(--accent); color: var(--text-on-accent); border-radius: var(--radius-md); border: none; cursor: pointer">
  Save
</button>
```

Both outputs render identically in a browser when paired with the same
token pack's stylesheet — the only runtime difference is whether
Tailwind's class-to-CSS table participates.

## Use

```html
<link rel="stylesheet" href="/node_modules/@quoin/tokens-baseline/tokens.css">
```

That's it. The emitter handles everything else inline.

## Trade-offs vs `@quoin/impl-tailwind`

| | impl-tailwind | impl-raw-css |
|---|---|---|
| Bundle size | Smaller HTML, separate Tailwind CSS bundle | Larger HTML, no separate CSS |
| Toolchain | Requires Tailwind v4 build | Pure HTML/CSS, no build needed |
| Customisation | Override via Tailwind config + CSS vars | Override via CSS vars only |
| Hover/focus states | Trivial (Tailwind utilities) | Requires user CSS overrides |
| Production scale | Standard | Best for static sites, email, no-JS targets |

For interactive states (`:hover`, `:focus`, etc.) this pack relies on
user-supplied CSS — inline `style` cannot express pseudo-classes. A
small companion stylesheet of `quoin-button:hover { … }` selectors is
the expected complement; future versions of the pack may ship one.

## Coverage

All 36 v1 primitives across editorial, layout, navigation, state,
content, and interactive categories.

## Cross-references

- Spec: [`00_spec/spec.md`](../../00_spec/spec.md) — language reference.
- Pack format: [`00_spec/pack-format.md`](../../00_spec/pack-format.md) §6 — implementation pack contract.
- Companion pack: [`@quoin/impl-tailwind`](../impl-tailwind) — Tailwind v4 emitter.
