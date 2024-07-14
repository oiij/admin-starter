<script setup lang='ts'>
const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <TooltipButton :tooltip="`${isFullscreen ? '退出全屏' : '切换全屏'}`" @click="toggle">
    <template #icon>
      <i class="i-line-md-menu-unfold-left" />
    </template>
  </TooltipButton>
</template>

<style scoped lang='less'>

</style>
