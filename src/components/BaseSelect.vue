<script setup lang="ts"
  generic="
    V extends string|string[]|null,
    P extends DataObject,
    R extends DataObject
  "
>
import type { DataObject } from '@oiij/naive-ui'
import type { OptionFormat, PresetSelectFields } from '@oiij/naive-ui/components'
import type { SelectOption, SelectProps } from 'naive-ui'
import { NPresetSelect } from '@oiij/naive-ui/components'
import { NTooltip } from 'naive-ui'

const { api, value, fallbackLabel, fields, multiple, disabled, clearable = true, manual = true, placeholder, defaultParams, excludeValues, selectProps } = defineProps<{
  api: (params: P) => Promise<{ list: R[], count: number }>
  value?: V
  fallbackLabel?: string
  fields?: {
    label?: string
    value?: string
  }
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  manual?: boolean
  placeholder?: string
  defaultParams?: Partial<P>
  excludeValues?: {
    key: keyof R
    value: unknown[]
  }[]
  selectProps?: SelectProps
}>()
const emit = defineEmits<{
  (e: 'update:value', val: V | null, option: SelectOption | SelectOption[] | null, raw: R | R[] | null): void
  (e: 'success', data: { list: R[], count: number }): void
}>()
const presetSelectRef = useTemplateRef('preset-select')
const _fields: PresetSelectFields = {
  pageSize: 'limit',
  search: 'query',
  list: 'list',
  value: '_id',
  label: 'name',
  children: 'children',
  ...fields,
}
const optionFormat: OptionFormat<R> = (row) => {
  return excludeValues?.some(s => s.value.includes(row[s.key]))
    ? null
    : row
}
function renderOption({ node, option }: { node: VNode, option: SelectOption }) {
  return h(NTooltip, null, {
    trigger: () => node,
    default: () => `${option[_fields.label ?? 'label']}`,
  })
}
function onSuccess(data: { list: R[], count: number }) {
  emit('success', data)
}
function onUpdateValue(val: V | null, option: SelectOption | SelectOption[] | null, raw: R | R[] | null) {
  emit('update:value', val, option, raw)
}
defineExpose({ presetSelectRef })
</script>

<template>
  <!-- @vue-generic {V,P,{list:R[],count:number},R} -->
  <NPresetSelect
    ref="preset-select"
    class="min-w-[240px]"
    :api="api"
    :default-params="defaultParams"
    :fallback-label="fallbackLabel"
    :option-format="optionFormat"
    :value="value"
    :fields="_fields"
    :select-props="{
      multiple,
      disabled,
      clearable,
      placeholder,
      renderOption,
      ...selectProps,
    }"
    :pagination="{
      prefix: (info) => `共${info.itemCount}条`,
    }"
    :manual="manual"
    @success="onSuccess"
    @update:value="onUpdateValue"
  />
</template>

<style scoped lang="less"></style>
