<script setup lang='ts'>
import { NTooltipButton } from '@oiij/naive-ui/components'
import ThemeColorSelect from './ThemeColorSelect.vue'

const { showWatermark, transitionName, colorMode, language, themeColors, backgroundImage } = storeToRefs(useAppStore())
const { t } = useI18n()

const show = ref(false)
function handleOpen() {
  show.value = true
}
const transitionOptions = computed(() => [
  { value: 'fade', label: t(`common.system-setting.fade`) },
  { value: 'fade-left', label: t(`common.system-setting.fade-left`) },
  { value: 'fade-right', label: t(`common.system-setting.fade-right`) },
  { value: 'fade-top', label: t(`common.system-setting.fade-top`) },
  { value: 'fade-bottom', label: t(`common.system-setting.fade-bottom`) },
  { value: 'zoom-in', label: t(`common.system-setting.zoom-in`) },
  { value: 'zoom-out', label: t(`common.system-setting.zoom-out`) },
])

const colorModeOptions = computed(() => [
  {
    label: t(`common.system-setting.auto-mode`),
    value: 'auto',

  },
  {
    label: t(`common.system-setting.light-mode`),
    value: 'light',
  },
  {
    label: t(`common.system-setting.dark-mode`),
    value: 'dark',
  },
])
const languageOptions = computed(() => [
  {
    label: t(`common.system-setting.auto-language`),
    value: 'auto',
  },
  {
    label: t(`common.system-setting.zh-CN`),
    value: 'zh-CN',
  },
  {
    label: t(`common.system-setting.en-US`),
    value: 'en-US',
  },
])
</script>

<template>
  <NTooltipButton :button-props="{ quaternary: true }" :tooltip="$t(`common.system-setting.tooltip`)" @click="handleOpen">
    <template #icon>
      <i class="i-mage-settings" />
    </template>
  </NTooltipButtoN>
  <NDrawer v-model:show="show" :width="320">
    <NDrawerContent>
      <NFlex vertical>
        <NCard :title="$t(`common.system-setting.appearance`)" size="small" :segmented="true">
          <NFormItem :label="$t(`common.system-setting.theme-color`)">
            <ThemeColorSelect v-model:value="themeColors.primary" />
          </NFormItem>
          <NFormItem :label="$t(`common.system-setting.color-mode`)">
            <NSelect v-model:value="colorMode" :options="colorModeOptions" />
          </NFormItem>
          <NFormItem :label="$t(`common.system-setting.language`)">
            <NSelect v-model:value="language" :options="languageOptions" />
          </NFormItem>
        </NCard>
        <NCard :title="$t(`common.system-setting.other`)" size="small" :segmented="true">
          <NFormItem :label="$t(`common.system-setting.show-watermark`)">
            <NSwitch v-model:value="showWatermark" />
          </NFormItem>
          <NFormItem :label="$t(`common.system-setting.transition`)">
            <NSelect v-model:value="transitionName" :options="transitionOptions" />
          </NFormItem>
          <NFormItem :label="$t(`common.system-setting.custom-image`)" label-placement="top">
            <NFlex class="w-full" vertical>
              <NInput v-model:value="backgroundImage" class="w-full!" type="textarea" />
              <NImage class="h-[100px] w-full border rounded-[8px]" object-fit="cover" :src="backgroundImage" />
            </NFlex>
          </NFormItem>
        </NCard>
      </NFlex>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped lang='less'>

</style>
