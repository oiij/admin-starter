<script setup lang='ts'>
import { TooltipButton } from '@oiij/ui'
</script>

<template>
  <TooltipButton :button-props="{ quaternary: true }" tooltip="查看源码">
    <template #icon>
      <a class="flex items-center justify-center gap-1 text-xl" href="https://github.com/oiij/admin-starter" target="_blank" rel="noopener noreferrer">
        <i class="i-ri-github-fill" />
      </a>
    </template>
  </TooltipButton>
</template>

<style scoped lang='less'>

</style>
