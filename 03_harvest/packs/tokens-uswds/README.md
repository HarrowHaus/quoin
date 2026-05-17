# @quoin/tokens-uswds

United States Web Design System tokens translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** U.S. Web Design System
- **Source organisation:** U.S. General Services Administration
- **Source URL:** https://designsystem.digital.gov/
- **Source license:** CC0-1.0
- **Harvested:** 2026-05-17
- **Notes:** USWDS palette extracted per-family from uswds/uswds packages/uswds-core/src/styles/tokens/color/_<family>.scss. Each family is a Sass map; we extract `step: #hex` via regex. Extraction method: B. Algorithm: uswds/uswds@develop, inputs {"families":["blue","gray-cool","gray-warm","red","green","yellow","gold","orange"]}. Mapping: USWDS uses semantic step values (5/10/20/30/40/50/60/70/80/90) and includes 'vivid' variants. Federal blue family is the canonical accent (blue.50). Cool gray is the default neutral ramp.

## Mapping

USWDS uses Sass tokens like $color-base, $color-primary, $color-accent-cool, $color-error. Map: $color-base -> text, $color-primary -> accent, $color-error/-warning/-success/-info -> respective. USWDS's neutral 'gray cool' scale provides surface/border ramp.

## License

This pack is published under **CC0-1.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
