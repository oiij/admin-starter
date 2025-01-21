import { to } from 'await-to-js'
import { createError, defineEventHandler } from 'h3'
import { getAuthorization, verify } from '../utils'

interface InjectTokenOptions {
  excludePath?: string[]
}
export function injectToken(options?: InjectTokenOptions) {
  const { excludePath = ['/api/login'] } = options ?? {}
  return defineEventHandler(async (event) => {
    if (!excludePath.includes(event.path)) {
      const token = getAuthorization(event)
      const [err, jwt] = await to(verify(token))
      if (err || !jwt) {
        throw createError({
          status: 401,
          statusMessage: 'No Permission',
          message: 'Token无效',
        })
      }
      event.context._id = jwt._id
    }
  })
}
