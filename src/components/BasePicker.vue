<script setup lang="ts"
  generic="
    V extends string|string[]|null,
    P extends DataObject,
    R extends DataObject
  "
>
import type { DataObject } from '@oiij/naive-ui'
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { ButtonProps, DataTableColumns } from 'naive-ui'
import { NPresetPicker } from '@oiij/naive-ui/components'
import BaseDataTable from './BaseDataTable.vue'

const { api, value, fallbackLabel, multiple, disabled, placeholder = '请选择', defaultParams, columns, filterOptions, contentClass, buttonProps } = defineProps<{
  api: (params: P) => Promise<{ list: R[], count: number }>
  value?: V
  fallbackLabel?: string
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  defaultParams?: Partial<P>
  columns?: DataTableColumns<any>
  filterOptions?: PresetFormOptions<P>
  contentClass?: string
  buttonProps?: ButtonProps
}>()
const emit = defineEmits<{
  (e: 'update:value', val: V | null, raw: R | R[] | null): void
}>()
</script>

<template>
  <!-- @vue-generic {V,R} -->
  <NPresetPicker
    :value="value"
    :fallback-label="fallbackLabel"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :columns="columns"
    :fields="{
      value: '_id',
      label: 'nickname',
    }"
    :button-props="buttonProps"
    @update:value="(val, row) => emit('update:value', val, row)"
  >
    <template #default="{ columns: _columns, checkedRowKeys, clickRowEffect, updateCheckedRowKeysEffect }">
      <!-- @vue-generic {P,R} -->
      <BaseDataTable
        class="h-[600px]! w-[1200px]!"
        :class="contentClass"
        :api="api"
        :default-params="defaultParams"
        :filter-options="filterOptions"
        :columns="_columns"
        :checked-row-keys="(checkedRowKeys as string[])"
        @click-row="clickRowEffect"
        @update:checked-row-keys="updateCheckedRowKeysEffect"
      />
    </template>
  </NPresetPicker>
</template>

<style scoped lang="less"></style>
