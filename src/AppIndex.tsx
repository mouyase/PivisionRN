import { Text, View } from 'react-native'
import { getTimeAndHash } from '@/utils/PixivUtils'
import { log } from '@/utils/LogUtils'

const AppIndex = () => {
  let { time, hash } = getTimeAndHash()
  log(time, hash)
  fetch('https://app-api.pixiv.net/v1/walkthrough/illusts', {
    method: 'GET',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept-language': 'zh_CN',
      'app-os': 'android',
      'app-os-version': '13',
      'app-version': '5.0.200',
      'x-client-time': time,
      'x-client-hash': hash,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      log(responseJson)
    })

  return (
    <View>
      <Text>害行吧</Text>
    </View>
  )
}

export default AppIndex
