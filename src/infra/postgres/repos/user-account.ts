import { LoadUserAccountRepository, SaveFromFacebookAccountRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PostgresUser } from '../entities'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFromFacebookAccountRepository.Params
type SaveResult = SaveFromFacebookAccountRepository.Result

export class PostgresUserAccountRepository implements LoadUserAccountRepository, SaveFromFacebookAccountRepository {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const postgresUserRepo = getRepository(PostgresUser)
    const postgresUser = await postgresUserRepo.findOne({ email })

    if (postgresUser !== undefined) {
      return {
        id: postgresUser.id.toString(),
        name: postgresUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveParams): Promise<SaveResult> {
    const postgresUserRepo = getRepository(PostgresUser)
    let resultId: string

    if (id === undefined) {
      const postgresUser = await postgresUserRepo.save({ email, name, facebookId })
      resultId = postgresUser.id.toString()
    } else {
      resultId = id
      await postgresUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }

    return { id: resultId }
  }
}
