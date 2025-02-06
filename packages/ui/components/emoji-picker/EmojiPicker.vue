<script setup lang='ts'>
import type { EmojiPickerOptions, EmojiResult } from '@oiij/emoji'
import { useEmojiPicker } from '@oiij/emoji'

const { options } = defineProps<{
  options?: EmojiPickerOptions
  dark?: boolean
}>()
const emit = defineEmits<{
  (e: 'select', value: EmojiResult): void
}>()
const { domRef } = useEmojiPicker({
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
