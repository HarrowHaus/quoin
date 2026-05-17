/**
 * Twilio Paste — Method A (YAML).
 */
export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/twilio-labs/paste/main/packages/paste-design-tokens/tokens/aliases/color-palette.yml"
    ],
    format: "yaml",
    commit: "main"
  },
  harvestNotes:
    "Twilio Paste palette extracted from packages/paste-design-tokens/tokens/aliases/color-palette.yml. Named `palette-{family}-{step}` aliases.",
  map(values) {
    // Keys look like `aliases.palette-blue-50` etc. Extract family/step.
    const pick = (family) => {
      const out = {};
      for (const [k, v] of Object.entries(values)) {
        const m = k.match(new RegExp(`aliases\\.palette-${family}-(\\d+)$`));
        if (m) out[m[1]] = v;
      }
      return out;
    };
    return {
      base: {
        gray: pick("gray"),
        blue: pick("blue"),
        red: pick("red"),
        green: pick("green"),
        orange: pick("orange"),
        yellow: pick("yellow"),
        purple: pick("purple"),
        cyan: pick("cyan"),
        pink: pick("pink"),
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "Paste 12-step ramps for gray/blue/red/green/orange/yellow/purple/cyan/pink. Default accent = blue.60 (Twilio brand)."
    };
  }
};
