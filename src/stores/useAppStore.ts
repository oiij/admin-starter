import { defineStore } from 'pinia'
import { useLanguage } from '~/modules'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { locale, language } = useLanguage()
    const { isDark, preferredDark, colorMode } = useTheme()
    const { color, theme, themeOverrides, locale: naiveLocal, dateLocale } = useNaiveTheme(isDark, locale)
    const layout = ref<'Horizontal' | 'Vertical'>('Horizontal')
    const sideCollapsed = ref(false)
    function toggleCollapsed() {
      sideCollapsed.value = !sideCollapsed.value
    }
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
    const transitionName = ref('fade')
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
      locale,
      language,
      isDark,
      preferredDark,
      colorMode,
      color,
      theme,
      themeOverrides,
      naiveLocal,
      dateLocale,
      layout,
      sideCollapsed,
      toggleCollapsed,
      reloadFlag,
      reload,
      contentFullScreen,
      toggleContentFullScreen,
      showWatermark,
      watermarkContent,
      transitionName,
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
      pick: ['layout', 'sideCollapsed', 'color', 'contentFullScreen', 'showWatermark', 'transition'],
    },
  },
)
