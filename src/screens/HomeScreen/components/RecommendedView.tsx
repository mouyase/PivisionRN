import { useEffect, useState } from 'react'
import api from '@/api'
import { MasonryFlashList } from '@shopify/flash-list'
import { Dimensions, useWindowDimensions, View } from 'react-native'
import { ListRenderItem } from '@shopify/flash-list/src/FlashListProps'
import FastImage from 'react-native-fast-image'
import Pixiv from '@/values/Pixiv'
import { log } from '@/utils/LogUtils'
import ListUtils from '@/utils/ListUtils'
import ListItemFastImageView from '@/screens/HomeScreen/components/ListItemFastImageView'

const RecommendedView = () => {
  const [illustList, setIllustList] = useState<illust[]>([])
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
      api.getNext(nextUrl).then((value: recommendedResponseType) => {
        setIllustList((list) => list.concat(value.illusts))
      })
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <MasonryFlashList
        renderItem={({ item }) => (
          <ListItemFastImageView item={item} numColumns={numColumns} />
        )}
        numColumns={numColumns}
        data={illustList}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        estimatedItemSize={height / 2}
        showsVerticalScrollIndicator={false}
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
