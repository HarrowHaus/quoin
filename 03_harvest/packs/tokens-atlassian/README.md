# @quoin/tokens-atlassian

Atlassian Design System (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Atlassian Design System
- **Source organisation:** Atlassian
- **Source URL:** https://atlassian.design/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-16
- **Notes:** Atlassian's design tokens 'light' theme. Atlassian publishes JSON token files under @atlaskit/tokens; this pack translates the color.background/text/border/accent families onto Quoin's canonical namespace. Charlie Sans (Atlassian's typeface) is proprietary; referenced by family name only.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

Atlassian's color.background.neutral.subtle -> surface, color.background.neutral -> surface-recessed, color.background.accent.blue.bold -> accent. text.color -> text, text.color.subtle -> text-recede. critical/success/warning/info from Atlassian's status- families.

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
