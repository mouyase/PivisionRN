import qs from 'qs'
import Pixiv from '@/values/Pixiv'

class FetchClass {
  private constructor() {}

  private static _instance: FetchClass = new FetchClass()
  static get instance(): FetchClass {
    return this._instance
  }

  private _host = Pixiv.API_HOST

  set host(value: string) {
    this._host = value
  }

  get host(): string {
    return this._host
  }

  public get = async (url: string, params = {}) => {
    return fetch(Fetch.host + url, {
      method: 'GET',
      headers: {
        'accept-language': 'zh_CN',
        'app-accept-language': 'zh-hans',
        'app-os': 'android',
        'app-os-version': '12',
        'app-version': '6.5.0',
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(params),
    }).then(value => {
      return value.json()
    })
  }
}

const Fetch = FetchClass.instance
export default Fetch
