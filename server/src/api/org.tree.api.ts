import type { OrgTreeDocumentAggregate } from '../models/org.tree.model'
import { defineEventHandler, H3, readValidatedBody } from 'h3'
import { Types } from 'mongoose'
import { OrgTreeModel } from '../models/org.tree.model'
import { dateToLocalString, flatToTree, zodError } from '../utils'
import { orgTreeCreateZod, orgTreeDeleteZod, orgTreeFindZod, orgTreeUpdateZod } from '../zod/org.tree.zod'

const BASE = '/org/tree/'
const router = new H3()
router.post(`${BASE}create`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, orgTreeCreateZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const _creatorId = handler.context._id
  const result = await OrgTreeModel.create({
    _creatorId,
    ...body.data,
  })
  return {
    msg: '创建成功',
    result,
  }
}))
router.post(`${BASE}delete`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, orgTreeDeleteZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const ids = Array.isArray(body.data._id) ? body.data._id : [body.data._id].map(m => new Types.ObjectId(m))

  const result = await OrgTreeModel.updateMany({ _id: { $in: ids } }, {
    deleted: true,
  }).exec()

  return {
    msg: '删除成功',
    result,
  }
}))
router.post(`${BASE}update`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, orgTreeUpdateZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const result = await OrgTreeModel.findByIdAndUpdate(body.data._id, {
    ...body.data,
  }).exec()
  return {
    msg: '更新成功',
    result,
  }
}))
router.post(`${BASE}find`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, orgTreeFindZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }

  const result = await OrgTreeModel.aggregate<OrgTreeDocumentAggregate>()
    .match({
      deleted: false,
    })
    .lookup({
      from: 'orgtrees',
      localField: '_parentId',
      foreignField: '_id',
      as: 'parent',
    })
    .unwind({
      path: '$parent',
      preserveNullAndEmptyArrays: true,
    })
    .lookup({
      from: 'users',
      localField: '_leaderId',
      foreignField: '_id',
      as: 'leader',
    })
    .unwind({
      path: '$leader',
      preserveNullAndEmptyArrays: true,
    })
    .project({
      _id: { $toString: '$_id' },
      name: 1,
      _parentId: { $toString: '$_parentId' },
      parentName: '$parent.name',
      _leaderId: { $toString: '$_leaderId' },
      leaderName: '$leader.name',
      users: 1,
      children: 1,
      disabled: 1,
      ...dateToLocalString(['createdAt', 'updatedAt']),
    })
    .exec()

  return {
    msg: '查询成功',
    list: flatToTree(result),
  }
}))

export default router
