import Router from '../../server/router'
import { validate_body } from '../middleware'
import db from '../../infrastructure/db'

const router = Router()

const create_blog_post_schema = {
  title: 'New Blog Post',
  type: 'object',
  required: ['title', 'slug', 'body'],
  properties: {
    title: {
      type: 'string'
    },
    slug: {
      type: 'string'
    },
    body: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    hero: {
      type: 'string'
    }
  }
}

router.get('/:id', async (ctx) => {
  const data = await ctx.useCases.Blog.getById(ctx.params.id, ctx.db)
  
  ctx.status = 200
  ctx.body = {
    data
  }
}).post('/', validate_body(create_blog_post_schema), async (ctx) => {
  const data = await ctx.useCases.Blog.create(ctx.request.body, ctx.db)

  ctx.status = 201
  ctx.body = {
    data
  }
})

export default router