<script setup lang='ts'>
import SvgIcon from '~virtual/svg-component'

const props = defineProps<{
  size?: 'small' | 'middle' | 'large'
}>()
const iconSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 30
    case 'middle':
      return 40
    case 'large':
      return 50
    default:
      return 30
  }
})
</script>

<template>
  <Transition enter-active-class="animated animated-faster animated-zoom-in" leave-active-class="animated animated-faster animated-fade-out" mode="out-in">
    <div v-if="props.size === 'small'" class="flex-col-center gap-[10px]">
      <SvgIcon :style="{ width: `${iconSize}px`, height: `${iconSize}px` }" name="icon-code" />
    </div>
    <div v-else-if="props.size === 'middle'" class="flex-col-center gap-[5px]">
      <SvgIcon :style="{ width: `${iconSize}px`, height: `${iconSize}px` }" name="icon-code" />
      <span class="nowrap-hidden text-xl font-bold">Code Admin</span>
    </div>
    <div v-else class="flex-col-center gap-[10px]">
      <SvgIcon :style="{ width: `${iconSize}px`, height: `${iconSize}px` }" name="icon-code" />
      <span class="nowrap-hidden text-xl font-bold">Code Admin</span>
    </div>
  </Transition>
</template>

<style scoped lang='less'>

</style>
