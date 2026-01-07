<script setup lang='ts'>
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { DataTableColumns } from 'naive-ui'
import type { LoginRecordType } from '~/api'
import { NFlex, NTag } from 'naive-ui'
import { UAParser } from 'ua-parser-js'
import { loginApi } from '~/api'

type _FIND = LoginRecordType['Find']
type _LIST = LoginRecordType['Doc']
const { defaultParams } = defineProps<{
  defaultParams?: _FIND
}>()

const _LIST_API = loginApi.loginRecord

const filters: PresetFormOptions<_FIND> = [

]
const columns: DataTableColumns<_LIST> = [
  {
    title: 'ip',
    key: 'ip',
    width: 100,
  },
  {
    title: '登陆设备',
    key: 'device',
    width: 150,
    render: (row) => {
      const { browser, os } = UAParser(row.userAgent)
      return h(NFlex, {}, {
        default: () => [
          h(NTag, { type: 'info', size: 'small', bordered: false }, os.toString()),
          h(NTag, { type: 'info', size: 'small', bordered: false }, browser.toString()),
        ],
      })
    },
  },
  {
    title: '时间',
    key: 'createdAt',
    width: 140,
  },
]
</script>

<template>
  <BaseDataTable
    class="h-full! w-full!"
    :search="false"
    :api="_LIST_API"
    :columns="columns"
    :filter-options="filters"
    :default-params="{
      ...defaultParams,
    }"
  >
    <template #header-extra>
      {{ }}
    </template>
  </BaseDataTable>
</template>

<style scoped>

</style>
