<script setup lang='ts'>
import { AiEditor } from '@eiog/ui'

definePage({
  meta: {
    layout: 'blank',
    title: 'UseNumberAnimation',
    keepAlive: true,
    requireAuth: false,
    icon: 'svg:charts',
  },
})
</script>

<template>
  <div>
    <AiEditor />
  </div>
</template>

<style scoped lang='less'>

</style>
