<script setup lang='ts'>
const props = defineProps<{
  value?: 'Horizontal' | 'Vertical'
}>()
const emit = defineEmits<{
  (e: 'update:value', value: typeof props.value): void
}>()
</script>

<template>
  <div class="flex justify-between gap-[10px] p-[5px]">
    <div class="grid grid-cols-4 h-[60px] w-[100px] cursor-pointer gap-[5px] rounded-md p-[10px] transition-base hover:bg-black/10" :class="props.value === 'Horizontal' ? 'bg-black/10' : ''" @click="emit('update:value', 'Horizontal')">
      <div class="col-span-1 rounded-md bg-black/20" />
      <div class="col-span-3 rounded-md bg-black/5" />
    </div>
    <div class="grid grid-rows-5 h-[60px] w-[100px] cursor-pointer gap-[5px] rounded-md p-[10px] transition-base hover:bg-black/10" :class="props.value === 'Vertical' ? 'bg-black/10' : ''" @click="emit('update:value', 'Vertical')">
      <div class="row-span-2 rounded-md bg-black/20" />
      <div class="row-span-3 rounded-md bg-black/5" />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
