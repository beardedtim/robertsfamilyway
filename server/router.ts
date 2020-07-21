/**
 * A Router that is typed with our specific context
 * and state
 *
 * This way, we don't have to import the type, we can
 * just import the router. And! We can also do any
 * middleware that we need beforehand
 */
import Router from '@koa/router'
import { ICustomAppContext } from './'

export default (...args: any[]) => new Router<any, ICustomAppContext>(...args)
