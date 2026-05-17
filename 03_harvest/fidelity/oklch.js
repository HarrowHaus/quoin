/**
 * OKLCH conversion helpers used by the fidelity extractor.
 *
 * Input strings may be hex (#fff, #ffffff, #ffffffff), rgb(), rgba(),
 * hsl(), hsla(), or already-oklch(). Output is always a canonical
 * `oklch(L% C H)` string with reasonable rounding.
 */

import { converter, parse, formatHex } from "culori";

const toOklch = converter("oklch");

export function toCanonicalOklch(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  // Pass through anything already oklch() shaped, but re-normalise to
  // the canonical formatting so we never ship mixed precision.
  if (/^oklch\(/i.test(trimmed)) {
    const parsed = parse(trimmed);
    if (!parsed) return null;
    return formatOklch(toOklch(parsed));
  }
  const parsed = parse(trimmed);
  if (!parsed) return null;
  const ok = toOklch(parsed);
  if (!ok) return null;
  return formatOklch(ok);
}

function round(value, places) {
  const m = Math.pow(10, places);
  return Math.round(value * m) / m;
}

function formatOklch({ l, c, h, alpha }) {
  // Greys / true black-or-white have h = NaN. Emit hue 0 in that case.
  const lightness = round((l ?? 0) * 100, 1);
  const chroma = round(c ?? 0, 4);
  const hue = Number.isFinite(h) ? round(h, 1) : 0;
  const base = `oklch(${lightness}% ${chroma} ${hue})`;
  if (alpha !== undefined && alpha !== 1) {
    return `oklch(${lightness}% ${chroma} ${hue} / ${round(alpha, 3)})`;
  }
  return base;
}

/**
 * Convert a record of `name -> raw-value` into `name -> oklch-string`.
 * Values that fail conversion are dropped with a note in the second
 * tuple position so callers can decide whether to fall back.
 */
export function convertRecord(record) {
  const out = {};
  const failed = [];
  for (const [name, value] of Object.entries(record)) {
    const ok = toCanonicalOklch(value);
    if (ok) out[name] = ok;
    else failed.push({ name, value });
  }
  return { out, failed };
}
