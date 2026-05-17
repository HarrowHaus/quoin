/**
 * Adobe Spectrum — Method B (npm package).
 *
 * @adobe/spectrum-tokens ships variables.json with the full
 * Spectrum colour palette as `{name: { sets: { light: { value: 'rgb...' } } } }`.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = path.resolve(
  __dirname,
  "..",
  "..",
  "node_modules",
  "@adobe",
  "spectrum-tokens",
  "dist",
  "json",
  "variables.json"
);

export default {
  harvestNotes:
    "Adobe Spectrum tokens extracted from @adobe/spectrum-tokens dist/json/variables.json. Light theme values resolved from `sets.light.value`.",
  async algorithm() {
    const raw = await fs.readFile(TOKEN_FILE, "utf8");
    const json = JSON.parse(raw);
    const out = {};
    for (const [name, entry] of Object.entries(json)) {
      // Many tokens nest `sets.light.value` either directly or via
      // another set indirection. Walk a couple levels.
      const lightValue = entry?.sets?.light?.value;
      const nestedLight = entry?.sets?.light?.sets?.light?.value;
      const value = nestedLight ?? lightValue;
      if (typeof value === "string" && /^(rgb|#|oklch)/i.test(value)) {
        out[name] = value;
      }
    }
    return {
      rawValues: out,
      library: "@adobe/spectrum-tokens",
      version: "14.7.0",
      inputs: { mode: "light" }
    };
  },
  map(values) {
    return {
      base: { spectrum: values, white: { 0: "oklch(100% 0 0)" } },
      notes:
        "Spectrum's `accent-color-N`, `gray-N`, `red-color-N`, etc. flattened. Mapping: surface = gray-50, text = gray-900, accent = accent-color-900 (Adobe blue), critical = negative-background-color-default, success = positive-background-color-default, warning = notice-background-color-default."
    };
  }
};
