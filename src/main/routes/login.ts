import { Router } from 'express'
import { makeFacebookLoginController } from '../factories/controllers'
import { makeExpressRouter } from '../factories/http'

export const loginRouter = (router: Router): void => {
  router.post('/login/facebook', makeExpressRouter(makeFacebookLoginController()).adapt)
}
