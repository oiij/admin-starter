<script setup lang='ts'>
const props = defineProps<{
  value?: string
}>()
const emit = defineEmits<{
  (e: 'update:value', v: typeof props.value): void
}>()
const colorPickerShow = ref(false)
const swatches = [
  { name: '朱砂', color: '#ff461f' },
  { name: '火红', color: '#ff2d51' },
  { name: '鹅黄', color: '#fff143' },
  { name: '蔚蓝', color: '#70f3ff' },
  { name: '石青', color: '#1685a9' },
  { name: '靛蓝', color: '#065279' },
  { name: '品红', color: '#f00056' },
  { name: '宝蓝', color: '#4b5cc4' },
  { name: '蓝灰色', color: '#a1afc9' },
  { name: '青葱', color: '#0aa344' },
  { name: '黛紫', color: '#574266' },
  { name: '玄青', color: '#3d3b4f' },
  { name: '丁香色', color: '#cca4e3' },
]
</script>

<template>
  <div class="w-full flex-col gap-[10px]">
    <div class="relative grid grid-cols-7 w-full gap-[12px]">
      <div
        v-for="(item, index) in swatches"
        :key="index"
        class="row-span-1 aspect-ratio-1 flex cursor-pointer items-center justify-center rounded-md"
        :style="{ background: `${item.color}` }"
        @click="emit('update:value', item.color)"
      >
        <i v-if="props.value === item.color" class="i-mage-check text-2xl text-white" />
      </div>
      <div
        class="row-span-1 aspect-ratio-1 flex cursor-pointer items-center justify-center rounded-md"
        :style="{ background: `${props.value ?? '#000'}` }"
        @click="colorPickerShow = true"
      >
        <i class="i-mage-dots-horizontal text-2xl text-white" />
      </div>
      <n-color-picker
        class="invisible! absolute! bottom-[0]! right-[0]!"
        placement="bottom-end"
        :actions="[]"
        :show="colorPickerShow"
        :value="props.value"
        @update-value="(v) => emit('update:value', v)"
      />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
