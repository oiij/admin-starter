<script setup lang='ts'>
definePage({
  meta: {
    layout: 'blank',
    title: 'UseNumberAnimation',
    keepAlive: true,
    requireAuth: false,
    icon: 'svg:charts',
  },
})
const { value } = useNumberAnimation(100)
</script>

<template>
  <div>
    <div>{{ value }}</div>
  </div>
</template>

<style scoped lang='less'>

</style>
