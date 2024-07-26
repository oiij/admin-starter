<script setup lang='ts'>
import type { SelectOption } from 'naive-ui'

const { color, showWatermark, transition, layout } = storeToRefs(useAppStore())
const show = ref(false)
function handleOpen() {
  show.value = true
}
const transitionOptions: SelectOption[] = [
  { value: 'fade', label: '淡入淡出' },
  { value: 'fade-left', label: '左侧进入' },
  { value: 'fade-right', label: '右侧进入' },
  { value: 'fade-top', label: '顶部进入' },
  { value: 'fade-bottom', label: '底部进入' },
  { value: 'zoom-in', label: '缩小进入' },
  { value: 'zoom-out', label: '放大进入' },
]
</script>

<template>
  <TooltipButton tooltip="系统设置" @click="handleOpen">
    <template #icon>
      <i class="i-mage-settings" />
    </template>
  </TooltipButton>
  <n-drawer v-model:show="show" :width="320">
    <n-drawer-content>
      <template #header>
        系统设置
      </template>
      <div class="w-full flex-col">
        <n-divider title-placement="left">
          布局
        </n-divider>
        <div class="w-full flex-col gap-[10px] rounded-md bg-black/5 p-[10px] dark:bg-white/5">
          <LayoutModeSelect v-model:value="layout" />
        </div>
        <n-divider title-placement="left">
          主题
        </n-divider>
        <div class="w-full flex-col gap-[10px] rounded-md bg-black/5 p-[10px] dark:bg-white/5">
          <ThemeSelect v-model:value="color.primary" />
        </div>
        <n-divider title-placement="left">
          其他配置
        </n-divider>
        <div class="w-full flex-col gap-[10px] rounded-md bg-black/5 p-[10px] dark:bg-white/5">
          <div class="h-[30px] w-full flex-y-center justify-between">
            <span>显示水印</span>
            <n-switch v-model:value="showWatermark" />
          </div>
          <div class="h-[30px] w-full flex-y-center justify-between">
            <span>动画效果</span>
            <n-select v-model:value="transition" class="w-[120px]!" :options="transitionOptions" />
          </div>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang='less'>

</style>
