import { useNavigation as useNavigationOrigin } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const useNavigation = () => {
  return useNavigationOrigin<NativeStackNavigationProp<any>>()
}
export default useNavigation
