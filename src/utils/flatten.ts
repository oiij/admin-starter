/**
 * 定义带有可选 children 属性的树形节点类型
 */
type TreeNode<T> = T & {
  children?: TreeNode<T>[]
}

/**
 * 将树形结构扁平化为一维数组
 * @param array 原始树形节点数组
 * @param childrenKey children 属性名，默认为 'children'
 * @returns 扁平化后的数组
 */
export function flattenDeep<T extends Record<string, any>>(array: TreeNode<T>[], childrenKey: keyof TreeNode<T> = 'children'): T[] {
  return array.reduce<T[]>((result, item) => {
    // 创建不包含 children 的当前项副本（可选）
    const { [childrenKey]: _, ...currentItem } = item as any
    result.push(currentItem as T)

    // 递归处理 children
    const children = item[childrenKey]
    if (children && Array.isArray(children)) {
      result.push(...flattenDeep(children, childrenKey))
    }

    return result
  }, [])
}
