import { useEffect, useState } from 'react'
import api from '@/api'
import { MasonryFlashList } from '@shopify/flash-list'
import { useWindowDimensions, View } from 'react-native'
import ListUtils from '@/utils/ListUtils'
import ListItemFastImageView from '@/screens/HomeScreen/components/ListItemFastImageView'
import useNavigation from '@/hooks/useNavigation'

const RecommendedView = () => {
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
    navigation.navigate('IllustDetail', { illusts: illustList, index })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <MasonryFlashList
        renderItem={({ item, index }) => (
          <ListItemFastImageView
            item={item}
            numColumns={numColumns}
            onItemPress={() => onItemPress(index)}
          />
        )}
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
