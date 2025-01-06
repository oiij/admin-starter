/** 检查日期是否有效 */
const isDateValid = (val: string): boolean => !Number.isNaN(new Date(val).valueOf())
/** 时间格式化 */
const timeFromDate = (date: Date): string => date.toTimeString().slice(0, 8)
/** 将AM PM后缀添加到小时 */
const suffixAmPm = (h: number): string => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`
/** 计算两个日期之间的差异天数 */
const diffDays = (date: Date, otherDate: Date): number => Math.ceil(Math.abs(date.valueOf() - otherDate.valueOf()) / (1000 * 60 * 60 * 24))
/** 计算两个日期之间的月数 */
const diffMonth = (startDate: Date, endDate: Date): number => Math.max(0, (endDate.getFullYear() - startDate.getFullYear()) * 12 - startDate.getMonth() + endDate.getMonth())
/** 将日期转换为YYYY-MM-DD格式 */
const formatYmd = (date: Date): string => date.toISOString().slice(0, 10)
/** 下一年 */
const plusOneYear: Date = (d => new Date(d.setFullYear(d.getFullYear() + 1)))(new Date())
/** 从日期中提取年、月、日、小时、分钟、秒和毫秒 */
const extract = (date: Date): string[] => date.toISOString().split(/\D/).slice(0, -1)
/** 将秒转换为hh:mm:ss格式 */
const formatSeconds = (s: number): string => new Date(s * 1000).toISOString().substr(11, 8)
/** 获取日期的当前季度 */
const getQuarter = (d = new Date()): number => Math.ceil((d.getMonth() + 1) / 3)
/** 以秒为单位获取当前时间戳 */
const ts = (): number => Math.floor(new Date().getTime() / 1000)
/** 从日期中获取一年中的哪一天 */
const dayOfYear = (date: Date): number => Math.floor((date.valueOf() - new Date(date.getFullYear(), 0, 0).valueOf()) / (1000 * 60 * 60 * 24))
/** 获取约会月份的第一个日期 */
const getFirstDate = (d = new Date()): Date => new Date(d.getFullYear(), d.getMonth(), 1)
/** 设置给定区域设置的日期格式 */
const format = (date: Date, locale: string): string => new Intl.DateTimeFormat(locale).format(date)
/** 获取日期的月份名称 */
const getMonthName = (date: Date): string => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', ' November', 'December'][date.getMonth()]
/** 获取日期所在月份的最后一个日期 */
const getLastDate = (d = new Date()): Date => new Date(d.getFullYear(), d.getMonth() + 1, 0)
/** 获取给定月份的天数 */
const daysInMonth = (month: number, year: number): number => new Date(year, month, 0).getDate()
/** 获取时区字符串 */
const getTimezone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone
/** 获取明天的时间 */
const tomorrow: Date = (d => new Date(d.setDate(d.getDate() + 1)))(new Date())
/** 从十进制时间中获取小时和分钟 */
const getHoursAndMinutes = (value: number): [number, number] => [Math.floor(value), Math.floor((value * 60) % 60)]
/** 获取一年中的总天数 */
const numberOfDays = (year: number): number => (new Date(year, 1, 29).getDate() === 29 ? 366 : 365)
/** 获取昨天的日期 */
const yesterday: Date = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
/** 获取工作日 */
const getWeekday = (date: Date): string => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]
/** 日期排序 */
const sortDescending = (arr: Date[]): Date[] => arr.sort((a, b) => a.getTime() - b.getTime())
/** 初始化当前日期，但将时间设置为午夜 */
const midnightOfToday = (): Date => new Date(new Date().setHours(0, 0, 0, 0))
/** 是否工作日 */
const isWeekday = (date = new Date()): boolean => date.getDay() % 6 !== 0
/** 检查给定的日期是否在给定的日期范围内 */
const isBetween = (date: Date, min: Date, max: Date): boolean => date.getTime() >= min.getTime() && date.getTime() <= max.getTime()
/** 检查给定的日期是否是今天 */
const isToday = (date: Date): boolean => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)
/** 检查给定的日期是否是周末 */
const isWeekend = (date = new Date()): boolean => date.getDay() % 6 === 0
/** 检查给定的日期是否是当前年份 */
const isCurrentYear = (date: Date): boolean => date.getUTCFullYear() === new Date().getUTCFullYear()

export const date = {
  diffDays,
  diffMonth,
  extract,
  format,
  formatSeconds,
  formatYmd,
  getFirstDate,
  getHoursAndMinutes,
  getLastDate,
  getMonthName,
  getQuarter,
  getTimezone,
  getWeekday,
  isDateValid,
  midnightOfToday,
  numberOfDays,
  plusOneYear,
  sortDescending,
  suffixAmPm,
  timeFromDate,
  tomorrow,
  ts,
  yesterday,
  dayOfYear,
  daysInMonth,
  isBetween,
  isCurrentYear,
  isToday,
  isWeekday,
  isWeekend,

}
