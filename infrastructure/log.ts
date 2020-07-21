import pino from 'pino'
import getenv from 'getenv'

export { Logger } from 'pino'

export default pino({
  name: getenv.string('SERVICE_NAME', 'regin'),
  level: getenv.string('LOG_LEVEL', 'info'),
  prettyPrint:
    getenv.string('NODE_ENV', '') === 'production'
      ? undefined
      : {
          levelFirst: true,
          suppressFlushSyncWarning: true,
        },
  serializers: pino.stdSerializers,
  redact: ['password', '*.password'],
})
