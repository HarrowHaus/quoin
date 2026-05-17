# @quoin/tokens-atlassian

Atlassian Design System (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Atlassian Design System
- **Source organisation:** Atlassian
- **Source URL:** https://atlassian.design/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-17
- **Notes:** Atlassian Design System light theme extracted from @atlaskit/tokens figma/atlassian-light.json. Hundreds of `Light/color.*` named tokens with hex values; mapping selects the canonical `color.text`, `color.background.accent.blue.bolder`, `color.border`, etc. for Quoin's namespace. Extraction method: B. Algorithm: @atlaskit/tokens@13.0.4, inputs {"theme":"atlassian-light"}. Mapping: Atlassian tokens flattened onto base.atlassian.{name}. Mapping: surface = color.background.neutral, text = color.text, accent = color.background.accent.blue.bolder (Atlassian brand blue), critical = color.background.danger, success = color.background.success, warning = color.background.warning.

## Mapping

Atlassian's color.background.neutral.subtle -> surface, color.background.neutral -> surface-recessed, color.background.accent.blue.bold -> accent. text.color -> text, text.color.subtle -> text-recede. critical/success/warning/info from Atlassian's status- families.

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
