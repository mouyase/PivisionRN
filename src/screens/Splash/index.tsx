import { Animated, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '@/api'
import { useEffect, useState } from 'react'
import FlatList = Animated.FlatList
import FastImage from 'react-native-fast-image'

const Splash = () => {
  const navigation = useNavigation()

  const [imageUrlList, setImageUrlList] = useState<string[]>([])

  useEffect(() => {
    api
      .getWalkthrough()
      .then(value => {
        setImageUrlList(
          value?.illusts?.map((item: any) => {
            return item.image_urls.medium
          }),
        )
      })
      .catch(reason => {
        console.log(reason)
      })
  }, [])

  const renderItem = ({ item }: any) => {
    return (
      <>
        <FastImage
          style={{ width: 200, height: 200, backgroundColor: 'red' }}
          source={{
            uri: item,
            headers: { Referer: 'https://www.pixiv.net' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </>
    )
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <FlatList
          data={imageUrlList}
          renderItem={renderItem}
          style={{ flex: 1 }}
        />
      </View>
    </>
  )
}
export default Splash
