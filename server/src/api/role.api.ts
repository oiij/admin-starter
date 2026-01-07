import type { RoleDocumentAggregate } from '../models/role.mode'
import { defineEventHandler, H3, readValidatedBody } from 'h3'
import { Types } from 'mongoose'
import { RoleModel } from '../models/role.mode'
import { dateToLocalString, zodError } from '../utils'
import { roleCreateZod, roleDeleteZod, roleFindZod, roleUpdateZod } from '../zod'

const BASE = '/role/'
const router = new H3()
router.post(`${BASE}create`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, roleCreateZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const result = await RoleModel.create(body.data)
  return {
    msg: '创建成功',
    result,
  }
}))
router.post(`${BASE}delete`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, roleDeleteZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const ids = Array.isArray(body.data._id) ? body.data._id : [body.data._id].map(m => new Types.ObjectId(m))
  const result = await RoleModel.updateMany({ _id: { $in: ids } }, {
    deleted: true,
  }).exec()
  return {
    msg: '删除成功',
    result,
  }
}))
router.post(`${BASE}update`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, roleUpdateZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const result = await RoleModel.findByIdAndUpdate(body.data._id, {
    ...body.data,
  }).exec()
  return {
    msg: '更新成功',
    result,
  }
}))
router.post(`${BASE}find`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, roleFindZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const page = body.data.page ?? 1
  const limit = body.data.limit ?? 10
  const skip = (page - 1) * limit
  const query = body.data.query ?? ''

  const result = await RoleModel.aggregate<{ count: number, list: RoleDocumentAggregate[] }>()
    .match({
      deleted: false,
      name: { $regex: query, $options: 'i' },
    })
    .sort({ createdAt: -1 })
    .facet({
      count: [{ $count: 'count' }],
      list: [{ $skip: skip }, { $limit: limit }, {
        $project: {
          name: 1,
          access: 1,
          disabled: 1,
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

export default router
