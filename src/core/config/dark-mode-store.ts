import { createStoreFactory } from "@/src/lib/zustand/createStoreFactory";
import { createStoreInitializer } from "@/src/lib/zustand/createStoreInitializer";
import { zustandStorage } from "@/src/lib/zustand/zustandStorage";

type DarkModeState = {
  darkModeType: "auto" | "dark" | "light";
};

const initalizer = createStoreInitializer<DarkModeState>(() => {
  return {
    darkModeType: "dark",
  };
});

const factory = createStoreFactory(initalizer, {
  name: "dark-mode-store",
  storage: zustandStorage,
});

export const { store: DarkModeStore, useStore: useDarkModeStore } = factory.create("默认");
