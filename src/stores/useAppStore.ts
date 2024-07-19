import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const layout = ref({
      mode: 'Horizontal',
      sideBar: {
        width: 200,
        collapsedWidth: 60,
        collapsed: false,
      },
    })
    function toggleCollapsed() {
      layout.value.sideBar.collapsed = !layout.value.sideBar.collapsed
    }
    const { language, toggle: toggleLanguage } = useLanguage()
    return {
      layout,
      toggleCollapsed,
      language,
      toggleLanguage,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      paths: ['layout', 'language'],
    },
  },
)
