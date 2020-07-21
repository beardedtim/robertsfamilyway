import { verify } from 'jsonwebtoken'
import getenv from 'getenv'
import { MiddlewareFN } from './'
import * as Errors from './errors'

import corsHeaders from '@koa/cors'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'
import { Logger } from 'pino'
import multer from '@koa/multer'
import Static from 'koa-static'

export const security_headers = helmet
export const cors = corsHeaders
export const parse_body = bodyParser
export const static_files = Static

export const file_upload = multer({
  dest: getenv.string('FILE_UPLOAD_PATH', '/tmp'),
})

export const error_handling: MiddlewareFN = () => async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    const code = e.status || e.code
    const status = code > 99 && code < 600 ? code : 500
    const message = e.message
    const oldBody = ctx.body
    const oldStatus = ctx.status

    ctx.status = status
    ctx.body = {
      error: {
        message,
        status,
        oldBody,
        oldStatus,
      },
    }
  }
}

export const not_found: MiddlewareFN = () => async (ctx, next) => {
  await next()
  if (!ctx.status || !ctx.body) {
    throw new Errors.NotFound()
  }
}

export const authentication: MiddlewareFN = () => async (ctx, next) => {
  let token

  if (ctx.headers.authorization) {
    token = ctx.headers.authorization.replace('Bearer ', '')
  } else {
    token = ctx.cookies.get('authorization')
  }

  let user

  if (token) {
    user = await verify(token, getenv.string('JWT_SECRET'))
  }

  ctx.user = user

  return next()
}

export const request_time: MiddlewareFN = () => async (ctx, next) => {
  const start = Date.now()

  await next()

  ctx.set('X-Request-Time', `${Date.now() - start}`)
}

export const log_request: MiddlewareFN = (log: Logger) => async (ctx, next) => {
  await next()
  log.info({
    req: ctx.request,
    res: ctx.response,
    status: ctx.status,
    time: ctx.get('X-Request-Time'),
    body: ctx.body,
  })
}
