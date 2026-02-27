<script setup lang='ts'>
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { DataTableColumns } from 'naive-ui'
import type { WorkflowInstanceType } from '~/api'
import { NButton, NFlex, NPopconfirm, NTag } from 'naive-ui'
import { h } from 'vue'
import useRequest from 'vue-hooks-plus/es/useRequest'
import { workflowInstanceApi } from '~/api'
import { WorkflowInstanceStatusEnum } from '~/utils/enum'
import WorkflowInstanceDetail from './components/WorkflowInstanceDetail.vue'
import WorkflowInstanceForm from './components/WorkflowInstanceForm.vue'

definePage({
  meta: {
    layout: 'default',
    title: '工作流实例',
    icon: 'i-mage-box-3d',
    keepAlive: true,
    requireAuth: true,
  },
})
type _FIND = WorkflowInstanceType['Find']
type _LIST = WorkflowInstanceType['Doc']

const _FIND_API = workflowInstanceApi.find
const _CANCEL_API = workflowInstanceApi.cancel

const { _ROUTE_TITLE, _UPDATE_ACCESS, _ADD_ACCESS } = usePageInfo()

const baseTableRef = useTemplateRef('base-table')

const { showForm: handleShowForm } = useFormDialog(WorkflowInstanceForm, {
  manual: true,
  title: '新增',
  onSubmit: () => {
    baseTableRef.value?.refresh()
  },
})
const { showForm: showDetailDialog } = useFormDialog(WorkflowInstanceDetail, {
  title: '详情',
  manual: true,
  onSubmit: () => {
    baseTableRef.value?.refresh()
  },
})
const { loading: cancelLoading, run: handleCancel } = useRequest(_CANCEL_API, {
  manual: true,
  onSuccess: () => {
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
    key: 'creatorName',
    title: '创建人',
    width: 100,
  },
  {
    key: 'status',
    title: '状态',
    width: 160,
    render: (row) => {
      const { type, label } = WorkflowInstanceStatusEnum[row.status]
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
    width: 160,
    render: (row) => {
      return h(NFlex, { }, {
        default: () => [
          h(NButton, {
            size: 'small',
            secondary: true,
            onClick: () => {
              showDetailDialog({
                defaultValue: row,
              })
            },
          }, {
            default: () => '详情',
          }),
          useAccessValidator(_UPDATE_ACCESS, h(NPopconfirm, {
            positiveText: '确认撤销',
            onPositiveClick: () => {
              handleCancel({ _id: row._id })
            },
          }, {
            trigger: () => h(NButton, {
              loading: cancelLoading.value,
              size: 'small',
              type: 'error',
              secondary: true,
            }, {
              default: () => '撤销',
            }),
            default: () => '确认撤销',
          })),
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
        <NButton v-if="useAccessValidator(_ADD_ACCESS)" type="primary" @click="handleShowForm()">
          新增
        </NButton>
      </template>
    </BaseDataTable>
  </NCard>
</template>

<style scoped>

</style>
