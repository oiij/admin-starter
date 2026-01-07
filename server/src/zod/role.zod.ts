import type { output } from 'zod'
import { array, boolean, object, string } from 'zod'
import { baseDeleteZod, baseFindZod, zodObjectId } from './base.zod'

export const roleCreateZod = object({
  name: string(),
  access: array(object({
    label: string(),
    value: string(),
  })),
  disabled: boolean().optional(),
})

export const roleDeleteZod = baseDeleteZod.extend({

})

export const roleUpdateZod = roleCreateZod.partial().extend({
  _id: zodObjectId(),
})

export const roleFindZod = baseFindZod.extend({

})

export type RoleCreateZodType = output<typeof roleCreateZod>
export type RoleUpdateZodType = output<typeof roleUpdateZod>
export type RoleDeleteZodType = output<typeof roleDeleteZod>
export type RoleFindZodType = output<typeof roleFindZod>
