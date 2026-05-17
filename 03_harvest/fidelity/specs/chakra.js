/**
 * Chakra UI v3 — packages/theme/src/foundations/colors.ts.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/packages/react/src/styled-system/tokens/colors.ts"
    ],
    format: "ts",
    commit: "main"
  },
  harvestNotes:
    "Chakra UI v3 colour tokens extracted from the styled-system tokens module. Teal accent at step 500 per Chakra default theme.",
  map(values) {
    return {
      base: { chakra: values, white: { 0: "oklch(100% 0 0)" } },
      notes:
        "Chakra v3 colour scales (gray, red, orange, yellow, green, teal, blue, cyan, purple, pink) with 50-950 steps. Default accent = teal.500."
    };
  }
};
