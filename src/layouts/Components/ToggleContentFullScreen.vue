<script setup lang='ts'>
import { TooltipButton } from '@oiij/ui'

const { contentFullScreen } = storeToRefs(useAppStore())
const { toggleContentFullScreen } = useAppStore()
function handleClick() {
  toggleContentFullScreen()
}
</script>

<template>
  <TooltipButton :button-props="{ quaternary: true }" :tooltip="contentFullScreen ? $t('common.exitContentFullScreenMode') : $t('common.enterContentFullScreenMode')" @click="handleClick">
    <template #icon>
      <Transition name="fade" mode="out-in">
        <i v-if="contentFullScreen" class="i-mage-television-minus" />
        <i v-else class="i-mage-television" />
      </Transition>
    </template>
  </TooltipButton>
</template>

<style scoped lang='less'>

</style>
