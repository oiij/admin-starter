<script setup lang='ts'>
import { AvatarCropper } from '@sakhnovkrg/vue-avatar-cropper'
import { useThemeVars } from 'naive-ui'
import { axiosInstance } from '~/utils/http'
import '@sakhnovkrg/vue-avatar-cropper/style'

const { value } = defineProps<{
  value?: string
}>()
const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

const src = ref(value)
watchEffect(() => {
  src.value = value
})
const themeVars = useThemeVars()
const cropperRef = useTemplateRef('cropper-ref')
const fileInputRef = useTemplateRef('file-input-ref')
const showModal = ref(false)
const progress = ref(0)
const loading = ref(false)
const color = ref('#fff')
function base64ToFile(base64String: string, filename: string = 'avatar.png', mimeType: string = 'image/png') {
  // 移除base64前缀
  const base64Data = base64String.includes(',') ? base64String.split(',')[1] : base64String
  // 解码base64数据
  const byteCharacters = atob(base64Data)
  const byteArrays = []

  // 处理解码后的数据
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = Array.from<number>({ length: slice.length })

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  // 创建Blob对象
  const blob = new Blob(byteArrays, { type: mimeType })

  // 从Blob创建File对象
  const file = new File([blob], filename, { type: mimeType })
  return file
}
function handleClick() {
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
  fileInputRef.value?.click()
}
async function handleFileChange() {
  const file = fileInputRef.value?.files?.[0]
  if (file) {
    showModal.value = true
    await nextTick()
    cropperRef.value?.loadImage(file)
  }
}
async function upload(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  progress.value = 0
  loading.value = true
  color.value = themeVars.value.primaryColor
  await axiosInstance.post<any, { path: string }>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (ev) => {
      progress.value = Math.round((ev.loaded * 100) / (ev.total ?? 0))
    },
  }).then(({ path }) => {
    color.value = themeVars.value.successColor
    setTimeout(() => {
      color.value = '#fff'
    }, 1000)
    if (path) {
      emit('update:value', path)
    }
  }).catch(() => {
    color.value = themeVars.value.errorColor
  }).finally(() => {
    loading.value = false
  })
}
async function handleConfirm() {
  const base64 = cropperRef.value?.cropImage()
  if (base64) {
    const file = base64ToFile(base64)
    const url = URL.createObjectURL(file)
    src.value = url
    showModal.value = false
    await upload(file)
    URL.revokeObjectURL(url)
  }
}
</script>

<template>
  <NProgress type="circle" :percentage="progress" :processing="loading" :color="color" :stroke-width="5" rail-color="#fff" class="w-[114px]!">
    <NAvatar
      class="cursor-pointer"
      round
      :size="104"
      object-fit="cover"
      :src="src"
      @click="() => handleClick()"
    >
      <template v-if="!src" #default>
        <i class="i-mage-user text-[40px]" />
      </template>
    </NAvatar>
    <input ref="file-input-ref" type="file" style="display: none;" accept="image/*" @input="handleFileChange">
  </NProgress>
  <NModal v-model:show="showModal" preset="card" style="width:auto;" title="裁剪" size="small" :segmented="true" :mask-closable="false">
    <div class="h-[400px] w-[400px]">
      <AvatarCropper
        ref="cropper-ref"
        :output-size="512"
        :show-grid="true"
        :show-circle="true"
        background-color="#000"
      />
    </div>
    <template #action>
      <NFlex justify="end">
        <NButton type="primary" @click="() => handleConfirm()">
          确认
        </NButton>
      </NFlex>
    </template>
  </NModal>
</template>

<style scoped>

</style>
