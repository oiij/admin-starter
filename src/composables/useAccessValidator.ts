import type { VNode } from 'vue'
import { NTag } from 'naive-ui'

export function useAccessValidator(value: string): boolean
export function useAccessValidator(value: string, pass: (() => VNode) | VNode, fail: (() => VNode) | VNode): VNode
export function useAccessValidator(value: string, pass: (() => VNode) | VNode, fail?: (() => VNode) | VNode): VNode
export function useAccessValidator(value: string, pass?: (() => VNode) | VNode, fail?: (() => VNode) | VNode) {
  const { permission } = storeToRefs(useAuthStore())
  const result = permission.value.includes(value)
  return pass ? result ? typeof pass === 'function' ? pass() : pass : fail ? typeof fail === 'function' ? fail() : fail : h(NTag, { bordered: false }, { default: () => '无权限' }) : result
}
