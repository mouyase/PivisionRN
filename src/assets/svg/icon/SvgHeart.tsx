import { SvgXml } from 'react-native-svg'
import { ColorValue, View, ViewProps } from 'react-native'

const xml = `
<svg width="200" height="200" class="icon" viewBox="0 0 1024 1024"><path d="m512 911-61.9-56.4c-219.7-199.2-364.8-331-364.8-492A232.1 232.1 0 0 1 320 128c74.2 0 145.5 34.6 192 88.7A256.6 256.6 0 0 1 704 128a232.1 232.1 0 0 1 234.7 234.7c0 160.8-145.1 292.7-364.8 492L512 910.8z"/></svg>
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
