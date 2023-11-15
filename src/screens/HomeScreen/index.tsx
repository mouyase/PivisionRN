import { View } from 'react-native'
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs'
import RecommendedView from '@/screens/HomeScreen/components/RecommendedView'

const HomeScreen = () => {
  return (
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
  )
}
export default HomeScreen
