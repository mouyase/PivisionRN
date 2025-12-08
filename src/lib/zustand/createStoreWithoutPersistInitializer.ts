import type { StoreWithoutPersistInitializer } from "./type";

export function createStoreWithoutPersistInitializer<TStore>(
  initializer: StoreWithoutPersistInitializer<TStore>,
): StoreWithoutPersistInitializer<TStore> {
  return initializer;
}
