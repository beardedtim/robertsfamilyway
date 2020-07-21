import jwt from 'jsonwebtoken'
import getenv from 'getenv'

export const create = (data: any) => jwt.sign(data, getenv.string('JWT_SECRET'), {
  issuer: 'OVERLORD',
})