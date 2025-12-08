import { useDarkModeStore } from "@/src/core/config/dark-mode-store";
import { useColorScheme as useRNColorScheme } from "react-native";

type ColorScheme = "light" | "dark";

export function useColorScheme(): ColorScheme {
  const colorScheme = useRNColorScheme() ?? "light";
  const darkModeType = useDarkModeStore((state) => state.darkModeType);

  if (darkModeType === "auto") {
    return colorScheme;
  }

  return darkModeType;
}
