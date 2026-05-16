/**
 * Sample Vite build.
 *
 * Wires the @quoin/compiler Vite plugin into a real Vite build so the
 * sample exercises the full plugin pipeline end-to-end (the plugin's
 * transformIndexHtml hook processes index.html, replacing every Quoin
 * element with the impl-tailwind emitted output).
 *
 * Build order: `npm run build` in 01_compiler/ must produce dist/ first,
 * since this config imports the plugin from ../dist/vite.js. The root
 * `npm run sample` script chains the two commands together.
 */

import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { quoin } from "../dist/vite.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.resolve(here, "..", "test-fixtures");

export default defineConfig({
  plugins: [
    quoin({
      tokenPack: path.join(fixtures, "tokens-baseline"),
      vocabularyPacks: [
        path.join(fixtures, "vocab-editorial"),
        path.join(fixtures, "vocab-dashboard")
      ],
      implementationPack: path.join(fixtures, "impl-tailwind")
    })
  ],
  build: {
    rollupOptions: {
      input: path.resolve(here, "index.html")
    }
  }
});
