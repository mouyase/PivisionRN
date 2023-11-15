import Fetch from '@/utils/Fetch'

const getWalkthrough = async (): Promise<illustsResponseType> => {
  return await Fetch.get('/v1/walkthrough/illusts')
}

const api = { getWalkthrough }

export default api
