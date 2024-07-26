<script setup lang='ts'>
const { showWatermark, watermarkContent } = storeToRefs(useAppStore())
</script>

<template>
  <NWatermark
    v-if="showWatermark"
    :content="watermarkContent"
    cross
    fullscreen
    :font-size="16"
    :line-height="16"
    :width="384"
    :height="384"
    :x-offset="12"
    :y-offset="60"
    :rotate="-15"
  />
</template>

<style scoped lang='less'>

</style>
