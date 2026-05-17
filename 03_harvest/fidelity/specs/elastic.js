/**
 * Elastic EUI — Method A (SCSS).
 */
export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/elastic/eui/main/packages/eui-theme-borealis/src/variables/colors/_semantic_colors.scss"
    ],
    format: "scss",
    commit: "main"
  },
  harvestNotes:
    "Elastic EUI Borealis light theme extracted from packages/eui-theme-borealis/src/variables/colors/_colors_light.scss.",
  map(values) {
    return {
      base: {
        eui: values,
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "EUI's $euiColor* family flattened onto base.eui.{name}. Semantic mapping reads euiColorEmptyShade → surface, euiColorFullShade → surface-inverse, euiColorPrimary → accent, euiColorDanger → critical, euiColorSuccess → success, euiColorWarning → warning, euiColorAccent → info."
    };
  }
};
