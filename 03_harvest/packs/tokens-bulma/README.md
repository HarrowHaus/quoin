# @quoin/tokens-bulma

Bulma CSS framework default palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Bulma
- **Source organisation:** Jeremy Thomas / Bulma community
- **Source URL:** https://raw.githubusercontent.com/jgthms/bulma/main/sass/utilities/initial-variables.scss
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Bulma initial-variables.scss extracted byte-faithfully. Turquoise primary + greyscale ramp. Hex source converted to OKLCH via culori. Extraction method: A. Mapping: Bulma's neutral ramp uses semantic stops (lighter/light/grey/dark/darker) rather than numeric. Status colours map: critical = red, success = green, warning = yellow, info = cyan; accent = turquoise.

## Mapping

Bulma's $background -> surface, $text -> text, $primary -> accent (turquoise), $danger/$success/$warning/$info -> respective. Bulma's $border -> border, $border-light -> border-recede.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
