<script setup lang='ts'>
const { contentFullScreen } = storeToRefs(useAppStore())
const { toggleContentFullScreen } = useAppStore()
function handleClick() {
  toggleContentFullScreen()
}
</script>

<template>
  <TooltipButton :tooltip="contentFullScreen ? '退出内容全屏模式' : '进入内容全屏模式'" @click="handleClick">
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
