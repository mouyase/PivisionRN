import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import CryptoJS from 'crypto-js'
import Pixiv from '@/values/Pixiv'
import RNFetchBlob from 'rn-fetch-blob'

const getExtension = (url: string) => {
  const arr = url.split('.')
  return arr[arr.length - 1]
}

type DownloadOptions = {
  url: string
  name?: string
  album?: string
}
const download = async ({
  url,
  name = CryptoJS.MD5(url).toString(),
  album = 'Photo',
}: DownloadOptions) => {
  try {
    const dirs = RNFetchBlob.fs.dirs
    const downloadPath = `${dirs.CacheDir}/${name}.${getExtension(url)}`
    const downloadResult = await RNFetchBlob.config({
      path: downloadPath,
    })
      .fetch('GET', url, {
        Referer: Pixiv.REFERER,
      })
      .then((res) => {
        return res.path()
      })
    let saveResult = await CameraRoll.saveAsset('file://' + downloadPath, {
      type: 'photo',
      album: album,
    })
    if (downloadResult && saveResult) {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  } catch (e) {
    return Promise.reject(e)
  }
}
export default { download }
