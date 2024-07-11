/**
 * @作者 某亚瑟
 * @日期 2024/7/11
 * @用途 Pixiv相关工具函数
 */
import dayjs from 'dayjs'
import * as Crypto from 'expo-crypto'
import { Pixiv } from '@/values/Pixiv.ts'
import { Device } from '@/values/Device.ts'

const getTimeAndHash = async (): Promise<{
  time: string
  hash: string
}> => {
  const time = dayjs().format()
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.MD5,
    time + Pixiv.SALT,
  )
  return { time, hash }
}

const getHeader = async () => {
  const { time, hash } = await getTimeAndHash()
  return {
    'user-agent': Pixiv.USER_AGENT,
    'accept-language': 'zh_CN',
    'app-accept-language': 'zh-hans',
    'app-os': Device.OS.toLowerCase(),
    'app-os-version': Device.API_LEVEL,
    'app-version': Pixiv.CLIENT_VERSION,
    'content-type': 'application/x-www-form-urlencoded',
    'x-client-time': time,
    'x-client-hash': hash,
  }
}

export const PixivUtils = {
  getTimeAndHash,
  getHeader,
}
