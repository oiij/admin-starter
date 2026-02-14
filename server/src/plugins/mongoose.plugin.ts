import { definePlugin, HTTPError } from 'h3'
import mongoose from 'mongoose'
import { MONGODB_URI } from '../config'
import { logger } from './logger.plugin'

export const mongoosePlugin = definePlugin(async (h3) => {
  h3.use(() => {
    if (mongoose.STATES.connected !== 1) {
      throw new HTTPError({
        status: 400,
        statusMessage: 'MongoDB 连接失败',
      })
    }
  })

  mongoose.connect(MONGODB_URI, {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    },
  }).then((res) => {
    logger.success(`db connected ${res.version}`)
  }).catch((err) => {
    logger.error('db connect error', err)
  })
})
