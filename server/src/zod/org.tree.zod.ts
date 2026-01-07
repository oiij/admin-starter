import type { output } from 'zod'
import { array, boolean, object, string } from 'zod'
import { baseDeleteZod, baseFindZod, zodObjectId } from './base.zod'

export const orgTreeCreateZod = object({
  name: string(),
  _userIds: array(zodObjectId()).optional(),
  _parentId: zodObjectId().nullable().optional(),
  _leaderId: zodObjectId().nullable().optional(),
  disabled: boolean().optional(),
})

export const orgTreeDeleteZod = baseDeleteZod.extend({

})

export const orgTreeUpdateZod = orgTreeCreateZod.partial().extend({
  _id: zodObjectId(),
})

export const orgTreeFindZod = baseFindZod.extend({

}).optional()

export type OrgTreeCreateZodType = output<typeof orgTreeCreateZod>
export type OrgTreeUpdateZodType = output<typeof orgTreeUpdateZod>
export type OrgTreeDeleteZodType = output<typeof orgTreeDeleteZod>
export type OrgTreeFindZodType = output<typeof orgTreeFindZod>
