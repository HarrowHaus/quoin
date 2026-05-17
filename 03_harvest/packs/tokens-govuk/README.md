# @quoin/tokens-govuk

GOV.UK Design System palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** GOV.UK Design System
- **Source organisation:** UK Government Digital Service
- **Source URL:** https://design-system.service.gov.uk/
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** GOV.UK $govuk-palette extracted from settings/_colours-palette--internal.scss. Deliberately stripped palette — blue/green/red/yellow with primary + tint/shade variants. Extraction method: B. Algorithm: alphagov/govuk-frontend@main, inputs {"path":"settings/_colours-palette--internal.scss"}. Mapping: GOV.UK palette uses semantic variant names (primary, tint-25, tint-50, tint-80, shade-25, shade-50). Accent = blue.primary (#1d70b8), critical = red.primary, success = green.primary.

## Mapping

GOV.UK is mostly black/white/blue — a deliberately stripped-down palette. Status colours map cleanly: govuk-red -> critical, govuk-green -> success, govuk-yellow -> warning, govuk-blue -> info (reusing the brand blue). No accent-recede in source; derived from govuk-light-blue.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
