import type { WorkflowDocumentAggregate } from '~server/models/workflow.model'
import type { WorkflowCreateZodType, WorkflowDeleteZodType, WorkflowFindZodType, WorkflowNodeType, WorkflowUpdateZodType } from '~server/zod/workflow.zod'
import { post } from '~/utils/http'

export type WorkflowType = & {
  Create: WorkflowCreateZodType
  Delete: WorkflowDeleteZodType
  Update: WorkflowUpdateZodType
  Find: WorkflowFindZodType
  Doc: WorkflowDocumentAggregate
  NodeType: WorkflowNodeType
}
const BASE = '/workflow/'
export const workflowApi = {
  create(data: WorkflowType['Create']) {
    return post<{ msg: string }>(`${BASE}create`, data)
  },
  delete(data: WorkflowType['Delete']) {
    return post<{ msg: string }>(`${BASE}delete`, data)
  },
  update(data: WorkflowType['Update']) {
    return post<{ msg: string }>(`${BASE}update`, data)
  },
  find(params: WorkflowType['Find']) {
    return post<{ list: WorkflowType['Doc'][], count: number }>(`${BASE}find`, params)
  },
}
