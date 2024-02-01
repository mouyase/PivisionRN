import { useEffect, useState } from 'react'
import api from '@/api'
import { MasonryFlashList } from '@shopify/flash-list'
import { useWindowDimensions, View } from 'react-native'
import ListUtils from '@/utils/ListUtils'
import ListItemFastImageView from '@/screens/HomeScreen/components/IllustListItem'
import useNavigation from '@/hooks/useNavigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { NativeScrollEvent } from 'react-native/Libraries/Components/ScrollView/ScrollView'

type RecommendedViewProps = {
  onScroll?:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | undefined
}
const RecommendedView = (props: RecommendedViewProps) => {
  const { onScroll } = props
  const navigation = useNavigation()
  const [illustList, setIllustList] = useState<Illust[]>([])
  const [nextUrl, setNextUrl] = useState<string>()

  useEffect(() => {
    api
      .getRecommended()
      .then((value) => {
        setNextUrl(value.next_url)
        setIllustList(value.illusts)
      })
      .catch((reason) => {
        console.error(reason)
      })
  }, [])

  const { height } = useWindowDimensions()
  const numColumns = 3

  const onEndReached = () => {
    console.log('触底反弹', nextUrl)
    if (nextUrl) {
      api.getNext(nextUrl).then((value: RecommendedRes) => {
        setIllustList((list) => list.concat(value.illusts))
      })
    }
  }
  const onItemPress = (index: number) => {
    navigation.push('IllustDetail', { illusts: illustList, index })
  }
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <MasonryFlashList
        // ListHeaderComponentStyle={{ height: 240 - insets.top }}
        renderItem={({ item, index }) => (
          <ListItemFastImageView
            item={item}
            numColumns={numColumns}
            onItemPress={() => onItemPress(index)}
          />
        )}
        // onScroll={onScroll}
        numColumns={numColumns}
        data={illustList}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        estimatedItemSize={height / 5}
        showsVerticalScrollIndicator={false}
        optimizeItemArrangement={true}
        overrideItemLayout={(layout, item) => {
          layout.size = ListUtils.getListItemWH({
            width: item.width,
            height: item.height,
            numColumns,
          }).height
        }}
      />
    </View>
  )
}
export default RecommendedView
