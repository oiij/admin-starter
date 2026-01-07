import process from 'node:process'
import md5 from 'md5'
import { nanoid } from 'nanoid'

const ENV = process.env

export const MONGODB_URI = ENV.MONGODB_URI ?? 'mongodb+srv://antrioe:cc995801@cluster0.vpoxgon.mongodb.net/admin-starter?appName=Cluster0'
export const REDIS_URI = ENV.MONGODB_URI ?? 'redis-12453.c10.us-east-1-3.ec2.cloud.redislabs.com'

export const PORT = ENV.PORT ? Number(ENV.PORT) : 5633
export const HOST = ENV.HOST ?? '127.0.0.1'
export const PUBLIC_DIR = ENV.PUBLIC_DIR ?? 'static'

export const WS_PORT = ENV.WS_PORT ? Number(ENV.WS_PORT) : 5631
export const WS_PATH = ENV.WS_PATH ?? '/_ws'

export const JWT = {
  PRIVATE_KEY: ENV.PRIVATE_KEY ?? nanoid(),
  CRYPTO_KEY: ENV.CRYPTO_KEY ?? nanoid(32),
  CRYPTO_IV: ENV.CRYPTO_IV ?? nanoid(16),
}
export const QINIU = {
  accessKey: 'Nexbtd-8YPIFc0NdtykIGDw-FDl30w_cRAMFuDXT',
  secretKey: '-z6b6DKAmjgXr5iM_HypAWLzvwgy4E4bCVCNCk89',
  bucket: 'e-chat',
  region: 'qiniu.zone.Zone_z1',
  expires: 7200,
  publicBucketDomain: '',
  privateBucketDomain: '',
  cdn: 'http://slwbh2ys8.hb-bkt.clouddn.com/',
}

export const SUPER_ADMIN = {
  _id: nanoid(),
  phone: '13000000000',
  nickname: '管理员',
  password: md5('admin'),
}
