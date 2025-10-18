<script setup lang='ts'>
import type { InputInst } from 'naive-ui'
import { NTooltipButton } from '@oiij/naive-ui/components'
import { NInput } from 'naive-ui'

const { screenLock } = useScreenLock()
const inputRef = ref<InputInst>()
const pin = ref('0000')
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
            screenLock(pin.value)
            dialog.destroy()
          }
        },
        placeholder: 'Enter PIN',
      })
    },
    positiveText: '确定',
    onPositiveClick() {
      screenLock(pin.value)
      dialog.destroy()
    },
  })
  await nextTick()
  inputRef.value?.focus()
}
</script>

<template>
  <NTooltipButton :button-props="{ quaternary: true }" tooltip="锁屏" @click="onClick">
    <template #icon>
      <i class="i-mage-lock" />
    </template>
  </NTooltipButton>
</template>

<style scoped lang='less'>

</style>
