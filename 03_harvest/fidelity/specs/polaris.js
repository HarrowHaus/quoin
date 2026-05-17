/**
 * Shopify Polaris — Method B (algorithm/library execution).
 *
 * Polaris ships a programmatic palette generator; the canonical
 * static values are exposed by @shopify/polaris-tokens via
 * themeDefault.color.
 */

import { themeDefault } from "@shopify/polaris-tokens";

export default {
  harvestNotes:
    "Polaris default theme colours read from @shopify/polaris-tokens themeDefault.color. The library is Shopify's canonical static export of its programmatic palette.",
  async algorithm() {
    const out = {};
    for (const [k, entry] of Object.entries(themeDefault.color ?? {})) {
      const value = typeof entry === "object" ? entry.value : entry;
      if (typeof value === "string") out[k] = value;
    }
    return {
      rawValues: out,
      library: "@shopify/polaris-tokens",
      version: "9.4.2",
      inputs: { theme: "default" }
    };
  },
  map(values) {
    return {
      base: { polaris: values, white: { 0: "oklch(100% 0 0)" } },
      notes:
        "Polaris ships ~226 named colour tokens (color-bg, color-text, color-icon, color-border, etc.). Mapping uses Polaris names directly: surface = color-bg-surface, text = color-text, accent = color-bg-fill-brand, critical = color-bg-fill-critical, success = color-bg-fill-success, warning = color-bg-fill-warning, info = color-bg-fill-info."
    };
  }
};
