import type { UserDocumentAggregate } from '../models/user.model'
import { defineEventHandler, H3, readValidatedBody } from 'h3'
import { Types } from 'mongoose'
import { UserModel } from '../models/user.model'
import { dateToLocalString, zodError } from '../utils'
import { userCreateZod, userDeleteZod, userFindZod, userUpdateZod } from '../zod/user.zod'

const BASE = '/user/'
const router = new H3()
router.post(`${BASE}create`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, userCreateZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const result = await UserModel.create({
    ...body.data,
  })
  return {
    msg: '创建成功',
    result,
  }
}))
router.post(`${BASE}delete`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, userDeleteZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const ids = Array.isArray(body.data._id) ? body.data._id : [body.data._id].map(m => new Types.ObjectId(m))
  const result = await UserModel.updateMany({ _id: { $in: ids } }, {
    deleted: true,
  }).exec()
  return {
    msg: '删除成功',
    result,
  }
}))
router.post(`${BASE}update`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, userUpdateZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const result = await UserModel.findByIdAndUpdate(body.data._id, {
    ...body.data,
  }).exec()
  return {
    msg: '更新成功',
    result,
  }
}))
router.post(`${BASE}find`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, userFindZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const page = body.data.page ?? 1
  const limit = body.data.limit ?? 10
  const skip = (page - 1) * limit
  const query = body.data.query ?? ''

  const result = await UserModel.aggregate<{ count: number, list: UserDocumentAggregate[] }>()
    .match({
      deleted: false,
      $or: [
        { phone: { $regex: query, $options: 'i' } },
        { nickname: { $regex: query, $options: 'i' } },
      ],
    })
    .sort({ createdAt: -1 })
    .facet({
      count: [{ $count: 'count' }],
      list: [{ $skip: skip }, { $limit: limit }, {
        $lookup: {
          from: 'roles',
          localField: '_roleId',
          foreignField: '_id',
          as: 'role',
        },
      }, {
        $unwind: {
          path: '$role',
          preserveNullAndEmptyArrays: true,
        },
      }, {
        $project: {
          _roleId: 1,
          phone: 1,
          nickname: 1,
          avatar: 1,
          disabled: 1,
          roleName: '$role.name',
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
