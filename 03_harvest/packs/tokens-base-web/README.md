# @quoin/tokens-base-web

Uber Base Web palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Base Web
- **Source organisation:** Uber
- **Source URL:** https://raw.githubusercontent.com/uber/baseweb/main/src/themes/light-theme/color-foundation-tokens.ts
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Uber Base Web light theme foundation colour tokens extracted from src/themes/light-theme/color-foundation-tokens.ts. Extraction method: A. Mapping: Base Web ships primary (50-700) + accent + ramps for negative/warning/positive. Heavy monochrome aesthetic — accent is a deep blue. Mapping: primary = primaryA (black), surface = primaryB (white), surface-recessed = primary50, accent = accent (blue), critical = negative, success = positive, warning = warning.

## Mapping

Base Web ships mono100..1000 alongside primary{A,B}, accent, negative, positive, warning. Mapped: mono100 -> surface, mono900 -> text-emphasis, primaryA (black) -> accent, negative -> critical, positive -> success, warning -> warning, accent -> info.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
