<script setup lang='ts'>
import { TabItem, TabsBar } from '@eiog/ui'

const { tabs, currentPath } = storeToRefs(useAuthStore())
const { removeTab } = useAuthStore()
const router = useRouter()

function handleUpdateValue(key: string | number) {
  router.push(key as string)
}
</script>

<template>
  <TabsBar :value="currentPath" @update:value="handleUpdateValue" @close="removeTab">
    <TabItem v-for="item in tabs" :key="item.key" :name="(item.key as string)" :closeable="item.key !== '/'" :icon="(item.icon as any)">
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
    </TabItem>

    <template #suffix>
      <div class="flex-y-center p-x-[10px]">
        <Reload />
        <ToggleContentFullScreen />
      </div>
    </template>
  </TabsBar>
</template>

<style scoped lang='less'>

</style>
