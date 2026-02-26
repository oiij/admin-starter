<script setup lang='ts'>
import { NTooltipButton } from '@oiij/naive-ui/components'
import dayjs from 'dayjs'
import { sha } from '~build/git'
import now from '~build/time'

const { date, time } = useClock()

const { browser, os } = useUaParser()

const fps = useFps()

const { isSupported: memoryIsSupported, memory } = useMemory()
function sizeFormat(size?: number) {
  return size ? (size / 1024 / 1024).toFixed(2) : 'N/A'
}
</script>

<template>
  <div class="wh-full flex items-center justify-end gap-[10px] border-l bg-white p-x-[10px] dark:border-white/10 dark:bg-black">
    <NTooltipButton
      :tooltip="`Build Sha ${sha.slice(0, 7)}, At ${dayjs(now).format('YYYY-MM-DD HH:mm:ss')}.`"
      :button-props="{ size: 'small', quaternary: true, type: 'info' }"
    >
      <template #icon>
        <i class="i-mage-check-square text-[14px]" />
      </template>
    </NTooltipButton>
    <NTooltipButton
      :tooltip="`${browser.name}${os.name}, ${memoryIsSupported ? `${sizeFormat(memory?.usedJSHeapSize)}/${sizeFormat(memory?.jsHeapSizeLimit)}MB` : `N/A`}, ${fps}FPS`"
      :button-props="{ size: 'small', quaternary: true, type: 'default' }"
    >
      <template #icon>
        <i class="i-mage-information-circle text-[14px]" />
      </template>
    </NTooltipButton>
    <NTooltipButton
      :tooltip="`${date} ${time} `"
      :button-props="{ size: 'small', quaternary: true, type: 'default' }"
    >
      {{ time }}
    </NTooltipButton>
  </div>
</template>

<style scoped>

</style>
