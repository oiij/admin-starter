<script setup lang='ts'>
const { value } = defineProps<{
  value: string
}>()
</script>

<template>
  <slot v-if="useAccessValidator(value)" />
  <NButton v-else disabled>
    无权限
  </NButton>
</template>

<style scoped>

</style>
