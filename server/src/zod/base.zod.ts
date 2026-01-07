import { array, custom, number, object, string } from 'zod'
import { isObjectId } from '../utils'

export const zodObjectId = () => custom<string>(id => typeof id === 'string' && isObjectId(id))
export const baseFindZod = object({
  page: number().min(1).optional(),
  limit: number().min(1).optional(),
  query: string().nullable().optional(),
})
export const baseDeleteZod = object({
  _id: zodObjectId().or(array(zodObjectId())),
})
