import { MiddlewareFN } from '../server'
import * as Errors from '../routes/errors'

export const is_overlord: MiddlewareFN = () => (ctx, next) => {
  if (!ctx.user || ctx.user.iss !== 'OVERLORD') {
    throw new Errors.NotAuthorized()
  }

  return next()
}