import { defineStore } from 'pinia'
import { colorMode } from '~/composables/useColorMode'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const layout = ref<'Horizontal' | 'Vertical'>('Horizontal')
    const sideCollapsed = ref(false)
    function toggleCollapsed() {
      sideCollapsed.value = !sideCollapsed.value
    }
    const { language, setLanguage } = useLanguage()
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
    const screenLock = ref(false)
    function setScreenLock(pin?: string) {
      if (pin) {
        setPin(pin)
      }
      screenLock.value = true
    }
    const screenPin = ref('0000')
    function setPin(pin: string) {
      screenPin.value = pin
    }
    function setScreenUnlock(pin: string) {
      if (screenPin.value !== pin) {
        return window.$message.error('密码错误')
      }
      screenLock.value = false
    }
    return {
      layout,
      sideCollapsed,
      toggleCollapsed,
      language,
      setLanguage,
      colorMode,
      reloadFlag,
      reload,
      contentFullScreen,
      toggleContentFullScreen,
      color,
      showWatermark,
      watermarkContent,
      transition,
      screenLock,
      setScreenLock,
      setScreenUnlock,
      screenPin,
      setPin,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      pick: ['layout', 'sideCollapsed', 'language', 'color', 'contentFullScreen', 'showWatermark', 'transition'],
    },
  },
)
