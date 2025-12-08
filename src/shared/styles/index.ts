import { dp } from "@/src/lib/twrnc";
import { type TextStyle, type ViewStyle } from "react-native";

// ============================================
// 主题化阴影样式
// ============================================

/** 浅色模式阴影样式 */
export const LightShadowStyles = {
  /** 视图阴影 - 浅色模式使用黑色阴影 */
  viewShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: dp(5) },
    shadowOpacity: 0.2,
    shadowRadius: dp(6.27),
    elevation: dp(10),
  } as ViewStyle,

  /** 卡片阴影 - 较轻的阴影 */
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: dp(2) },
    shadowOpacity: 0.1,
    shadowRadius: dp(4),
    elevation: dp(4),
  } as ViewStyle,

  /** 文字阴影 */
  fontShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: dp(1), height: dp(1) },
    textShadowRadius: dp(4),
  } as TextStyle,
};

/** 深色模式阴影样式 */
export const DarkShadowStyles = {
  /** 视图阴影 - 深色模式使用更深的阴影 + 微弱发光 */
  viewShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: dp(5) },
    shadowOpacity: 0.5,
    shadowRadius: dp(8),
    elevation: dp(10),
  } as ViewStyle,

  /** 卡片阴影 - 深色模式使用边缘发光效果 */
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: dp(2) },
    shadowOpacity: 0.4,
    shadowRadius: dp(6),
    elevation: dp(4),
  } as ViewStyle,

  /** 文字阴影 */
  fontShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: dp(1), height: dp(1) },
    textShadowRadius: dp(4),
  } as TextStyle,
};

/** 阴影样式类型 */
export type ShadowStyles = typeof LightShadowStyles;

// 主题颜色
export {
  // Tailwind 类名常量
  DarkColors,
  LightColors,
  type ColorKey,
  type ThemeColors,
  // 纯颜色值常量
  DarkColorValues,
  LightColorValues,
  type ColorValues,
} from "./colors";
