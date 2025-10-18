<script setup lang='ts'>
import { NTooltipButton } from '@oiij/naive-ui/components'
</script>

<template>
  <NTooltipButton :button-props="{ quaternary: true }" tooltip="查看源码">
    <template #icon>
      <a class="flex items-center justify-center gap-1 text-xl" href="https://github.com/oiij/admin-starter" target="_blank" rel="noopener noreferrer">
        <i class="i-ri-github-fill" />
      </a>
    </template>
  </NTooltipButton>
</template>

<style scoped lang='less'>

</style>
