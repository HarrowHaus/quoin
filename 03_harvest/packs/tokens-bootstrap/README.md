# @quoin/tokens-bootstrap

Bootstrap 5 default palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Bootstrap
- **Source organisation:** Bootstrap community / Twitter origin
- **Source URL:** https://raw.githubusercontent.com/twbs/bootstrap/main/scss/_variables.scss
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Bootstrap 5 default palette extracted from scss/_variables.scss. Greyscale ($gray-100 … $gray-900) + theme colours ($primary, $danger, $success, $warning, $info). Hex source converted to OKLCH at extraction.

Extraction notes: Bootstrap's $primary/$danger/$success/$warning/$info aliases resolve at compile time to $blue/$red/$green/$yellow/$cyan; we read those directly. The tint-color($blue, 80%) pre-computation Bootstrap uses for soft accent variants is not evaluated by this pipeline — we substitute an OKLCH approximation of that lightness/chroma.

## Mapping

Bootstrap variables $body-bg -> surface, $body-color -> text, $primary -> accent, $danger/$success/$warning/$info -> respective status tokens. $gray-100..900 powers the neutral ramp.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
