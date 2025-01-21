<script setup lang='ts'>
import { SvgIcon } from '@eiog/ui'

const props = defineProps<{
  size?: 'small' | 'middle' | 'large'
}>()
const iconSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 3
      break
    case 'middle':
      return 4
      break
    case 'large':
      return 5
      break
    default:
      return 3
      break
  }
})
</script>

<template>
  <Transition enter-active-class="animated animated-faster animated-zoom-in" leave-active-class="animated animated-faster animated-fade-out" mode="out-in">
    <div v-if="props.size === 'small'" class="flex-col-center gap-[10px]">
      <SvgIcon :size="iconSize" name="code" />
    </div>
    <div v-else-if="props.size === 'middle'" class="flex-col-center gap-[5px]">
      <SvgIcon :size="iconSize" name="code" />
      <span class="nowrap-hidden text-xl font-bold">Code Admin</span>
    </div>
    <div v-else class="flex-col-center gap-[10px]">
      <SvgIcon :size="iconSize" name="code" />
      <span class="nowrap-hidden text-xl font-bold">Code Admin</span>
    </div>
  </Transition>
</template>

<style scoped lang='less'>

</style>
