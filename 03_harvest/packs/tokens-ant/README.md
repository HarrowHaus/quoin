# @quoin/tokens-ant

Ant Design (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Ant Design
- **Source organisation:** Ant Group
- **Source URL:** https://ant.design/
- **Source license:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Ant Design v5 default 'light' theme. Ant's daybreak-blue (#1677FF area) drives accent. Ant uses a 10-step palette per color (X-1..X-10) with X-6 as the standard step.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

Ant Design's neutral palette uses grey-1..grey-13. grey-1 -> surface (white), grey-2 -> surface-recessed, grey-13 -> text-emphasis. blue-6 -> accent. Status: red-6 (critical), green-6 (success), gold-6 (warning), cyan-6 (info).

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
