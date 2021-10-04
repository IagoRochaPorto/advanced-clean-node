import { PostgresUserAccountRepository } from '@/infra/postgres/repos'

export const makePostgresUserAccountRepository = (): PostgresUserAccountRepository => {
  return new PostgresUserAccountRepository()
}
