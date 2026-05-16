# @quoin/vocab-dashboard

15 primitives for data-dense interfaces: navigation, state, and
interactive categories from [`00_spec/primitives.md`](../../00_spec/primitives.md).

## Scope

Navigation (5): `<wayfinder>`, `<breadcrumb-trail>`, `<segment-control>`,
`<jump-list>`, `<paginator>`.

State (5): `<active-zone>`, `<pending-block>`, `<resolved-mark>`,
`<alert-band>`, `<empty-state>`.

Interactive (5): `<primary-action>`, `<secondary-action>`,
`<destructive-action>`, `<input-cell>`, `<disclosure>`.

Pair with [`@quoin/vocab-editorial`](../vocab-editorial) for editorial,
layout, and content primitives. Together the two packs implement the
complete v1 vocabulary.

## Target use cases

- Admin consoles, control panels, settings pages.
- Data-heavy tables, lists, and grids.
- Status dashboards and operational tooling.
- Anything where information density matters more than reading rhythm.

## Design decisions

- **Density defaults shift to `dense`.** `<wayfinder>`, `<segment-control>`,
  `<jump-list>`, and `<input-cell>` default to `density="dense"` here,
  versus `normal` in the editorial pack. Override with
  `density="normal"` for sparser layouts.
- **Status colours route through semantic tokens only.** `<alert-band>`
  references `--info` / `--success` / `--warning` / `--critical` from
  the canonical namespace. No hex codes hardcoded in the pack.
- **Aesthetic-neutral.** Same discipline as the editorial pack — no
  fonts, colours, or visual treatments baked into definitions. Density
  defaults are the only real difference between the two packs.
- **ARIA defaults baked in.** `<segment-control>` carries
  `role="tablist"`, `<breadcrumb-trail>` carries `aria-label="breadcrumb"`,
  `<alert-band>` carries `role="alert"`, `<pending-block>` carries
  `role="status"`. The implementation pack preserves these attributes.

## Cross-references

- Spec: [`00_spec/primitives.md`](../../00_spec/primitives.md) — reference role and compiled output per primitive.
- Pack format: [`00_spec/pack-format.md`](../../00_spec/pack-format.md) §5 — vocabulary pack contract.
- Companion pack: [`@quoin/vocab-editorial`](../vocab-editorial) — editorial, layout, content.
