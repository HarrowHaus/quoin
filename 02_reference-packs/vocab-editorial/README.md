# @quoin/vocab-editorial

21 primitives optimised for long-form reading: editorial, layout, and
content categories from [`00_spec/primitives.md`](../../00_spec/primitives.md).

## Scope

Editorial (8): `<authority-mark>`, `<recede-block>`, `<emphasis-card>`,
`<reading-flow>`, `<aside-note>`, `<lead-graf>`, `<colophon>`,
`<pull-quote>`.

Layout (7): `<stack>`, `<cluster>`, `<frame>`, `<density-grid>`,
`<panel>`, `<rail>`, `<canvas-block>`.

Content (6): `<media-frame>`, `<figure-cite>`, `<data-table>`,
`<key-value-list>`, `<timeline-stack>`, `<code-block>`.

Pair with [`@quoin/vocab-dashboard`](../vocab-dashboard) for navigation,
state, and interactive primitives. Together the two packs implement the
complete v1 vocabulary.

## Target use cases

- Essays, articles, blog posts, journals.
- Technical documentation and reference material.
- Long-form marketing pages, manifestos, about pages.
- Anything where reading is the primary affordance and visual rhythm
  matters more than dashboard density.

## Design decisions

- **Reading defaults.** `<reading-flow>` constrains line length to
  `--measure-prose` (~65ch) by default, with `--leading-prose` (1.6).
  Override `register="technical"` for code-heavy docs that need a wider
  measure.
- **Editorial naming.** Primitives borrow vocabulary from typesetting
  tradition — `<colophon>`, `<lead-graf>`, `<pull-quote>`,
  `<aside-note>` — to keep authoring grounded in the language of
  editorial design.
- **Aesthetic-neutral.** No primitive bakes in a specific font, colour,
  or visual treatment. Every visual decision routes through the
  semantic-token contract in [`00_spec/tokens.md`](../../00_spec/tokens.md).
- **Composable.** Editorial primitives can be nested into dashboard
  layouts and vice versa. Cascade rules in [`00_spec/spec.md` §3](../../00_spec/spec.md) make canonical
  attributes flow naturally between them.

## Cross-references

- Spec: [`00_spec/primitives.md`](../../00_spec/primitives.md) — reference role and compiled output per primitive.
- Pack format: [`00_spec/pack-format.md`](../../00_spec/pack-format.md) §5 — vocabulary pack contract.
- Companion pack: [`@quoin/vocab-dashboard`](../vocab-dashboard) — navigation, state, interactive.
