import type { DataObject } from '@oiij/naive-ui'
import type { DialogOptions } from 'naive-ui'
import type { Component } from 'vue'
import type { ExtractComponentProps } from './useComponentDialog'
import { createEventHook } from '@vueuse/core'
import { useComponentDialog } from './useComponentDialog'

type FormComponentProps<V extends DataObject> = {
  defaultValue?: Partial<V>
  onCancel: () => void
  onSubmit: (data: V, msg: string) => void
}

type Options<C extends Component, V extends DataObject> = {
  title?: string
  defaultValue?: Partial<V>
  manual?: boolean
  onCancel?: () => void
  onSubmit?: (data: V, msg: string) => void
  props?: Omit<ExtractComponentProps<C>, keyof FormComponentProps<V>>
  dialogOptions?: DialogOptions
}

export function useFormDialog<C extends Component, V extends DataObject = DataObject>(component: C, options?: Options<C, V>) {
  const { manual = false, ...extraProps } = options ?? {}
  const onCancelEvent = createEventHook<[void]>()
  const onSubmitEvent = createEventHook<[V, string]>()
  const dialogInst = shallowRef<ReturnType<typeof useComponentDialog>>()
  function showForm(_options?: Omit<Options<C, V>, 'manual'>) {
    const { title, defaultValue, props, dialogOptions, onCancel, onSubmit } = { ...extraProps, ..._options }
    if (!component) {
      console.error('component is required')
      return
    }
    dialogInst.value = useComponentDialog(component, {
      title,
      dialogOptions,
      props: {
        defaultValue,
        onCancel: () => {
          onCancelEvent.trigger()
          onCancel?.()
          dialogInst.value?.destroy()
        },
        onSubmit: (data: V, msg: string) => {
          onSubmitEvent.trigger(data, msg)
          onSubmit?.(data, msg)
          dialogInst.value?.destroy()
        },
        ...props,
      } as ExtractComponentProps<C>,
    })

    return dialogInst.value
  }
  function closeForm() {
    dialogInst.value?.destroy()
  }
  if (!manual) {
    showForm()
  }
  return {
    dialog: dialogInst,
    showForm,
    closeForm,
    onCancel: onCancelEvent.on,
    onSubmit: onSubmitEvent.on,
  }
}
