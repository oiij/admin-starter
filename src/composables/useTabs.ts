import type { MenuOption } from 'naive-ui'
import { router } from '~/modules'

function findChildren(authMenu: MenuOption[], openedPath: string[]) {
  const tabs: MenuOption[] = []
  for (const item of authMenu) {
    if (openedPath.includes(item.key as string))
      tabs.push(item)
    if (item.children) {
      for (const child of item.children) {
        if (openedPath.includes(child.key as string)) {
          tabs.push(child)
        }
      }
    }
  }
  const sortTabs: MenuOption[] = []
  for (const path of openedPath) {
    const tab = tabs.find(f => f.key === path)
    if (tab)
      sortTabs.push(tab)
  }
  return sortTabs
}

const { currentPath } = useCurrentRoute()
const { authMenu } = useAuthMenu()
const openedPath = ref<string[]>([])
const tabs = computed<MenuOption[]>(() => findChildren(authMenu.value, openedPath.value))
function addTab(path: string) {
  if (!openedPath.value.includes(path)) {
    openedPath.value.push(path)
  }
}
function removeTab(path: string) {
  if (openedPath.value.length === 1)
    return
  if (currentPath.value === path) {
    const index = openedPath.value.findIndex(f => f === path)
    router.push(openedPath.value[index - 1])
  }
  openedPath.value = openedPath.value.filter(f => f !== path)
}
function clearTab() {
  openedPath.value = []
}
export function useTabs() {
  return {
    openedPath,
    tabs,
    addTab,
    removeTab,
    clearTab,
  }
}
