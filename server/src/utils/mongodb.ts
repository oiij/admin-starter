import mongoose from 'mongoose'
import { logger } from '.'
import { MONGODB_URI } from '../config'

export async function setupMongoDB(uri?: string) {
  return mongoose.connect(uri ?? MONGODB_URI).then((res) => {
    logger.success(`db connected ${res.version}`)
  }).catch((err) => {
    logger.error(err)
  })
}
