import Fetch from '@/utils/Fetch'

const getWalkthrough = async (): Promise<illustsResponseType> => {
  return await Fetch.get('/v1/walkthrough/illusts')
}

const getRecommended = async (): Promise<recommendedResponseType> => {
  return await Fetch.get('/v1/illust/recommended', {
    filter: 'for_android',
    include_ranking_illusts: true,
    include_privacy_policy: true,
  })
}

const api = { getWalkthrough, getRecommended }

export default api
