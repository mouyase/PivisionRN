import React, { type PropsWithChildren } from "react";
import { type StyleProp, type TextStyle, type ViewStyle } from "react-native";

import { tw } from "@/src/lib/twrnc";

import { type ThemeColors } from "../../styles/colors";
import { useThemeColors } from "../../hooks/useThemeColors";

/** 背景主题样式 */
export type BgThemeStyle =
  | "base100"
  | "base200"
  | "base300"
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error";

/** 文字主题样式 */
export type TextThemeStyle =
  | "base"
  | "muted"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "onPrimary"
  | "onSecondary"
  | "onAccent"
  | "onNeutral"
  | "onInfo"
  | "onSuccess"
  | "onWarning"
  | "onError";

/** 字体类型 */
export type FontWeight = "light" | "medium" | "bold";

/** 字体映射 */
const FontFamilyMap: Record<FontWeight, string> = {
  light: "MiSans-Light",
  medium: "MiSans-Medium",
  bold: "MiSans-Semibold",
};

/** 获取背景主题样式 */
function getBgStyle(c: ThemeColors, themeStyle: BgThemeStyle): string {
  const map: Record<BgThemeStyle, string> = {
    base100: c.bgBase100,
    base200: c.bgBase200,
    base300: c.bgBase300,
    primary: c.bgPrimary,
    secondary: c.bgSecondary,
    accent: c.bgAccent,
    neutral: c.bgNeutral,
    info: c.bgInfo,
    success: c.bgSuccess,
    warning: c.bgWarning,
    error: c.bgError,
  };

  return map[themeStyle];
}

/** 获取文字主题样式 */
function getTextStyle(c: ThemeColors, themeStyle: TextThemeStyle): string {
  const map: Record<TextThemeStyle, string> = {
    base: c.textBase,
    muted: c.textMuted,
    primary: c.textPrimary,
    secondary: c.textSecondary,
    accent: c.textAccent,
    info: c.textInfo,
    success: c.textSuccess,
    warning: c.textWarning,
    error: c.textError,
    onPrimary: c.textOnPrimary,
    onSecondary: c.textOnSecondary,
    onAccent: c.textOnAccent,
    onNeutral: c.textOnNeutral,
    onInfo: c.textOnInfo,
    onSuccess: c.textOnSuccess,
    onWarning: c.textOnWarning,
    onError: c.textOnError,
  };

  return map[themeStyle];
}

/**
 * 为 View 类组件添加背景主题支持
 *
 * 使用泛型 S 支持不同类型的 style prop：
 * - View: StyleProp<ViewStyle>
 * - Pressable: StyleProp<ViewStyle> | ((state) => StyleProp<ViewStyle>)
 *
 * @example
 * ```tsx
 * const ThemedView = withBgTheme(View);
 * const ThemedPressable = withBgTheme(Pressable);
 * ```
 */
export function withBgTheme<S, P extends { style?: S }>(Component: React.ComponentType<P>) {
  return function ThemedComponent(
    props: PropsWithChildren<Omit<P, "style"> & { themeStyle?: BgThemeStyle; style?: S }>,
  ) {
    const { themeStyle, style, children, ...rest } = props;
    const c = useThemeColors();

    const themeClassName = themeStyle !== undefined ? getBgStyle(c, themeStyle) : undefined;
    const themeStyleObject = themeClassName !== undefined ? tw(themeClassName) : undefined;

    // 处理 style：可能是对象，也可能是函数（如 Pressable）
    let mergedStyle: S;
    if (typeof style === "function") {
      // Pressable 风格：style 是函数
      mergedStyle = ((state: unknown) => {
        const baseStyle = (style as (state: unknown) => StyleProp<ViewStyle>)(state);

        return [themeStyleObject, baseStyle];
      }) as S;
    } else {
      // View 风格：style 是对象
      mergedStyle = [themeStyleObject, style] as S;
    }

    return (
      <Component {...(rest as unknown as P)} style={mergedStyle}>
        {children}
      </Component>
    );
  };
}

/**
 * 为 Text 类组件添加文字颜色主题支持
 *
 * 仅处理文字颜色，不处理字体。
 *
 * @example
 * ```tsx
 * const ThemedText = withTextColorTheme(Text);
 * ```
 */
export function withTextColorTheme<P extends { style?: StyleProp<TextStyle> }>(
  Component: React.ComponentType<P>,
) {
  return function ThemedComponent(props: PropsWithChildren<P & { themeStyle?: TextThemeStyle }>) {
    const { themeStyle = "base", style, children, ...rest } = props;
    const c = useThemeColors();

    const themeClassName = getTextStyle(c, themeStyle);

    return (
      <Component {...(rest as unknown as P)} style={[tw(themeClassName), style]}>
        {children}
      </Component>
    );
  };
}

/**
 * 为 Text 类组件添加自定义字体支持
 *
 * @example
 * ```tsx
 * const FontedText = withFont(Text);
 * ```
 */
export function withFont<P extends { style?: StyleProp<TextStyle> }>(
  Component: React.ComponentType<P>,
) {
  return function FontedComponent(props: PropsWithChildren<P & { fontWeight?: FontWeight }>) {
    const { fontWeight = "medium", style, children, ...rest } = props;

    const fontFamily = FontFamilyMap[fontWeight];

    return (
      <Component {...(rest as unknown as P)} style={[{ fontFamily, fontWeight: "normal" }, style]}>
        {children}
      </Component>
    );
  };
}

/**
 * 为 Text 类组件添加文字主题支持和字体支持（组合版）
 *
 * 等同于 withFont(withTextColorTheme(Component))
 *
 * @example
 * ```tsx
 * const ThemedText = withTextTheme(Text);
 * ```
 */
export function withTextTheme<P extends { style?: StyleProp<TextStyle> }>(
  Component: React.ComponentType<P>,
) {
  return function ThemedComponent(
    props: PropsWithChildren<P & { themeStyle?: TextThemeStyle; fontWeight?: FontWeight }>,
  ) {
    const { themeStyle = "base", fontWeight = "medium", style, children, ...rest } = props;
    const c = useThemeColors();

    const themeClassName = getTextStyle(c, themeStyle);
    const fontFamily = FontFamilyMap[fontWeight];

    // 样式优先级：themeStyle < fontWeight < style
    return (
      <Component
        {...(rest as unknown as P)}
        style={[tw(themeClassName), { fontFamily, fontWeight: "normal" }, style]}>
        {children}
      </Component>
    );
  };
}
