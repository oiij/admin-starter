import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const layout = ref({
      mode: 'Horizontal',
    })
    const { language, toggle: toggleLanguage } = useLanguage()
    return {
      layout,
      language,
      toggleLanguage,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      paths: [''],
    },
  },
)
