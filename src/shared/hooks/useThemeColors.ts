import { useColorScheme } from "@/src/core/hooks/useColorScheme";
import {
  DarkColors,
  DarkColorValues,
  LightColors,
  LightColorValues,
  type ColorValues,
  type ThemeColors,
} from "../styles/colors";
import { DarkShadowStyles, LightShadowStyles, type ShadowStyles } from "../styles";

/** 获取当前主题的颜色类名（用于 tw()） */
export function useThemeColors(): ThemeColors {
  const colorScheme = useColorScheme();

  return colorScheme === "dark" ? DarkColors : LightColors;
}

/** 获取当前主题的纯颜色值（用于非 Tailwind 场景） */
export function useColorValues(): ColorValues {
  const colorScheme = useColorScheme();

  return colorScheme === "dark" ? DarkColorValues : LightColorValues;
}

/** 获取当前主题的阴影样式 */
export function useShadowStyles(): ShadowStyles {
  const colorScheme = useColorScheme();

  return colorScheme === "dark" ? DarkShadowStyles : LightShadowStyles;
}
