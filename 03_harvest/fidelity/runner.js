/**
 * Phase 3.5b extraction-method runner.
 *
 * Extends extract.js with two new methods alongside the original
 * static fetch+parse:
 *
 *   Method A — static fetch + parse                  (extract.js core)
 *   Method B — algorithm execution at extract time   (this file)
 *   Method C — per-file structured extraction        (this file)
 *
 * A spec can declare any combination of methods. The runner inspects
 * the spec shape and dispatches accordingly:
 *
 *   spec.algorithm()     → Method B
 *   spec.files[]         → Method C (named per-file fetches)
 *   spec.fetch.urls      → Method A
 *
 * Specs that need to combine methods (e.g. fetch some files + run an
 * algorithm for status colours) can do so by returning a base palette
 * from any of the three; the orchestrator merges them.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PARSERS } from "./parsers.js";
import { toCanonicalOklch } from "./oklch.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CANONICAL_CACHE = path.join(__dirname, "canonical");

export async function fetchText(url) {
  try {
    const resp = await fetch(url, {
      headers: { "User-Agent": "quoin-fidelity-extract/0.2" }
    });
    if (!resp.ok) return null;
    return await resp.text();
  } catch {
    return null;
  }
}

export async function cacheCanonical(name, url, text) {
  await fs.mkdir(CANONICAL_CACHE, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  await fs.writeFile(
    path.join(CANONICAL_CACHE, `${name}.txt`),
    `<!-- fetched ${today} from ${url} -->\n${text}`
  );
}

/**
 * Method A — static fetch + format parser.
 * Returns { rawValues, fetchedUrl, error? }.
 */
export async function runMethodA(spec, name) {
  const urls = spec.fetch?.urls ?? [];
  for (const url of urls) {
    const text = await fetchText(url);
    if (text === null) continue;
    await cacheCanonical(name, url, text);
    let combined = text;
    for (const extraUrl of spec.fetch?.additionalUrls ?? []) {
      const more = await fetchText(extraUrl);
      if (more) {
        combined += "\n" + more;
        await cacheCanonical(
          `${name}--${path.basename(extraUrl).slice(0, 30)}`,
          extraUrl,
          more
        );
      }
    }
    const parser = PARSERS[spec.fetch.format];
    if (!parser) return { error: `unknown-format ${spec.fetch.format}` };
    const rawValues = parser(combined);
    return { rawValues, fetchedUrl: url };
  }
  return { error: "fetch-failed" };
}

/**
 * Method B — algorithm execution.
 *
 * spec.algorithm must be `async () => ({ rawValues, version, inputs })`.
 * The function is called with no arguments and returns a flat
 * `{ name → rawColorString }` map plus the library version it ran
 * against and the inputs it used. The orchestrator records both in
 * harvestNotes so consumers can regenerate.
 */
export async function runMethodB(spec) {
  if (typeof spec.algorithm !== "function") {
    return { error: "no-algorithm" };
  }
  try {
    const result = await spec.algorithm();
    return {
      rawValues: result.rawValues,
      methodMeta: {
        library: result.library,
        version: result.version,
        inputs: result.inputs
      }
    };
  } catch (err) {
    return { error: `algorithm-error: ${err.message}` };
  }
}

/**
 * Method C — per-file structured extraction.
 *
 * spec.files is an array of `{ name, url, format, namespace }`. Each
 * file fetched independently, parsed, and its keys prefixed with
 * `namespace.` before merge. Defeats the concatenated-parse problem
 * (e.g. MUI's per-colour modules that share step keys).
 */
export async function runMethodC(spec, name) {
  if (!Array.isArray(spec.files) || spec.files.length === 0) {
    return { error: "no-files" };
  }
  const merged = {};
  const fetched = [];
  for (const file of spec.files) {
    const text = await fetchText(file.url);
    if (text === null) {
      // Continue; per-file failures are common (renames). Caller
      // decides whether the missing file is fatal.
      continue;
    }
    await cacheCanonical(`${name}--${file.name}`, file.url, text);
    fetched.push(file.url);
    const parser = PARSERS[file.format ?? spec.fetch?.format];
    if (!parser) continue;
    const values = parser(text);
    const ns = file.namespace ?? file.name;
    for (const [k, v] of Object.entries(values)) {
      merged[`${ns}.${k}`] = v;
    }
  }
  if (Object.keys(merged).length === 0) {
    return { error: "all-files-failed" };
  }
  return { rawValues: merged, fetchedUrl: fetched[0] ?? spec.fetch?.urls?.[0] };
}

/**
 * Convert a flat `{name: rawColor}` record into `{name: oklch-string}`.
 * Non-color or unparseable values are silently dropped — the spec's
 * map() function decides which keys it needs.
 */
export function toOklchRecord(rawValues) {
  const out = {};
  for (const [k, v] of Object.entries(rawValues)) {
    if (typeof v !== "string") continue;
    const ok = toCanonicalOklch(v);
    if (ok) out[k] = ok;
  }
  return out;
}
