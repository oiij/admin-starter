interface Point {
  x: number
  y: number
}

interface Rect {
  bottom: number
  left: number
  top: number
  right: number
}
/** 弧度 */
const radiansAngle = (p1: Point, p2: Point): number => Math.atan2(p2.y - p1.y, p2.x - p1.x)
/** 角度 */
const degreesAngle = (p1: Point, p2: Point): number => (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI
/** 线性插值 */
const lerp = (a: number, b: number, amount: number): number => (1 - amount) * a + amount * b
/** 两点之间的中点 */
const midpoint = (p1: Point, p2: Point): number[] => [(p1.x + p2.x) / 2, (p1.y + p2.y) / 2]
/** 点是否在矩形内 */
const isInside = (point: Point, rect: Rect): boolean => point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < rect.bottom
/** 矩形是否在矩形内 */
const contains = (a: Rect, b: Rect): boolean => a.top <= b.top && a.left <= b.left && a.bottom >= b.bottom && a.right >= b.right
/** 度数转弧度 */
const degsToRads = (deg: number): number => (deg * Math.PI) / 180.0
/** 将一个数字在范围内的比率归一化 */
const normalizeRatio = (value: number, min: number, max: number): number => (value - min) / (max - min)
/** 将数字四舍五入到给定值的最接近的倍数。 */
const roundNearest = (value: number, nearest: number): number => Math.round(value / nearest) * nearest
/** 计算两点之间的距离 */
const distance = (p1: Point, p2: Point): number => Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
/** 将弧度转换为度 */
const radsToDegs = (rad: number): number => (rad * 180) / Math.PI
/** 掷骰子 */
const throwdice = (): number => ~~(Math.random() * 6) + 1
/** 等待 */
const wait = async (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds))
export const math = {
  radiansAngle,
  degreesAngle,
  lerp,
  midpoint,
  isInside,
  contains,
  degsToRads,
  normalizeRatio,
  roundNearest,
  distance,
  radsToDegs,
  throwdice,
  wait,
}
