<script setup lang='ts'>
import type { FormInst } from 'naive-ui'
import type { WorkflowType } from '~/api'
import { useNaiveForm } from '@oiij/naive-ui'
import { nanoid } from 'nanoid'

type WorkflowNodeType = WorkflowType['NodeType']
type StartConfigType = NonNullable<Extract<WorkflowNodeType, { type: 'START' }>['config']>[0]

const { defaultValues } = defineProps<{
  defaultValues?: StartConfigType
}>()
const emit = defineEmits<{
  (e: 'confirm', value: StartConfigType): void
  (e: 'cancel'): void
}>()
const nodeTypeOptions = [
  {
    label: '输入',
    value: 'INPUT',
  },
  {
    label: '选择',
    value: 'SELECT',
  },
  {
    label: '单选',
    value: 'RADIO',
  },
  {
    label: '多选',
    value: 'CHECKBOX',
  },
  {
    label: '开关',
    value: 'SWITCH',
  },
]

const { formProps, formValue, validate } = useNaiveForm<StartConfigType>(useTemplateRef<FormInst>('form-ref'), {
  id: nanoid(),
  type: 'INPUT',
  ...defaultValues,
}, {
  rules: {
    type: [{ required: true, message: '请选择节点类型', trigger: ['change', 'blur'] }],
    fieldLabel: [{ required: true, message: '请输入字段Key', trigger: ['change', 'blur'] }],
    fieldKey: [{ required: true, message: '请输入字段Value', trigger: ['change', 'blur'] }],
    options: [{ required: true, validator: (_, val?: { label: string, value: string }[]) => {
      if (!val || val.length === 0) {
        return new Error('请配置选项')
      }
      if (new Set(val.map(m => m.value)).size !== val.length) {
        return new Error('选项Value不能重复')
      }
      return true
    }, trigger: ['change', 'blur'] }],
  },
})
const hasOptions = computed(() => {
  return formValue.value.type && ['SELECT', 'RADIO', 'CHECKBOX'].includes(formValue.value.type)
})
function handleConfirm() {
  validate().then(() => {
    emit('confirm', formValue.value)
  })
}
function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <NForm v-bind="formProps" ref="form-ref" class="w-[400px]">
    <NFormItem label="节点类型" path="type">
      <NSelect v-model:value="formValue.type" :options="nodeTypeOptions" />
    </NFormItem>
    <NFlex>
      <NFormItem label="字段Label" path="fieldLabel">
        <NInput v-model:value="formValue.fieldLabel" />
      </NFormItem>
      <NFormItem label="字段Key" path="fieldKey">
        <NInput v-model:value="formValue.fieldKey" />
      </NFormItem>
      <NFormItem label="字段Value" path="fieldValue">
        <NInput v-model:value="formValue.fieldValue" />
      </NFormItem>
      <NFormItem label="占位符" path="placeholder">
        <NInput v-model:value="formValue.placeholder" />
      </NFormItem>
    </NFlex>
    <NFormItem label="是否必填" path="required">
      <NSwitch v-model:value="formValue.required" />
    </NFormItem>
    <NFormItem v-if="hasOptions" label="配置项" path="options">
      <NScrollbar class="h-[160px] w-full">
        <NDynamicInput v-model:value="formValue.options" :on-create="() => ({ label: '', value: '' })">
          <template #create-button-default>
            新增
          </template>
          <template #default="{ value }">
            <NFlex :wrap="false">
              <NInput v-model:value="value.label">
                <template #prefix>
                  Label
                </template>
              </NInput>
              <NInput v-model:value="value.value">
                <template #prefix>
                  Value
                </template>
              </NInput>
            </NFlex>
          </template>
        </NDynamicInput>
      </NScrollbar>
    </NFormItem>
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
