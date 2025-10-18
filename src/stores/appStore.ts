import { useNaiveTheme } from '@oiij/naive-ui'
import { defineStore } from 'pinia'
import baseBackgroundImage from '~/assets/images/background.jpg'
import { useLanguage } from '~/modules'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { isDark, preferredDark, colorMode } = useTheme()
    const { locale, language } = useLanguage()
    const { color, theme, themeOverrides, locale: naiveLocal, dateLocale } = useNaiveTheme({
      darkMode: isDark,
      globalThemeOverrides: {
        common: {
          borderRadius: '8px',
        },
      },
    })

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
    const watermarkContent = computed(() => {
      const { userInfo } = useAuthStore()
      return userInfo ? `${userInfo?.nickname}-${userInfo?.phone ?? ''}` : '未登录'
    })
    const transitionName = ref('fade')

    const backgroundImage = ref('')
    const backgroundImageSrc = computed(() => backgroundImage.value || baseBackgroundImage)

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
      sideCollapsed,
      toggleCollapsed,
      reloadFlag,
      reload,
      contentFullScreen,
      toggleContentFullScreen,
      showWatermark,
      watermarkContent,
      transitionName,
      backgroundImage,
      backgroundImageSrc,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PRESET__',
      pick: [
        'color',
        'showWatermark',
        'transitionName',
        'notify',
        'volume',
      ],
    },
  },
)
