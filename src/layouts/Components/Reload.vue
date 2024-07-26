<script setup lang='ts'>
const { reload } = useAppStore()
const loading = ref(false)
function handleReload() {
  loading.value = true
  reload()
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <TooltipButton tooltip="重载页面" @click="handleReload">
    <template #icon>
      <i class="i-mage-reload" :class="loading ? 'animate-spin' : ''" />
    </template>
  </TooltipButton>
</template>

<style scoped lang='less'>

</style>
