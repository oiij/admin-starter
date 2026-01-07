import { definePlugin, HTTPError } from 'h3'
import { createClient } from 'redis'
import { REDIS_URI } from '../config'

import { logger } from './logger.plugin'

function parseRedisInfo(infoText: string) {
  const result: Record<string, any> = {}
  let currentSection: string | null = null

  infoText.split('\n').forEach((line) => {
    line = line.trim()
    if (!line)
      return

    if (line.startsWith('#')) {
      currentSection = line.slice(1).trim().toLowerCase()
      result[currentSection] = {}
      return
    }

    const [key, ...valueParts] = line.split(':')
    if (!key || valueParts.length === 0)
      return

    const value = valueParts.join(':').trim()
    const convertedValue = convertValue(value)

    if (currentSection && result[currentSection]) {
      result[currentSection][key] = convertedValue
    }
    else {
      result[key] = convertedValue
    }
  })

  return result
}

// 类型转换辅助函数
function convertValue(value: string) {
  if (value === '')
    return null

  // 检查是否可能是数字
  const num = Number(value)
  if (!Number.isNaN(num) && value.trim() !== '') {
    // 检查是否为有限数字且在安全范围内
    if (Number.isFinite(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER) {
      return num
    }
  }

  return value
}
export const redis = createClient({
  username: 'admin-starter',
  password: 'cC995801.',
  socket: {
    host: REDIS_URI,
    port: 12453,
  },
})
redis.on('error', (err) => {
  logger.error('redis error:', err)
})

export const redisPlugin = definePlugin(async (h3) => {
  h3.use(async () => {
    const ping = await redis.ping()
    if (ping !== 'PONG') {
      throw new HTTPError({
        status: 400,
        statusMessage: 'Redis 连接失败',
      })
    }
  })

  redis.connect().then(async () => {
    h3.use((handler) => {
      handler.context.redisReady = true
    })
    const info = await redis.info()

    logger.success(`redis connected`, parseRedisInfo(info).server.redis_version)
  }).catch((err) => {
    logger.error('redis connect error:', err)
  })
})
