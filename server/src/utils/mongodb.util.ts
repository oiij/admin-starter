import { isObjectIdOrHexString, Types } from 'mongoose'

export function isObjectId<T extends string | string[]>(id: T) {
  return Array.isArray(id) ? id.every(e => isObjectIdOrHexString(e)) : isObjectIdOrHexString(id)
}
export function createObjectId(id: string) {
  return new Types.ObjectId(id)
}
export function dateToLocalString<T extends string[]>(keys: [...T]) {
  return Object.fromEntries(keys.map(key => ([key, {
    $dateToString: {
      format: '%Y-%m-%d %H:%M:%S',
      date: `$${key}`,
      timezone: 'Asia/Shanghai',
      onNull: null,
    },
  }])) || [])
}
