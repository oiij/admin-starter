<script setup lang='ts'>
import { InteractiveHoverButton } from '@oiij/ui'
import '@oiij/ui/style.css'

definePage({
  meta: {
    layout: 'default',
    title: 'InteractiveHoverButton',
  },
})
</script>

<template>
  <div class="wh-full p-[20px]">
    <InteractiveHoverButton text="Button" />
  </div>
</template>

<style scoped lang='less'>

</style>
