import { SvgXml } from 'react-native-svg'
import { ColorValue, View, ViewProps } from 'react-native'

const xml = `
<svg width="200" height="200" viewBox="0 0 1024 1024">
    <path d="M893.3 293.3 730.7 130.7c-12-12-28.3-18.7-45.3-18.7H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 176h256v112H384V176zm128 554c-79.5 0-144-64.5-144-144s64.5-144 144-144 144 64.5 144 144-64.5 144-144 144z"/>
    <path d="M512 506c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80z"/>
</svg>
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
