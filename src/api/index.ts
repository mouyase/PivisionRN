import Fetch from '@/utils/Fetch'
import qs from 'qs'
import { error } from '@/utils/LogUtils'

const regExpGetAPIAndParams = /https:\/\/app-api.pixiv.net(.+)\?(.+)/

const getWalkthrough = async (): Promise<IllustsRes> => {
  return await Fetch.get('/v1/walkthrough/illusts')
}

const getRecommended = async (): Promise<RecommendedRes> => {
  return await Fetch.get('/v1/illust/recommended', {
    filter: 'for_android',
    include_ranking_illusts: true,
    include_privacy_policy: true,
  })
}

const getNext = async (url: string) => {
  let matches = url.match(regExpGetAPIAndParams)
  if (matches) {
    const [_, apiUrl, params] = matches
    return await Fetch.get(apiUrl, qs.parse(params))
  } else {
    error('getNext', '接口请求错误')
    return Promise.reject()
  }
}
const api = { getWalkthrough, getRecommended, getNext }

export default api
