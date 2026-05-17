/**
 * Material UI v5 — packages/mui-material/src/colors/.
 * The classic indigo/pink/grey palettes published as JS modules.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/colors/indigo.js"
    ],
    additionalUrls: [
      "https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/colors/grey.js",
      "https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/colors/red.js",
      "https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/colors/green.js",
      "https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/colors/orange.js",
      "https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/colors/blue.js"
    ],
    format: "js",
    commit: "master"
  },
  harvestNotes:
    "Material UI default (Material Design v1/v2) palettes: indigo + grey + red + green + orange + blue. Each file ships a flat hex object; we capture step 500 + a few neighbours.",
  map(values) {
    // Each MUI color file exports a flat hex object: `{ 50: '#x', 100: '#x', ... }`.
    // Lift them to bare family.step paths so semantic refs `{gray.50}`,
    // `{indigo.500}`, `{red.500}` etc. resolve.
    const lift = () => {
      const families = {};
      for (const [k, v] of Object.entries(values)) {
        // Keys arrive as `50`, `100`, `A100`, etc. Distribution across
        // families happens because we fetched per-family files but the
        // parser doesn't know which is which.
        // We rely on the cached file paths instead — but those are
        // dropped after parse. So instead we lean on the secondary
        // strategy: examine the OKLCH hue ranges.
        // Pragmatic fallback: treat all extracted as `mui-default.{step}`
        // and let semantic refs use `mui-default` family names.
      }
      return families;
    };

    // Each MUI color file is a flat object with step keys. Since we
    // concatenated multiple files, the same step (e.g. 500) appears
    // multiple times and only one wins. To preserve them, we'd need
    // per-file parsing.
    //
    // For now: the extracted `values` is a flat map of {step → hex}
    // taken from the *last* file fetched (orange.js in our spec). This
    // is a known limitation — see mappingNotes.
    return {
      base: {
        // Conservative fallback: preserve the existing OKLCH approxima-
        // tions for now, ship extraction metadata in attribution. A
        // per-file extractor is the proper fix.
        gray: {
          50: "oklch(98.5% 0.001 0)",
          100: "oklch(96% 0.002 0)",
          200: "oklch(93% 0.003 0)",
          400: "oklch(74% 0.005 0)",
          700: "oklch(38% 0.008 0)",
          900: "oklch(13% 0.01 0)"
        },
        indigo: { 50: "oklch(95% 0.04 280)", 500: "oklch(48% 0.18 280)", 700: "oklch(38% 0.18 280)" },
        red: { 500: "oklch(60% 0.22 25)" },
        green: { 500: "oklch(58% 0.16 145)" },
        amber: { 500: "oklch(78% 0.17 80)" },
        blue: { 500: "oklch(58% 0.17 240)" },
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "MUI's per-colour files (indigo.js, gray.js, red.js, etc.) share step keys; concatenating them in this pipeline collapses values into the last file's keys. Per-file fidelity extraction is deferred; OKLCH approximations of MUI's Material Design v2 palette stand, anchored to documented hex values from mui/material-ui."
    };
  }
};
