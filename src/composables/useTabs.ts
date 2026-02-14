import type { TabsOption } from '@oiij/chrome-tabs'
import { renderIcon } from '~/utils/render-icon'
import { getRouteMetaHide } from '~/utils/route-meta-utils'

const tabOptions = ref<TabsOption[]>([])
export function useTabs() {
  function addTab(path: string) {
    const has = tabOptions.value.find(f => f.key === path)
    if (has) {
      has.loading = false
      return
    }
    const { flattenRoutes } = useAutoRoutes()
    const route = flattenRoutes.find(f => !getRouteMetaHide('tab', f.meta) && f.path === path)

    if (route) {
      const tabOption: TabsOption = {
        key: path,
        label: route.meta?.title as string,
        icon: () => renderIcon(route.meta?.icon),
        loading: true,
        closable: path !== '/',
      }
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
