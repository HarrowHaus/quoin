/**
 * Segment Evergreen — src/themes/default-theme/colors.js.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/segmentio/evergreen/master/src/themes/default/tokens/colors.js"
    ],
    format: "js",
    commit: "master"
  },
  harvestNotes:
    "Segment Evergreen default theme colours. The library is in maintenance mode; values are stable.",
  map(values) {
    return {
      base: { evergreen: values, white: { 0: "oklch(100% 0 0)" } },
      notes:
        "Evergreen ships scale + intent objects (gray, blue, red, orange, green, etc.) with explicit step keys."
    };
  }
};
