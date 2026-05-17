/**
 * U.S. Web Design System — Method C (per-family SCSS).
 *
 * USWDS ships each colour family as a separate Sass-map under
 * packages/uswds-core/src/styles/tokens/color/. We fetch each
 * family file and extract `step: #hex` pairs.
 */

import { fetchText, cacheCanonical } from "../runner.js";

const BASE =
  "https://raw.githubusercontent.com/uswds/uswds/develop/packages/uswds-core/src/styles/tokens/color/";

const FAMILIES = [
  "blue",
  "gray-cool",
  "gray-warm",
  "red",
  "green",
  "yellow",
  "gold",
  "orange"
];

export default {
  harvestNotes:
    "USWDS palette extracted per-family from uswds/uswds packages/uswds-core/src/styles/tokens/color/_<family>.scss. Each family is a Sass map; we extract `step: #hex` via regex.",
  async algorithm() {
    const out = {};
    for (const family of FAMILIES) {
      const url = `${BASE}_${family}.scss`;
      const text = await fetchText(url);
      if (!text) continue;
      await cacheCanonical(`uswds--${family}`, url, text);
      const re = /(\d{1,3})\s*:\s*(#[0-9a-fA-F]{3,6})/g;
      let m;
      while ((m = re.exec(text)) !== null) {
        out[`${family}.${m[1]}`] = m[2];
      }
    }
    return {
      rawValues: out,
      library: "uswds/uswds",
      version: "develop",
      inputs: { families: FAMILIES }
    };
  },
  map(values) {
    const pick = (family) => {
      const out = {};
      const prefix = `${family}.`;
      for (const [k, v] of Object.entries(values)) {
        if (k.startsWith(prefix)) out[k.slice(prefix.length)] = v;
      }
      return out;
    };
    return {
      base: {
        blue: pick("blue"),
        "gray-cool": pick("gray-cool"),
        "gray-warm": pick("gray-warm"),
        red: pick("red"),
        green: pick("green"),
        yellow: pick("yellow"),
        gold: pick("gold"),
        orange: pick("orange"),
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "USWDS uses semantic step values (5/10/20/30/40/50/60/70/80/90) and includes 'vivid' variants. Federal blue family is the canonical accent (blue.50). Cool gray is the default neutral ramp."
    };
  }
};
