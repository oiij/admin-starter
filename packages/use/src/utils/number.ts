/** 是否是偶数 */
const isEven = (num: number): boolean => num % 2 === 0
/** 随机数 */
const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)
/** 向数字添加序号后缀 */
const addOrdinal = (n: number): string => `${n}${['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'}`
/** 平均数 */
const average = (...args: number[]): number => args.reduce((a, b) => a + b) / args.length
/** 斐波那契数列 */
const fibo = (n: number, memo: Record<string, number> = {}): number => memo[n] || (n <= 2 ? 1 : (memo[n] = fibo(n - 1, memo) + fibo(n - 2, memo)))
/** 余数 */
const remainder = (...args: number[]): number => args.reduce((a, b) => a % b)
/** 相除 */
const division = (...args: number[]): number => args.reduce((a, b) => a / b)
/** 阶乘 */
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
/** 公约数 */
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
/** 集合索引模组 */
const mod = (a: number, b: number): number => ((a % b) + b) % b
/** 数字组 */
const digitize = (n: number): number[] => [...`${n}`].map(v => Number.parseInt(v, 10))
/** 两个值之间夹住一个数字 */
const clamp = (val: number, min = 0, max = 1): number => Math.max(min, Math.min(max, val))
/** 数字转为等效字符 */
const toChars = (n: number): string => `${n >= 26 ? toChars(Math.floor(n / 26) - 1) : ''}${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n % 26]}`
/** 指定位数四舍五入 */
const round = (n: number, d: number): number => Number(`${Math.round(Number(`${n}e${d}`))}e-${d}`)
/** 计算参数总和 */
const sum = (...args: number[]): number => args.reduce((a, b) => a + b)
/** 参数相乘 */
const mul = (...args: number[]): number => args.reduce((a, b) => a * b)
/** 参数相减 */
const subtract = (...args: number[]): number => args.reduce((a, b) => a - b)
/** 截断 */
const toFixed = (n: number, fixed: number): number => ~~(10 ** fixed * n) / 10 ** fixed
/** 整数前面加零 */
const prefixWithZeros = (n: number, length: number): string => String(n).padStart(length, '0')
/** 截断小数 */
const truncate = (n: number): number => ~~n
/** */
const wrap = (num: number, min: number, max: number): number => ((((num - min) % (max - min)) + (max - min)) % (max - min)) + min
/** 十进制转二进制 */
const decToBi = (num: number): number => (num === 0 ? 0 : (num % 2) + 10 * decToBi(~~(num / 2)))
/** 是否是质数 */
const isPrime = (n: number): boolean => n > 1 && Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }).fill(0).map((_, i) => i + 2).every(i => n % i !== 0)
/** 是否是2的幂 */
const isPowerOfTwo = (n: number): boolean => (n & (n - 1)) === 0
/** 数字是否在给定范围内 */
const inRange = (num: number, a: number, b: number, threshold = 0): boolean => Math.min(a, b) - threshold <= num && num <= Math.max(a, b) + threshold
/** 是否是负数 */
const isNegative = (n: number): boolean => Math.sign(n) === -1
/** 是否是奇数 */
const isOdd = (n: number): boolean => n % 2 !== 0
/** 是否是正数 */
const isPositive = (n: number): boolean => Math.sign(n) === 1
/** 是否包含数字 */
const isNumeric = (str: string): boolean => !/\D/.test(str)
/** 是否是number */
const isNumber = (value: any): boolean => !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value)
export const number = {
  isEven,
  random,
  addOrdinal,
  average,
  fibo,
  remainder,
  division,
  factorial,
  gcd,
  mod,
  digitize,
  clamp,
  toChars,
  round,
  sum,
  mul,
  subtract,
  toFixed,
  prefixWithZeros,
  truncate,
  wrap,
  decToBi,
  isPrime,
  isPowerOfTwo,
  inRange,
  isNegative,
  isOdd,
  isPositive,
  isNumeric,
  isNumber,
}
