# @quoin/vocab-forms

Form primitives — field, label, help text, error, select, checkbox, radio, textarea, fieldset, submit row.

## Primitives

| Primitive | Role |
|-----------|------|
| `<form-field>` | Wrapper for a single form input with its label, control, help text, and error. |
| `<field-label>` | Label text for a form control. Usually short. |
| `<field-help>` | Helper text below a form control. |
| `<field-error>` | Error message below a form control. |
| `<select-cell>` | Select dropdown. |
| `<checkbox-cell>` | Boolean checkbox input. |
| `<radio-cell>` | Radio button (mutually exclusive with siblings sharing name). |
| `<textarea-cell>` | Multi-line text input. |
| `<fieldset-group>` | Grouped fields with a legend. |
| `<submit-row>` | Action row at the bottom of a form — primary submit, cancel, etc. |

## Attribution

- **Source:** Quoin original — distilled from form patterns across shadcn/ui, Headless UI, Radix UI, and WCAG-conformant form examples.
- **License:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Extends the v1 input-cell primitive with the surrounding form scaffolding most apps need.

## Cross-references

- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) §5.
- Canonical primitives: [`00_spec/primitives.md`](../../../00_spec/primitives.md).
