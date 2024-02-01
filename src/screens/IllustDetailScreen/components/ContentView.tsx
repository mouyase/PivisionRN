import { Text, View, ViewProps } from 'react-native'
import {
  ABSOLUTE,
  AC,
  BGC,
  CIRCLE,
  F,
  FC,
  FS,
  H,
  JB,
  JE,
  ML,
  PB,
  PH,
  PT,
  ROW,
  WH,
} from '@/utils/CommonStyles'
import AnimatedFastImage from '@/components/AnimatedFastImage'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SaveButton from '@/components/SaveButton'

type ContentViewProps = {
  data: Illust
} & ViewProps

const ContentView = (props: ContentViewProps) => {
  const { data } = props
  const insets = useSafeAreaInsets()
  const { title, user } = data
  const { name, profile_image_urls } = user
  return (
    <View style={[F, BGC('#000')]}>
      <AnimatedFastImage
        style={[F]}
        url={data.image_urls.large}
        resizeMode={'contain'}
      />
      <View style={[ABSOLUTE, PT(insets.top), PH(16), PB(16)]}>
        <View style={[F, ROW]}>
          <View style={[F, JE]}>
            <View style={[ROW, AC, H(48)]}>
              <AnimatedFastImage
                style={[WH(48), CIRCLE, { overflow: 'hidden' }]}
                imageStyle={[CIRCLE]}
                url={profile_image_urls.medium}
                resizeMode={'cover'}
              />
              <View style={[F, ML(8), JB]}>
                <View>
                  <Text style={[FC('#FFF'), FS(18)]}>{title}</Text>
                </View>
                <View style={[F, JE]}>
                  <Text style={[FC('#FFF'), FS(14)]}>{name}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[JE]}>
            <SaveButton url={data.image_urls.large} />
          </View>
        </View>
      </View>
    </View>
  )
}
export default ContentView
