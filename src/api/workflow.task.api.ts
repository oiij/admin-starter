import type { WorkflowTaskDocumentAggregate } from '~server/models/workflow.task.model'
import type { WorkflowTaskApprovalZodType, WorkflowTaskFindZodType } from '~server/zod/workflow.task.zod'
import type { WorkflowType } from './workflow.api'
import { post } from '~/utils/http'

export type WorkflowTaskType = & {
  Approval: WorkflowTaskApprovalZodType
  Find: WorkflowTaskFindZodType
  Doc: WorkflowTaskDocumentAggregate
}
const BASE = '/workflow/task/'
export const workflowTaskApi = {
  approval(data: WorkflowTaskType['Approval']) {
    return post<{ msg: string }>(`${BASE}approval`, data)
  },
  find(params: WorkflowTaskType['Find']) {
    return post<{ list: WorkflowType['Doc'][], count: number }>(`${BASE}find`, params)
  },
}
