<script setup lang='ts'>
import type { FormInst } from 'naive-ui'
import type { Component } from 'vue'
import type { WorkflowType } from '~/api'
import { useNaiveForm } from '@oiij/naive-ui'
import { nanoid } from 'nanoid'
import WorkflowNodeApprovalConfig from './WorkflowNodeApprovalConfig.vue'
import WorkflowNodeConfigPreview from './WorkflowNodeConfigPreview.vue'
import WorkflowNodeStartConfig from './WorkflowNodeStartConfig.vue'

type WorkflowNodeType = WorkflowType['NodeType']
type WorkflowNodeConfigType = NonNullable<WorkflowNodeType['config']>[0]

const { defaultValues } = defineProps<{
  defaultValues?: WorkflowNodeType
}>()
const emit = defineEmits<{
  (e: 'confirm', value: WorkflowNodeType): void
  (e: 'cancel'): void
}>()
const nodeTypeOptions = [
  {
    label: '开始',
    value: 'START',
  },
  {
    label: '审批',
    value: 'APPROVAL',
  },
  {
    label: '抄送',
    value: 'CC',
  },
  {
    label: '结束',
    value: 'END',
  },
]
const { formProps, formValues, validate } = useNaiveForm<WorkflowNodeType>(useTemplateRef<FormInst>('form-ref'), {
  values: {
    id: nanoid(),
    name: '',
    type: 'START',
    strategy: 'AND',
    config: [],
    ...defaultValues,
  },
  rules: {
    name: [{ required: true, message: '请输入节点名称', trigger: ['change', 'blur'] }],
    type: [{ required: true, message: '请选择节点类型', trigger: ['change', 'blur'] }],
    strategy: [{ required: true, message: '请选择节点策略', trigger: ['change', 'blur'] }],
  },
})
function handleTypeUpdate(_val: string, option: { label: string, value: string }) {
  formValues.value.config = []
  formValues.value.name = option.label
}
function handleShowConfigForm(data?: WorkflowNodeConfigType) {
  const components = {
    START: WorkflowNodeStartConfig,
    APPROVAL: WorkflowNodeApprovalConfig,
    CC: WorkflowNodeApprovalConfig,
    END: WorkflowNodeStartConfig,
  } as Record<WorkflowNodeType['type'], Component>

  const dialog = window.$dialog.create({
    title: `[${nodeTypeOptions.find(f => f.value === formValues.value.type)?.label}] 节点规则配置`,
    style: 'width:auto;',
    showIcon: false,
    maskClosable: false,
    content: () => {
      return h(components[formValues.value.type], {
        defaultValues: data,
        onConfirm: (val: WorkflowNodeConfigType) => {
          if (!formValues.value.config) {
            formValues.value.config = []
          }
          const index = formValues.value.config.findIndex(f => f.id === val?.id)
          if (index !== -1) {
            formValues.value.config[index] = val
          }
          else {
            formValues.value.config.push(val as any)
          }
          dialog.destroy()
        },
        onCancel: () => {
          dialog.destroy()
        },
      })
    },
  })
}
function handleRemove(index: number) {
  formValues.value.config?.splice(index, 1)
}
function handleConfirm() {
  validate().then(() => {
    emit('confirm', formValues.value)
  })
}
function handleCancel() {
  emit('cancel')
}
function handleClear() {
  formValues.value.config = []
}
</script>

<template>
  <NForm v-bind="formProps" ref="form-ref" class="w-[400px]">
    <NFormItem label="节点类型" path="type">
      <NSelect v-model:value="formValues.type" :options="nodeTypeOptions" @update-value="handleTypeUpdate" />
    </NFormItem>
    <NFormItem label="节点名称" path="name">
      <NInput v-model:value="formValues.name" />
    </NFormItem>

    <template v-if="formValues.type !== 'END'">
      <NFormItem v-if="formValues.type === 'APPROVAL'" label="节点策略" path="strategy">
        <NSwitch v-model:value="formValues.strategy" checked-value="AND" unchecked-value="OR">
          <template #checked>
            AND
          </template>
          <template #unchecked>
            OR
          </template>
        </NSwitch>
      </NFormItem>
      <NFormItem :label="`[${nodeTypeOptions.find(f => f.value === formValues.type)?.label}] 节点规则配置`" path="config">
        <div class="h-[200px] w-full flex-col gap-[10px]">
          <div class="w-full flex-y-center gap-[10px]">
            <NButton type="primary" @click="() => handleShowConfigForm()">
              新增
            </NButton>
            <NButton @click="() => handleClear()">
              清空
            </NButton>
          </div>
          <NScrollbar class="min-h-0 w-full flex-1">
            <WorkflowNodeConfigPreview :default-values="formValues" @confirm="handleShowConfigForm" @remove="handleRemove" />
          </NScrollbar>
        </div>
      </NFormItem>
    </template>
    <NDivider class="m-y-[10px]!" />
    <NFlex justify="end" class="w-full">
      <NButton @click="handleCancel()">
        取消
      </NButton>
      <NButton type="primary" @click="handleConfirm()">
        确认
      </NButton>
    </NFlex>
  </NForm>
</template>

<style scoped>

</style>
