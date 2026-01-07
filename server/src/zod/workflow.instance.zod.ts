import type { output } from 'zod'
import { any, object, record, string } from 'zod'
import { baseDeleteZod, baseFindZod, zodObjectId } from './base.zod'

export const workflowInstanceCreateZod = object({
  _workflowId: zodObjectId().optional(),
  formData: record(string(), any()).optional(),
})

export const workflowInstanceCancelZod = baseDeleteZod.extend({

})

export const workflowInstanceFindZod = baseFindZod.extend({
  _workflowId: zodObjectId().optional(),
})

export type WorkflowInstanceCreateZodType = output<typeof workflowInstanceCreateZod>
export type WorkflowInstanceCancelZodType = output<typeof workflowInstanceCancelZod>
export type WorkflowInstanceFindZodType = output<typeof workflowInstanceFindZod>
