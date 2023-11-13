import Fetch from '@/utils/Fetch'

const api = {
  getWalkthrough: async () => {
    return Fetch.get('/v1/walkthrough/illusts')
  },
}
export default api
