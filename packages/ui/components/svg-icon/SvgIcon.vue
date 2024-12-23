<script setup lang='ts'>
import { computed } from 'vue'

const { prefix = 'icon-', name, color = '#000', width = 1, height = 1 } = defineProps<{
  prefix?: string
  name: string
  color?: string
  width?: number
  height?: number
}>()
const symbolId = computed(() => `#${prefix}${name}`)
</script>

<template>
  <svg aria-hidden="true" :style="{ width: `${width}em`, height: `${height}em` }">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped lang='less'>

</style>
