# @quoin/vocab-headless

Headless UI-flavoured primitives — listbox, combobox, menu, disclosure-group, transition frame.

## Primitives

| Primitive | Role |
|-----------|------|
| `<listbox-options>` | Single-select listbox surface with options. |
| `<combobox-input>` | Searchable combo input (text + listbox). |
| `<menu-group>` | Action menu opened from a trigger. |
| `<disclosure-group>` | Group of vertically-stacked disclosures (FAQ accordion). |
| `<transition-frame>` | Wrapper that hosts enter/leave transitions — semantic-only, the implementation pack supplies the actual transition. |

## Attribution

- **Source:** Headless UI
- **Organisation:** Tailwind Labs
- **URL:** https://headlessui.com/
- **License:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Translates Headless UI's componentless-component patterns into Quoin semantic primitives. The implementation pack supplies the styling; Headless UI's behaviour-only abstraction is honoured by emitting plain elements with the right ARIA shape.

## Cross-references

- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) §5.
- Canonical primitives: [`00_spec/primitives.md`](../../../00_spec/primitives.md).
