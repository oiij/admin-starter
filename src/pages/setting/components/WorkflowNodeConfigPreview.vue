<script setup lang='ts'>
import type { WorkflowType } from '~/api'
import WorkflowNodeConfigPreviewActions from './WorkflowNodeConfigPreviewActions.vue'
import WorkflowNodeItemInput from './WorkflowNodeItemInput.vue'

type WorkflowNodeType = WorkflowType['NodeType']
type WorkflowNodeConfigType = NonNullable<WorkflowNodeType['config']>[0]

const { defaultValue, preview } = defineProps<{
  defaultValue: WorkflowNodeType
  preview?: boolean
}>()
const emit = defineEmits<{
  (e: 'confirm', data: WorkflowNodeConfigType): void
  (e: 'remove', index: number): void
}>()
</script>

<template>
  <div class="w-full flex-col gap-[10px]">
    <template v-if="defaultValue.type === 'START'">
      <WorkflowNodeConfigPreviewActions
        v-for="(item, index) in defaultValue.config"
        :key="index"
        :preview="preview"
        @confirm="() => emit('confirm', item)"
        @remove="() => emit('remove', index)"
      >
        <WorkflowNodeItemInput v-bind="item" />
      </WorkflowNodeConfigPreviewActions>
    </template>
    <template v-if="defaultValue.type === 'APPROVAL' || defaultValue.type === 'CC'">
      <WorkflowNodeConfigPreviewActions
        v-for="(item, index) in defaultValue.config"
        :key="index"
        :preview="preview"
        @confirm="() => emit('confirm', item)"
        @remove="() => emit('remove', index)"
      >
        <NInputGroup>
          <NInputGroupLabel :class="item.type === 'APPLICANT' || item.type === 'SUPERIOR' ? 'w-full' : ''">
            {{ item.typeName }}
          </NInputGroupLabel>
          <NInput v-if="item.type === 'USER' || item.type === 'ROLE'" :value="item.label" readonly />
        </NInputGroup>
      </WorkflowNodeConfigPreviewActions>
    </template>
  </div>
</template>

<style scoped>

</style>
