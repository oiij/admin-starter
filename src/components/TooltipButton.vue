<script setup lang='ts'>
import type { ButtonProps, TooltipProps } from 'naive-ui'

defineProps<{
  tooltip?: string
  tooltipProps?: TooltipProps
  buttonProps?: ButtonProps
}>()
const emit = defineEmits<{
  (e: 'click', ev?: MouseEvent): void
}>()
</script>

<template>
  <n-tooltip v-bind="tooltipProps">
    <template #trigger>
      <n-button quaternary v-bind="buttonProps" @click="(ev:any) => emit('click', ev)">
        <slot />
        <template #icon>
          <slot name="icon" />
        </template>
      </n-button>
    </template>
    <slot name="tooltip">
      {{ tooltip }}
    </slot>
  </n-tooltip>
</template>

<style scoped lang='less'>

</style>

<route lang='yaml'>
name:
meta:
  layout: default
  title:
</route>
