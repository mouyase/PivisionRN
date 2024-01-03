import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { F } from '@/utils/CommonStyles'
import PagerView from 'react-native-pager-view'
import AnimatedFastImage from '@/components/AnimatedFastImage'
import FastImage from 'react-native-fast-image'

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
      <PagerView style={[F]} initialPage={index} orientation={'vertical'}>
        {illusts.map((value, i) => (
          <FastImage
            key={value.id}
            style={[F]}
            source={{ uri: illusts[i].image_urls.large }}
          />
        ))}
      </PagerView>
    </View>
  )
}
export default IllustDetailScreen
