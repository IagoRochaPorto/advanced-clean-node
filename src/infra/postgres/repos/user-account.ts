import { LoadUserAccountRepository, SaveFromFacebookAccountRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PostgresUser } from '../entities'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFromFacebookAccountRepository.Params

export class PostgresUserAccountRepository implements LoadUserAccountRepository {
  private readonly postgresUserRepo = getRepository(PostgresUser)
  async load (params: LoadParams): Promise<LoadResult> {
    const postgresUser = await this.postgresUserRepo.findOne({ email: params.email })

    if (postgresUser !== undefined) {
      return {
        id: postgresUser.id.toString(),
        name: postgresUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook (params: SaveParams): Promise<void> {
    if (params.id === undefined) {
      await this.postgresUserRepo.save({
        email: params.email,
        name: params.name,
        facebookId: params.facebookId
      })
    } else {
      await this.postgresUserRepo.update({ id: parseInt(params.id) }, {
        name: params.name,
        facebookId: params.facebookId
      })
    }
  }
}
