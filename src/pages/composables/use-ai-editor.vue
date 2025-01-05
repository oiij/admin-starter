<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    title: 'useAiEditor',
  },
})
const { isDark, locale } = storeToRefs(useAppStore())
const { domRef, value } = useAiEditor({ placeholder: '请输入内容' }, isDark, computed(() => locale.value.slice(0, 2) as 'zh' | 'en'))
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
