import type { WorkflowInstanceDocumentAggregate } from '~server/models/workflow.instance.model'
import type { WorkflowInstanceCancelZodType, WorkflowInstanceCreateZodType, WorkflowInstanceFindZodType } from '~server/zod/workflow.instance.zod'
import type { WorkflowType } from './workflow.api'
import { post } from '~/utils/http'

export type WorkflowInstanceType = & {
  Create: WorkflowInstanceCreateZodType
  Cancel: WorkflowInstanceCancelZodType
  Find: WorkflowInstanceFindZodType
  Doc: WorkflowInstanceDocumentAggregate
}
const BASE = '/workflow/instance/'
export const workflowInstanceApi = {
  create(data: WorkflowInstanceType['Create']) {
    return post<{ msg: string }>(`${BASE}create`, data)
  },
  cancel(data: WorkflowInstanceType['Cancel']) {
    return post<{ msg: string }>(`${BASE}cancel`, data)
  },
  find(params: WorkflowInstanceType['Find']) {
    return post<{ list: WorkflowType['Doc'][], count: number }>(`${BASE}find`, params)
  },
}
