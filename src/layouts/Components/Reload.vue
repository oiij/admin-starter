<script setup lang='ts'>
const { reload } = useAppStore()
const { currentPath } = storeToRefs(useAuthStore())
const { setTabLoading, removeTabLoading } = useAuthStore()
const loading = ref(false)
function handleReload() {
  loading.value = true
  setTabLoading(currentPath.value)
  reload()
  setTimeout(() => {
    loading.value = false
    removeTabLoading()
  }, 1000)
}
</script>

<template>
  <TooltipButton :button-props="{ quaternary: true }" :tooltip="$t('common.refreshPage')" @click="handleReload">
    <template #icon>
      <i class="i-mage-reload" :class="loading ? 'animate-spin' : ''" />
    </template>
  </TooltipButton>
</template>

<style scoped lang='less'>

</style>
