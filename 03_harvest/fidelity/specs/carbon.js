/**
 * IBM Carbon — themes/src/white.js (the canonical light theme).
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/themes/src/white.js"
    ],
    format: "js",
    commit: "main"
  },
  harvestNotes:
    "Carbon white theme extracted from packages/themes/src/white.js. Hex source converted to OKLCH. Carbon's interactive state tokens (hover/active/focus/visited) and elevation aren't modelled here — Quoin's primitives handle interaction at the impl layer.",
  map(values) {
    return {
      base: { carbon: values, white: { 0: "oklch(100% 0 0)" } },
      notes:
        "Carbon ships hundreds of tokens; we keep only the colour-shaped ones under base.carbon.{name}. Semantic refs select Carbon's `background`, `text-primary`, `interactive`, `support-error/success/warning/info` per the existing mapping."
    };
  }
};
