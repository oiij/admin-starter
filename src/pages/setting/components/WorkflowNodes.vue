<script setup lang='ts'>
import type { WorkflowType } from '~/api'
import { WorkflowNodeTypeEnum } from '~/utils/enum'
import WorkflowNodePanel from './WorkflowNodePanel.vue'

type WorkflowNodeType = WorkflowType['NodeType']

const { value } = defineProps<{
  value?: WorkflowNodeType[]
}>()
const emit = defineEmits<{
  (e: 'update:value', value: WorkflowNodeType[]): void
}>()
const showModal = ref(false)

function handleUpdateNodes(nodes: WorkflowNodeType[]) {
  emit('update:value', nodes)
  showModal.value = false
}
</script>

<template>
  <NCard>
    <div class="absolute right-[10px] top-[10px] z-1 flex-y-center gap-[10px]">
      <NButton type="primary" @click="showModal = true">
        {{ value && value.length > 0 ? '编辑节点' : '增加节点' }}
      </NButton>
      <NButton @click="() => handleUpdateNodes([])">
        清空
      </NButton>
    </div>
    <NScrollbar v-if="value && value.length > 0" x-scrollable class="wh-full">
      <div class="h-[120px] w-auto flex-y-center gap-[10px]">
        <div v-for="item in value" :key="item.id" class="min-w-[200px] flex-shrink-0">
          <NCard size="small" :title="item.name">
            <template #header-extra>
              <NFlex class="m-l-[10px]">
                <NTag :bordered="false" :type="WorkflowNodeTypeEnum[item.type ?? 'START'].type">
                  {{ item.type }}
                </NTag>
                <NTag v-if="item.type === 'APPROVAL'" :bordered="false">
                  {{ item.strategy }}
                </NTag>
              </NFlex>
            </template>
          </NCard>
        </div>
      </div>
    </NScrollbar>
    <div v-else class="wh-full flex items-center justify-center">
      <NEmpty />
    </div>
  </NCard>
  <NModal v-model:show="showModal" preset="card" title="节点配置" :segmented="true" :mask-closable="false" style="width:auto;">
    <WorkflowNodePanel :value="value" @update:value="handleUpdateNodes" @cancel="() => showModal = false" />
  </NModal>
</template>

<style scoped>

</style>
