/** 对象是否相等 */
const isEqual = (...objects: object[]): boolean => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]))
/** 返回唯一值Key */
const getUniqueArrObj = <T extends Array<T>, K extends keyof T> (arrObj: T, keyUnique: K) => [...new Map(arrObj.map(item => [item[keyUnique], item])).values()]
/** 提取属性值 */
const pluck = <T extends Array<T>, K extends keyof T> (objs: T, property: K) => objs.map(obj => obj[property])
/** 获取对象指定path的值 */
const getValue = <T extends Record<string, any>, K extends string>(obj: T, path: K) => path.split('.').reduce((acc, c) => acc && acc[c], obj)
/** 键值对创建对象 */
const toObj = (arr: [string, any][]) => Object.fromEntries(arr)
/** 重命名key */
const renameKeys = <T extends Record<string, any>, K extends Record<keyof T, string> >(keysMap: K, obj: T) => Object.keys(obj).reduce((acc, key) => ({ ...acc, ...{ [keysMap[key] || key]: obj[key] } }), {})
/** 从对象忽略 */
const omit = <T extends Record<string, any>, K extends (keyof T)[]>(obj: T, keys: K) => Object.keys(obj).filter(k => !keys.includes(k)).reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {})
/** 从对象中选择 */
const pick = <T extends Record<string, any>, K extends (keyof T)[]>(obj: T, keys: K) => Object.keys(obj).filter(k => keys.includes(k)).reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {})
/** 反转键值对 */
const invert = <T extends Record<string, any>>(obj: T) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]))
/** 清除null 和 undefined */
const removeNullUndefined = <T extends Record<string, any>>(obj: T) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null)) as { [K in keyof T as T[K] extends null | undefined ? never : K]: T[K] }

// eslint-disable-next-line no-sequences
const sort = <T extends Record<string, unknown>>(obj: T) => Object.keys(obj).sort().reduce((p, c) => ((p[c] = obj[c]), p), {} as any)
/** 是否普通对象 */
// eslint-disable-next-line no-proto, no-restricted-properties
const isPlainObject = (v: any): boolean => !!v && typeof v === 'object' && (v.__proto__ === null || v.__proto__ === Object.prototype)
export const object = {
  isEqual,
  getUniqueArrObj,
  pluck,
  getValue,
  toObj,
  renameKeys,
  omit,
  pick,
  invert,
  removeNullUndefined,
  sort,
  isPlainObject,
}
