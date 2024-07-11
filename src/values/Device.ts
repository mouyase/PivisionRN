/**
 * @作者 某亚瑟
 * @日期 2024/7/11
 * @用途 设备相关信息
 */

import DeviceInfo from 'react-native-device-info'

export const Device = {
  API_LEVEL: 0,
  OS: DeviceInfo.getSystemName(),
  MODEL: DeviceInfo.getModel(),
  BRAND: DeviceInfo.getBrand(),
}

/**
 * 初始化设备信息
 * @constructor
 */
export const InitValueDevice = async () => {
  Device.API_LEVEL = await DeviceInfo.getApiLevel()
  return Promise.resolve()
}
