import qs from 'qs'
import Pixiv from '@/values/Pixiv'
import PixivUtils from '@/utils/PixivUtils'

class FetchClass {
  private constructor() {}

  private static _instance: FetchClass = new FetchClass()
  static get instance(): FetchClass {
    return this._instance
  }

  private _host = Pixiv.API_HOST
  private _token = ''

  set host(value: string) {
    this._host = value
  }

  get host(): string {
    return this._host
  }

  get token(): string {
    return this._token
  }

  set token(value: string) {
    this._token = value
  }

  public get = async (url: string, originParams = {}) => {
    const headers = {
      ...PixivUtils.getHeader(),
      ...(this._token ? { Authorization: `Bearer ${this._token}` } : {}),
    }
    const params = qs.stringify(originParams)
    console.info(
      '\x1b[32m' +
        '[Fetch]' +
        '\n\x1b[34m' +
        'url: ' +
        url +
        '\n\x1b[33m' +
        'headers: ' +
        JSON.stringify(headers) +
        '\n\x1b[36m' +
        'body: ' +
        JSON.stringify(originParams),
    )
    return fetch(Fetch.host + url + '?' + params, {
      method: 'GET',
      headers,
    }).then((value) => {
      return value.json()
    })
  }
  public post = async (url: string, originBody = {}) => {
    const headers = {
      ...PixivUtils.getHeader(),
      ...(this._token ? { Authorization: `Bearer ${this._token}` } : {}),
    }
    const body = qs.stringify(originBody)
    console.info(
      '\x1b[32m' +
        '[Fetch]' +
        '\n\x1b[34m' +
        'url: ' +
        url +
        '\n\x1b[33m' +
        'headers: ' +
        JSON.stringify(headers) +
        '\n\x1b[36m' +
        'body: ' +
        JSON.stringify(body),
    )
    return fetch(Fetch.host + url, {
      method: 'POST',
      headers,
      body,
    }).then((value) => {
      return value.json()
    })
  }
}

const Fetch = FetchClass.instance
export default Fetch
