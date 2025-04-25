<script setup lang='ts'>
import { useShiki } from '@oiij/shiki'

definePage({
  meta: {
    layout: 'default',
    title: 'useShiki',
  },
})
const { isDark } = storeToRefs(useAppStore())
const { domRef, value } = useShiki(`export const foo = ref('foo');`, isDark)
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
