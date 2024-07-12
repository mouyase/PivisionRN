/**
 * @作者 某亚瑟
 * @日期 2024/7/11
 * @用途 axios封装
 */

import axios from 'axios'
import { Pixiv } from '@/values/Pixiv.ts'
import { PixivUtils } from '@/utils/PixivUtils.ts'

export const api = axios.create({
  baseURL: Pixiv.API_BASE_URI,
  timeout: 60 * 1000,
})

api.interceptors.request.use(
  async (config) => {
    const headers = await PixivUtils.getHeader()
    config.headers.setUserAgent(Pixiv.USER_AGENT)
    config.headers.setContentType('application/x-www-form-urlencoded')
    Object.keys(headers).forEach((key) => {
      config.headers[key] = headers[key]
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  async (res) => {
    return res
  },
  (error) => {
    console.error(error.response.data)
    return Promise.reject(error)
  },
)
