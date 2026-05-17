# @quoin/tokens-govuk

GOV.UK Design System palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** GOV.UK Design System
- **Source organisation:** UK Government Digital Service
- **Source URL:** https://design-system.service.gov.uk/
- **Source license:** MIT
- **Harvested:** 2026-05-16
- **Notes:** GOV.UK ships govuk-frontend under MIT. Colour palette: govuk-blue (#1d70b8) primary, govuk-black text on govuk-light-grey surface. GDS Transport typeface is proprietary to GDS; referenced by family name only with a system fallback.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

GOV.UK is mostly black/white/blue — a deliberately stripped-down palette. Status colours map cleanly: govuk-red -> critical, govuk-green -> success, govuk-yellow -> warning, govuk-blue -> info (reusing the brand blue). No accent-recede in source; derived from govuk-light-blue.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
