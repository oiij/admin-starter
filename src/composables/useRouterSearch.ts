import type { MenuOption } from 'naive-ui'

const { authFlatMenu } = useAuthMenu()
function search(value?: string, authFlatMenu?: MenuOption[]) {
  const queryArr = value?.split('')
  const reg = new RegExp(`(.*?)${queryArr?.join('(.*?)')}(.*?)`, 'i')
  const res = authFlatMenu?.filter((f) => {
    if (f.key && f.label)
      return reg.test(f.label as string) || reg.test(f.key.toString())
    return false
  })
  return res
}
export function useRouterSearch() {
  const value = ref()
  const result = computed(() => search(value.value, authFlatMenu.value))
  return {
    value,
    result,
  }
}
