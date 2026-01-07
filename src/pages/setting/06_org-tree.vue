<script setup lang='ts'>
import type { OrgTreeType } from '~/api'
import { useContextMenu } from '@oiij/use'
import useRequest from 'vue-hooks-plus/es/useRequest'
import { orgTreeApi } from '~/api'
import OrgTreeBox from './components/OrgTreeBox.vue'
import OrgTreeForm from './components/OrgTreeForm.vue'

definePage({
  meta: {
    layout: 'default',
    title: '组织架构图',
    icon: 'i-mage-box-3d',
    keepAlive: true,
    requireAuth: true,
  },
})
type _UPDATE = OrgTreeType['Update']
type _LIST = OrgTreeType['Doc']

const _FIND_API = orgTreeApi.find
const _UPDATE_API = orgTreeApi.update
const _DELETE_API = orgTreeApi.delete

const { _ROUTE_TITLE } = usePageInfo()

const { data, refresh, loading } = useRequest(_FIND_API)
const { handleShowForm, handleDelete } = usePageFunctions<_UPDATE, Partial<_LIST>>({
  component: OrgTreeForm,
  updateApi: _UPDATE_API,
  deleteApi: _DELETE_API,
  onRefresh: () => {
    refresh()
  },
})
const { x, y, show, hide, contextMenuEvent } = useContextMenu()
const options = [
  {
    label: '新增子级',
    key: 'addChild',
  },
  {
    label: '新增同级',
    key: 'addSibling',
  },
  {
    label: '修改',
    key: 'edit',
  },
  {
    label: '删除',
    key: 'delete',
  },
]
const tempItem = ref<_LIST>()
function handleSelect(key: 'addChild' | 'addSibling' | 'edit' | 'delete') {
  if (!tempItem.value) {
    handleShowForm()
    return
  }
  switch (key) {
    case 'addChild':
      handleShowForm({
        _parentId: tempItem.value?._id,
        parentName: tempItem.value?.name,
      })
      break
    case 'addSibling':
      handleShowForm({
        _parentId: tempItem.value?._parentId,
        parentName: tempItem.value?.parentName,
      })
      break
    case 'edit':
      handleShowForm(tempItem.value)
      break
    case 'delete':
      handleDelete({
        _id: tempItem.value?._id,
      })
      break

    default:
      break
  }
  hide()
}
function handleContextmenu(ev: MouseEvent, item?: _LIST) {
  contextMenuEvent(ev)
  tempItem.value = item
}
</script>

<template>
  <NCard class="wh-full" :title="_ROUTE_TITLE">
    <NSpin :show="loading" class="wh-full" content-class="wh-full">
      <NScrollbar class="h-full" x-scrollable>
        <div class="flex-col items-center gap-[10px]">
          <NCard :bordered="true" hoverable class="w-[200px]" content-class="flex-center" @contextmenu="(ev:MouseEvent) => handleContextmenu(ev)">
            ROOT
          </NCard>
          <OrgTreeBox :data="data?.list || []" @contextmenu="handleContextmenu" />
        </div>
      </NScrollbar>
    </NSpin>
    <NDropdown
      placement="bottom-start"
      trigger="manual"
      :x="x"
      :y="y"
      :options="options"
      :show="show"
      :on-clickoutside="() => hide()"
      @select="(key:string) => handleSelect(key as any)"
    />
  </NCard>
</template>

<style scoped>

</style>
