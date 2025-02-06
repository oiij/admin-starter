import type { BundledLanguage, BundledTheme, CodeToHastOptions } from 'shiki'
import type { ComputedRef } from 'vue'
import { is } from '@oiij/utils'
import { codeToHtml } from 'shiki'
import { computed, onMounted, ref, watch } from 'vue'

export function useShiki(defaultValue?: string, options?: CodeToHastOptions<BundledLanguage, BundledTheme>, darkMode?: ComputedRef<boolean>) {
  const _options = {
    lang: 'javascript',
    theme: `vitesse-${darkMode?.value ? 'dark' : 'light'}`,
    ...options,
  }
  const value = ref(defaultValue)
  const html = ref('')
  const domRef = ref<HTMLElement>()
  async function format() {
    if (!value?.value)
      return
    const result = await codeToHtml(value.value, _options)
    html.value = result
    if (domRef.value) {
      domRef.value.innerHTML = result
    }
  }
  onMounted(() => {
    format()
  })
  watch(value, () => {
    format()
  })
  watch(darkMode || computed(() => false), () => {
    const theme = _options.theme
    if (is.isString(theme)) {
      _options.theme = theme.replace(/light|dark/, darkMode?.value ? 'dark' : 'light')
    }
    format()
  })
  return {
    value,
    html,
    domRef,
  }
}
