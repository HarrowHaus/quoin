/**
 * Shared fixture loaders for the test suite.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadImplementationPack,
  loadTokenPack,
  loadVocabularyPack
} from "../../src/pack-loader.js";
import type {
  ImplementationPack,
  TokenPack,
  VocabularyPack
} from "../../src/types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE_ROOT = path.resolve(__dirname, "..", "..", "test-fixtures");

export function fixturePath(...segments: string[]): string {
  return path.join(FIXTURE_ROOT, ...segments);
}

export async function loadBaselineTokens(): Promise<TokenPack> {
  return loadTokenPack(fixturePath("tokens-baseline"));
}

export async function loadEditorialVocab(): Promise<VocabularyPack> {
  return loadVocabularyPack(fixturePath("vocab-editorial"));
}

export async function loadDashboardVocab(): Promise<VocabularyPack> {
  return loadVocabularyPack(fixturePath("vocab-dashboard"));
}

export async function loadTailwindImpl(): Promise<ImplementationPack> {
  return loadImplementationPack(fixturePath("impl-tailwind"));
}

export async function loadAll(): Promise<{
  tokenPack: TokenPack;
  vocabularyPacks: VocabularyPack[];
  implementationPack: ImplementationPack;
}> {
  const [tokenPack, editorial, dashboard, implementationPack] = await Promise.all([
    loadBaselineTokens(),
    loadEditorialVocab(),
    loadDashboardVocab(),
    loadTailwindImpl()
  ]);
  return {
    tokenPack,
    vocabularyPacks: [editorial, dashboard],
    implementationPack
  };
}
