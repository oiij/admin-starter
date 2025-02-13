<script setup lang='ts'>
import type { ButtonProps, InputProps } from 'naive-ui'
import { NButton, NInput, NInputGroup } from 'naive-ui'
import { debounce } from 'radash'
import { ref, watch } from 'vue'

const { value, autoTrigger = true, searchButton = true, inputProps, buttonProps } = defineProps<{
  value?: string
  autoTrigger?: boolean
  searchButton?: boolean
  inputProps?: InputProps
  buttonProps?: ButtonProps
}>()
const emit = defineEmits<{
  (e: 'update:value', v: typeof value): void
}>()
const _value = ref(value)
watch(() => value, (v) => {
  _value.value = v
})
const debounceEmit = debounce({ delay: 500 }, () => {
  emit('update:value', _value.value)
})
watch(_value, () => {
  if (autoTrigger)
    debounceEmit()
})
function handleClick() {
  emit('update:value', _value.value)
}
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter')
    handleClick()
}
</script>

<template>
  <NInputGroup>
    <NInput v-model:value="_value" placeholder="搜索" v-bind="inputProps" @keydown="handleKeyDown">
      <template #prefix>
        <slot name="icon">
          <i class="i-mage-search" />
        </slot>
      </template>
    </NInput>
    <slot name="button">
      <NButton v-if="searchButton" v-bind="buttonProps" @click="handleClick">
        <template #icon>
          <i class="i-mage-search" />
        </template>
      </NButton>
    </slot>
  </NInputGroup>
</template>

<style scoped lang='less'>

</style>
