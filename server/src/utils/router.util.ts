import type { EventHandlerRequest, H3Event } from 'h3'
import type { ZodSafeParseResult } from 'zod'
import { HTTPError } from 'h3'
import { SUPER_ADMIN } from '../config'

export function zodError(body: ZodSafeParseResult<any>) {
  return new HTTPError({
    status: 400,
    statusMessage: 'Zod: 参数错误',
    data: body,
  })
}
export function getAuthorization(handler: H3Event<EventHandlerRequest>) {
  const token = handler.req.headers.get('authorization')
  return token ? token.replace('Bearer ', '') : ''
}
export function isSuperAdmin(phone: string, password: string) {
  return phone === SUPER_ADMIN.phone && password === SUPER_ADMIN.password
}
export function flatToTree(list: Record<string, any>[], options?: {
  id?: string
  parentId?: string
  children?: string
  rootId?: any
}) {
  // 默认配置
  const {
    id = '_id',
    parentId = '_parentId',
    children = 'children',
    rootId = null,
  } = options ?? {}

  // 1. 创建映射表：id -> 节点（引用类型，修改映射表节点即修改原节点）
  const nodeMap = new Map()
  // 2. 收集根节点
  const tree = []

  // 初始化映射表
  for (const node of list) {
    nodeMap.set(node[id], { ...node }) // 浅拷贝避免修改原数组
    // 初始化子节点数组
    if (!nodeMap.get(node[id])[children]) {
      nodeMap.get(node[id])[children] = []
    }
  }

  // 构建树形结构
  for (const node of list) {
    const currentNode = nodeMap.get(node[id])
    const parentNode = nodeMap.get(node[parentId])

    if (node[parentId] === rootId) {
      // 根节点直接加入结果
      tree.push(currentNode)
    }
    else if (parentNode) {
      // 非根节点加入对应父节点的children
      parentNode[children].push(currentNode)
    }
    // 若parentId不存在于映射表（无效父节点），则忽略该节点
  }

  return tree
}
