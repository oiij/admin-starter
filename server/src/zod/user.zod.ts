import type { output } from 'zod'
import { boolean, object, string } from 'zod'
import { baseDeleteZod, baseFindZod, zodObjectId } from './base.zod'

export const userCreateZod = object({
  phone: string().max(11),
  _roleId: zodObjectId().optional(),
  nickname: string().optional(),
  password: string().optional(),
  avatar: string().optional(),
  disabled: boolean().optional(),
})

export const userDeleteZod = baseDeleteZod.extend({

})

export const userUpdateZod = userCreateZod.partial().extend({
  _id: zodObjectId(),
})

export const userFindZod = baseFindZod.extend({

})

export type UserCreateZodType = output<typeof userCreateZod>
export type UserUpdateZodType = output<typeof userUpdateZod>
export type UserDeleteZodType = output<typeof userDeleteZod>
export type UserFindZodType = output<typeof userFindZod>
