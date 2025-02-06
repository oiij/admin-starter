<script setup lang='ts'>
import type { InputInst } from 'naive-ui'
import { TooltipButton } from '@oiij/ui'
import { NInput } from 'naive-ui'

const { setScreenLock } = useAppStore()
const inputRef = ref<InputInst>()
const pin = ref('123')
async function onClick() {
  const dialog = window.$dialog.create({
    title: '设置锁屏密码',
    content() {
      return h(NInput, {
        value: pin.value,
        ref: inputRef,
        maxlength: 6,
        onUpdateValue(v) {
          pin.value = v
        },
        onKeyup(e) {
          if (e.key === 'Enter') {
            setScreenLock(pin.value)
            dialog.destroy()
          }
        },
        placeholder: 'Enter PIN',
      })
    },
    positiveText: '确定',
    onPositiveClick() {
      setScreenLock(pin.value)
      dialog.destroy()
    },
  })
  await nextTick()
  inputRef.value?.focus()
}
</script>

<template>
  <TooltipButton :button-props="{ quaternary: true }" :tooltip="$t('common.lockScreen')" @click="onClick">
    <template #icon>
      <i class="i-mage-lock" />
    </template>
  </TooltipButton>
</template>

<style scoped lang='less'>

</style>
