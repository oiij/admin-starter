<script setup lang='ts'>
import type { DropdownOption } from 'naive-ui'
import type { WorkflowType } from '~/api'
import { WorkflowNodeTypeEnum } from '~/utils/enum'
import WorkflowNodeConfigPreview from './WorkflowNodeConfigPreview.vue'
import WorkflowNodeForm from './WorkflowNodeForm.vue'

type WorkflowNodeType = WorkflowType['NodeType']

const { value } = defineProps<{
  value?: WorkflowNodeType[]
}>()
const emit = defineEmits<{
  (e: 'update:value', value: WorkflowNodeType[]): void
  (e: 'cancel'): void
}>()
const nodes = ref(value ?? [])

function handleSelect(key: 'edit' | 'delete', item: WorkflowNodeType) {
  if (key === 'edit') {
    handleShowNodeForm(item)
    return
  }
  if (key === 'delete') {
    nodes.value = nodes.value.filter(node => node.id !== item.id)
  }
}
const disabledButton = computed(() => nodes.value.some(s => s.type === 'END'))
function handleShowNodeForm(data?: WorkflowNodeType) {
  const dialog = window.$dialog.create({
    title: '增加节点',
    showIcon: false,
    maskClosable: false,
    style: 'width:auto;',
    content: () => {
      return h(WorkflowNodeForm, {
        defaultValues: data,
        onConfirm: (val) => {
          const index = nodes.value.findIndex(f => f.id === val.id)
          if (index !== -1) {
            nodes.value[index] = val
          }
          else {
            nodes.value.push(val)
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
const options: DropdownOption[] = [
  {
    label: '编辑',
    key: 'edit',
    icon: () => h('i', { class: 'i-mage-edit' }),
  },
  {
    label: '删除',
    key: 'delete',
    icon: () => h('i', { class: 'i-mage-trash' }),
  },
]

function handleCancel() {
  emit('cancel')
}
function handleConfirm() {
  emit('update:value', nodes.value)
}
function handleClear() {
  nodes.value = []
}
</script>

<template>
  <div class="flex-col gap-[10px]">
    <div class="relative h-[500px] w-[1200px] bg-white">
      <div class="absolute right-[10px] top-0 z-1 flex-y-center gap-[10px]">
        <NButton icon-placement="right" type="primary" :disabled="disabledButton" @click="() => handleShowNodeForm()">
          <template #icon>
            <i class="i-mage-plus" />
          </template>
          增加节点
        </NButton>
        <NButton icon-placement="right" @click="() => handleClear() ">
          <template #icon>
            <i class="i-mage-trash" />
          </template>
          清空
        </NButton>
      </div>
      <NScrollbar v-if="nodes.length > 0" x-scrollable class="wh-full">
        <div class="h-[500px] flex-y-center gap-[10px]">
          <div v-for="(item, index) in nodes" :key="item.id" class="min-w-[300px] flex-shrink-0">
            <NCard :segmented="true" :hoverable="true">
              <template #header>
                <div class="flex-y-center">
                  {{ `#${index + 1}-${item.name}` }}
                </div>
              </template>
              <template #header-extra>
                <NFlex class="m-l-[10px]">
                  <NTag :bordered="false" :type="WorkflowNodeTypeEnum[item.type].type">
                    {{ item.type }}
                  </NTag>
                  <NTag v-if="item.type === 'APPROVAL'" :bordered="false">
                    {{ item.strategy }}
                  </NTag>
                  <NDropdown trigger="click" :options="options" @select="(key) => handleSelect(key, item)">
                    <NButton size="small" secondary circle>
                      <template #icon>
                        <i class="i-mage-dots" />
                      </template>
                    </NButton>
                  </NDropdown>
                </NFlex>
              </template>
              <NScrollbar class="max-h-[300px]">
                <WorkflowNodeConfigPreview preview :default-values="item" />
              </NScrollbar>
            </NCard>
          </div>
        </div>
      </NScrollbar>
      <div v-else class="wh-full flex items-center justify-center">
        <NEmpty />
      </div>
    </div>
    <NDivider class="m-y-[10px]!" />
    <NFlex justify="end" class="w-full">
      <NButton @click="handleCancel()">
        取消
      </NButton>
      <NButton type="primary" @click="handleConfirm()">
        确认
      </NButton>
    </NFlex>
  </div>
</template>

<style scoped>

</style>
