import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PostgresUser } from '../entities'

export class PostgresUserAccountRepository implements LoadUserAccountRepository {
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
