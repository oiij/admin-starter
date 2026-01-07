<script setup lang='ts'>
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { DataTableColumns } from 'naive-ui'
import type { WorkflowTaskType } from '~/api'
import { NButton, NFlex, NTag } from 'naive-ui'
import { h } from 'vue'
import { workflowTaskApi } from '~/api'
import { WorkflowTaskStatusEnum } from '~/utils/enum'
import WorkflowTaskDetail from './components/WorkflowTaskDetail.vue'

definePage({
  meta: {
    layout: 'default',
    title: '工作流任务',
    icon: 'i-mage-box-3d',
    keepAlive: true,
    requireAuth: true,
  },
})
type _FIND = WorkflowTaskType['Find']
type _LIST = WorkflowTaskType['Doc']

const _FIND_API = workflowTaskApi.find

const { _ROUTE_TITLE } = usePageInfo()

const baseTableRef = useTemplateRef('base-table')

const { show: showDetailDialog } = useFormDialog(WorkflowTaskDetail, {
  title: '详情',
  manual: true,
  onSubmit: () => {
    baseTableRef.value?.refresh()
  },
})
const filters: PresetFormOptions<_FIND> = [

]
const columns: DataTableColumns<_LIST> = [
  {
    type: 'selection',
    width: 50,
    fixed: 'left',
  },
  {
    key: 'workflowName',
    title: '名称',
    fixed: 'left',
    minWidth: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'applicantName',
    title: '申请人',
    width: 100,
  },
  {
    key: 'status',
    title: '状态',
    width: 160,
    render: (row) => {
      const { type, label } = WorkflowTaskStatusEnum[row.status]
      return h(NTag, { type, bordered: false }, { default: () => label })
    },
  },
  {
    key: 'createdAt',
    title: '创建时间',
    width: 180,
  },
  {
    key: 'updatedAt',
    title: '更新时间',
    width: 180,
  },
  {
    key: 'action',
    title: '操作',
    fixed: 'right',
    width: 80,
    render: (row) => {
      return h(NFlex, { }, {
        default: () => [
          h(NButton, {
            size: 'small',
            secondary: true,
            onClick: () => {
              showDetailDialog({
                defaultValues: row,
              })
            },
          }, {
            default: () => '详情',
          }),
        ],
      })
    },
  },
]
</script>

<template>
  <NCard class="wh-full">
    <BaseDataTable
      ref="base-table"
      :title="_ROUTE_TITLE"
      :api="_FIND_API"
      :columns="columns"
      :filter-options="filters"
    >
      <template #header-extra>
        {{ }}
      </template>
    </BaseDataTable>
  </NCard>
</template>

<style scoped>

</style>
