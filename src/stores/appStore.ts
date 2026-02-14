import { useNaiveTheme } from '@oiij/naive-ui'
import { useBoolean, useTheme } from '@oiij/use'
import { defineStore } from 'pinia'
import baseBackgroundImage from '~/assets/images/background.jpg'
import { autoI18n } from '~/modules/i18n'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { locale, language } = autoI18n
    const { isDark, preferredDark, colorMode, toggleDark } = useTheme()
    const { colors, themeColors, theme, themeOverrides, locale: naiveLocal } = useNaiveTheme({
      darkMode: isDark,
      globalThemeOverrides: {
        common: {
          borderRadius: '8px',
        },
      },
    })

    const { value: collapsed, toggle: toggleCollapsed } = useBoolean(false)
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
      toggleDark,
      colors,
      themeColors,
      theme,
      themeOverrides,
      naiveLocal,
      collapsed,
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
        'colors',
        'showWatermark',
        'transitionName',
        'notify',
        'volume',
      ],
    },
  },
)
