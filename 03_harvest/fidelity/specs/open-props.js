/**
 * Open Props — Adam Argyle's design tokens. CSS file ships native
 * OKLCH values for the gray ramp + named colours.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/argyleink/open-props/main/src/props.colors.css"
    ],
    format: "css-vars",
    commit: "main"
  },
  harvestNotes:
    "Open Props props.colors.css extracted byte-faithfully. The gray-N ramp + named colour scales (red, orange, green, blue) preserved verbatim. Hex inputs converted to OKLCH via culori at extraction time.",
  map(values) {
    const gray = pickRamp(values, "gray-", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]);
    const red = pickRamp(values, "red-", ["0", "1", "2", "6", "7", "8", "9"]);
    const orange = pickRamp(values, "orange-", ["0", "1", "2", "6", "7", "8", "9"]);
    const green = pickRamp(values, "green-", ["0", "1", "2", "6", "7", "8", "9"]);
    const blue = pickRamp(values, "blue-", ["0", "1", "2", "6", "7", "8", "9"]);
    const yellow = pickRamp(values, "yellow-", ["5", "6", "7"]);
    return {
      base: {
        gray,
        red,
        orange,
        green,
        blue,
        yellow,
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "Status hues mapped: critical = red-7, success = green-7, warning = orange-7 (matches Open Props' own usage in props.shadows.css), info = blue-7. Hex source → OKLCH at extraction."
    };
  }
};

function pickRamp(values, prefix, steps) {
  const out = {};
  for (const step of steps) {
    const v = values[`${prefix}${step}`];
    if (v) out[step] = v;
  }
  return out;
}
