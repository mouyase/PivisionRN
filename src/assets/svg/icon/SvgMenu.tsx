import { SvgXml } from 'react-native-svg'
import { ColorValue, View, ViewProps } from 'react-native'

const xml = `
<svg width="200" height="200" class="icon" viewBox="0 0 1024 1024"><path d="M128 256h768v85.3H128V256m0 213.3h768v85.4H128v-85.4m0 213.4h768V768H128v-85.3z"/></svg>`
const SvgHeart = (props: { fill?: ColorValue } & ViewProps) => (
  <View {...props}>
    <SvgXml
      xml={xml}
      width='100%'
      height='100%'
      fill={props.fill ? props.fill : '#FFFFFF'}
    />
  </View>
)
export default SvgHeart
