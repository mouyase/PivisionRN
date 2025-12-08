import type { PersistOptions, StateStorage } from "zustand/middleware";
import type { StateCreator } from "zustand/vanilla";

export type ID = string;

export type StorePersistOptions<TStore> = {
  name: string;
  storage: StateStorage;
  getID?: (id: ID) => ID;
} & Omit<PersistOptions<TStore, unknown>, "name" | "storage">;

export type StoreInitializer<TStore> = StateCreator<
  TStore,
  [["zustand/persist", unknown], ["zustand/immer", never]]
>;

export type StoreWithoutPersistInitializer<TStore> = StateCreator<
  TStore,
  [["zustand/immer", never]]
>;
