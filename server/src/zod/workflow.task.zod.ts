import type { output } from 'zod'
import { literal, object } from 'zod'
import { baseFindZod, zodObjectId } from './base.zod'

export const workflowTaskApprovalZod = object({
  _id: zodObjectId(),
  action: literal(['APPROVED', 'REJECTED']),
})

export const workflowTaskFindZod = baseFindZod.extend({
  _workflowId: zodObjectId().optional(),
})

export type WorkflowTaskApprovalZodType = output<typeof workflowTaskApprovalZod>
export type WorkflowTaskFindZodType = output<typeof workflowTaskFindZod>
