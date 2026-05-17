/**
 * Ant Design v5 — packages/style/src/color/presetColors.ts.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/ant-design/ant-design-colors/main/src/index.ts"
    ],
    format: "ts",
    commit: "main"
  },
  harvestNotes:
    "Ant Design v5 preset colours. The daybreak-blue scale (steps 1-10) is the canonical accent ramp. Status hues map to dust-red, sunrise-orange, daybreak-blue.",
  map(values) {
    return {
      base: { ant: values, white: { 0: "oklch(100% 0 0)" } },
      notes:
        "Ant's @{name}-{1..10} scale captured flat. Mapping selects step 6 for the canonical 'solid' versions per Ant's own convention."
    };
  }
};
