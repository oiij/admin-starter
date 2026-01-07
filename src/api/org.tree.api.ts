import type { OrgTreeDocumentAggregate } from '~server/models/org.tree.model'
import type { OrgTreeCreateZodType, OrgTreeDeleteZodType, OrgTreeFindZodType, OrgTreeUpdateZodType } from '~server/zod'
import { post } from '~/utils/http'

export type OrgTreeType = & {
  Create: OrgTreeCreateZodType
  Delete: OrgTreeDeleteZodType
  Update: OrgTreeUpdateZodType
  Find: OrgTreeFindZodType
  Doc: OrgTreeDocumentAggregate
}
const BASE = '/org/tree/'
export const orgTreeApi = {
  create(data: OrgTreeType['Create']) {
    return post<{ msg: string }>(`${BASE}create`, data)
  },
  delete(data: OrgTreeType['Delete']) {
    return post<{ msg: string }>(`${BASE}delete`, data)
  },
  update(data: OrgTreeType['Update']) {
    return post<{ msg: string }>(`${BASE}update`, data)
  },
  find(params: OrgTreeType['Find']) {
    return post<{ list: OrgTreeType['Doc'][], count: number }>(`${BASE}find`, params)
  },
}
