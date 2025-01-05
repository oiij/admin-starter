import type { ComputedRef } from 'vue'
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'

export interface EmojiResult {
  id: string
  name: string
  native: string
  unified: string
  keywords: string[]
  shortcodes: string
}
export interface EmojiPickerOptions {
  parent?: HTMLElement
  data?: object
  i18n?: object
  categories?: ('frequent' | 'people' | 'nature' | 'food' | 'activity' | 'places' | 'objects' | 'symbols' | 'flags')[]
  custom?: []
  onEmojiSelect?: (emoji: EmojiResult) => void
  onClickOutside?: () => void
  onAddCustomEmoji?: (emoji: EmojiResult) => void
  autoFocus?: boolean
  categoryIcons?: object
  dynamicWidth?: boolean
  emojiButtonColors?: string[]
  emojiButtonRadius?: string
  emojiButtonSize?: number
  emojiSize?: number
  emojiVersion?: 1 | 2 | 3 | 4 | 5 | 11 | 12 | 12.1 | 13 | 13.1 | 14 | 15
  exceptEmojis?: []
  icons?: 'aut' | 'outline' | 'solid'
  locale?: 'en' | 'ar' | 'be' | 'cs' | 'de' | 'es' | 'fa' | 'fi' | 'fr' | 'hi' | 'it' | 'ja' | 'ko' | 'nl' | 'pl' | 'pt' | 'ru' | 'sa' | 'tr' | 'uk' | 'vi' | 'zh'
  maxFrequentRows?: number
  navPosition?: 'top' | 'bottom' | 'none'
  noCountryFlags?: boolean
  noResultsEmoji?: string
  perLine?: number
  previewEmoji?: 'point_up' | 'point_down'
  previewPosition?: 'top' | 'bottom' | 'none'
  searchPosition?: 'sticky' | 'static' | 'none'
  set?: 'native' | 'apple' | 'facebook' | 'google' | 'twitter'
  skin?: 1 | 2 | 3 | 4 | 5 | 6
  skinTonePosition?: 'preview' | 'search' | 'none'
  theme?: 'auto' | 'light' | 'dark'
  getSpritesheetURL?: string
}
export function useEmojiPicker(options?: EmojiPickerOptions, darkMode?: ComputedRef<boolean>, language?: ComputedRef<'zh' | 'en'>) {
  const _options: EmojiPickerOptions = {
    data,
    emojiButtonRadius: '6px',
    emojiButtonColors: [
      'rgba(155,223,88,.7)',
      'rgba(149,211,254,.7)',
      'rgba(247,233,34,.7)',
      'rgba(238,166,252,.7)',
      'rgba(255,213,143,.7)',
      'rgba(211,209,255,.7)',
    ],
    theme: darkMode?.value ? 'dark' : 'light',
    locale: language?.value,
    ...options,
  }
  const domRef = ref<HTMLElement>()
  const emojiPicker = shallowRef<Picker>()
  function init() {
    if (!domRef.value || emojiPicker.value)
      return
    emojiPicker.value = new Picker({
      parent: domRef.value,
      ..._options,
    })
  }
  function destroy() {
    if (!domRef.value)
      return
    domRef.value.innerHTML = ''
    emojiPicker.value = undefined
  }
  watch(domRef, () => {
    init()
  })
  watch(darkMode || computed(() => false), (v) => {
    destroy()
    _options.theme = v ? 'dark' : 'light'
    init()
  })
  watch(language || computed<'zh'>(() => 'zh'), (v) => {
    destroy()
    _options.locale = v ?? 'zh'
    init()
  })
  onMounted(() => {
    init()
  })

  return {
    domRef,
    emojiPicker,
  }
}
