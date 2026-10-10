/**
 * Fixed map from the safe `color_key` stored in the database to a real CSS color.
 * The database never supplies a CSS value: unknown keys fall back to neutral gray.
 */
const SWATCHES = new Map<string, string>([
  ['red', '#d32f2f'],
  ['pink', '#f48fb1'],
  ['light-pink', '#f8bbd0'],
  ['rose', '#c2185b'],
  ['purple', '#7b1fa2'],
  ['lavender', '#b39ddb'],
  ['blue', '#1976d2'],
  ['light-blue', '#81d4fa'],
  ['navy', '#1a237e'],
  ['teal', '#00897b'],
  ['green', '#388e3c'],
  ['mint', '#a5d6a7'],
  ['yellow', '#fdd835'],
  ['orange', '#fb8c00'],
  ['brown', '#6d4c41'],
  ['beige', '#d7c4a3'],
  ['cream', '#fff3d6'],
  ['white', '#ffffff'],
  ['gray', '#9e9e9e'],
  ['black', '#212121'],
  ['gold', '#d4af37'],
  ['silver', '#c0c0c0'],
]);

export const FALLBACK_SWATCH = '#bdbdbd';

/** Returns a trusted CSS color for a color_key; never returns database text. */
export function getSwatchColor(key: string): string {
  return SWATCHES.get(key) ?? FALLBACK_SWATCH;
}