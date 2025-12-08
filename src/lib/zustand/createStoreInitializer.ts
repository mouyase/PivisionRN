import type { StoreInitializer } from "./type";

export function createStoreInitializer<TStore>(
  initializer: StoreInitializer<TStore>,
): StoreInitializer<TStore> {
  return initializer;
}
