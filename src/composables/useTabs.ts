import type { TabsOption } from '@oiij/chrome-tabs'

const tabOptions = ref<TabsOption[]>([])
export function useTabs() {
  function addTab(path: string) {
    const has = tabOptions.value.find(f => f.key === path)
    if (has) {
      has.loading = false
      return
    }
    const menu = useMenu()
    const findMenu = menu.flattenedMenuOptions.value.find(f => f.key === path)

    if (findMenu) {
      const tabOption = {
        key: path,
        label: findMenu.label as string,
        icon: findMenu.icon,
        loading: true,
        closable: path !== '/',
      } as TabsOption
      tabOptions.value.push(tabOption)
    }
  }
  function getTabs() {
    return tabOptions.value
  }
  function closeTab(key: string) {
    tabOptions.value = tabOptions.value.filter(f => f.key !== key)
  }
  function closeOtherTabs(key: string) {
    tabOptions.value = tabOptions.value.filter(f => f.key === key)
  }
  function clearTabs() {
    tabOptions.value = []
  }
  function setLoadingDone(key: string) {
    const tab = tabOptions.value.find(f => f.key === key)
    if (tab) {
      tab.loading = false
    }
  }
  return {
    tabOptions,
    addTab,
    getTabs,
    closeTab,
    closeOtherTabs,
    clearTabs,
    setLoadingDone,
  }
}
