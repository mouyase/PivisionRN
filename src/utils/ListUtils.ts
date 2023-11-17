import { Dimensions } from 'react-native'

const getListItemWH = ({
  width,
  height,
  numColumns = 1,
}: {
  width: number
  height: number
  numColumns?: number
}) => {
  const screenWidth = Dimensions.get('window').width
  return {
    width: screenWidth / numColumns,
    height: (screenWidth / numColumns / width) * height,
  }
}
const ListUtils = { getListItemWH }
export default ListUtils
