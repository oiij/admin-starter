import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'zh-CN',
  legacy: false,
  fallbackLocale: 'zh-CN',
  messages: messages as {
    'zh-CN': any
    'en-US': any
  },
})
