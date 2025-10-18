import { createError, createRouter, defineEventHandler, readValidatedBody } from 'h3'
import { object, string } from 'zod'
import user from '../data/user.json'
import { getAuthorization, paramsError, sign } from '../utils'

const router = createRouter()
router.post('/login', defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, object({
    username: string({ required_error: '缺少账号名称' }),
    password: string({ required_error: '缺少密码' }),
  }).safeParse)
  if (!body.success) {
    throw paramsError(body)
  }
  const { username, password } = body.data
  if (username === 'admin' && password === '21232f297a57a5a743894a0e4a801fc3') {
    return {
      msg: '验证成功',
      token: sign({ _id: username }),
      userInfo: user,
      permission: [],
    }
  }
  return createError({
    status: 401,
    statusMessage: 'Verification Failed',
    message: '验证失败',
  })
}))
router.post('/status', defineEventHandler(async (event) => {
  const token = getAuthorization(event)
  return {
    token,
    userInfo: user,
    permission: [],
  }
}))
export default router
