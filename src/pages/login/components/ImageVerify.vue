<script setup lang="ts">
import { useImageVerify } from '@oiij/use'

const { width = 120, height = 34 } = defineProps<{
  width?: number
  height?: number
}>()
const { domRef, code: _code } = useImageVerify({
  type: 'operation',
  width,
  height,
  disturbLine: 5,
  disturbPoint: 10,
})
const code = defineModel<string>('code')
watchEffect(() => {
  code.value = _code.value
})
</script>

<template>
  <canvas
    ref="domRef"
    :width="width"
    :height="height"
    class="rounded-6px"
  />
</template>

  <style scoped lang="less"></style>
