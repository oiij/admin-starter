<script setup lang='ts'>
import type { WorkflowTaskType } from '~/api'
import { NFlex } from 'naive-ui'
import useRequest from 'vue-hooks-plus/es/useRequest'
import { workflowTaskApi } from '~/api'
import AccessValidator from '~/components/AccessValidator.vue'

const { defaultValue } = defineProps<{
  defaultValue: WorkflowTaskType['Doc']
}>()

const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const _APPROVAL_API = workflowTaskApi.approval
const { _APPROVAL_ACCESS } = usePageInfo()
const status = computed(() => {
  if (defaultValue.status === 'PENDING')
    return 'process'
  if (defaultValue.status === 'APPROVED')
    return 'finish'
  if (defaultValue.status === 'REJECTED')
    return 'error'
  return 'process'
})
const { loading: approvalLoading, run: handleApproval } = useRequest(_APPROVAL_API, {
  manual: true,
  onSuccess: () => {
    emit('submit')
  },
})
</script>

<template>
  <div class="h-[600px] w-[600px] flex-col gap-[10px]">
    <NSteps content-placement="bottom" :current="defaultValue.nodeStep + 1" :status="status">
      <NStep
        v-for="item in defaultValue.nodes"
        :key="item.id"
        :title="item.name"
      />
    </NSteps>
    <div class="min-h-0 w-full flex-1">
      <NScrollbar class="wh-full">
        <pre>{{ defaultValue }}</pre>
      </NScrollbar>
    </div>
    <NDivider class="m-y-[10px]!" />
    <NFlex justify="end">
      <AccessValidator :value="_APPROVAL_ACCESS">
        <NButton type="success" :loading="approvalLoading" :disabled="defaultValue.status !== 'PENDING'" @click="() => handleApproval({ _id: defaultValue._id, action: 'APPROVED' })">
          同意
        </NButton>
      </AccessValidator>
      <AccessValidator :value="_APPROVAL_ACCESS">
        <NButton type="error" :loading="approvalLoading" :disabled="defaultValue.status !== 'PENDING'" @click="() => handleApproval({ _id: defaultValue._id, action: 'REJECTED' })">
          拒绝
        </NButton>
      </AccessValidator>
    </NFlex>
  </div>
</template>

<style scoped>

</style>
