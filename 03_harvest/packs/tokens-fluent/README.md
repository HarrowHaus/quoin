# @quoin/tokens-fluent

Microsoft Fluent 2 (web light) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Fluent 2
- **Source organisation:** Microsoft
- **Source URL:** https://fluent2.microsoft.design/
- **Source license:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Fluent 2 'web' light theme. Built from Fluent's global ramp (gray-0..gray-160 over 16 steps in the Web theme) plus communication-blue accent. Segoe UI is proprietary to Microsoft; referenced by family name only.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

Fluent uses neutralBackground{1-6} for surfaces, neutralForeground{1-4} for text, neutralStroke{1-3} for borders. Translated: neutralBackground1 -> surface-elevated, neutralBackground2 -> surface, neutralBackground3 -> surface-recessed. brandBackground -> accent (communication blue #0078D4 area).

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
