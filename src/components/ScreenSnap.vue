<script setup lang='ts'>
import type { CaptureResult } from '@zumer/snapdom'
import { useBoolean } from '@oiij/use'
import { snapdom } from '@zumer/snapdom'
import dayjs from 'dayjs'

const snapDomRef = shallowRef<CaptureResult | null>(null)
const showPopover = ref(false)
const hideTooltip = ref(false)
const snapUrl = ref('')
const { setTrue, setFalse, value: loading } = useBoolean(false)
async function handleSnap() {
  if (loading.value || showPopover.value) {
    return
  }
  if (snapUrl.value) {
    URL.revokeObjectURL(snapUrl.value)
    snapUrl.value = ''
  }
  setTrue()
  showPopover.value = false
  hideTooltip.value = true
  await nextTick()
  await new Promise(res => setTimeout(res, 1000))
  const el = document.querySelector('body')

  if (el) {
    snapDomRef.value = await snapdom(el, {
      exclude: ['.screen-snap'],
    })
    const blob = await snapDomRef.value.toBlob()
    snapUrl.value = URL.createObjectURL(blob)
    showPopover.value = true
    setFalse()
  }
}
function handleClose() {
  showPopover.value = false
  hideTooltip.value = false
}
async function handleSave() {
  await snapDomRef.value?.download({
    filename: `截图-${dayjs().format('YYYY-MM-DD')}-${dayjs().valueOf()}.png`,
  })
  window.$message.success('保存成功')
}
async function handleCopy() {
  const blob = await snapDomRef.value?.toBlob()
  if (blob) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])
      window.$message.success('复制成功')
    }
    catch (error) {
      console.error('复制失败', error)
      window.$message.error('复制失败')
    }
  }
}
async function handleFeedback() {

}
</script>

<template>
  <NTooltip :disabled="hideTooltip">
    <template #trigger>
      <div class="screen-snap fixed bottom-[100px] right-0 border rounded-l-full border-r-none bg-white p-[6px]">
        <NPopover trigger="manual" :show="showPopover" style="padding: 6px;">
          <template #trigger>
            <NButton size="small" :loading="loading" class="rounded-l-full!" quaternary @click="() => handleSnap()">
              <template #icon>
                <i class="i-mage-box-3d-scan" />
              </template>
            </NButton>
          </template>
          <div class="relative w-[400px] flex-col p-[10px]">
            <div class="absolute right-0 top-0 z-9">
              <NButton secondary circle size="small" @click="() => handleClose()">
                <template #icon>
                  <i class="i-mage-multiply" />
                </template>
              </NButton>
            </div>
            <NSpin :show="loading">
              <NImage
                :src="snapUrl"
                class="w-full border rounded-[6px]"
              />
            </NSpin>
            <NDivider class="m-y-[10px]!" />
            <NFlex justify="end">
              <NButton type="primary" size="small" @click="() => handleSave()">
                保存
              </NButton>
              <NButton type="primary" size="small" @click="() => handleCopy()">
                复制
              </NButton>
              <NButton type="primary" size="small" @click="() => handleFeedback()">
                反馈
              </NButton>
            </NFlex>
          </div>
        </NPopover>
      </div>
    </template>
    <span>截屏反馈</span>
  </NTooltip>
</template>

<style scoped>

</style>
