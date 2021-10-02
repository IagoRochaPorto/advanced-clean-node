import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook API integration tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })

  it('should return a Facebook User if token is valid', async () => {
    const facebookUser = await sut.loadUser({ token: 'EAAfQsKkZAsm0BAIxeWZCKLkZBEEPLNJ4lEZBZBY4TmYCdRmmbwZA4Ni94whyYoImtlWJ7ZC64xIkY2WB6kHDAS88IKeFb6nHvaPY8GX3ZAbdH4I5ZAas4G5gUPFQ3LPbWgru4hIPvLbhMcFvzdKJEZB3t4nCqkzMJLI9NhbHs1Sw4hZAZCFgsSNyiYCBhrXGEiGvVa5OvXMZAo8wQTwZDZD' })
    expect(facebookUser).toEqual({
      facebookId: '107865394999287',
      email: 'open_jieaywa_user@tfbnw.net',
      name: 'Iago Rocha de teste'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const facebookUser = await sut.loadUser({ token: 'invalid_token' })
    expect(facebookUser).toBeUndefined()
  })
})
