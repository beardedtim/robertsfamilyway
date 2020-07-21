import bcrypt from 'bcrypt'
import { DB } from '../infrastructure/db'

interface NewUser {
  email: string
  password: string
}

interface ValidateUser {
  email: string
  password: string
}

const safe_keys = ['email', 'id', 'created_at']

export const create = async (user: NewUser, db: DB) => {
  user.password = await bcrypt.hash(user.password, 10)

  const [saved] = await db.into('users').insert(user).returning(safe_keys)

  return saved
}

export const validate_password = async (user: ValidateUser, db: DB) => {
  const { password: hashed } = await db.from('users').where({ email: user.email }).first().returning('password')

  if (!hashed) {
    throw new TypeError('Record Not Found')
  }

  return bcrypt.compare(user.password, hashed)
}

export const get_by_email = (email: string, db: DB) => db.from('users').where({ email }).first().select(safe_keys)