import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { withBgTheme, withTextTheme } from "./withTheme";

// 导出主题化的基础组件
export const ThemedView = withBgTheme(View);
export const ThemedScrollView = withBgTheme(ScrollView);
export const ThemedPressable = withBgTheme(Pressable);

export const ThemedText = withTextTheme(Text);
export const ThemedTextInput = withTextTheme(TextInput);

// 导出 HOC 供扩展第三方组件
export { withBgTheme, withFont, withTextColorTheme, withTextTheme } from "./withTheme";
export type { BgThemeStyle, FontWeight, TextThemeStyle } from "./withTheme";
