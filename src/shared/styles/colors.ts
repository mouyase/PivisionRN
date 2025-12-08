/**
 * 主题颜色常量
 *
 * Light 主题基于 DaisyUI Winter 主题
 * Dark 主题基于 DaisyUI Dracula 主题
 * 常量值为 Tailwind 类名字符串，可直接拼接到 tw() 中使用
 */

// ============================================
// 纯颜色值（用于非 Tailwind 场景）
// ============================================

/** Winter 主题纯颜色值 (亮色模式) - 基于 DaisyUI Winter */
export const LightColorValues = {
  // 品牌色
  primary: "#047AFF",
  secondary: "#463AA2",
  accent: "#C148AC",
  neutral: "#021431",

  // 品牌色 - 对应前景色
  primaryContent: "#FFFFFF",
  secondaryContent: "#FFFFFF",
  accentContent: "#FFFFFF",
  neutralContent: "#FFFFFF",

  // 背景层级
  base100: "#FFFFFF",
  base200: "#F2F7FF",
  base300: "#E3E9F4",
  baseContent: "#394E6A",
  baseMuted: "#6B7D99",

  // 边框色
  border: "#E3E9F4",
  borderMuted: "#CBD5E1",

  // 状态色
  info: "#93E7FB",
  infoContent: "#032830",
  success: "#81CFD1",
  successContent: "#022C2D",
  warning: "#EFD7BB",
  warningContent: "#3D2E1E",
  error: "#E58B8B",
  errorContent: "#3D1E1E",
} as const;

/** Dracula 主题纯颜色值 (深色模式) */
export const DarkColorValues = {
  // 品牌色
  primary: "#FF79C6",
  secondary: "#BD93F9",
  accent: "#FFB86C",
  neutral: "#414558",

  // 品牌色 - 对应前景色
  primaryContent: "#282A36",
  secondaryContent: "#282A36",
  accentContent: "#282A36",
  neutralContent: "#F8F8F2",

  // 背景层级
  base100: "#282A36",
  base200: "#21222C",
  base300: "#1A1B23",
  baseContent: "#F8F8F2",
  baseMuted: "#6272A4",

  // 边框色
  border: "#44475A",
  borderMuted: "#6272A4",

  // 状态色
  info: "#8BE9FD",
  infoContent: "#282A36",
  success: "#50FA7B",
  successContent: "#282A36",
  warning: "#F1FA8C",
  warningContent: "#282A36",
  error: "#FF5555",
  errorContent: "#282A36",
} as const;

/** 纯颜色值类型 */
export type ColorValues = {
  // 品牌色
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;

  // 品牌色 - 对应前景色
  primaryContent: string;
  secondaryContent: string;
  accentContent: string;
  neutralContent: string;

  // 背景层级
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
  baseMuted: string;

  // 边框色
  border: string;
  borderMuted: string;

  // 状态色
  info: string;
  infoContent: string;
  success: string;
  successContent: string;
  warning: string;
  warningContent: string;
  error: string;
  errorContent: string;
};

// ============================================
// Tailwind 类名常量
// ============================================

/** Light 主题颜色类名 (亮色模式) - 基于 DaisyUI Winter */
export const LightColors = {
  // 品牌色 - 背景
  bgPrimary: "bg-[#047AFF]",
  bgSecondary: "bg-[#463AA2]",
  bgAccent: "bg-[#C148AC]",
  bgNeutral: "bg-[#021431]",

  // 品牌色 - 文字
  textPrimary: "text-[#047AFF]",
  textSecondary: "text-[#463AA2]",
  textAccent: "text-[#C148AC]",

  // 品牌色 - 对应前景色（用于按钮文字等）
  textOnPrimary: "text-[#FFFFFF]",
  textOnSecondary: "text-[#FFFFFF]",
  textOnAccent: "text-[#FFFFFF]",
  textOnNeutral: "text-[#FFFFFF]",

  // 背景层级 - 基于 Winter 主题
  bgBase100: "bg-[#FFFFFF]",
  bgBase200: "bg-[#F2F7FF]",
  bgBase300: "bg-[#E3E9F4]",

  // 基础文字色
  textBase: "text-[#394E6A]",
  textMuted: "text-[#6B7D99]",

  // 边框色
  borderBase: "border-[#E3E9F4]",
  borderMuted: "border-[#CBD5E1]",

  // 状态色 - 背景
  bgInfo: "bg-[#93E7FB]",
  bgSuccess: "bg-[#81CFD1]",
  bgWarning: "bg-[#EFD7BB]",
  bgError: "bg-[#E58B8B]",

  // 状态色 - 文字
  textInfo: "text-[#93E7FB]",
  textSuccess: "text-[#81CFD1]",
  textWarning: "text-[#EFD7BB]",
  textError: "text-[#E58B8B]",

  // 状态色 - 对应前景色
  textOnInfo: "text-[#032830]",
  textOnSuccess: "text-[#022C2D]",
  textOnWarning: "text-[#3D2E1E]",
  textOnError: "text-[#3D1E1E]",
} as const;

/** Dracula 主题颜色类名 (深色模式) */
export const DarkColors = {
  // 品牌色 - 背景
  bgPrimary: "bg-[#FF79C6]",
  bgSecondary: "bg-[#BD93F9]",
  bgAccent: "bg-[#FFB86C]",
  bgNeutral: "bg-[#414558]",

  // 品牌色 - 文字
  textPrimary: "text-[#FF79C6]",
  textSecondary: "text-[#BD93F9]",
  textAccent: "text-[#FFB86C]",

  // 品牌色 - 对应前景色
  textOnPrimary: "text-[#282A36]",
  textOnSecondary: "text-[#282A36]",
  textOnAccent: "text-[#282A36]",
  textOnNeutral: "text-[#F8F8F2]",

  // 背景层级
  bgBase100: "bg-[#282A36]",
  bgBase200: "bg-[#21222C]",
  bgBase300: "bg-[#1A1B23]",

  // 基础文字色
  textBase: "text-[#F8F8F2]",
  textMuted: "text-[#6272A4]",

  // 边框色
  borderBase: "border-[#44475A]",
  borderMuted: "border-[#6272A4]",

  // 状态色 - 背景
  bgInfo: "bg-[#8BE9FD]",
  bgSuccess: "bg-[#50FA7B]",
  bgWarning: "bg-[#F1FA8C]",
  bgError: "bg-[#FF5555]",

  // 状态色 - 文字
  textInfo: "text-[#8BE9FD]",
  textSuccess: "text-[#50FA7B]",
  textWarning: "text-[#F1FA8C]",
  textError: "text-[#FF5555]",

  // 状态色 - 对应前景色
  textOnInfo: "text-[#282A36]",
  textOnSuccess: "text-[#282A36]",
  textOnWarning: "text-[#282A36]",
  textOnError: "text-[#282A36]",
} as const;

/** 颜色类名键类型 */
export type ColorKey = keyof typeof LightColors;

/** 主题颜色类名类型 */
export type ThemeColors = {
  // 品牌色 - 背景
  bgPrimary: string;
  bgSecondary: string;
  bgAccent: string;
  bgNeutral: string;

  // 品牌色 - 文字
  textPrimary: string;
  textSecondary: string;
  textAccent: string;

  // 品牌色 - 对应前景色
  textOnPrimary: string;
  textOnSecondary: string;
  textOnAccent: string;
  textOnNeutral: string;

  // 背景层级
  bgBase100: string;
  bgBase200: string;
  bgBase300: string;

  // 基础文字色
  textBase: string;
  textMuted: string;

  // 边框色
  borderBase: string;
  borderMuted: string;

  // 状态色 - 背景
  bgInfo: string;
  bgSuccess: string;
  bgWarning: string;
  bgError: string;

  // 状态色 - 文字
  textInfo: string;
  textSuccess: string;
  textWarning: string;
  textError: string;

  // 状态色 - 对应前景色
  textOnInfo: string;
  textOnSuccess: string;
  textOnWarning: string;
  textOnError: string;
};
