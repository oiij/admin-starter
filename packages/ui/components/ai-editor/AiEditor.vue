<script setup lang='ts'>
import { useAiEditor } from '@eiog/use'
import { computed, watch } from 'vue'

const { darkMode, language } = defineProps<{
  darkMode?: boolean
  language?: 'zh' | 'en'
}>()
const value = defineModel<string>('value')
const { domRef, value: _value } = useAiEditor({}, computed(() => darkMode ?? false), computed(() => language ?? 'zh'))
watch(value, (v) => {
  if (v) {
    _value.value = v
  }
})
</script>

<template>
  <div ref="domRef" />
</template>

<style scoped lang='less'>

</style>
