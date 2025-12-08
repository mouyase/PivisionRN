/**
 * 格式化数字（带单位）
 *
 * 将大数字转换为易读的缩写格式：
 * - < 1000：显示原数字
 * - 1000 ~ 999999：显示 K（千）
 * - >= 1000000：显示 M（百万）
 *
 * @param num 数字
 * @param decimals 保留小数位数，默认 1
 * @returns 格式化后的字符串
 *
 * @example
 * formatNumberWithUnit(999)      // "999"
 * formatNumberWithUnit(1500)     // "1.5K"
 * formatNumberWithUnit(1500000)  // "1.5M"
 * formatNumberWithUnit(1500, 2)  // "1.50K"
 */
export function formatNumberWithUnit(num: number, decimals = 1): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 1000000) {
    return (num / 1000).toFixed(decimals) + "K";
  }

  return (num / 1000000).toFixed(decimals) + "M";
}
