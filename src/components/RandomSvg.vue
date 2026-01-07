<script setup lang='ts'>
import { toSvg } from 'jdenticon'

const { value, size = 200 } = defineProps<{
  value: string
  size?: number
}>()
const svg = computed(() => toSvg(value, size))
</script>

<template>
  <i :style="{ width: `${size}px`, height: `${size}px` }" v-html="svg" />
</template>

<style scoped>

</style>
