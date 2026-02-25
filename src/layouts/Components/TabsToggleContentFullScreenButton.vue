<script setup lang='ts'>
import { NTooltipButton } from '@oiij/naive-ui/components'

const { contentFullScreen } = storeToRefs(useAppStore())
const { toggleContentFullScreen } = useAppStore()
</script>

<template>
  <NTooltipButton :button-props="{ quaternary: true, size: 'small' }" :tooltip="contentFullScreen ? $t(`common.tabs.exit-content-full-screen-mode`) : $t(`common.tabs.enter-content-full-screen-mode`)" @click="toggleContentFullScreen">
    <template #icon>
      <Transition name="fade" mode="out-in">
        <i v-if="contentFullScreen" class="i-mage-television-minus" />
        <i v-else class="i-mage-television" />
      </Transition>
    </template>
  </NTooltipButton>
</template>

<style scoped lang='less'>

</style>
