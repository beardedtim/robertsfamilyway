import Knex from 'knex'
import getenv from 'getenv'

const defaultConfig = require('../../knexfile')

const config: Knex.Config = {
  ...defaultConfig,
  debug: getenv.string('NODE_ENV', '') !== 'production',
  connection: {
    host: getenv.string('DB_HOST'),
    port: getenv.int('DB_PORT'),
    user: getenv.string('DB_USER'),
    password: getenv.string('DB_PASS'),
    database: getenv.string('DB_NAME'),
  },
}

export const db = Knex(config)

export type DB = typeof db

export default db
