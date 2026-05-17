/**
 * Salesforce Lightning Design System — Method A (YAML).
 */
export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/salesforce-ux/design-system/main/design-tokens/aliases/color-palettes.yml"
    ],
    format: "yaml",
    commit: "main"
  },
  harvestNotes:
    "Salesforce SLDS palette extracted from salesforce-ux/design-system design-tokens/aliases/color-palettes.yml.",
  map(values) {
    const pick = (family) => {
      const out = {};
      const upper = family.toUpperCase();
      for (const [k, v] of Object.entries(values)) {
        // Keys arrive as `aliases.PALETTE_COOL_GRAY_3` etc.
        const re = new RegExp(`aliases\\.PALETTE_${upper}_(\\d+)$`);
        const m = k.match(re);
        if (m) out[m[1]] = v;
      }
      return out;
    };
    return {
      base: {
        coolGray: pick("COOL_GRAY"),
        warmGray: pick("WARM_GRAY"),
        blue: pick("BLUE"),
        green: pick("GREEN"),
        red: pick("RED"),
        orange: pick("ORANGE"),
        yellow: pick("YELLOW"),
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "SLDS cool-gray + warm-gray + blue/green/red/orange/yellow ramps (steps 1-13). Default accent = BLUE_4 (Salesforce brand)."
    };
  }
};
