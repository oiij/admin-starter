import type { Request, Response } from 'express'

const READ = 0b1000 // 可读
const WRITE = 0b0100 // 可写
const CREATE = 0b0010 // 创建
const DELETE = 0b0001 // 删除
const routes = [
  { path: '/', name: '首页' },
  { path: '/super', name: '超级页' },
  { path: '/example', name: '示例' },
  { path: '/example/echarts', name: '图表' },
]
const permissionStr = (permission: number) => `0b${permission.toString(2)}`
export default function handler(
  req: Request,
  res: Response,
) {
  const { token } = req.body
  if (token) {
    res.status(200).json({
      status: 'ok',
      code: 1,
      token,
      routes: routes.map((m) => {
        return {
          path: m.path,
          name: m.name,
          permission: READ | WRITE | CREATE | DELETE,
          permissionStr: permissionStr(READ | WRITE | CREATE | DELETE),
        }
      }),
    })
  }
}
