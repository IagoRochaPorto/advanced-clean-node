import { PostgresUser } from '@/infra/postgres/entities'
import { PostgresUserAccountRepository } from '@/infra/postgres/repos/user-account'
import { newDb, IBackup, IMemoryDb } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'

const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/postgres/entities/index.ts']
  })

  await connection.synchronize()
  return db
}

describe('PostgresUserAccountRepository', () => {
  describe('load', () => {
    let sut: PostgresUserAccountRepository
    let postgresUserRepo: Repository<PostgresUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PostgresUser])
      backup = db.backup()
      postgresUserRepo = getRepository(PostgresUser)
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
      sut = new PostgresUserAccountRepository()
    })

    it('should return an account if email exists', async () => {
      await postgresUserRepo.save({ email: 'existing_email' })

      const account = await sut.load({ email: 'existing_email' })
      expect(account).toEqual({ id: '1' })
    })

    it('should return undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'unexisting_email' })
      expect(account).toEqual(undefined)
    })
  })
})
