import { Express, Router } from 'express'
import { loginRouter } from '@/main/routes'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  router.use(loginRouter)
  app.use(router)
}
