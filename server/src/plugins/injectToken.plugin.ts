import { to } from 'await-to-js'
import { definePlugin, HTTPError } from 'h3'
import { getAuthorization, verify } from '../utils'

type Options = & {
  excludePath?: string[]
}
export const injectTokenPlugin = definePlugin(async (h3, options?: Options) => {
  const { excludePath = ['/api/login', '/api/captcha-login', '/api/captcha'] } = options ?? {}
  h3.use('/api/**', async (handler) => {
    if (!excludePath.includes(handler.url.pathname)) {
      const token = getAuthorization(handler)
      const [err, jwt] = await to(verify<{ _id: string, _sessionId: string, isSuperAdmin?: boolean }>(token))
      const { _id, _sessionId, isSuperAdmin = false } = jwt ?? {}
      if (err || !_id || !_sessionId) {
        throw new HTTPError({
          status: 401,
          statusMessage: 'Token无效',
        })
      }
      handler.context._id = _id
      handler.context._sessionId = _sessionId
      handler.context.isSuperAdmin = isSuperAdmin
    }
  })
})
