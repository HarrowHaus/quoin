/**
 * Vite plugin entry.
 *
 * Hooks .html files (including index.html via transformIndexHtml) and runs
 * them through the Quoin compiler. The plugin reloads packs on file change
 * when running in dev mode — the compiler itself is stateless per call.
 */

import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { compile } from "./compiler.js";
import {
  loadImplementationPack,
  loadTokenPack,
  loadVocabularyPack
} from "./pack-loader.js";
import type {
  CompilerDiagnostic,
  ImplementationPack,
  ImplementationPackSource,
  TokenPack,
  TokenPackSource,
  VocabularyPack,
  VocabularyPackSource
} from "./types.js";

export interface QuoinPluginOptions {
  tokenPack: TokenPackSource;
  vocabularyPacks: VocabularyPackSource[];
  implementationPack: ImplementationPackSource;
  projectTokens?: Record<string, string>;
  /** When true, surface warnings to the Vite logger. Default true. */
  reportWarnings?: boolean;
  /**
   * File extensions to transform. Defaults to ['.html'] plus
   * transformIndexHtml for index.html in dev.
   */
  include?: string[];
}

export function quoin(options: QuoinPluginOptions): Plugin {
  let config: ResolvedConfig | undefined;
  const reportWarnings = options.reportWarnings ?? true;
  const include = options.include ?? [".html"];

  let tokenPack: TokenPack | undefined;
  let vocabularyPacks: VocabularyPack[] | undefined;
  let implementationPack: ImplementationPack | undefined;
  let cssBundle = "";

  async function ensurePacks(): Promise<void> {
    if (tokenPack && vocabularyPacks && implementationPack) return;
    tokenPack = await loadTokenPack(options.tokenPack);
    vocabularyPacks = await Promise.all(
      options.vocabularyPacks.map((p) => loadVocabularyPack(p))
    );
    implementationPack = await loadImplementationPack(options.implementationPack);
  }

  function logDiagnostics(diags: CompilerDiagnostic[]): void {
    if (!reportWarnings) return;
    for (const d of diags) {
      const prefix = `[quoin] ${d.kind}`;
      const msg = d.primitive
        ? `${prefix}: <${d.primitive}> ${d.message}`
        : `${prefix}: ${d.message}`;
      if (config?.logger) config.logger.warn(msg);
      else console.warn(msg);
    }
  }

  return {
    name: "vite-plugin-quoin",
    enforce: "pre",
    configResolved(c) {
      config = c;
    },
    async transform(code, id) {
      if (!include.some((ext) => id.endsWith(ext))) return null;
      await ensurePacks();
      const result = compile({
        source: code,
        tokenPack: tokenPack!,
        vocabularyPacks: vocabularyPacks!,
        implementationPack: implementationPack!,
        projectTokens: options.projectTokens,
        filename: path.relative(process.cwd(), id)
      });
      logDiagnostics(result.warnings);
      if (result.css) cssBundle += result.css + "\n";
      return { code: result.html, map: null };
    },
    async transformIndexHtml(html, ctx) {
      await ensurePacks();
      const result = compile({
        source: html,
        tokenPack: tokenPack!,
        vocabularyPacks: vocabularyPacks!,
        implementationPack: implementationPack!,
        projectTokens: options.projectTokens,
        filename: ctx.filename
      });
      logDiagnostics(result.warnings);
      if (result.css) cssBundle += result.css + "\n";
      return result.html;
    },
    generateBundle() {
      if (!cssBundle.trim()) return;
      this.emitFile({
        type: "asset",
        fileName: "quoin.css",
        source: cssBundle
      });
      cssBundle = "";
    }
  };
}

export default quoin;
