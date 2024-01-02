import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const getListItemWH = ({
  width,
  height,
  numColumns = 1,
}: {
  width: number
  height: number
  numColumns?: number
}) => {
  return {
    width: screenWidth / numColumns,
    height: (screenWidth / numColumns / width) * height,
  }
}
const ListUtils = { getListItemWH }
export default ListUtils
