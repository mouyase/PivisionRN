export function creator<T extends Record<string, unknown>>(data: T | (() => T)): T {
  if (typeof data === "function") {
    return data();
  }

  return data;
}
