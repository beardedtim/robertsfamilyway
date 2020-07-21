import Server from './server'
import getenv from 'getenv'

const port = getenv.int('PORT')

Server.listen(port, () => {
  Server.context.log.info({ port }, 'Service Started')
})
