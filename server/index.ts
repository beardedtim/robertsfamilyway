import Koa from 'koa'
import getenv from 'getenv'
import path from 'path'

import db, { DB } from '../infrastructure/db'
import log, { Logger } from '../infrastructure/log'
import cache from '../infrastructure/cache'
import textSearch, { TextSearch } from '../infrastructure/text-search'

import renderer from '../client/renderer'
import ViewRoutes from '../client/routes'

import * as useCases from '../use-cases'
import * as Middleware from './middleware'
import API from '../routes'

export interface ICustomAppContext {
  db: DB
  log: Logger
  useCases: typeof useCases
  textSearch: TextSearch
  cache: typeof cache
  user?: any
  render: (path: string, opts?: object) => void
}

const server = new Koa<any, ICustomAppContext>()

/**
 * Add Secret Keys
 */
server.keys = [getenv.string('COOKIE_SECRET')]
/**
 * Set Context of Server
 */
server.context.db = db
server.context.log = log
server.context.cache = cache
server.context.useCases = useCases
server.context.textSearch = textSearch

renderer(server as any)

/**
 * Add General Pre-middleware
 */
server
  .use(Middleware.error_handling())
  .use(Middleware.parse_body())
  .use(Middleware.not_found())
  .use(Middleware.log_request(log))
  .use(Middleware.request_time())
  .use(Middleware.security_headers())
  .use(Middleware.cors())
  .use(Middleware.authentication())
  .use(API.routes())
  .use(ViewRoutes.routes())
  .use(
    Middleware.static_files(path.resolve(__dirname, '..', 'public'), {
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=604800, immutable')
      },
    })
  )

export type Server = typeof server
export type MiddlewareFN = (
  ...args: any[]
) => Koa.Middleware<unknown, ICustomAppContext>

export default server
