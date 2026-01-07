<script setup lang="ts" generic="V extends string[] | null">
import type { ButtonProps } from 'naive-ui'
import { NPresetPicker } from '@oiij/naive-ui/components'

const { value, fallbackLabel, disabled, clearable = true, placeholder = '选择权限', buttonProps } = defineProps<{
  value?: V
  fallbackLabel?: string
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  buttonProps?: ButtonProps
}>()
const emit = defineEmits<{
  (e: 'update:value', value: V | null, raw: { label: string, value: string }[] | null): void
}>()
</script>

<template>
  <!-- @vue-generic {V,{ label: string, value: string }} -->
  <NPresetPicker
    :value="value"
    :fallback-label="fallbackLabel"
    :multiple="true"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :button-props="buttonProps"
    @update:value="(val, row) => (Array.isArray(row) || row === null) && emit('update:value', val, row)"
  >
    <template #default="{ checkedRowKeys, setCheckedRowKeys, setCheckedRows }">
      <AccessTransfer
        :value="(checkedRowKeys as string[])"
        @update:value="(val, raw) => { setCheckedRowKeys(val);setCheckedRows(raw) }"
      />
    </template>
  </NPresetPicker>
</template>

<style scoped lang="less"></style>
