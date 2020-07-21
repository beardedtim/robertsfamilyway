import Koa from 'koa'
import path from 'path'
import EJSRenderer from 'koa-ejs'

export const renderer = (app: Koa) =>
  EJSRenderer(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    debug: true,
    cache: false,
    async: true,
  })

export default renderer
