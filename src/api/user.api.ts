import type { UserDocumentAggregate } from '~server/models/user.model'
import type { UserCreateZodType, UserDeleteZodType, UserFindZodType, UserUpdateZodType } from '~server/zod'
import { post } from '~/utils/http'

export type UserType = & {
  Create: UserCreateZodType
  Delete: UserDeleteZodType
  Update: UserUpdateZodType
  Find: UserFindZodType
  Doc: UserDocumentAggregate
}
const BASE = '/user/'
export const userApi = {
  create(data: UserType['Create']) {
    return post<{ msg: string }>(`${BASE}create`, data)
  },
  delete(data: UserType['Delete']) {
    return post<{ msg: string }>(`${BASE}delete`, data)
  },
  update(data: UserType['Update']) {
    return post<{ msg: string }>(`${BASE}update`, data)
  },
  find(params: UserType['Find']) {
    return post<{ list: UserType['Doc'][], count: number }>(`${BASE}find`, params)
  },
}
