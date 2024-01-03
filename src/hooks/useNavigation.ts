import { useNavigation as useNavigationOrigin } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

const useNavigation = () => {
  return useNavigationOrigin<StackNavigationProp<any>>()
}
export default useNavigation
