import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { ID, StoreInitializer, StorePersistOptions } from "./type";

export function createStoreFactory<TStore>(
  initializer: StoreInitializer<TStore>,
  storePersistOptions: StorePersistOptions<TStore>,
) {
  const { storage, name, getID = (id) => id } = storePersistOptions;
  const storeMap = new Map<ID, ReturnType<typeof createStoreFn>>();

  function createStoreFn(id: ID) {
    return createStore<TStore>()(
      persist(immer(initializer), {
        name: "_" + name + "_" + getID(id),
        storage: createJSONStorage(() => storage),
      }),
    );
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
      store = createStoreFn(id);
      storeMap.set(id, store);
    }

    return { store, useStore: createStoreHooksFn(store) };
  }

  return {
    create,
  };
}
