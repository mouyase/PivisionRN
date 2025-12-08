export function isNotEmpty(targetString: unknown) {
  if (typeof targetString !== "string") {
    return false;
  }
  if (targetString.trim().length === 0) {
    return false;
  }

  return true;
}
