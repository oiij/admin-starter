import { definePlugin, HTTPError } from 'h3'
import mongoose from 'mongoose'
import { MONGODB_URI } from '../config'
import { logger } from './logger.plugin'

export const mongoosePlugin = definePlugin(async (h3) => {
  let isConnected = false
  h3.use(() => {
    if (!isConnected) {
      throw new HTTPError({
        status: 400,
        statusMessage: 'MongoDB 连接失败',
      })
    }
  })

  mongoose.connect(MONGODB_URI, {
    dbName: 'admin-starter',
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    },
  }).then((res) => {
    isConnected = true
    logger.success(`db connected ${res.version}`)
  }).catch((err) => {
    isConnected = false
    logger.error('db connect error', err)
  })
})
