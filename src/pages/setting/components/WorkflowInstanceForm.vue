<script setup lang='ts'>
import type { UseNaiveFormRules } from '@oiij/naive-ui'
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { WorkflowInstanceType, WorkflowType } from '~/api'
import { cloneDeep } from 'es-toolkit'
import { workflowInstanceApi } from '~/api'
import BaseForm from '~/components/BaseForm.vue'
import WorkflowNodeItemInput from './WorkflowNodeItemInput.vue'
import WorkflowSelect from './WorkflowSelect.vue'

type WorkflowNodeType = WorkflowType['NodeType']

type _CREATE = WorkflowInstanceType['Create']
type _LIST = WorkflowInstanceType['Doc']

type _FormValueType = _CREATE
type _ResultType = Awaited<ReturnType<typeof _API>>
const { defaultValue } = defineProps<{
  defaultValue?: Partial<_LIST>
}>()
const emit = defineEmits<{
  cancel: []
  submit: [data: _FormValueType, result: _ResultType]
}>()
const _ADD_API = workflowInstanceApi.create
const _API = _ADD_API

const formValue = ref<_FormValueType>({
  formData: {},
  ...cloneDeep(defaultValue),
})
const nodes = ref<WorkflowNodeType[]>()
const options: PresetFormOptions<_FormValueType> = [
  {
    label: `工作流`,
    key: '_workflowId',
    span: 24,
    required: true,
    render: () => {
      return h(WorkflowSelect, {
        'value': formValue.value._workflowId,
        'onUpdate:value': (v, _, raw) => {
          formValue.value._workflowId = v as string
          if (raw && !Array.isArray(raw)) {
            nodes.value = raw.nodes
          }
        },
      })
    },
  },

]
const rules: UseNaiveFormRules<_FormValueType> = {

}
</script>

<template>
  <BaseForm
    class="h-[600px] w-[500px]"
    :api="_API"
    :before-submit="(data) => data"
    :default-value="formValue"
    :options="options"
    :rules="rules"
    @cancel="emit('cancel')"
    @submit="(data, result) => emit('submit', data, result)"
  >
    <template #footer>
      <div class="flex-col gap-[10px]">
        <NCard v-for="node in nodes" :key="node.id" size="small" :segmented="true" :title="node?.name">
          <div v-if="node?.type === 'START'" class="flex-col gap-[10px]">
            <WorkflowNodeItemInput
              v-for="item in node.config"
              :key="item.id"
              v-model:value="formValue.formData![item.fieldKey as string]"
              :type="item.type"
              :field-label="item.fieldLabel"
              :required="item.required"
            />
          </div>
          <div v-if="node?.type === 'APPROVAL' || node?.type === 'CC'" class="flex-col gap-[10px]">
            <NInputGroup v-for="item in node.config" :key="item.id">
              <NInputGroupLabel :class="item.type === 'APPLICANT' || item.type === 'SUPERIOR' ? 'w-full' : ''">
                {{ item.typeName }}
              </NInputGroupLabel>
              <NInput v-if="item.type === 'USER' || item.type === 'ROLE'" :value="item.label" readonly />
            </NInputGroup>
          </div>
        </NCard>
      </div>
    </template>
  </BaseForm>
</template>

<style scoped>

</style>
