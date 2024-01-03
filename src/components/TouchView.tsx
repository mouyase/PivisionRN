import { TouchableHighlight, TouchableHighlightProps } from 'react-native'

const TouchView = (props: TouchableHighlightProps) => {
  const { onPress = () => {}, children } = props
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.3}
      underlayColor={'#FFF'}
      {...props}>
      {children}
    </TouchableHighlight>
  )
}
export default TouchView
