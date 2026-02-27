import type { DialogOptions } from 'naive-ui'
import type { Component } from 'vue'

// 提取组件的 Props 类型
export type ExtractComponentProps<T> = T extends new (...args: any[]) => { $props: infer P }
  ? P
  : T extends (props: infer P, ...args: any[]) => any
    ? P
    : T extends { props: infer P }
      ? P
      : Record<string, any>

type Options<T> = {
  title?: string
  props?: T
  dialogOptions?: DialogOptions
}

export function useComponentDialog<C extends Component>(component: C, options?: Options<ExtractComponentProps<C>>) {
  const { title, props, dialogOptions } = options || {}
  const dialog = window.$dialog.create({
    title,
    style: 'width:auto;',
    showIcon: false,
    maskClosable: false,
    contentClass: 'border-t',
    contentStyle: 'padding-top:10px;',
    ...dialogOptions,
    content() {
      return h(component, {
        ...props,
      })
    },
  })
  return dialog
}
