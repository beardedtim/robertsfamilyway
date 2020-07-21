import { DB } from '../infrastructure/db'
import log from '../infrastructure/log'
import logAsync from '../utils/logAsync'

const dbLog = log.child({
  name: 'DB_USE_CASES',
})

type DBUseCase = (db: DB) => Promise<any>

export const migrate: DBUseCase = logAsync(
  dbLog.trace,
  'Migrate DB',
  (db: DB) => db.migrate.latest()
)

export const rollback: DBUseCase = logAsync(
  dbLog.trace,
  'Rollback DB',
  (db: DB) => db.migrate.rollback()
)
