<script setup lang='ts'>
import type { EmojiPickerOptions, EmojiResult } from '@oiij/emoji-picker'
import { useEmojiPicker } from '@oiij/emoji-picker'

const { options } = defineProps<{
  options?: EmojiPickerOptions
  dark?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', value: EmojiResult): void
}>()

const { isDark, locale } = storeToRefs(useAppStore())

const { domRef } = useEmojiPicker(isDark, locale as any, {
  onEmojiSelect(v) {
    emit('select', v)
  },
  ...options,
})
</script>

<template>
  <div ref="domRef" />
</template>

<style scoped lang='less'>

</style>
