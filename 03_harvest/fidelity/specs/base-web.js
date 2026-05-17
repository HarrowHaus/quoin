/**
 * Uber Base Web — Method A (TS).
 */
export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/uber/baseweb/main/src/themes/light-theme/color-foundation-tokens.ts"
    ],
    format: "ts",
    commit: "main"
  },
  harvestNotes:
    "Uber Base Web light theme foundation colour tokens extracted from src/themes/light-theme/color-foundation-tokens.ts.",
  map(values) {
    return {
      base: {
        baseWeb: values,
        white: { 0: "oklch(100% 0 0)" },
        black: { 0: "oklch(0% 0 0)" }
      },
      notes:
        "Base Web ships primary (50-700) + accent + ramps for negative/warning/positive. Heavy monochrome aesthetic — accent is a deep blue. Mapping: primary = primaryA (black), surface = primaryB (white), surface-recessed = primary50, accent = accent (blue), critical = negative, success = positive, warning = warning."
    };
  }
};
