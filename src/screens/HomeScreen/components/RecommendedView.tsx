import { useEffect, useState } from 'react'
import api from '@/api'
import { FlashList, MasonryFlashList } from '@shopify/flash-list'
import { Pressable, View } from 'react-native'
import { Text } from 'react-native-paper'
import { ListRenderItem } from '@shopify/flash-list/src/FlashListProps'
import FastImage from 'react-native-fast-image'

const RecommendedView = () => {
  const [illustList, setIllustList] = useState<illust[]>([])

  console.log(illustList)
  useEffect(() => {
    api
      .getRecommended()
      .then(value => {
        setIllustList(value.illusts)
      })
      .catch(reason => {
        console.error(reason)
      })
  }, [])

  const renderItem: ListRenderItem<illust> = ({ item }) => {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: item.image_urls.square_medium,
            headers: { Referer: 'https://www.pixiv.net' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <MasonryFlashList
        renderItem={renderItem}
        numColumns={2}
        data={illustList}
        estimatedItemSize={10}
      />
    </View>
  )
}
export default RecommendedView
