<script setup lang='ts'>
const { tabs, currentPath } = storeToRefs(useAuthStore())
const { removeTab } = useAuthStore()
const router = useRouter()
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <n-tabs size="small" type="card" :animated="true" :value="currentPath" @update-value="handleUpdateValue" @close="removeTab">
    <n-tab v-for="item in tabs" :key="item.key" :name="(item.key as string)" :closable="item.key !== '/'" class="rounded-t-[12px]!">
      <div class="flex-y-center gap-[5px]">
        <n-tooltip trigger="hover" :disabled="item.key !== currentPath && item.meta && !item.meta.keepAlive">
          <template #trigger>
            <n-badge dot processing :type="item.key !== currentPath && item.meta && !item.meta.keepAlive ? 'warning' : 'success'" />
          </template>
          KeepAlived
        </n-tooltip>
        <div class="flex-y-center gap-[5px]" :class="item.key !== currentPath ? 'grayscale-100' : ''">
          <n-icon :component="defineComponent({ render: item.icon })" :size="18" />
          {{ item.label }}
        </div>
      </div>
    </n-tab>
    <template #suffix>
      <div class="flex-y-center p-x-[10px]">
        <Reload />
        <ToggleContentFullScreen />
      </div>
    </template>
  </n-tabs>
</template>

<style scoped lang='less'>

</style>
