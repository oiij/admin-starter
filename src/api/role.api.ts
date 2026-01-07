import type { RoleDocumentAggregate } from '~server/models/role.mode'
import type { RoleCreateZodType, RoleDeleteZodType, RoleFindZodType, RoleUpdateZodType } from '~server/zod'
import { post } from '~/utils/http'

export type RoleType = & {
  Create: RoleCreateZodType
  Delete: RoleDeleteZodType
  Update: RoleUpdateZodType
  Find: RoleFindZodType
  Doc: RoleDocumentAggregate
}
const BASE = '/role/'
export const roleApi = {
  create(data: RoleType['Create']) {
    return post<{ msg: string }>(`${BASE}create`, data)
  },
  delete(data: RoleType['Delete']) {
    return post<{ msg: string }>(`${BASE}delete`, data)
  },
  update(data: RoleType['Update']) {
    return post<{ msg: string }>(`${BASE}update`, data)
  },
  find(params: RoleType['Find']) {
    return post<{ list: RoleType['Doc'][], count: number }>(`${BASE}find`, params)
  },
}
