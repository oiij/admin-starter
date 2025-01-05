<!-- eslint-disable vue/prop-name-casing -->
<script setup lang='ts'>
import { useBoolean } from '@eiog/use'
import Cropper from 'cropperjs'
import { NButton, NSpin } from 'naive-ui'
import { onMounted, ref, shallowRef, toValue } from 'vue'
import 'cropperjs/dist/cropper.min.css'

const { src } = defineProps<{
  src?: string
}>()
const emit = defineEmits<{
  (e: 'saved', url: string): void
}>()
const { value: cropperLoading, setTrue: setCropperLoading, setFalse: hideCropperLoading } = useBoolean(false)
const domRef = ref<HTMLElement>()
const imgRef = ref<HTMLImageElement>()
const inputRef = ref<HTMLInputElement>()
const cropperIns = shallowRef<Cropper>()
const previewUrl = ref<string>()
function init() {
  if (!imgRef.value)
    return
  cropperIns.value = new Cropper(imgRef.value, {
    viewMode: 3,
    dragMode: 'none',
    aspectRatio: 1,
    initialAspectRatio: 1,
    ready() {
      const data = {
        x: 0,
        y: 0,
        width: 300,
        height: 300,
      }
      const imageData = cropperIns.value?.getImageData()
      if (imageData) {
        const { naturalWidth, naturalHeight } = imageData
        const minNum = Math.min(naturalWidth, naturalHeight)
        data.width = minNum
        data.height = minNum
      }
      cropperIns.value?.setData(data)
      hideCropperLoading()
      handleCrop()
    },
  })
}
function onInputChange() {
  const file = inputRef.value?.files?.[0]
  if (!file)
    return
  const url = URL.createObjectURL(file)
  if (cropperIns.value) {
    cropperIns.value.replace(url)
    setCropperLoading()
  }
}
function handleReset() {
  if (!cropperIns.value)
    return
  cropperIns.value.reset()
}
function handleCrop() {
  if (!cropperIns.value)
    return
  cropperIns.value.getCroppedCanvas({
    width: 512,
    height: 512,
  }).toBlob((blob) => {
    if (blob) {
      previewUrl.value = URL.createObjectURL(blob)
    }
  })
}
async function handleSave() {
  if (!previewUrl.value)
    return
  emit('saved', toValue(previewUrl.value))
}
onMounted(() => {
  init()
})
</script>

<template>
  <div class="flex-col-center gap-[10px]">
    <div class="h-[300px] flex gap-[10px]">
      <NSpin :show="cropperLoading">
        <div ref="domRef" class="h-[300px] w-[300px] rounded-md bg-black/5">
          <img ref="imgRef" class="hidden" :src="src" alt="">
        </div>
      </NSpin>
      <div class="h-full w-[200px] flex-col-center gap-[20px]">
        <div class="h-[64px] w-[64px] flex-x-center overflow-hidden rounded-lg bg-black/5">
          <img :src="previewUrl" alt="">
        </div>
        <div class="h-[128px] w-[128px] flex-x-center overflow-hidden rounded-full bg-black/5">
          <img :src="previewUrl" alt="">
        </div>
      </div>
    </div>
    <div class="flex-x-center gap-[10px]">
      <NButton @click="() => inputRef?.click()">
        本地上传
        <input ref="inputRef" type="file" class="hidden" accept="image/*" @change="onInputChange">
      </NButton>
      <NButton @click="handleReset">
        重置
      </NButton>
      <NButton @click="handleCrop">
        裁剪
      </NButton>
      <NButton @click="handleSave">
        保存
      </NButton>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
