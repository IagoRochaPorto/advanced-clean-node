import axios from 'axios'
import { HttpGetClient } from '.'

type Params = HttpGetClient.Params

export class AxiosHttpClient implements HttpGetClient {
  async get ({ params, url }: Params): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
