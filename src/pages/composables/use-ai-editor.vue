<script setup lang='ts'>
import { useAiEditor } from '@oiij/ai-editor'

definePage({
  meta: {
    layout: 'default',
    title: 'useAiEditor',
  },
})
const { isDark, locale } = storeToRefs(useAppStore())
const { domRef, value } = useAiEditor('', isDark, computed(() => locale.value.slice(0, 2) as 'zh' | 'en'), { placeholder: '请输入内容' })
</script>

<template>
  <div class="flex gap-[20px] bg-white p-[20px]">
    <NCard title="输入">
      <div ref="domRef" class="h-[400px] w-full" />
    </NCard>
    <NCard title="预览">
      <div v-html="value" />
    </NCard>
  </div>
</template>

<style scoped lang='less'>

</style>
