import { LoadUserAccountRepository, SaveFromFacebookAccountRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PostgresUser } from '../entities'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFromFacebookAccountRepository.Params
type SaveResult = SaveFromFacebookAccountRepository.Result

export class PostgresUserAccountRepository implements LoadUserAccountRepository, SaveFromFacebookAccountRepository {
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

  async saveWithFacebook (params: SaveParams): Promise<SaveResult> {
    let id: string

    if (params.id === undefined) {
      const postgresUser = await this.postgresUserRepo.save({
        email: params.email,
        name: params.name,
        facebookId: params.facebookId
      })
      id = postgresUser.id.toString()
    } else {
      id = params.id
      await this.postgresUserRepo.update({ id: parseInt(params.id) }, {
        name: params.name,
        facebookId: params.facebookId
      })
    }

    return { id }
  }
}
