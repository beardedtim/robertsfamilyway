import Router from '../../server/router'
import * as Middleware from '../middleware'
import * as Errors from '../errors'
const router = Router()

const new_user_schema = {
  title: 'New User Schema',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string'
    }
  }
}

const validate_user_schema = {
  title: 'Validate User Schema',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string'
    }
  }
}

router
  .post('/', Middleware.validate_body(new_user_schema), async ctx => {
    const data = await ctx.useCases.User.create(ctx.request.body, ctx.db)

    ctx.status = 201
    ctx.body = { data }
  }).post('/authenticate', Middleware.validate_body(validate_user_schema), async ctx => {
    const match = await ctx.useCases.User.validate_password(ctx.request.body, ctx.db)

    if(!match) {
      throw new Errors.NotAuthorized()
    }

    const user = await ctx.useCases.User.get_by_email(ctx.request.body.email, ctx.db)

    const token = await ctx.useCases.JWT.create(user)

    ctx.cookies.set('authorization', token, { signed: true })

    ctx.status = 201
    ctx.body = { data: { token } }
  })

export default router