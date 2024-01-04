import RNFS, { DownloadFileOptions } from 'react-native-fs'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import Pixiv from '@/values/Pixiv'

const getExtension = (url: string) => {
  const arr = url.split('.')
  return arr[arr.length - 1]
}

const getFileName = (url: string) => {
  const file = url.split('/')
  const fileName = file[file.length - 1]
  const name = fileName.split('.')
  return name[name.length - 2]
}

type DownloadOptions = {
  url: string
  name?: string
  album?: string
}
const download = async ({
  url,
  name = getFileName(url),
  album = 'Photo',
}: DownloadOptions) => {
  try {
    const downloadPath = `${RNFS.TemporaryDirectoryPath}/${name}.${getExtension(
      url,
    )}`
    const options: DownloadFileOptions = {
      fromUrl: url,
      toFile: downloadPath,
      headers: { Referer: Pixiv.REFERER },
    }
    const downloadResult = await RNFS.downloadFile(options).promise
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
