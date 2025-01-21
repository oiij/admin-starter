/* eslint-disable no-console */
import { createClient } from 'redis'
import { logger } from '.'

export const client = createClient()

client.on('error', err => console.log('Redis Client Error', err))

export function setupRedis() {
  client.connect().then((_res) => {
    logger.success(`redis connected `)
  }).catch((err) => {
    logger.error(err)
  })
}
