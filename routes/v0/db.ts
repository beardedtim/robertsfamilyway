import Router from '../../server/router'

import { is_overlord } from '../middleware'

const router = Router()

router.post('/migrate', is_overlord(), async (ctx, next) => {
  const data = await ctx.useCases.DB.migrate(ctx.db)

  ctx.status = 201
  ctx.body = { data }
}).post('/rollback', is_overlord(), async (ctx, next) => {
  const data = await ctx.useCases.DB.rollback(ctx.db)

  ctx.status = 201
  ctx.body = { data }
})

export default router