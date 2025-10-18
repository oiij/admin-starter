<script setup lang='ts'>
import SvgIcon from '~virtual/svg-component'

const { collapsed } = defineProps<{
  collapsed?: boolean
}>()
</script>

<template>
  <Transition name="fade" mode="out-in">
    <SvgIcon v-if="collapsed" :style="{ width: `40px`, height: `40px` }" name="icon-code" />
    <div v-else class="flex items-center justify-center gap-[10px]">
      <SvgIcon :style="{ width: `40px`, height: `40px` }" name="icon-code" />
      <span class="nowrap m-t-[10px] text-xl">Code Admin</span>
    </div>
  </Transition>
</template>

<style scoped lang='less'>

</style>
