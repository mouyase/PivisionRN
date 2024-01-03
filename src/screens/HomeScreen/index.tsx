import { View } from 'react-native'
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs'
import RecommendedView from '@/screens/HomeScreen/components/RecommendedView'
import { F, PT } from '@/utils/CommonStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  return (
    <View style={[F, PT(insets.top)]}>
      <TabsProvider
        defaultIndex={0}
        // onChangeIndex={handleChangeIndex} optional
      >
        <Tabs>
          <TabScreen label='推荐'>
            <RecommendedView />
          </TabScreen>
          <TabScreen label='订阅'>
            <View style={{ backgroundColor: 'black', flex: 1 }} />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  )
}
export default HomeScreen
