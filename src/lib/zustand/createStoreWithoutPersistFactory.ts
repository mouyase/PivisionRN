import { createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ID, StoreWithoutPersistInitializer } from "./type";

export function createStoreWithoutPersistFactory<TStore>(
  initializer: StoreWithoutPersistInitializer<TStore>,
) {
  const storeMap = new Map<ID, ReturnType<typeof createStoreFn>>();

  function createStoreFn() {
    return createStore<TStore>()(immer(initializer));
  }

  function createStoreHooksFn(store: ReturnType<typeof createStoreFn>) {
    return function <T>(selector: (state: TStore) => T) {
      return useStore(store, selector);
    };
  }

  function create(id: ID) {
    let store: ReturnType<typeof createStoreFn>;
    if (storeMap.has(id)) {
      store = storeMap.get(id)!;
    } else {
      store = createStoreFn();
      storeMap.set(id, store);
    }

    return { store, useStore: createStoreHooksFn(store) };
  }

  return {
    create,
  };
}
