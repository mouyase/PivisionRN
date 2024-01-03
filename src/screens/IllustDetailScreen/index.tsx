import { View } from 'react-native'
import { BGC, F, H100, W100 } from '@/utils/CommonStyles'
import PagerView from 'react-native-pager-view'
import AnimatedFastImage from '@/components/AnimatedFastImage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

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
    <View style={[F]}>
      <PagerView
        style={[F]}
        initialPage={index}
        orientation={'vertical'}
        offscreenPageLimit={3}>
        {illusts.map((value) => (
          <View style={[W100, H100, BGC('#000')]} key={value.id}>
            <AnimatedFastImage
              style={[F]}
              url={value.image_urls.large}
              resizeMode={'contain'}
            />
          </View>
        ))}
      </PagerView>
    </View>
  )
}
export default IllustDetailScreen
