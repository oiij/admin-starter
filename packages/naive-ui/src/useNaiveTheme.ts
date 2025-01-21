import type { GlobalThemeOverrides, NDateLocale } from 'naive-ui'
import type { ComputedRef } from 'vue'
import { colord } from 'colord'
import {
  darkTheme,
  dateEnUS,
  dateZhCN,
  enUS,
  zhCN,
} from 'naive-ui'
import { computed, ref } from 'vue'

interface Color {
  primary: string
  info: string
  success: string
  warning: string
  error: string
}
function getStatusColor(color = '#ff461f') {
  return {
    color,
    hover: colord(color).lighten(0.1).toHex(),
    pressed: colord(color).darken(0.1).toHex(),
    suppl: colord(color).lighten(0.1).toHex(),
  }
}
const naiveLocaleMap: {
  [key: string]: {
    name: string
    dateLocale: NDateLocale
    locale: typeof zhCN
  }
} = {
  'zh-CN': {
    name: '简体中文',
    dateLocale: dateZhCN,
    locale: zhCN,
  },
  'en-US': {
    name: 'English',
    dateLocale: dateEnUS,
    locale: enUS,
  },
}

export function useNaiveTheme(darkMode?: ComputedRef<boolean>, language?: ComputedRef<'zh-CN' | 'en-US'>) {
  const color = ref<Color>({
    primary: '#64748B',
    info: '#06b6d4',
    success: '#10b981',
    warning: '#fbbf24',
    error: '#f43f5e',
  })
  function setColor(v: Color) {
    color.value = v
  }
  const theme = computed(() => {
    return darkMode?.value ? darkTheme : undefined
  })
  const themeOverrides: ComputedRef<GlobalThemeOverrides> = computed(() => {
    return {
      common: {
        bodyColor: darkMode?.value ? '#1f1f1f' : '#f5f5f5',
        primaryColor: color.value.primary,
        primaryColorHover: getStatusColor(color.value.primary).hover,
        primaryColorPressed: getStatusColor(color.value.primary).pressed,
        primaryColorSuppl: getStatusColor(color.value.primary).suppl,
        infoColor: color.value.info,
        infoColorHover: getStatusColor(color.value.info).hover,
        infoColorPressed: getStatusColor(color.value.info).pressed,
        infoColorSuppl: getStatusColor(color.value.info).suppl,
        successColor: color.value.success,
        successColorHover: getStatusColor(color.value.success).hover,
        successColorPressed: getStatusColor(color.value.success).pressed,
        successColorSuppl: getStatusColor(color.value.success).suppl,
        warningColor: color.value.warning,
        warningColorHover: getStatusColor(color.value.warning).hover,
        warningColorPressed: getStatusColor(color.value.warning).pressed,
        warningColorSuppl: getStatusColor(color.value.warning).suppl,
        errorColor: color.value.error,
        errorColorHover: getStatusColor(color.value.error).hover,
        errorColorPressed: getStatusColor(color.value.error).pressed,
        errorColorSuppl: getStatusColor(color.value.error).suppl,
        borderRadius: '6px',
      },
      Dialog: {
        borderRadius: '12px',
        padding: '20px',
        closeMargin: '20px 20px 0 0',
      },
    }
  })
  const locale = computed(() => {
    if (!language?.value || !naiveLocaleMap[language.value])
      return naiveLocaleMap['zh-CN'].locale
    return naiveLocaleMap[language.value].locale
  })
  const dateLocale = computed(() => {
    if (!language?.value || !naiveLocaleMap[language.value])
      return naiveLocaleMap['zh-CN'].dateLocale
    return naiveLocaleMap[language.value].dateLocale
  })

  return {
    theme,
    themeOverrides,
    locale,
    dateLocale,
    color,
    setColor,
  }
}
