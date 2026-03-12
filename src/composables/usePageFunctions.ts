import type { DataObject } from '@oiij/naive-ui'
import to from 'await-to-js'

type Options<D extends DataObject> = & {
  component?: Component
  updateApi?: (data: D) => Promise<{ msg: string }>
  deleteApi?: (data: { _id: string | string[] }) => Promise<{ msg: string }>
  onRefresh?: () => void
}

export function usePageFunctions<D extends DataObject, R extends DataObject>(options?: Options<D>) {
  const { component, updateApi, deleteApi, onRefresh } = options ?? {}
  const checkedRowKeys = ref<string[]>([])
  const updateLoading = ref(false)
  const deleteLoading = ref(false)
  function handleShowForm(data?: R, title?: string) {
    if (!component) {
      return
    }
    useFormDialog(component, {
      title: title ?? data ? '更新' : '新增',
      defaultValues: data,
      onSubmit: () => {
        onRefresh?.()
      },
    })
  }
  async function handleDelete(data: { _id: string | string[] }) {
    if (!deleteApi) {
      return
    }
    deleteLoading.value = true
    const [err, res] = await to(deleteApi(data))
    deleteLoading.value = false
    if (!err) {
      window.$message.success(res.msg)
      onRefresh?.()
    }
  }
  async function handleUpdate(data: D) {
    if (!updateApi) {
      return
    }
    updateLoading.value = true
    const [err, res] = await to(updateApi(data))
    updateLoading.value = false
    if (!err) {
      window.$message.success(res.msg)
      onRefresh?.()
    }
  }
  return {
    updateLoading,
    deleteLoading,
    checkedRowKeys,
    handleShowForm,
    handleUpdate,
    handleDelete,
  }
}
