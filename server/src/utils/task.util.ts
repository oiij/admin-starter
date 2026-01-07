import type { WorkflowTaskDocument } from '../models/workflow.task.model'
import type { WorkflowNodeType } from '../zod'
import { UserModel } from '../models/user.model'
import { WorkflowTaskModel } from '../models/workflow.task.model'
import { createObjectId } from './mongodb.util'

async function getTargetIds(node: WorkflowNodeType) {
  if (!node?.config?.length) {
    return []
  }
  if (node.type !== 'APPROVAL' && node.type !== 'CC') {
    return []
  }
  const userIds = node?.config?.filter(m => m.type === 'USER')?.map(m => m.value).filter(f => f !== undefined) ?? []
  const ruleIds = node?.config?.filter(m => m.type === 'ROLE')?.map(m => m.value) ?? []
  const ruleUserIds = await UserModel.find({ deleted: false, _roleId: { $in: ruleIds } }).exec()
  return [...new Set([...userIds, ...ruleUserIds.map(f => f._id.toString())])]
}

async function createTasks(tasks: WorkflowTaskDocument[]) {
  return WorkflowTaskModel.insertMany(tasks)
}

type Options = & {
  _applicantId: string
  _workflowInstanceId: string
  _workflowId: string
  currentStep?: number
}
export async function doTask(nodes: WorkflowNodeType[], options: Options) {
  const { _applicantId, _workflowInstanceId, _workflowId, currentStep = 0 } = options ?? {}
  const currentNode = nodes[currentStep]
  const type = currentNode.type
  switch (type) {
    case 'START':
    {
      await createTasks([{
        _applicantId: createObjectId(_applicantId),
        _workflowInstanceId: createObjectId(_workflowInstanceId),
        _workflowId: createObjectId(_workflowId),
        _targetId: createObjectId(_applicantId),
        nodeStep: 0,
        type,
        status: 'FINISHED',
        finishedAt: new Date(),
      }])

      const nextStep = currentStep + 1
      return await doTask(nodes, {
        ...options,
        currentStep: nextStep,
      })
    }

    case 'APPROVAL':
    {
      const _targetIds = await getTargetIds(currentNode)
      const tasksOptions = _targetIds.map((_targetId) => {
        return {
          _applicantId: createObjectId(_applicantId),
          _workflowInstanceId: createObjectId(_workflowInstanceId),
          _workflowId: createObjectId(_workflowId),
          _targetId: createObjectId(_targetId),
          nodeStep: currentStep,
          type: 'APPROVAL',
          status: 'PENDING',
        } as const
      })
      await createTasks(tasksOptions)
      return {
        currentStep,
        currentNode,
      }
    }
    case 'CC':
    {
      const _targetIds = await getTargetIds(currentNode)
      const tasksOptions = _targetIds.map((_targetId) => {
        return {
          _applicantId: createObjectId(_applicantId),
          _workflowInstanceId: createObjectId(_workflowInstanceId),
          _workflowId: createObjectId(_workflowId),
          _targetId: createObjectId(_targetId),
          nodeStep: currentStep,
          type: 'CC',
          status: 'FINISHED',
          finishedAt: new Date(),
        } as const
      })
      await createTasks(tasksOptions)
      const nextStep = currentStep + 1
      return await doTask(nodes, {
        ...options,
        currentStep: nextStep,
      })
    }
    case 'END':
    {
      await createTasks([{
        _applicantId: createObjectId(_applicantId),
        _workflowInstanceId: createObjectId(_workflowInstanceId),
        _workflowId: createObjectId(_workflowId),
        _targetId: createObjectId(_applicantId),
        nodeStep: currentStep,
        type: 'END',
        status: 'FINISHED',
        finishedAt: new Date(),
      }])
      return {
        currentStep,
        currentNode,
      }
    }
    default:
      return {

      }
  }
}
