import { LoadUserAccountRepository, SaveFromFacebookAccountRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PostgresUser } from '../entities'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFromFacebookAccountRepository.Params
type SaveResult = SaveFromFacebookAccountRepository.Result

export class PostgresUserAccountRepository implements LoadUserAccountRepository, SaveFromFacebookAccountRepository {
  private readonly postgresUserRepo = getRepository(PostgresUser)
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const postgresUser = await this.postgresUserRepo.findOne({ email })

    if (postgresUser !== undefined) {
      return {
        id: postgresUser.id.toString(),
        name: postgresUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveParams): Promise<SaveResult> {
    let resultId: string

    if (id === undefined) {
      const postgresUser = await this.postgresUserRepo.save({ email, name, facebookId })
      resultId = postgresUser.id.toString()
    } else {
      resultId = id
      await this.postgresUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }

    return { id: resultId }
  }
}
