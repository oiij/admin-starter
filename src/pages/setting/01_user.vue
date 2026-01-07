<script setup lang='ts'>
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { DataTableColumns } from 'naive-ui'
import type { UserType } from '~/api'
import { NAvatar, NButton, NFlex, NPopconfirm, NSwitch, NTag } from 'naive-ui'
import { h } from 'vue'
import { userApi } from '~/api'
import UserForm from './components/UserForm.vue'

definePage({
  meta: {
    layout: 'default',
    title: '用户',
    icon: 'i-mage-box-3d',
    keepAlive: true,
    requireAuth: true,
  },
})
type _FIND = UserType['Find']
type _UPDATE = UserType['Update']
type _LIST = UserType['Doc']

const _FIND_API = userApi.find
const _UPDATE_API = userApi.update
const _DELETE_API = userApi.delete

const { _ROUTE_TITLE, _ADD_ACCESS, _DELETE_ACCESS, _UPDATE_ACCESS } = usePageInfo()

const baseTableRef = useTemplateRef('base-table')
const { handleShowForm, handleUpdate, handleDelete, checkedRowKeys, updateLoading, deleteLoading } = usePageFunctions<_UPDATE, _LIST>({
  component: UserForm,
  updateApi: _UPDATE_API,
  deleteApi: _DELETE_API,
  onRefresh: () => {
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
    key: 'avatar',
    title: '头像',
    width: 60,
    render: (row) => {
      return h(NAvatar, {
        round: true,
        size: 32,
        src: row.avatar,
      })
    },
  },
  {
    key: 'phone',
    title: '手机号',
    width: 120,
  },
  {
    key: 'nickname',
    title: '昵称',
    width: 120,
  },
  {
    key: 'roleName',
    title: '角色',
    width: 120,
    render: (row) => {
      return h(NTag, { bordered: false, type: 'primary' }, { default: () => row.roleName })
    },
  },

  {
    key: 'disabled',
    title: '禁用',
    width: 80,
    render: (row) => {
      return h(NSwitch, {
        loading: updateLoading.value,
        value: row.disabled,
        disabled: !_UPDATE_ACCESS || !useAccessValidator(_UPDATE_ACCESS),
        onUpdateValue: async (value) => {
          handleUpdate?.({ _id: row._id, disabled: value })
        },
      })
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
          useAccessValidator(_UPDATE_ACCESS, h(NButton, {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => {
              handleShowForm((row))
            },
          }, {
            default: () => '编辑',
          })),
          useAccessValidator(_DELETE_ACCESS, h(NPopconfirm, {
            positiveText: '确认删除',
            onPositiveClick: () => {
              handleDelete({ _id: row._id })
            },
          }, {
            trigger: () => h(NButton, {
              loading: deleteLoading.value,
              size: 'small',
              type: 'error',
              secondary: true,
            }, {
              default: () => '删除',
            }),
            default: () => '确认删除',
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
      v-model:checked-row-keys="checkedRowKeys"
      :title="_ROUTE_TITLE"
      :api="_FIND_API"
      :columns="columns"
      :filter-options="filters"
    >
      <template #header-extra>
        <NFlex>
          <NButton v-if="useAccessValidator(_ADD_ACCESS)" type="primary" @click="handleShowForm()">
            新增
          </NButton>
          <NPopconfirm v-if="useAccessValidator(_DELETE_ACCESS) && checkedRowKeys.length > 0" positive-text="确认删除" @positive-click="handleDelete({ _id: checkedRowKeys })">
            <template #trigger>
              <NButton type="error">
                删除选中
              </NButton>
            </template>
            <span>确认删除</span>
          </NPopconfirm>
        </NFlex>
      </template>
    </BaseDataTable>
  </NCard>
</template>

<style scoped>

</style>
