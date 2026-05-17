/**
 * Microsoft Fluent 2 — Method A (static TS export).
 */
export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/colors.ts"
    ],
    format: "ts",
    commit: "master"
  },
  harvestNotes:
    "Fluent 2 colour tokens extracted from microsoft/fluentui packages/tokens/src/global/colors.ts. Each colour family ships as a `Record<step, '#hex'>` TS export.",
  map(values) {
    const lift = (name) => {
      const out = {};
      for (const [k, v] of Object.entries(values)) {
        const prefix = `${name}.`;
        if (k.startsWith(prefix)) out[k.slice(prefix.length)] = v;
      }
      return out;
    };
    return {
      base: {
        grey: lift("grey"),
        blue: lift("blue"),
        red: lift("red"),
        green: lift("green"),
        yellow: lift("yellow"),
        orange: lift("orange"),
        communicationBlue: lift("communicationBlue"),
        white: { 0: "oklch(100% 0 0)" },
        black: { 0: "oklch(0% 0 0)" }
      },
      notes:
        "Fluent ships grey at 2/4/6...100 (52 steps), plus colour ramps and a communicationBlue accent (Fluent's brand). Default text = grey.14, surface = white, accent = communicationBlue.primary."
    };
  }
};
