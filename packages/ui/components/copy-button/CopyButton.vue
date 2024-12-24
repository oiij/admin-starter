<script setup lang='ts'>
import type { UseClipboardOptions } from '@vueuse/core'
import type { ButtonProps, TooltipProps } from 'naive-ui'
import { useClipboard } from '@vueuse/core'
import { NButton, NTooltip } from 'naive-ui'
import { watch } from 'vue'

const { value, config, tooltipProps, buttonProps } = defineProps<{
  value?: string
  config?: UseClipboardOptions<string | undefined>
  tooltipProps?: TooltipProps
  buttonProps?: ButtonProps

}>()
const emit = defineEmits<{
  (e: 'copied', v: typeof value): void
}>()
const { copied, copy } = useClipboard({
  source: value,
  ...config,
})
watch(copied, () => {
  if (copied.value) {
    emit('copied', value)
  }
})
function onClick(ev: MouseEvent) {
  ev.preventDefault()
  copy()
}
</script>

<template>
  <NTooltip v-bind="tooltipProps">
    <template #trigger>
      <span :style="{ cursor: 'pointer' }" @click="onClick">
        <slot>
          <NButton quaternary size="tiny" v-bind="buttonProps">
            <template #icon>
              <slot name="icon">
                <i class="i-mage-copy-fill" />
              </slot>
            </template>
          </NButton>
        </slot>
      </span>
    </template>
    <slot name="tooltip">
      {{ copied ? '复制成功' : '复制' }}
    </slot>
  </NTooltip>
</template>

<style scoped lang='less'>

</style>
