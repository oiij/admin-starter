<script setup lang='ts'>
import { useEmojiPicker } from '@oiij/emoji-picker'

definePage({
  meta: {
    layout: 'default',
    title: 'useEmojiPicker',
    sort: 2,
  },
})
const { isDark, locale } = storeToRefs(useAppStore())
const { domRef } = useEmojiPicker(isDark, locale as any)
</script>

<template>
  <div class="flex gap-[20px] bg-white p-[20px]">
    <NCard title="预览" class="min-w-0 flex-1">
      <div ref="domRef" />
    </NCard>
  </div>
</template>

<style scoped lang='less'>

</style>
