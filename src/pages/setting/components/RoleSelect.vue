<script setup lang="ts" generic="V extends string | string[] | null">
import type { SelectOption, SelectProps } from 'naive-ui'
import type { RoleType } from '~/api'
import { roleApi } from '~/api'
import BaseSelect from '~/components/BaseSelect.vue'

type _FIND = RoleType['Find']
type _RESULT = RoleType['Doc']

const { value, fallbackLabel, multiple, disabled, clearable = true, manual = true, defaultParams, excludeValues, selectProps } = defineProps<{
  value?: V
  fallbackLabel?: string
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  manual?: boolean
  defaultParams?: Partial<_FIND>
  excludeValues?: {
    key: keyof _RESULT
    value: unknown[]
  }[]
  selectProps?: SelectProps
}>()
const emit = defineEmits<{
  (e: 'update:value', value: V | null, option: SelectOption | SelectOption[] | null, raw: _RESULT | _RESULT[] | null): void
  (e: 'success', data?: _RESULT[]): void
}>()
</script>

<template>
  <BaseSelect
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :manual="manual"
    placeholder="请选择角色"
    :api="roleApi.find"
    :default-params="{
      ...defaultParams,
    }"
    :exclude-values="excludeValues"
    :fallback-label="fallbackLabel"
    :value="value"
    :select-props="selectProps"
    @update:value="(val, option, raw) => emit('update:value', val, option, raw)"
    @success="(data) => emit('success', data.list)"
  />
</template>

<style scoped lang="less"></style>
