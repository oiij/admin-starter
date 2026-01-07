<script setup lang='ts'>
const { preview } = defineProps<{
  preview?: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'remove'): void
}>()
</script>

<template>
  <div class="w-full flex-y-center gap-[10px]">
    <slot />
    <NButtonGroup v-if="!preview">
      <NButton @click="() => emit('confirm')">
        编辑
      </NButton>
      <NButton @click="() => emit('remove')">
        删除
      </NButton>
    </NButtonGroup>
  </div>
</template>

<style scoped>

</style>
