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
const { formProps, formValue, validate } = useNaiveForm<ApprovalConfigType>(useTemplateRef<FormInst>('form-ref'), {
  id: nanoid(),
  ...defaultValues,
}, {
  rules: {
    type: [{ required: true, message: '请选择节点类型', trigger: ['change', 'blur'] }],
    value: [{ required: true, message: '请选择节点规则值', trigger: ['change', 'blur'] }],
  },
})
function handleConfirm() {
  validate().then(() => {
    emit('confirm', formValue.value)
  })
}
function handleCancel() {
  emit('cancel')
}
function handleTypeUpdate(option: { label: string, value: string }) {
  formValue.value.typeName = option.label
  formValue.value.value = ''
  formValue.value.label = ''
}
function handleUserUpdate(raw: UserType['Doc']) {
  formValue.value.value = raw._id
  formValue.value.label = raw.nickname
}
function handleRoleUpdate(raw: RoleType['Doc']) {
  formValue.value.value = raw._id
  formValue.value.label = raw.name
}
</script>

<template>
  <NForm v-bind="formProps" ref="form-ref" class="w-[400px]">
    <NFormItem label="节点规则类型" path="type">
      <NSelect v-model:value="formValue.type" :options="nodeTypeOptions" @update:value="(_val, option) => handleTypeUpdate(option)" />
    </NFormItem>
    <NFormItem v-if="formValue.type === 'USER' || formValue.type === 'ROLE'" label="节点规则值" path="value">
      <UserSelect
        v-if="formValue.type === 'USER'"
        :value="formValue.value"
        :fallback-label="formValue.label"
        @update:value="(val, _opt, raw) => raw && !Array.isArray(raw) && handleUserUpdate(raw)"
      />
      <RoleSelect
        v-else-if="formValue.type === 'ROLE'"
        :value="formValue.value"
        :fallback-label="formValue.label"
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
