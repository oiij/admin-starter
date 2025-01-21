<script setup lang='ts'>
import { TooltipButton } from '@eiog/ui'

const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <TooltipButton :button-props="{ quaternary: true }" :tooltip="`${isFullscreen ? $t('common.exitFullScreen') : $t('common.fullScreen')}`" @click="toggle">
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
