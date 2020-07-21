/**
 * Middleware that each route might need
 * 
 * This is different than the server/middleware
 * in that server/middleware is global for each
 * route while this is to be used on a per-route
 * or per-router basis
 */
import { validate } from 'jsonschema'
import { MiddlewareFN } from '../server' 
import * as Errors from './errors'

export const set_version_number: MiddlewareFN = (version: number) => (ctx, next) => {
  ctx.set('X-API-Version', `${version}`)

  return next()
}

const is_overlord_request = (ctx: any) => ctx.user.is_overlord === true

export const is_overlord: MiddlewareFN = () => async (ctx, next) => {
  if (!ctx.user) {
    throw new Errors.NotAuthorized()
  }

  if (!is_overlord_request(ctx)) {
    throw new Errors.NotAuthorized()
  }
  return next()
}

export const validate_body: MiddlewareFN = (schema: Object) => async (ctx, next) => {
  const valid = await validate(ctx.request.body, schema)

  if (valid.errors.length) {
    throw new Errors.BadInput(valid.errors)
  }

  return next()
}