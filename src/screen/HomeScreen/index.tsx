import { useRoute } from '@react-navigation/native'
import useAppActiveEffect from '@/hooks/useAppActiveEffect'
import { Text, View } from 'react-native'
import { log } from '@/utils/LogUtils'

const HomeScreen = () => {
  const route = useRoute()
  useAppActiveEffect(() => {
    if (route?.params) {
      log('获得焦点', route.params)
    }
  })
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  )
}
export default HomeScreen
