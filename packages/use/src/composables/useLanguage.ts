import type { I18n } from 'vue-i18n'
import { useLocalStorage, useNavigatorLanguage } from '@vueuse/core'
import { watch } from 'vue'
// eslint-disable-next-line ts/no-empty-object-type
export function useLanguage<T extends 'zh-CN' | 'en-US'>(i18n: I18n< { 'zh-CN': any, 'en-US': any }, {}, {}, string, false>) {
  const { locale } = i18n.global
  const language = useLocalStorage<T | 'auto'>('language', 'auto')
  const { language: navigatorLanguage } = useNavigatorLanguage()
  watch(language, (v) => {
    if (v === 'auto') {
      locale.value = navigatorLanguage.value as T
    }
    else {
      locale.value = v
    }
  })
  watch(navigatorLanguage, (v) => {
    if (language.value === 'auto') {
      locale.value = v as T
    }
  })
  function toggle() {
    locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  }
  function setLocale(lang: T) {
    locale.value = lang
  }
  function setLanguage(lang: T | 'auto') {
    language.value = lang
  }
  return {
    locale,
    language,
    navigatorLanguage,
    toggle,
    setLocale,
    setLanguage,
  }
}
