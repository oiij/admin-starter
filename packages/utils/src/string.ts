/** 转为字符串 */
const toString = (v: any) => Object.prototype.toString.call(v)
/** 首字母大写 */
const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
/** 首字母小写 */
const unCapitalize = ([first, ...rest]: string): string => `${first.toLowerCase()}${rest.join('')}`
/** 是否相对路径 */
const isRelative = (path: string): boolean => !/^(?:[a-z]+:)?[\\/]/i.test(path)
/** 是否是重复字符串 */
const consistsRepeatedSubstring = (str: string): boolean => `${str}${str}`.indexOf(str, 1) !== str.length
/** 是否绝对网址 */
const isAbsoluteUrl = (url: string): boolean => /^[a-z][a-z0-9+.-]*:/.test(url)
/** 字符串是否是abcba */
const isPalindrome = (str: string): boolean => str === str.split('').reverse().join('')
/** 字符串是否相等 */
const areAnagram = (str1: string, str2: string): boolean => str1.toLowerCase().split('').sort().join('') === str2.toLowerCase().split('').sort().join('')
/** base64转uint8 */
const base64ToUint8 = (str: string): Uint8Array => Uint8Array.from(atob(str), c => c.charCodeAt(0))
/** 字符串转驼峰 */
const toCamelCase = (str: string): string => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
/** 转大驼峰 */
const toPascalCase = (str: string): string => (str.match(/[a-z0-9]+/gi) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('')
/** 字母转emoji */
const letterToEmoji = (c: string): string => String.fromCodePoint(c.toLowerCase().charCodeAt(0) + 127365)
/** 字符串短横线链接 */
const slugify = (str: string): string => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
/** window路径转unix路径 */
const toUnixPath = (path: string): string => path.replace(/[\\/]+/g, '/').replace(/^([a-z]+:|\.\/)/i, '')
/** uint8转base64 */
const uint8ToBase64 = (arr: Uint8Array): string => btoa(Array.from({ length: arr.length }).fill('').map((_, i) => String.fromCharCode(arr[i])).join(''))
/** 下划线转小驼峰 */
const snakeToCamel = (str: string): string => str.toLowerCase().replace(/(_\w)/g, m => m.toUpperCase().substr(1))
/** 短横线转小驼峰 */
const kebabToCamel = (str: string): string => str.replace(/-./g, m => m.toUpperCase()[1])
/** 小驼峰转短划线 */
const camelToKebab = (str: string): string => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
/** 将 Excel 列的名称转换为数字 */
const getIndex = (col: string): number => col.split('').reduce((prev, next) => prev * 26 + Number.parseInt(next, 36) - 9, 0)
/** 字符出现次数 */
const countOccurrences = (str: string, char: string): number => str.split('').filter(item => item === char).length
/** html实体 */
const decodeHtmlEntities = (str: string): string => str.replace(/&#(\w+)(;)?/g, (_, dec) => String.fromCharCode(dec))
/** 字符中单词数 */
const countWords = (str: string): number => str.trim().split(/\s+/).length
/** {value} 格式化字符串 */
const format = (str: string, ...vals: any[]): string => vals.reduce((s, v, i) => s.replace(new RegExp(`\\{${i}\\}`, 'g'), v), str)
/** 转义特殊字符 */
const escapeString = (str: string): string => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;')
/** 获取不带参数的基本网址 */
const baseUrl = (url: string): string => url.split('?')[0]
/** 生成字符串哈希 */
const hashString = (str: string): number => str.split('').reduce((prev, curr) => (Math.imul(31, prev) + curr.charCodeAt(0)) | 0, 0)
/** 截取扩展名 */
const ext = (fileName: string): string => fileName.split('.').pop() as string
/** 获取字符串长度 */
const bytes = (str: string): number => new Blob([str]).size
/** 字符串中字符的个数 */
const characterCount = (str: string, char: string): number => str.split(char).length - 1
/** 首字母小写 */
const lowercaseFirst = (str: string): string => `${str.charAt(0).toLowerCase()}${str.slice(1)}`
/** 格式化路径 */
const normalizePath = (path: string): string => path.replace(/[\\/]+/g, '/')
/** 文档加行号 */
const prependNumbers = (str: string): string => str.split(/\r?\n/).map((line, i) => `${(i + 1).toString().padStart(2, ' ')} ${line}`).join('\n')
/** 删除重复行 */
const removeDuplicateLines = (str: string): string => Array.from(new Set(str.split(/\r?\n/))).join('\n')
/** 清除文档空行 */
const removeEmptyLines = (str: string): string => str.split(/\r?\n/).filter(line => line.trim() !== '').join('\n')
/** 删除空行 */
const removeSpaces = (str: string): string => str.replace(/\s/g, '')
/** 重复字符串 */
const repeat = (str: string, numberOfTimes: number): string => str.repeat(numberOfTimes)
/** 换行转br */
const nl2br = (str: string): string => str.replace(/\r?\n/g, '<br>')
/** 制表符转空格 */
const replace = (str: string, numSpaces = 4): string => str.replaceAll('\t', ' '.repeat(numSpaces))
/** 单个空格替换多个空格 */
const replaceSpaces = (str: string): string => str.replace(/\s{2,}/g, ' ')
/** 字符串打码 */
const mask = (str: string, num: number, mask: string): string => `${str}`.slice(num).padStart(`${str}`.length, mask)
/** 反转字符串 */
const reverse = (str: string): string => str.split('').reverse().join('')
/** 反转行顺序 */
const reverseLines = (str: string): string => str.split(/\r?\n/).reverse().join('\n')
/** 按字母行排序 */
const sortLines = (str: string): string => str.split(/\r?\n/).sort().join('\n')
/** 按字母排序 */
const sort = (str: string): string => str.split('').sort((a, b) => a.localeCompare(b)).join('')
/** 从字符串中删除 ANSI 代码 */
// eslint-disable-next-line no-control-regex
const stripAnsiCodes = (str: string): string => str.replace(/[\u001B\u009B][[()#;?]*(?:\d{1,4}(?:;\d{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
/** 交换大小写 */
const swapCase = (str: string): string => str.split('').map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase())).join('')
/** 修剪字符 */
const trim = (str: string, char: string): string => str.split(char).filter(Boolean).join()
/** 修剪字符串斜杠 */
const trimSlashes = (str: string): string => str.replace(/^\/+|\/+$/g, '')
/** 修剪扩展名 */
const trimExt = (fileName: string): string => (!fileName.includes('.') ? fileName : fileName.split('.').slice(0, -1).join('.'))
/** 按长度截断字符串 */
const truncate = (str: string, max: number, suffix = '...'): string => (str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`)
/** 取消转义字符串 */
const unescapeString = (str: string): string => str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#0*39;/g, '\'').replace(/&quot;/g, '"')
/** 单词首字母大写 */
const uppercaseWords = (str: string): string => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())
/** 随机字符串 */
const randomString = (): string => Math.random().toString(36).slice(2)
/** 去除字符串中的HTML */
const stripHtml = (html: string): string => (new DOMParser().parseFromString(html, 'text/html')).body.textContent || ''
/** 是否包含小写字符 */
const containsLowerCase = (str: string): boolean => str !== str.toUpperCase()
/** 是否包含大写字符 */
const containsUpperCase = (str: string): boolean => str !== str.toLowerCase()
/** 是否包含空格 */
// eslint-disable-next-line unused-imports/no-unused-vars
const containsWhitespace = (str: any) => (str: string) => /\s/.test(str)
/** 是否包含ASCII码 */
// eslint-disable-next-line no-control-regex
const isAscii = (str: string): boolean => /^[\x00-\x7F]+$/.test(str)
/** 是否包含字母和数字 */
const isAlphanumeric = (str: string): boolean => /^[0-9A-Z]+$/i.test(str)
/** 是否是16进制数 */
const isHexadecimal = (str: string): boolean => /^[A-F0-9]+$/i.test(str)
/** 是否是mongodb id */
const isMongoId = (str: string): boolean => str.length === 24 && /^[A-F0-9]+$/i.test(str)
/** 是否是小写 */
const isLowerCase = (str: string): boolean => str === str.toLowerCase()
/** 是否包含字母 */
const isAlpha = (str: string): boolean => /^[A-Z]+$/i.test(str)
/** 是否是八进制 */
const isOctal = (str: string): boolean => /^(?:0o)?[0-7]+$/i.test(str)
/** 是否为大写 */
const isUpperCase = (str: string): boolean => str === str.toUpperCase()
const isBIC = (value: string): boolean => /^[a-z]{6}[a-z0-9]{2}(?:[a-z0-9]{3})?$/i.test(value)
export const string = {
  toString,
  capitalize,
  unCapitalize,
  isRelative,
  consistsRepeatedSubstring,
  isAbsoluteUrl,
  isPalindrome,
  areAnagram,
  base64ToUint8,
  toCamelCase,
  toPascalCase,
  letterToEmoji,
  slugify,
  toUnixPath,
  uint8ToBase64,
  snakeToCamel,
  kebabToCamel,
  camelToKebab,
  getIndex,
  countOccurrences,
  decodeHtmlEntities,
  countWords,
  format,
  escapeString,
  baseUrl,
  hashString,
  ext,
  bytes,
  characterCount,
  lowercaseFirst,
  normalizePath,
  prependNumbers,
  removeDuplicateLines,
  removeEmptyLines,
  removeSpaces,
  repeat,
  nl2br,
  replace,
  replaceSpaces,
  mask,
  reverse,
  reverseLines,
  sortLines,
  sort,
  stripAnsiCodes,
  swapCase,
  trim,
  trimSlashes,
  trimExt,
  truncate,
  unescapeString,
  uppercaseWords,
  randomString,
  stripHtml,
  containsLowerCase,
  containsUpperCase,
  containsWhitespace,
  isAscii,
  isAlphanumeric,
  isHexadecimal,
  isMongoId,
  isLowerCase,
  isAlpha,
  isOctal,
  isUpperCase,
  isBIC,

}
