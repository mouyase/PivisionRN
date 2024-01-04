import { ColorValue, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Pixiv from '@/values/Pixiv'
import ListUtils from '@/utils/ListUtils'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ABSOLUTE, AE, BGC, FC, FS, H, JE, PH, W } from '@/utils/CommonStyles'
import { memo } from 'react'
import TouchView from '@/components/TouchView'
import useNavigation from '@/hooks/useNavigation'
import AnimatedFastImage from '@/components/AnimatedFastImage'

type ListItemFastImageViewProps = {
  item: Illust
  numColumns: number
  onItemPress?: () => void
}
const IllustListItem = (props: ListItemFastImageViewProps) => {
  const { item, numColumns, onItemPress = () => {} } = props

  const url = item.image_urls.medium
  const count = item.page_count

  const isShowCount = count > 1

  const { width, height } = ListUtils.getListItemWH({
    width: item.width,
    height: item.height,
    numColumns,
  })

  const onPress = () => {
    onItemPress()
  }

  return (
    <TouchView onPress={onPress}>
      <View style={[W(width), H(height)]}>
        <AnimatedFastImage
          url={url}
          resizeMode={'stretch'}
          width={width}
          height={height}
          enableColorful={true}
        />
        <View style={[ABSOLUTE, JE, AE]}>
          {isShowCount && (
            <View style={[BGC('#0006'), PH(8)]}>
              <Text style={[FC('#FFF'), FS(12)]}>{count}P</Text>
            </View>
          )}
        </View>
      </View>
    </TouchView>
  )
}
export default memo(IllustListItem)
