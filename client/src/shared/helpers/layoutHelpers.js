export function getMobileAndDesktopValues(padding) {
  if (Array.isArray(padding)) {
    return [padding[0], padding[1]];
  }
  return [padding];
}
