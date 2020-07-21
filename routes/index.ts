import Router from '../server/router'
import V0 from './v0'

const API = Router({
  prefix: '/api'
})

API.use('/v0', V0.routes())

export default API