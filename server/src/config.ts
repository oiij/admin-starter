import process from 'node:process'
import md5 from 'md5'
import { nanoid } from 'nanoid'

const ENV = process.env

export const MONGODB_URI = ENV.MONGODB_URI ?? 'mongodb://localhost:27017'

export const PORT = ENV.PORT ? Number(ENV.PORT) : 5633
export const PUBLIC_DIR = ENV.PUBLIC_DIR ?? 'static'

export const WS_PORT = ENV.WS_PORT ? Number(ENV.WS_PORT) : 5631
export const WS_PATH = ENV.WS_PATH ?? '/_ws'

export const JWT = {
  PRIVATE_KEY: ENV.PRIVATE_KEY ?? nanoid(),
  CRYPTO_KEY: ENV.CRYPTO_KEY ?? nanoid(32),
  CRYPTO_IV: ENV.CRYPTO_IV ?? nanoid(16),
}

export const SUPER_ADMIN = {
  _id: nanoid(),
  phone: '13000000000',
  nickname: '管理员',
  password: md5('admin'),
}
