/**
 * GOV.UK Design System — Method A (SCSS map).
 *
 * The GOV.UK palette is a Sass map under
 * settings/_colours-palette--internal.scss. The SCSS variable parser
 * doesn't naturally walk Sass-map syntax; we extract via a single
 * regex pass for `"name": #hex` pairs.
 */

import { fetchText, cacheCanonical } from "../runner.js";

const URL =
  "https://raw.githubusercontent.com/alphagov/govuk-frontend/main/packages/govuk-frontend/src/govuk/settings/_colours-palette--internal.scss";

export default {
  harvestNotes:
    "GOV.UK $govuk-palette extracted from settings/_colours-palette--internal.scss. Deliberately stripped palette — blue/green/red/yellow with primary + tint/shade variants.",
  async algorithm() {
    const text = await fetchText(URL);
    if (!text) throw new Error("fetch-failed");
    await cacheCanonical("govuk", URL, text);
    const out = {};
    // Match family blocks: `"blue": ( ... ),`
    const familyRe = /"([a-z-]+)":\s*\(([^)]+)\)/g;
    let m;
    while ((m = familyRe.exec(text)) !== null) {
      const family = m[1];
      const body = m[2];
      // Match `"variant": #hex,` inside body
      const pairRe = /"([a-z0-9-]+)":\s*(#[0-9a-fA-F]{3,6})/g;
      let p;
      while ((p = pairRe.exec(body)) !== null) {
        out[`${family}.${p[1]}`] = p[2];
      }
    }
    return {
      rawValues: out,
      library: "alphagov/govuk-frontend",
      version: "main",
      inputs: { path: "settings/_colours-palette--internal.scss" }
    };
  },
  map(values) {
    const pick = (family) => {
      const out = {};
      for (const [k, v] of Object.entries(values)) {
        const prefix = `${family}.`;
        if (k.startsWith(prefix)) out[k.slice(prefix.length)] = v;
      }
      return out;
    };
    return {
      base: {
        blue: pick("blue"),
        green: pick("green"),
        red: pick("red"),
        yellow: pick("yellow"),
        orange: pick("orange"),
        pink: pick("pink"),
        grey: pick("grey"),
        white: { 0: "oklch(100% 0 0)" },
        black: { 0: "oklch(0% 0 0)" }
      },
      notes:
        "GOV.UK palette uses semantic variant names (primary, tint-25, tint-50, tint-80, shade-25, shade-50). Accent = blue.primary (#1d70b8), critical = red.primary, success = green.primary."
    };
  }
};
