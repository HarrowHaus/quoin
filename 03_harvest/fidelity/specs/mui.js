/**
 * Material UI (MUI) v5 — Method C (per-file structured extraction).
 *
 * MUI ships each colour family as a separate `packages/mui-material/
 * src/colors/<name>.js` module. Each module is a flat hex object
 * sharing step keys (50, 100, ..., 900, A100..A700). Concatenating
 * the files defeats step-key uniqueness; we fetch each file
 * separately and namespace by family.
 */

const BASE = "https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/colors/";

export default {
  fetch: { commit: "master" },
  harvestNotes:
    "Per-file extraction from mui/material-ui packages/mui-material/src/colors/. Each colour family (grey, indigo, red, green, amber, blue) parsed independently and namespaced by family.",
  files: [
    { name: "grey", namespace: "grey", url: `${BASE}grey.js`, format: "js" },
    { name: "indigo", namespace: "indigo", url: `${BASE}indigo.js`, format: "js" },
    { name: "red", namespace: "red", url: `${BASE}red.js`, format: "js" },
    { name: "green", namespace: "green", url: `${BASE}green.js`, format: "js" },
    { name: "amber", namespace: "amber", url: `${BASE}amber.js`, format: "js" },
    { name: "blue", namespace: "blue", url: `${BASE}blue.js`, format: "js" }
  ],
  map(values) {
    const pick = (family) => {
      const out = {};
      for (const [k, v] of Object.entries(values)) {
        // After the parser update, keys are `family.family.step` because
        // we use the namespace AND the export-const wrapper. Strip both.
        const re = new RegExp(`(?:^|\\.)${family}\\.(\\d+|A\\d+)$`);
        const m = k.match(re);
        if (m) out[m[1]] = v;
      }
      return out;
    };
    const grey = pick("grey");
    return {
      base: {
        grey,
        // Alias `gray` → `grey` so existing semantic refs `{gray.X}`
        // (American spelling) keep resolving without changing the
        // sources/mui.json semantic block.
        gray: grey,
        indigo: pick("indigo"),
        red: pick("red"),
        green: pick("green"),
        amber: pick("amber"),
        blue: pick("blue"),
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "MUI ships Material Design v1/v2-style 50-900 + A100-A700 ramps per colour. Default light theme: surface = grey.50, text = grey.900, accent = indigo.500, critical = red.500, success = green.500, warning = amber.500, info = blue.500."
    };
  }
};
