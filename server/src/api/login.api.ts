import { defineEventHandler, getRequestIP, H3, HTTPError, readValidatedBody } from 'h3'
import { Types } from 'mongoose'
import { customAlphabet, nanoid } from 'nanoid'
import { number, object, string } from 'zod'
import { SUPER_ADMIN } from '../config'
import { LoginRecordModel } from '../models/login.record.model'
import { RoleModel } from '../models/role.mode'
import { UserModel } from '../models/user.model'
import { dateToLocalString, isSuperAdmin, sign, zodError } from '../utils'
import { memoryStorage } from '../utils/memory-storage'
import { captchaLoginZod, captchaZod, loginZod } from '../zod'

const router = new H3()
router.post('/login', defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, loginZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const { phone, password } = body.data

  if (isSuperAdmin(phone, password)) {
    return {
      msg: '验证成功',
      token: sign({ _id: SUPER_ADMIN._id, _sessionId: SUPER_ADMIN._id, isSuperAdmin: true }),
      userInfo: SUPER_ADMIN,
      role: [],
      isSuperAdmin: true,
    }
  }
  const user = await UserModel.findOne({ deleted: false, phone }).exec()

  if (!user) {
    throw new HTTPError({
      status: 401,
      statusMessage: '账号不存在',
    })
  }
  if (user.disabled) {
    throw new HTTPError({
      status: 401,
      statusMessage: '账号已被禁用',
    })
  }
  if (!user.password) {
    throw new HTTPError({
      status: 401,
      statusMessage: '账号未设置密码',
    })
  }
  if (user.password !== password) {
    throw new HTTPError({
      status: 401,
      statusMessage: '密码错误',
    })
  }
  const _sessionId = nanoid()
  const role = await RoleModel.findOne({ deleted: false, _id: user._roleId }).exec()
  const ip = getRequestIP(handler)
  const userAgent = handler.req.headers.get('user-agent')
  await LoginRecordModel.create({
    _targetId: user._id,
    ip,
    userAgent,
  })
  const userInfo = {
    _id: user._id,
    _roleId: user._roleId,
    phone: user.phone,
    nickname: user.nickname,
    avatar: user.avatar,
    roleName: role?.name ?? '',
  }
  return {
    msg: '验证成功',
    token: sign({ _id: user._id, _sessionId }),
    userInfo,
    permission: role?.access.map(m => m.value) ?? [],
  }
}))
router.post('/captcha-login', defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, captchaLoginZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const { phone, captcha } = body.data

  const user = await UserModel.findOne({ deleted: false, phone }).exec()

  if (!user) {
    throw new HTTPError({
      status: 401,
      statusMessage: '账号不存在',
    })
  }
  if (user.disabled) {
    throw new HTTPError({
      status: 401,
      statusMessage: '账号已被禁用',
    })
  }
  const remoteCaptcha = memoryStorage.get(phone)
  if (!remoteCaptcha) {
    throw new HTTPError({
      status: 401,
      statusMessage: '验证码过期',
    })
  }
  if (remoteCaptcha !== captcha) {
    throw new HTTPError({
      status: 401,
      statusMessage: '验证码错误',
    })
  }
  const _sessionId = nanoid()
  memoryStorage.set(user._id.toString(), _sessionId, {
    EX: 60 * 3,
  })
  const role = await RoleModel.findOne({ deleted: false, _id: user._roleId }).exec()
  const ip = getRequestIP(handler)
  const userAgent = handler.req.headers.get('user-agent')
  await LoginRecordModel.create({
    _targetId: user._id,
    ip,
    userAgent,
  })
  const userInfo = {
    _id: user._id,
    _roleId: user._roleId,
    phone: user.phone,
    nickname: user.nickname,
    avatar: user.avatar,
    roleName: role?.name ?? '',
  }
  return {
    msg: '验证成功',
    token: sign({ _id: user._id, _sessionId }),
    userInfo,
    permission: role?.access.map(m => m.value) ?? [],
  }
}))
router.post('/status', defineEventHandler(async (handler) => {
  const _id = handler.context._id
  const _sessionId = handler.context._sessionId
  const isSuperAdmin = handler.context.isSuperAdmin

  if (isSuperAdmin) {
    return {
      msg: '验证成功',
      token: sign({ _id, _sessionId, isSuperAdmin }),
      userInfo: SUPER_ADMIN,
      role: [],
      isSuperAdmin: true,
    }
  }
  const _remoteSessionId = memoryStorage.get(_id)
  if (_remoteSessionId && _sessionId !== _remoteSessionId) {
    throw new HTTPError({
      status: 401,
      statusMessage: '您已在其他设备登录',
    })
  }
  const user = await UserModel.findOne({ deleted: false, _id }).exec()
  if (!user) {
    throw new HTTPError({
      status: 401,
      statusMessage: '账号不存在',
    })
  }
  if (user.disabled) {
    throw new HTTPError({
      status: 401,
      statusMessage: '账号已被禁用',
    })
  }
  const role = await RoleModel.findOne({ deleted: false, _id: user._roleId }).exec()
  const userInfo = {
    _id: user._id,
    _roleId: user._roleId,
    phone: user.phone,
    nickname: user.nickname,
    avatar: user.avatar,
    roleName: role?.name ?? '',
  }
  return {
    msg: '验证成功',
    token: sign({ _id: user._id, _sessionId }),
    userInfo,
    permission: role?.access.map(m => m.value) ?? [],
  }
}))
router.post('/login-record', defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, object({
    page: number().optional(),
    limit: number().optional(),
    _id: string(),
  }).safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const page = body.data.page ?? 1
  const limit = body.data.limit ?? 10
  const skip = (page - 1) * limit

  const result = await LoginRecordModel.aggregate()
    .match({ _targetId: new Types.ObjectId(body.data._id) })
    .facet({
      count: [{ $count: 'count' }],
      list: [{ $skip: skip }, { $limit: limit }, {
        $lookup: {
          from: 'Users',
          localField: '_targetId',
          foreignField: '_id',
          as: 'user',
        },
      }, {
        $project: {
          ip: 1,
          userAgent: 1,
          user: { $arrayElemAt: ['$user', 0] },
          ...dateToLocalString(['createdAt', 'updatedAt']),
        },
      }],
    })
    .unwind('count')
    .project({
      count: '$count.count',
      list: 1,
    })
  return {
    msg: '查询成功',
    page,
    limit,
    ...result[0] ?? {},
  }
}))
router.post('/captcha', defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, captchaZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const { phone } = body.data
  const captcha = customAlphabet('1234567890', 6)()
  memoryStorage.set(phone, captcha, {
    EX: 60 * 5,
  })
  return {
    msg: '验证码发送成功',
    phone: `${phone.slice(0, 3)}****${phone.slice(-4)}`,
    captcha,
    expire: 60 * 5,
  }
}))
export default router
