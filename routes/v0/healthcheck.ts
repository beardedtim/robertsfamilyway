import Router from '../../server/router'

const router = Router()

const boot_time = Date.now()

router.get('/', async (ctx) => {
  const db_connected = await ctx.db.raw('SELECT NOW()')

  ctx.status = 200
  ctx.body = {
    data: {
      message: 'DB healthy',
      uptime: Date.now() - boot_time
    }
  }
})

export default router