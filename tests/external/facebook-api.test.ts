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
    const facebookUser = await sut.loadUser({ token: 'EAAfQsKkZAsm0BAEJbZB29ZBfU163mOwqNTwG2ERF5mU5KkQXLS0VNA9oa1xKCx6TEVdmMRz56LuBy1yrfKc7XZCeD2OUmLmgjlo5ZAgvuJzlvdfZASsUA0z5x3oCvbXepXb2nL5XbdJ6J3wsLgzEIlcX1x7eX43e6sf4wdUMKPSnVHKdhAhTTo5udZBOZC1otLJGI7CcMQLAlMYAmNQeeTf7' })
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
