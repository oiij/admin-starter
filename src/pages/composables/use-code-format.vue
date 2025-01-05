<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    title: 'useCodeFormat',
  },
})
const { isDark } = storeToRefs(useAppStore())
const { domRef, value } = useCodeFormat(`export const foo = ref('foo');`, undefined, isDark)
</script>

<template>
  <div class="flex gap-[20px] bg-white p-[20px]">
    <NCard title="输入" class="min-w-0 flex-1">
      <NInput v-model:value="value" type="textarea" />
    </NCard>
    <NCard title="预览" class="min-w-0 flex-1">
      <div ref="domRef" />
    </NCard>
  </div>
</template>

<style scoped lang='less'>

</style>
