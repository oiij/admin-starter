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

const { defaultValues } = defineProps<{
  defaultValues?: Partial<_LIST>
}>()
const emit = defineEmits<{
  cancel: []
  submit: [data: _CREATE | _UPDATE, msg: string]
}>()
const _ADD_API = workflowApi.create
const _UPDATE_API = workflowApi.update

const formValue = ref<_CREATE | _UPDATE>({
  name: '',
  nodes: [],
  disabled: false,
  ...cloneDeep(defaultValues),
})
const options: PresetFormOptions<_CREATE | _UPDATE> = [
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
const rules: UseNaiveFormRules<_CREATE | _UPDATE> = {

}
</script>

<template>
  <BaseForm
    class="h-[600px] w-[600px]"
    :create-api="_ADD_API"
    :update-api="_UPDATE_API"
    :before-submit="(data) => data"
    :default-values="formValue"
    :options="options"
    :rules="rules"
    @cancel="emit('cancel')"
    @submit="(data, msg) => emit('submit', data, msg)"
  />
</template>

<style scoped>

</style>
