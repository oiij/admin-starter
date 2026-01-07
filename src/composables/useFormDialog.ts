import type { DataObject } from '@oiij/naive-ui'
import type { DialogOptions } from 'naive-ui'
import type { Component } from 'vue'

type Options<P extends DataObject, V extends DataObject> = & {
  title?: string
  defaultValues?: Partial<V>
  manual?: boolean
  onCancel?: () => void
  onSubmit?: (data: V, msg: string) => void
  props?: P
  dialogOptions?: DialogOptions
}

export function useFormDialog<P extends DataObject = DataObject, V extends DataObject = DataObject>(component: Component, options?: Options<P, V>) {
  const { manual = false, ...extraProps } = options ?? {}
  const onCancelEvent = createEventHook<[void]>()
  const onSubmitEvent = createEventHook<[V, string]>()
  function show(_options?: Omit<Options<P, V>, 'manual'>) {
    const { title, defaultValues, props, dialogOptions, onCancel, onSubmit } = { ...extraProps, ..._options }
    if (!component) {
      console.error('component is required')
      return
    }
    const dialog = window.$dialog.create({
      title,
      style: 'width:auto;',
      showIcon: false,
      maskClosable: false,
      contentClass: 'border-t',
      contentStyle: 'padding-top:10px;',
      content: () => h(component!, {
        defaultValues,
        onCancel: () => {
          onCancelEvent.trigger()
          onCancel?.()
          dialog.destroy()
        },
        onSubmit: (data: V, msg: string) => {
          onSubmitEvent.trigger(data, msg)
          onSubmit?.(data, msg)
          dialog.destroy()
        },
        ...props,
      }),
      ...dialogOptions,
    })
    return dialog
  }
  if (!manual) {
    show()
  }
  return {
    show,
    close,
    onCancel: onCancelEvent.on,
    onSubmit: onSubmitEvent.on,
  }
}
