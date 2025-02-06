<script setup lang='ts'>
import type { AiEditorOptions } from '@oiij/aieditor'
import { useAiEditor } from '@oiij/aieditor'
import { computed, watch } from 'vue'

const { darkMode, language, options, readonly } = defineProps<{
  darkMode?: boolean
  language?: 'zh' | 'en'
  options?: AiEditorOptions
  readonly?: boolean
}>()
const value = defineModel<string>('value')
const { domRef, value: _value, readonly: _readonly } = useAiEditor(options, computed(() => darkMode ?? false), computed(() => language ?? 'zh'))
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
