import { PostgresUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { getConnection } from 'typeorm'
import { IBackup } from 'pg-mem'
import request from 'supertest'

describe('Login Routes', () => {
  describe('POST /login/facebook', () => {
    let backup: IBackup
    const loadUserSpy = jest.fn()

    jest.mock('@/infra/apis/facebook', () => ({
      FacebookApi: jest.fn().mockReturnValue({
        loadUser: loadUserSpy
      })
    }))

    beforeAll(async () => {
      const db = await makeFakeDb([PostgresUser])
      backup = db.backup()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
    })
    it('Should return 200 with AccessToken', async () => {
      loadUserSpy.mockResolvedValue({ facebookId: 'any_fb_id', name: 'any_name', email: 'any_email' })
      await request(app)
        .post('/api/login/facebook')
        .send({ token: 'valid_token' })
        .expect(200)
    })
  })
})
