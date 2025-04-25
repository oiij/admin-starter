<script setup lang='ts'>
import type { AiEditorOptions } from '@oiij/ai-editor'

import { useAiEditor } from '@oiij/ai-editor'
import { computed, watch } from 'vue'

const { darkMode, language, options, readonly } = defineProps<{
  darkMode?: boolean
  language?: 'zh' | 'en'
  options?: AiEditorOptions
  readonly?: boolean
}>()
const value = defineModel<string>('value')
const { domRef, value: _value, readonly: _readonly } = useAiEditor('', computed(() => darkMode ?? false), computed(() => language ?? 'zh'), options)
watch(value, (v) => {
  if (v) {
    _value.value = v
  }
})
watch(_value, (v) => {
  value.value = v
})
watch(() => readonly, (v) => {
  _readonly.value = v
})
</script>

<template>
  <div ref="domRef" />
</template>

<style scoped lang='less'>

</style>
