/**
 * GitHub Primer — primitives/data/colors/light.json (DTCG-ish).
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/primer/primitives/main/src/tokens/base/color/light/light.json5"
    ],
    format: "js",
    commit: "main"
  },
  harvestNotes:
    "Primer light theme extracted from primer/primitives. Functional colour tokens map onto Quoin's surface/text/border/accent/status namespace.",
  map(values) {
    return {
      base: { primer: values, white: { 0: "oklch(100% 0 0)" } },
      notes:
        "Primer's functional namespace (canvas, fg, accent, danger, success, attention, severe, done, sponsors) flattened onto Quoin: canvas.default → surface, fg.default → text, accent.emphasis → accent, danger.emphasis → critical, attention.emphasis → warning, success.emphasis → success."
    };
  }
};
