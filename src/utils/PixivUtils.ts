/**
 * @作者 某亚瑟
 * @日期 2024/7/11
 * @用途 Pixiv相关工具函数
 */
import dayjs from 'dayjs'
import * as Crypto from 'expo-crypto'
import { Pixiv } from '@/values/Pixiv.ts'

export const getTimeAndHash = async (): Promise<{
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
