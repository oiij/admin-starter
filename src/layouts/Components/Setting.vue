<script setup lang='ts'>
import type { SelectOption } from 'naive-ui'
import { TooltipButton } from '@eiog/ui'

const { showWatermark, transitionName, layout, language, colorMode, color } = storeToRefs(useAppStore())
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
const localesOptions: SelectOption[] = [
  {
    label: '跟随系统',
    value: 'auto',
  },
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: '英文',
    value: 'en-US',
  },
]
const colorModeOptions: SelectOption[] = [
  {
    label: '跟随系统',
    value: 'auto',

  },
  {
    label: '浅色',
    value: 'light',
  },
  {
    label: '深色',
    value: 'dark',
  },
]
</script>

<template>
  <TooltipButton :button-props="{ quaternary: true }" :tooltip="$t('common.systemSetting')" @click="handleOpen">
    <template #icon>
      <i class="i-mage-settings" />
    </template>
  </TooltipButton>
  <n-drawer v-model:show="show" :width="320">
    <n-drawer-content>
      <template #header>
        {{ $t('common.systemSetting') }}
      </template>
      <div class="w-full flex-col">
        <n-divider title-placement="left">
          通用
        </n-divider>
        <div class="w-full flex-col gap-[10px] rounded-md bg-black/5 p-[10px] dark:bg-white/5">
          <n-form-item label="语言">
            <n-select v-model:value="language" class="w-[260px]!" :options="localesOptions" />
          </n-form-item>
          <n-form-item label="颜色模式">
            <n-select v-model:value="colorMode" class="w-[260px]!" :options="colorModeOptions" />
          </n-form-item>
        </div>
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
            <n-select v-model:value="transitionName" class="w-[120px]!" :options="transitionOptions" />
          </div>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang='less'>

</style>
