import Router from '../../server/router'
import DB from './db'
import Healthcheck from './healthcheck'
import Blog from './blog-posts'

import { set_version_number } from '../middleware'

const V0 = Router()

V0.use(set_version_number(0))

V0.use('/db', DB.routes())
V0.use('/healthcheck', Healthcheck.routes())
V0.use('/blog', Blog.routes())

export default V0;