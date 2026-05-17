/**
 * Atlassian Design System — Method B (npm package).
 *
 * @atlaskit/tokens ships the canonical light/dark token sets as JSON
 * under figma/atlassian-light.json. Token names are dotted strings
 * (`color.text.accent.red`); we extract `{name, value}` pairs.
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
  "@atlaskit",
  "tokens",
  "figma",
  "atlassian-light.json"
);

export default {
  harvestNotes:
    "Atlassian Design System light theme extracted from @atlaskit/tokens figma/atlassian-light.json. Hundreds of `Light/color.*` named tokens with hex values; mapping selects the canonical `color.text`, `color.background.accent.blue.bolder`, `color.border`, etc. for Quoin's namespace.",
  async algorithm() {
    const raw = await fs.readFile(TOKEN_FILE, "utf8");
    const json = JSON.parse(raw);
    const out = {};
    for (const [k, entry] of Object.entries(json.tokens ?? {})) {
      // `Light/color.text` → `color.text`
      const name = k.replace(/^[A-Z][a-z]+\//, "");
      if (typeof entry?.value === "string" && /^#/.test(entry.value)) {
        out[name] = entry.value;
      }
    }
    return {
      rawValues: out,
      library: "@atlaskit/tokens",
      version: "13.0.4",
      inputs: { theme: "atlassian-light" }
    };
  },
  map(values) {
    return {
      base: { atlassian: values, white: { 0: "oklch(100% 0 0)" } },
      notes:
        "Atlassian tokens flattened onto base.atlassian.{name}. Mapping: surface = color.background.neutral, text = color.text, accent = color.background.accent.blue.bolder (Atlassian brand blue), critical = color.background.danger, success = color.background.success, warning = color.background.warning."
    };
  }
};
