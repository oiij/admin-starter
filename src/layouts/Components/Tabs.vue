<script setup lang='ts'>
import type { DropdownOption } from 'naive-ui'
import { CTabItem, CTabs } from '@oiij/chrome-tabs'
import { useContextMenu } from '@oiij/use'
import '@oiij/chrome-tabs/style.css'

const { authTabs, currentPath, tabLoadingPath } = storeToRefs(useAuthStore())
const { removeTab, setTabLoading, removeTabLoading } = useAuthStore()
const router = useRouter()
const { x, y, show, contextMenuEvent, hide } = useContextMenu()
const options: DropdownOption[] = [
  {
    label: '刷新页面',
    key: 'refresh',
  },
]
function handleUpdateValue(key: string | number) {
  setTabLoading(key as string)
  router.push(key as string).then(() => {
    removeTabLoading()
  })
}
function handleContextMenuClick(ev: MouseEvent) {
  contextMenuEvent(ev)
}
</script>

<template>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="show"
    :on-clickoutside="hide"
  />
  <CTabs :value="currentPath" @update:value="handleUpdateValue" @close="removeTab">
    <CTabItem v-for="item in authTabs" :key="item.key" :name="(item.key as string)" :closeable="item.key !== '/'" :icon="(item.icon as any)" :loading="tabLoadingPath === item.key" @contextmenu="handleContextMenuClick">
      <div class="flex-y-center gap-[5px]">
        <div class="flex-y-center gap-[5px]" :class="item.key !== currentPath ? 'grayscale-100' : ''">
          {{ item.label }}
        </div>
        <n-tooltip trigger="hover" :disabled="item.key !== currentPath && item.meta && !item.meta.keepAlive">
          <template #trigger>
            <n-badge dot processing :type="item.key !== currentPath && item.meta && !item.meta.keepAlive ? 'warning' : 'success'" />
          </template>
          KeepAlived
        </n-tooltip>
      </div>
    </CTabItem>

    <template #suffix>
      <div class="flex-y-center p-x-[10px]">
        <Reload />
        <ToggleContentFullScreen />
      </div>
    </template>
  </CTabs>
</template>

<style scoped lang='less'>

</style>
