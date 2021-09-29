import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { newDb, IBackup } from 'pg-mem'
import { Column, Entity, getRepository, PrimaryGeneratedColumn, Repository, getConnection } from 'typeorm'

class PostgresUserAccountRepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const postgresUserRepo = getRepository(PostgresUser)
    const postgresUser = await postgresUserRepo.findOne({ email: params.email })

    if (postgresUser !== undefined) {
      return {
        id: postgresUser.id.toString(),
        name: postgresUser.name ?? undefined
      }
    }
  }
}

@Entity({ name: 'usuarios' })
class PostgresUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column()
  email!: string

  @Column({ name: 'id_facebook', nullable: true })
  facebookId?: string
}

describe('PostgresUserAccountRepository', () => {
  describe('load', () => {
    let sut: PostgresUserAccountRepository
    let postgresUserRepo: Repository<PostgresUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PostgresUser]
      })

      await connection.synchronize()
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
