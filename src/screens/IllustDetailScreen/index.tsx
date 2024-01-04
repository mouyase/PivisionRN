import { View } from 'react-native'
import { BGC, F, H100, W100 } from '@/utils/CommonStyles'
import PagerView from 'react-native-pager-view'
import AnimatedFastImage from '@/components/AnimatedFastImage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMount } from 'ahooks'
import { useState } from 'react'
import PlaceholderPage from '@/components/PlaceholderPage'
import ContentView from '@/screens/IllustDetailScreen/components/ContentView'

const IllustDetailScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<any>) => {
  const { illusts, index } = route.params as {
    illusts: Illust[]
    next?: string
    index: number
  }

  return (
    <PlaceholderPage backgroundColor={'#000'}>
      <View style={[F]}>
        <PagerView
          style={[F]}
          initialPage={index}
          orientation={'vertical'}
          offscreenPageLimit={3}>
          {illusts.map((value) => (
            <ContentView key={value.id} data={value} />
          ))}
        </PagerView>
      </View>
    </PlaceholderPage>
  )
}
export default IllustDetailScreen
