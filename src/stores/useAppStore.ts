import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const layout = ref<'Horizontal' | 'Vertical'>('Horizontal')
    const sideCollapsed = ref(false)
    function toggleCollapsed() {
      sideCollapsed.value = !sideCollapsed.value
    }
    const { language, toggle: toggleLanguage } = useLanguage()
    const { color } = useNaiveTheme()
    const reloadFlag = ref(false)
    async function reload(delay = 300) {
      reloadFlag.value = true
      await nextTick()
      if (delay) {
        setTimeout(() => {
          reloadFlag.value = false
        }, delay)
      }
      else {
        reloadFlag.value = false
      }
    }
    const contentFullScreen = ref(false)
    function toggleContentFullScreen() {
      contentFullScreen.value = !contentFullScreen.value
    }
    const showWatermark = ref(true)
    const watermarkContent = ref('水印')
    const transition = ref('fade')

    return {
      layout,
      sideCollapsed,
      toggleCollapsed,
      language,
      toggleLanguage,
      reloadFlag,
      reload,
      contentFullScreen,
      toggleContentFullScreen,
      color,
      showWatermark,
      watermarkContent,
      transition,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      paths: ['layout', 'sideCollapsed', 'language', 'color', 'contentFullScreen', 'showWatermark', 'transition'],
    },
  },
)
