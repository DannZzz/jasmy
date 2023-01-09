import { Router } from 'express'
import { testingCors } from './cors.js'
import AuthRouter from './private/auth.js'

const ApiRouter = Router()

ApiRouter.use('/auth', testingCors(), AuthRouter)

export default ApiRouter
