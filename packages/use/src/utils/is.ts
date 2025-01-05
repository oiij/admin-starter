import { string } from './string'

const { toString } = string
const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
// eslint-disable-next-line ts/no-unsafe-function-type
const isFunction = <T extends Function> (val: any): val is T => typeof val === 'function'
const isNumber = (val: any): val is number => typeof val === 'number'
const isString = (val: unknown): val is string => typeof val === 'string'
const isObject = (val: any): val is object => toString(val) === '[object Object]'
const isUndefined = (val: any): val is undefined => toString(val) === '[object Undefined]'
const isNull = (val: any): val is null => toString(val) === '[object Null]'
const isRegExp = (val: any): val is RegExp => toString(val) === '[object RegExp]'
const isDate = (val: any): val is Date => toString(val) === '[object Date]'
const isFile = (val: any): val is File => toString(val) === '[object File]'
const isMap = (val: any): val is Map<any, any> => toString(val) === '[object Map]'
const isSet = (val: any): val is Set<any> => toString(val) === '[object Set]'
const isArray = (val: any): val is Array<any> => Array.isArray(val)
const isBlob = (val: any): val is Blob => toString(val) === '[object Blob]'
const isFormData = (val: any): val is FormData => toString(val) === '[object FormData]'
const isURLSearchParams = (val: any): val is URLSearchParams => toString(val) === '[object URLSearchParams]'
const isNativeError = (val: any): val is Error => toString(val) === '[object Error]'
const isDocument = (val: any): val is Document => toString(val) === '[object Document]'
const isWindow = (val: any): boolean => typeof window !== 'undefined' && toString(val) === '[object Window]'
// eslint-disable-next-line node/prefer-global/process
const isNode: boolean = typeof process !== 'undefined' && process.versions != null && process.versions.node != null
const isBrowser = typeof window === 'object'
const isDarkMode: boolean = isBrowser ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) : false
export const is = {
  isDef,
  isBoolean,
  isFunction,
  isNumber,
  isString,
  isObject,
  isUndefined,
  isNull,
  isRegExp,
  isDate,
  isFile,
  isMap,
  isSet,
  isArray,
  isBlob,
  isFormData,
  isURLSearchParams,
  isNativeError,
  isDocument,
  isWindow,
  isNode,
  isBrowser,
  isDarkMode,
}
