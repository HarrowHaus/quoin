# @quoin/tokens-bootstrap

Bootstrap 5 default palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Bootstrap
- **Source organisation:** Bootstrap community / Twitter origin
- **Source URL:** https://getbootstrap.com/
- **Source license:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Bootstrap 5 default theme colours. Bootstrap's $primary (#0d6efd), $danger, $success, $warning, $info map directly onto Quoin's accent + status. $light/$dark for surface/inverse.

## Mapping

Bootstrap variables $body-bg -> surface, $body-color -> text, $primary -> accent, $danger/$success/$warning/$info -> respective status tokens. $gray-100..900 powers the neutral ramp.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
