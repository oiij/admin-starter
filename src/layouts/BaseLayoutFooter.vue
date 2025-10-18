<script setup lang='ts'>
import dayjs from 'dayjs'
import { sha } from '~build/git'
import now from '~build/time'

const { date, time } = useClock()

const { browser, os } = useUaParser()

const fps = useFps()
</script>

<template>
  <div class="wh-full flex items-center justify-end gap-[10px] border-l bg-white p-x-[10px] dark:border-white/10 dark:bg-black">
    <NTag :bordered="false" type="info">
      <template #icon>
        <i class="i-mage-check-square text-[14px]" />
      </template>
      {{ `Build Sha ${sha.slice(0, 7)}, At ${dayjs(now).format('YYYY-MM-DD HH:mm:ss')}.` }}
    </NTag>
    <NTag :bordered="false">
      <template #icon>
        <i class="i-mage-chip text-[14px]" />
      </template>
      {{ browser.name }}
      {{ os.name }}
    </NTag>
    <NTag :bordered="false">
      <template #icon>
        <i class="i-mage-clock text-[14px]" />
      </template>
      {{ `${date} ${time} ` }}
    </NTag>
    <NTag :bordered="false">
      <template #icon>
        <span class="text-[14px]">Fps</span>
      </template>
      {{ fps }}
    </NTag>
  </div>
</template>

<style scoped>

</style>
