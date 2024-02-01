import { SvgXml } from 'react-native-svg'
import { ColorValue, View, ViewProps } from 'react-native'

const xml = `
<svg width="200" height="200" class="icon" viewBox="0 0 1024 1024"><path d="M640 384H213.3V213.3H640M512 810.7a128 128 0 0 1-128-128 128 128 0 0 1 128-128 128 128 0 0 1 128 128 128 128 0 0 1-128 128M725.3 128h-512a85.3 85.3 0 0 0-85.3 85.3v597.4a85.3 85.3 0 0 0 85.3 85.3h597.4a85.3 85.3 0 0 0 85.3-85.3v-512L725.3 128z"/></svg>
`
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
