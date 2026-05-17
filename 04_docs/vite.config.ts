import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promises as fs } from "node:fs";
import { quoin } from "../01_compiler/dist/vite.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const labRoot = path.resolve(here, "..");
const refPacks = path.join(labRoot, "02_reference-packs");

/**
 * Multi-page Vite build. Every index.html in the project root (and one
 * level deep) is treated as a page entry.
 */
async function findEntries(root: string): Promise<Record<string, string>> {
  const entries: Record<string, string> = {};
  async function walk(dir: string, slug: string) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.name.startsWith(".") || item.name === "node_modules" || item.name === "dist" || item.name === "src" || item.name === "scripts" || item.name === "generated") continue;
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        await walk(full, slug ? `${slug}/${item.name}` : item.name);
      } else if (item.name === "index.html") {
        const key = slug || "index";
        entries[key] = full;
      }
    }
  }
  await walk(root, "");
  return entries;
}

const input = await findEntries(here);

/**
 * Load the Quoin docs site's project-token overrides from quoin.tokens.json.
 * This is the brand layer — same mechanism the Harrow Haus dogfood used to
 * pull a generic pack stack into a specific identity.
 */
const projectTokensRaw = JSON.parse(
  await fs.readFile(path.join(here, "quoin.tokens.json"), "utf8")
);
const projectTokens: Record<string, string> = {};
for (const [k, v] of Object.entries(projectTokensRaw)) {
  if (k.startsWith("$")) continue;
  if (v && typeof v === "object" && typeof (v as { $value?: string }).$value === "string") {
    projectTokens[k] = (v as { $value: string }).$value;
  }
}

export default defineConfig({
  plugins: [
    quoin({
      tokenPack: path.join(labRoot, "03_harvest", "packs", "tokens-geist"),
      vocabularyPacks: [
        path.join(refPacks, "vocab-editorial"),
        path.join(refPacks, "vocab-dashboard"),
        path.join(refPacks, "vocab-essentials"),
        path.join(refPacks, "vocab-app-shell"),
        path.join(labRoot, "03_harvest", "packs", "vocab-marketing"),
        path.join(labRoot, "03_harvest", "packs", "vocab-docs")
      ],
      implementationPack: path.join(refPacks, "impl-tailwind"),
      projectTokens,
      // Suppress most warnings — docs site is huge, will inevitably
      // have many unused-token / unused-primitive warnings.
      reportWarnings: false
    })
  ],
  build: {
    rollupOptions: { input },
    outDir: "dist",
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@quoin/compiler": path.join(labRoot, "01_compiler", "dist", "browser.js")
    }
  },
  optimizeDeps: {
    // Pre-bundle the compiler so the playground module loads fast.
    include: ["@quoin/compiler"]
  }
});
