# @quoin/tokens-clarity

VMware Clarity palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Clarity Design System
- **Source organisation:** VMware
- **Source URL:** https://github.com/vmware-clarity/core
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Clarity v6 light theme. Clarity's 'action blue' (#0072A3 area) is the brand accent. Heavy-blue, enterprise-IT aesthetic — gradients of teal/cobalt across the chrome.

Phase 3.5b fidelity status: Tier C. Clarity tokens are auto-generated at build time by an internal pipeline; the published source tree does not include the static token file the build emits. The npm package @clr/core MIT does not expose tokens as JS exports either. Designed-approximation values stand pending VMware publishing the canonical token output.

## Mapping

Clarity color-base-100..900 maps directly to Quoin surface/text ramp. action-blue-600 -> accent. Status colours: danger (red), success (green), warning (orange), info (action blue).

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
