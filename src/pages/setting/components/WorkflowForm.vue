<script setup lang='ts'>
import type { UseNaiveFormRules } from '@oiij/naive-ui'
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { WorkflowType } from '~/api'
import { cloneDeep } from 'es-toolkit'
import { workflowApi } from '~/api'
import BaseForm from '~/components/BaseForm.vue'
import WorkflowNodes from './WorkflowNodes.vue'

type _CREATE = WorkflowType['Create']
type _UPDATE = WorkflowType['Update']
type _LIST = WorkflowType['Doc']

type _FormValueType = _CREATE | _UPDATE
type _ResultType = Awaited<ReturnType<typeof _API>>
const { defaultValue } = defineProps<{
  defaultValue?: Partial<_LIST>
}>()
const emit = defineEmits<{
  cancel: []
  submit: [data: _FormValueType, result: _ResultType]
}>()
const _ADD_API = workflowApi.create
const _UPDATE_API = workflowApi.update
const _API = defaultValue?._id ? _UPDATE_API : _ADD_API

const formValue = ref<_FormValueType>({
  name: '',
  nodes: [],
  disabled: false,
  ...cloneDeep(defaultValue),
})
const options: PresetFormOptions<_FormValueType> = [
  {
    type: 'input',
    label: `名称`,
    key: 'name',
    span: 24,
    required: true,
  },
  {
    type: 'input',
    label: `描述`,
    key: 'description',
    span: 24,
    props: {
      type: 'textarea',
    },
  },
  {
    label: '节点',
    key: 'nodes',
    span: 24,
    render: () => {
      return h(WorkflowNodes, {
        'value': formValue.value.nodes,
        'onUpdate:value': (v) => {
          formValue.value.nodes = v
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
    class="h-[600px] w-[600px]"
    :api="_API"
    :before-submit="(data) => data"
    :default-value="formValue"
    :options="options"
    :rules="rules"
    @cancel="emit('cancel')"
    @submit="(data, result) => emit('submit', data, result)"
  />
</template>

<style scoped>

</style>
