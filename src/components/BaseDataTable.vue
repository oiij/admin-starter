<script setup lang='ts'
  generic="
    P extends DataObject,
    R extends DataObject
  "
>
import type { DataObject } from '@oiij/naive-ui'
import type { DataTablePlusFields, PresetFormOptions } from '@oiij/naive-ui/components'
import type { DataTableColumns, DataTableProps } from 'naive-ui'
import { NDataTablePlus, NPresetForm } from '@oiij/naive-ui/components'
import { NButton, NButtonGroup } from 'naive-ui'

const { title, api, defaultParams, filterOptions, columns, checkedRowKeys, manual, search = true, dataTableProps } = defineProps<{
  title?: string
  api: (params: P) => Promise<{ list: R[], count: number }>
  defaultParams?: Partial<P>
  filterOptions?: PresetFormOptions<P>
  columns?: DataTableColumns<any>
  checkedRowKeys?: string[]
  manual?: boolean
  search?: boolean
  dataTableProps?: DataTableProps
}>()
const emit = defineEmits<{
  (e: 'update:checkedRowKeys',
    val: string[],
    rows: (R | undefined)[],
    meta: { row: R | undefined, action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll' },
    currentData: R[]
  ): void

  (e: 'success', data: { list: R[], count: number }): void
  (e: 'clickRow', row: R, index: number, event: MouseEvent, currentData: R[]): void
}>()
const baseDataTableRef = useTemplateRef('data-table-plus')
const _fields: DataTablePlusFields = {
  pageSize: 'limit',
  list: 'list',
  search: 'query',
  rowKey: '_id',
}
const filterCollapsed = ref(true)
const _filterOptions = computed(() => {
  return [
    ...filterOptions ?? [],
    {
      span: 6,
      itemProps: {
        suffix: true,
      },
      render: ({ formValue, resetForm, overflow }) => {
        return h(NButtonGroup, {
          class: 'm-l-auto',
        }, {
          default: () => [
            h(NButton, {
              'type': 'primary',
              'data-guide': 'filter-btn',
              'onClick': () => {
                baseDataTableRef.value?.runParams({
                  ...formValue.value,
                })
              },

            }, { default: () => '过滤' }),
            h(NButton, {
              'data-guide': 'reset-btn',
              'onClick': () => {
                resetForm()
                baseDataTableRef.value?.runParams({
                  ...formValue.value,
                })
              },
            }, { default: () => '重置' }),
            (!filterCollapsed.value || overflow) && h(NButton, {
              'data-guide': 'collapse-btn',
              'onClick': () => {
                filterCollapsed.value = !filterCollapsed.value
              },
            }, { default: () => `${filterCollapsed.value ? '展开' : '收起'}` }),
          ],
        })
      },
    },
  ] as PresetFormOptions<P>
})
const _columns = computed(() => {
  return columns
})
function onSuccess(data: { list: R[], count: number }) {
  emit('success', data)
}
defineExpose({
  params: computed(() => baseDataTableRef.value?.params?.[0]),
  data: computed(() => baseDataTableRef.value?.data),
  runParams: (params: Partial<P>) => {
    return baseDataTableRef.value?.runParams(params)
  },
  refresh: () => {
    return baseDataTableRef.value?.refresh()
  },
})
</script>

<template>
  <!-- @vue-generic {P,{list:R[],count:number},R} -->
  <NDataTablePlus
    ref="data-table-plus"
    class="wh-full"
    :search="search"
    pagination
    :title="title"
    :api="api"
    :default-params="({
      ...defaultParams,
    } as P)"
    :fields="_fields"
    :columns="_columns"
    :columns-filter-options="(filters) => ({ ...filters })"
    :manual="manual"
    :data-table-props="{
      checkedRowKeys,
      ...dataTableProps,
    }"
    @success="onSuccess"
    @update:checked-row-keys="(val, rows, meta, currentData) => {
      emit('update:checkedRowKeys', val as string[], rows, meta, currentData)
    }"
    @click-row="(row, index, event, currentData) => emit('clickRow', row, index, event, currentData)"
  >
    <template #header-extra>
      <slot name="header-extra" />
    </template>
    <template #filter>
      <NDivider class="m-y-[5px]!" />
      <!-- @vue-generic {P} -->
      <NPresetForm
        v-if="filterOptions && filterOptions.length > 0"
        :options="_filterOptions"
        :value="({ ...defaultParams } as P)"
        :grid-props="{ xGap: 10, yGap: 10, collapsed: filterCollapsed }"
        :form-props="{ showFeedback: false }"
      />
    </template>
  </NDataTablePlus>
</template>

<style scoped>

</style>
