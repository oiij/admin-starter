<script setup lang='ts'>
import { ChatBubble } from '@oiij/ui'
import '@oiij/ui/style.css'

definePage({
  meta: {
    layout: 'default',
    title: 'ChatBubble',
  },
})
const type = ['default', 'primary', 'success', 'warning', 'error']
const content = [
  '按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。',
  '头像有 small、medium 和 large 大小，也可以自己设定尺寸。',
  '当你听到一些人对于精致的概念模型侃侃而谈，请保持清醒。',
  '住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪',
  '这个东西看起来没啥用，实际上确实没啥用。',
]
const data = Array.from({ length: 10 }).map(() => {
  return {
    type: type[Math.floor(Math.random() * type.length)],
    content: content[Math.floor(Math.random() * content.length)],
    placement: Math.random() > 0.5 ? 'left' : 'right',
  } as any
})
</script>

<template>
  <div class="flex-col gap-[10px] p-[20px]">
    <ChatBubble v-for="(item, index) in data" :key="index" :placement="item.placement" :type="item.type" :content="item.content" />
  </div>
</template>

<style scoped lang='less'>

</style>
