import type { WorkflowDocumentAggregate } from '../models/workflow.model'
import { defineEventHandler, H3, HTTPError, readValidatedBody } from 'h3'
import { Types } from 'mongoose'
import { WorkflowInstanceModel } from '../models/workflow.instance.model'
import { WorkflowModel } from '../models/workflow.model'
import { dateToLocalString, zodError } from '../utils'
import { doTask } from '../utils/task.util'
import { workflowInstanceCancelZod, workflowInstanceCreateZod, workflowInstanceFindZod } from '../zod/workflow.instance.zod'

const BASE = '/workflow/instance/'
const router = new H3()
router.post(`${BASE}create`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, workflowInstanceCreateZod.safeParse)

  if (!body.success) {
    throw zodError(body)
  }
  const _applicantId = handler.context._id
  const workflow = await WorkflowModel.findOne({ deleted: false, _id: body.data._workflowId }).exec()
  if (!workflow) {
    throw new HTTPError({
      status: 400,
      statusMessage: '工作流不存在',
    })
  }
  const workflowInstanceDoc = new WorkflowInstanceModel({
    ...body.data,
    _applicantId,
    currentStep: 0,
  })
  const _workflowInstanceId = workflowInstanceDoc._id.toString()
  const _workflowId = workflow._id.toString()

  const { currentStep, currentNode } = await doTask(workflow.nodes, {
    _applicantId,
    _workflowInstanceId,
    _workflowId,
  })
  if (currentStep) {
    workflowInstanceDoc.currentStep = currentStep
  }
  if (currentNode?.type === 'END') {
    workflowInstanceDoc.status = 'APPROVED'
  }

  const result = await workflowInstanceDoc.save()
  return {
    msg: '创建成功',
    result,
  }
}))
router.post(`${BASE}cancel`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, workflowInstanceCancelZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const ids = Array.isArray(body.data._id) ? body.data._id : [body.data._id].map(m => new Types.ObjectId(m))
  const result = await WorkflowInstanceModel.updateMany({ _id: { $in: ids } }, {
    status: 'CANCELLED',
  }).exec()
  return {
    msg: '删除成功',
    result,
  }
}))
router.post(`${BASE}find`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, workflowInstanceFindZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const _applicantId = handler.context._id
  const page = body.data.page ?? 1
  const limit = body.data.limit ?? 10
  const skip = (page - 1) * limit
  const query = body.data.query ?? ''

  const result = await WorkflowInstanceModel.aggregate<{ count: number, list: WorkflowDocumentAggregate[] }>()
    .match({
      deleted: false,
      _applicantId: new Types.ObjectId(_applicantId),
    })
    .sort({ createdAt: -1 })
    .lookup({
      from: 'users',
      localField: '_applicantId',
      foreignField: '_id',
      as: 'creator',
    })
    .unwind({
      path: '$creator',
      preserveNullAndEmptyArrays: true,
    })
    .lookup({
      from: 'workflows',
      localField: '_workflowId',
      foreignField: '_id',
      as: 'workflow',
    })
    .unwind({
      path: '$workflow',
      preserveNullAndEmptyArrays: true,
    })
    .lookup({
      from: 'workflowtasks',
      localField: '_id',
      foreignField: '_workflowInstanceId',
      as: 'workflowTasks',
    })
    .match({
      $or: [
        { 'creator.nickname': { $regex: query, $options: 'i' } },
        { 'workflow.name': { $regex: query, $options: 'i' } },
      ],
    })
    .addFields({
      canCancel: {
        $cond: {
          if: { $eq: ['$status', 'PENDING'] },
          then: true,
          else: false,
        },
      },

    })
    .facet({
      count: [{ $count: 'count' }],
      list: [{ $skip: skip }, { $limit: limit }, {
        $project: {
          _id: 1,
          _applicantId: 1,
          creator: 1,
          _workflowId: 1,
          workflow: 1,
          formData: 1,
          sn: 1,
          status: 1,
          workflowTasks: 1,
          creatorName: '$creator.nickname',
          workflowName: '$workflow.name',
          canCancel: 1,
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
