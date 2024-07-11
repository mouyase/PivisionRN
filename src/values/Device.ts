/**
 * @作者 某亚瑟
 * @日期 2024/7/11
 * @用途 设备相关信息
 */

import * as DeviceInfo from 'expo-device'
import { Platform } from 'react-native'

const OS =
  Platform.select({
    android: 'Android',
    ios: 'iOS',
  }) || 'Android'

export const Device = {
  OS,
  API_LEVEL: DeviceInfo.platformApiLevel,
  MODEL: DeviceInfo.modelName,
  BRAND: DeviceInfo.brand,
}
