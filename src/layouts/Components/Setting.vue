<script setup lang='ts'>
import type { SelectOption } from 'naive-ui'
import { NTooltipButton } from '@oiij/naive-ui/components'
import ThemeColorSelect from './ThemeColorSelect.vue'

const { showWatermark, transitionName, colorMode, themeColors, backgroundImage } = storeToRefs(useAppStore())
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
  <NTooltipButton :button-props="{ quaternary: true }" :tooltip="$t('common.systemSetting')" @click="handleOpen">
    <template #icon>
      <i class="i-mage-settings" />
    </template>
  </NTooltipButtoN>
  <NDrawer v-model:show="show" :width="320">
    <NDrawerContent>
      <NFlex vertical>
        <NCard title="主题颜色" size="small" :segmented="true">
          <NFormItem label="主题色">
            <ThemeColorSelect v-model:value="themeColors.primary" />
          </NFormItem>
          <NFormItem label="颜色模式">
            <NSelect v-model:value="colorMode" :options="colorModeOptions" />
          </NFormItem>
        </NCard>
        <NCard title="其他配置" size="small" :segmented="true">
          <NFormItem label="显示水印" label-placement="left">
            <NSwitch v-model:value="showWatermark" />
          </NFormItem>
          <NFormItem label="动画效果" label-placement="left">
            <NSelect v-model:value="transitionName" :options="transitionOptions" />
          </NFormItem>
          <NFormItem label="自定义图片" label-placement="top">
            <NFlex class="w-full" vertical>
              <NImage class="h-[100px] w-full rounded-[8px]" object-fit="cover" :src="backgroundImage" />
              <NInput v-model:value="backgroundImage" class="w-full!" type="textarea" />
            </NFlex>
          </NFormItem>
        </NCard>
      </NFlex>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped lang='less'>

</style>
