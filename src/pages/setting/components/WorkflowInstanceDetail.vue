<script setup lang='ts'>
import type { WorkflowInstanceType } from '~/api'
import useRequest from 'vue-hooks-plus/es/useRequest'
import { workflowTaskApi } from '~/api'

const { defaultValue } = defineProps<{
  defaultValue: WorkflowInstanceType['Doc']
}>()

const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const _APPROVAL_API = workflowTaskApi.approval
const { _APPROVAL_ACCESS } = usePageInfo()

const { loading: approvalLoading, run: handleApproval } = useRequest(_APPROVAL_API, {
  manual: true,
  onSuccess: () => {
    emit('submit')
  },
})
</script>

<template>
  <div class="h-[600px] w-[600px] flex-col gap-[10px]">
    <NSteps>
      <NStep v-for="item in defaultValue.workflow.nodes" :key="item.id" :title="item.name" />
    </NSteps>
    <div class="min-h-0 w-full flex-1">
      <NScrollbar class="wh-full">
        <pre>{{ defaultValue }}</pre>
      </NScrollbar>
    </div>
    <NDivider class="m-y-[10px]!" />
    <NFlex justify="end">
      <AccessValidator :value="_APPROVAL_ACCESS">
        <NButton type="success" :loading="approvalLoading" @click="() => handleApproval({ _id: defaultValue._id, action: 'APPROVED' })">
          同意
        </NButton>
      </AccessValidator>
      <AccessValidator :value="_APPROVAL_ACCESS">
        <NButton type="error" :loading="approvalLoading" @click="() => handleApproval({ _id: defaultValue._id, action: 'REJECTED' })">
          拒绝
        </NButton>
      </AccessValidator>
    </NFlex>
  </div>
</template>

<style scoped>

</style>
