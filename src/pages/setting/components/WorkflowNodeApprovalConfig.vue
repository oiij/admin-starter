<script setup lang='ts'>
import type { FormInst } from 'naive-ui'
import type { RoleType, UserType, WorkflowType } from '~/api'
import { useNaiveForm } from '@oiij/naive-ui'
import { nanoid } from 'nanoid'
import RoleSelect from './RoleSelect.vue'
import UserSelect from './UserSelect.vue'

type WorkflowNodeType = WorkflowType['NodeType']
type ApprovalConfigType = NonNullable<Extract<WorkflowNodeType, { type: 'APPROVAL' }>['config']>[0]

const { defaultValues } = defineProps<{
  defaultValues?: ApprovalConfigType
}>()
const emit = defineEmits<{
  (e: 'confirm', value: ApprovalConfigType): void
  (e: 'cancel'): void
}>()
const nodeTypeOptions = [
  {
    label: '用户',
    value: 'USER',
  },
  {
    label: '角色',
    value: 'ROLE',
  },
  {
    label: '上级',
    value: 'SUPERIOR',
  },
  {
    label: '申请人',
    value: 'APPLICANT',
  },
]
const { formProps, formValues, validate } = useNaiveForm<ApprovalConfigType>(useTemplateRef<FormInst>('form-ref'), {
  values: {
    id: nanoid(),
    ...defaultValues,
  },
  rules: {
    type: [{ required: true, message: '请选择节点类型', trigger: ['change', 'blur'] }],
    value: [{ required: true, message: '请选择节点规则值', trigger: ['change', 'blur'] }],
  },
})
function handleConfirm() {
  validate().then(() => {
    emit('confirm', formValues.value)
  })
}
function handleCancel() {
  emit('cancel')
}
function handleTypeUpdate(option: { label: string, value: string }) {
  formValues.value.typeName = option.label
  formValues.value.value = ''
  formValues.value.label = ''
}
function handleUserUpdate(raw: UserType['Doc']) {
  formValues.value.value = raw._id
  formValues.value.label = raw.nickname
}
function handleRoleUpdate(raw: RoleType['Doc']) {
  formValues.value.value = raw._id
  formValues.value.label = raw.name
}
</script>

<template>
  <NForm v-bind="formProps" ref="form-ref" class="w-[400px]">
    <NFormItem label="节点规则类型" path="type">
      <NSelect v-model:value="formValues.type" :options="nodeTypeOptions" @update:value="(_val, option) => handleTypeUpdate(option)" />
    </NFormItem>
    <NFormItem v-if="formValues.type === 'USER' || formValues.type === 'ROLE'" label="节点规则值" path="value">
      <UserSelect
        v-if="formValues.type === 'USER'"
        :value="formValues.value"
        :fallback-label="formValues.label"
        @update:value="(val, _opt, raw) => raw && !Array.isArray(raw) && handleUserUpdate(raw)"
      />
      <RoleSelect
        v-else-if="formValues.type === 'ROLE'"
        :value="formValues.value"
        :fallback-label="formValues.label"
        @update:value="(val, _opt, raw) => raw && !Array.isArray(raw) && handleRoleUpdate(raw)"
      />
      <NInput v-else placeholder="请先选择节点规则类型" disabled />
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
