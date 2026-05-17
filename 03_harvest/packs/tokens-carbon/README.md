# @quoin/tokens-carbon

IBM Carbon (white theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Carbon Design System
- **Source organisation:** IBM
- **Source URL:** https://carbondesignsystem.com/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-16
- **Notes:** Carbon ships @carbon/themes (white, g10, g90, g100). This pack mirrors the 'white' theme. Carbon's interactive states (hover, active, focus) are not modelled separately; consumers layer Carbon-style focus rings via project CSS if required.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

Carbon background/layer/text tokens map onto Quoin's surface/text ramp. Carbon $interactive (Blue 60) -> accent. Carbon's support- tokens map to status: support-error -> critical, support-success -> success, support-warning -> warning, support-info -> info.

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
