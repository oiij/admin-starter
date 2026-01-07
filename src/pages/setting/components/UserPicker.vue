<script setup lang="ts" generic="V extends string | string[] | null">
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { ButtonProps, DataTableColumns } from 'naive-ui'
import type { UserType } from '~/api'
import { userApi } from '~/api'

type _FIND = UserType['Find']
type _LIST = UserType['Doc']
const { value, fallbackLabel, multiple, disabled, clearable = true, placeholder = '选择顾客', defaultParams, buttonProps } = defineProps<{
  value?: V
  fallbackLabel?: string
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  defaultParams?: Partial<_FIND>
  buttonProps?: ButtonProps
}>()
const emit = defineEmits<{
  (e: 'update:value', value: V | null, raw: _LIST | _LIST[] | null): void
}>()
const columns: DataTableColumns<_LIST> = [
  {
    title: '姓名',
    key: 'nickname',
    maxWidth: 200,
  },
  {
    key: 'phone',
    title: '手机号',
    width: 140,
  },
]

const filterOptions: PresetFormOptions<_FIND> = [

]
</script>

<template>
  <BasePicker
    :api="userApi.find"
    :columns="columns"
    :filter-options="filterOptions"
    :value="value"
    :fallback-label="fallbackLabel"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :default-params="{
      ...defaultParams,
    }"
    :button-props="buttonProps"
    @update:value="(val, raw) => emit('update:value', val, raw)"
  />
</template>

<style scoped lang="less"></style>
