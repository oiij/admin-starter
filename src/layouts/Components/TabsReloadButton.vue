<script setup lang='ts'>
import { NTooltipButton } from '@oiij/naive-ui/components'

const { reload } = useAppStore()
const { loading } = useAutoRoutes()
</script>

<template>
  <NTooltipButton :button-props="{ quaternary: true, size: 'small' }" :tooltip="$t(`common.tabs.refresh-page`)" @click="() => reload()">
    <template #icon>
      <i class="i-mage-reload" :class="loading ? 'animate-spin' : ''" />
    </template>
  </NTooltipButton>
</template>

<style scoped lang='less'>

</style>
