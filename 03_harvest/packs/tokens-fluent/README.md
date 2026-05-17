# @quoin/tokens-fluent

Microsoft Fluent 2 (web light) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Fluent 2
- **Source organisation:** Microsoft
- **Source URL:** https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/colors.ts
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Fluent 2 colour tokens extracted from microsoft/fluentui packages/tokens/src/global/colors.ts. Each colour family ships as a `Record<step, '#hex'>` TS export. Extraction method: A. Mapping: Fluent ships grey at 2/4/6...100 (52 steps), plus colour ramps and a communicationBlue accent (Fluent's brand). Default text = grey.14, surface = white, accent = communicationBlue.primary.

## Mapping

Fluent uses neutralBackground{1-6} for surfaces, neutralForeground{1-4} for text, neutralStroke{1-3} for borders. Translated: neutralBackground1 -> surface-elevated, neutralBackground2 -> surface, neutralBackground3 -> surface-recessed. brandBackground -> accent (communication blue #0078D4 area).

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
