<script setup lang='ts'>
import type { UseNaiveFormRules } from '@oiij/naive-ui'
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { OrgTreeType } from '~/api'
import { cloneDeep } from 'es-toolkit'
import { NInput } from 'naive-ui'
import { orgTreeApi } from '~/api'
import BaseForm from '~/components/BaseForm.vue'
import UserPicker from './UserPicker.vue'
import UserSelect from './UserSelect.vue'

type _CREATE = OrgTreeType['Create']
type _UPDATE = OrgTreeType['Update']
type _LIST = OrgTreeType['Doc']

type _FormValueType = _CREATE | _UPDATE
type _ResultType = Awaited<ReturnType<typeof _API>>
const { defaultValue } = defineProps<{
  defaultValue?: Partial<_LIST>
}>()
const emit = defineEmits<{
  cancel: []
  submit: [data: _FormValueType, result: _ResultType]
}>()

const _ADD_API = orgTreeApi.create
const _UPDATE_API = orgTreeApi.update
const _API = defaultValue?._id ? _UPDATE_API : _ADD_API

const formValue = ref<_FormValueType>({
  name: '',
  disabled: false,
  ...cloneDeep(defaultValue),
})
const options: PresetFormOptions<_FormValueType> = [
  {
    label: '父级',
    key: '_parentId',
    span: 24,
    hidden: () => !defaultValue?._parentId,
    render: () => {
      return h(NInput, { value: defaultValue?.parentName, readonly: true })
    },
  },
  {
    type: 'input',
    label: `名称`,
    key: 'name',
    span: 24,
    required: true,
  },
  {
    label: '负责人',
    key: '_leaderId',
    span: 24,
    render: () => {
      return h(UserSelect, {
        'value': formValue.value._leaderId,
        'onUpdate:value': (val) => {
          formValue.value._leaderId = val as string
        },
      })
    },
  },
  {
    label: '用户',
    key: '_userIds',
    span: 24,
    render: () => {
      return h(UserPicker, {
        'value': formValue.value._userIds,
        'multiple': true,
        'onUpdate:value': (val) => {
          formValue.value._userIds = val as string[]
        },
      })
    },
  },
  {
    label: '禁用',
    key: 'disabled',
    type: 'switch',
    span: 6,
  },
]
const rules: UseNaiveFormRules<_FormValueType> = {

}
</script>

<template>
  <BaseForm
    class="h-[400px] w-[500px]"
    :api="_API"
    :default-value="formValue"
    :options="options"
    :rules="rules"
    @cancel="emit('cancel')"
    @submit="(data, result) => emit('submit', data, result)"
  />
</template>

<style scoped>

</style>
