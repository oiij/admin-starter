import type { WorkflowDocumentAggregate } from '../models/workflow.model'
import { defineEventHandler, H3, readValidatedBody } from 'h3'
import { Types } from 'mongoose'
import { WorkflowModel } from '../models/workflow.model'
import { dateToLocalString, zodError } from '../utils'
import { workflowCreateZod, workflowDeleteZod, workflowFindZod, workflowUpdateZod } from '../zod/workflow.zod'

const BASE = '/workflow/'
const router = new H3()
router.post(`${BASE}create`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, workflowCreateZod.safeParse)

  if (!body.success) {
    throw zodError(body)
  }
  const _creatorId = handler.context._id
  const result = await WorkflowModel.create({
    ...body.data,
    _creatorId,
  })
  return {
    msg: '创建成功',
    result,
  }
}))
router.post(`${BASE}delete`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, workflowDeleteZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const ids = Array.isArray(body.data._id) ? body.data._id : [body.data._id].map(m => new Types.ObjectId(m))
  const result = await WorkflowModel.updateMany({ _id: { $in: ids } }, {
    deleted: true,
  }).exec()
  return {
    msg: '删除成功',
    result,
  }
}))
router.post(`${BASE}update`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, workflowUpdateZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const result = await WorkflowModel.findByIdAndUpdate(body.data._id, {
    ...body.data,
  }).exec()
  return {
    msg: '更新成功',
    result,
  }
}))
router.post(`${BASE}find`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, workflowFindZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const page = body.data.page ?? 1
  const limit = body.data.limit ?? 10
  const skip = (page - 1) * limit
  const query = body.data.query ?? ''

  const result = await WorkflowModel.aggregate<{ count: number, list: WorkflowDocumentAggregate[] }>()
    .match({
      deleted: false,
      name: { $regex: query, $options: 'i' },
    })
    .sort({ createdAt: -1 })
    .facet({
      count: [{ $count: 'count' }],
      list: [{ $skip: skip }, { $limit: limit }, {
        $lookup: {
          from: 'users',
          localField: '_creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      }, {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          nodes: 1,
          disabled: 1,
          _creatorId: 1,
          creatorName: '$creator.nickname',
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
