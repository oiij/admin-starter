import type { WorkflowTaskDocumentAggregate } from '../models/workflow.task.model'
import { defineEventHandler, H3, HTTPError, readValidatedBody } from 'h3'
import { Types } from 'mongoose'
import { WorkflowInstanceModel } from '../models/workflow.instance.model'
import { WorkflowModel } from '../models/workflow.model'
import { WorkflowTaskModel } from '../models/workflow.task.model'
import { dateToLocalString, doTask, zodError } from '../utils'
import { workflowTaskApprovalZod, workflowTaskFindZod } from '../zod/workflow.task.zod'

const BASE = '/workflow/task/'
const router = new H3()

router.post(`${BASE}approval`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, workflowTaskApprovalZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const taskDoc = await WorkflowTaskModel.findOne({
    _id: new Types.ObjectId(body.data._id),
  }).exec()
  if (!taskDoc) {
    throw new HTTPError({
      status: 400,
      statusMessage: '任务流不存在',
    })
  }
  if (taskDoc.status !== 'PENDING') {
    throw new HTTPError({
      status: 400,
      statusMessage: '任务流状态错误',
    })
  }
  const workflowDoc = await WorkflowModel.findOne({
    _id: taskDoc._workflowId,
  }).exec()
  if (!workflowDoc) {
    throw new HTTPError({
      status: 400,
      statusMessage: '工作流不存在',
    })
  }
  const workflowInstanceDoc = await WorkflowInstanceModel.findOne({
    _id: taskDoc._workflowInstanceId,
  }).exec()
  if (!workflowInstanceDoc) {
    throw new HTTPError({
      status: 400,
      statusMessage: '工作流实例不存在',
    })
  }
  if (body.data.action === 'APPROVED') {
    taskDoc.status = 'APPROVED'
    taskDoc.finishedAt = new Date()
    const nextStep = workflowInstanceDoc.currentStep + 1
    const { currentStep, currentNode } = await doTask(workflowDoc.nodes, {
      _applicantId: workflowInstanceDoc._applicantId.toString(),
      _workflowInstanceId: workflowInstanceDoc._id.toString(),
      _workflowId: workflowDoc._id.toString(),
      currentStep: nextStep,
    })
    if (currentStep) {
      workflowInstanceDoc.currentStep = currentStep
    }
    if (currentNode?.type === 'END') {
      workflowInstanceDoc.status = 'APPROVED'
    }
    await workflowInstanceDoc.save()
  }
  if (body.data.action === 'REJECTED') {
    taskDoc.status = 'REJECTED'
    taskDoc.finishedAt = new Date()
    workflowInstanceDoc.status = 'REJECTED'
    await workflowInstanceDoc.save()
  }
  await taskDoc.save()

  return {
    msg: '更新成功',
    taskDoc,
  }
}))
router.post(`${BASE}find`, defineEventHandler(async (handler) => {
  const body = await readValidatedBody(handler, workflowTaskFindZod.safeParse)
  if (!body.success) {
    throw zodError(body)
  }
  const _targetId = handler.context._id
  const page = body.data.page ?? 1
  const limit = body.data.limit ?? 10
  const skip = (page - 1) * limit

  const result = await WorkflowTaskModel.aggregate<{ count: number, list: WorkflowTaskDocumentAggregate[] }>()
    .match({
      _targetId: new Types.ObjectId(_targetId),
    })
    .sort({ createdAt: -1 })
    .lookup({
      from: 'users',
      localField: '_applicantId',
      foreignField: '_id',
      as: 'applicant',
    })
    .unwind({
      path: '$applicant',
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
      from: 'workflowinstances',
      localField: '_workflowInstanceId',
      foreignField: '_id',
      as: 'workflowInstance',
    })
    .unwind({
      path: '$workflowInstance',
      preserveNullAndEmptyArrays: true,
    })

    .facet({
      count: [{ $count: 'count' }],
      list: [{ $skip: skip }, { $limit: limit }, {
        $project: {
          _id: 1,
          _applicantId: 1,
          applicant: 1,
          _workflowId: 1,
          workflow: 1,
          _workflowInstanceId: 1,
          workflowInstance: 1,
          _targetId: 1,
          nodeStep: 1,
          endStep: 1,
          status: 1,
          nodes: '$workflow.nodes',
          node: { $arrayElemAt: ['$workflow.nodes', { $toInt: '$nodeStep' }] },
          applicantName: '$applicant.nickname',
          workflowName: '$workflow.name',
          ...dateToLocalString(['finishedAt', 'createdAt', 'updatedAt']),
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
