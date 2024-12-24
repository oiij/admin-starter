<script setup lang='ts'>
import { TooltipButton } from '@eiog/ui'

const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <TooltipButton :button-props="{ quaternary: true }" :tooltip="`${isFullscreen ? '退出全屏' : '切换全屏'}`" @click="toggle">
    <template #icon>
      <Transition name="fade" mode="out-in">
        <i v-if="isFullscreen" class="i-mage-minimize" />
        <i v-else class="i-mage-maximize" />
      </Transition>
    </template>
  </TooltipButton>
</template>

<style scoped lang='less'>

</style>
