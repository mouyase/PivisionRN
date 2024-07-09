/**
 * @作者 某亚瑟
 * @日期 2024/7/9
 * @用途 Todo
 */
import { View } from 'react-native'
import { useMemo } from 'react'
import { TestData } from '@/pages/works/tesetdata.ts'
import PagerView from 'react-native-pager-view'
import { F } from '@/common/CommonStyles.ts'
import { Image } from 'expo-image'

export const WorksPage = () => {
  const data = useMemo(() => {
    return [...TestData.image, ...TestData.image, ...TestData.image]
  }, [])

  return (
    <View style={[F]}>
      <PagerView
        style={[F]}
        orientation={'vertical'}
        initialPage={0}
        useNext={false}>
        {data.map((i, key) => (
          <View key={key} style={[F]}>
            <Image style={[F]} source={i} />
          </View>
        ))}
      </PagerView>
    </View>
  )
}
