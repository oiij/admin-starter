<script setup lang='ts'>
import type { InputInst } from 'naive-ui'
import { NTooltipButton } from '@oiij/naive-ui/components'
import { NInput } from 'naive-ui'

const { t } = useI18n()
const { screenLock } = useScreenLock()
const inputRef = ref<InputInst>()
const pin = ref('0000')
async function onClick() {
  const dialog = window.$dialog.create({
    title: t(`common.screen-lock.title`),
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
        placeholder: t(`common.screen-lock.placeholder`),
      })
    },
    positiveText: t(`common.screen-lock.confirm`),
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
  <NTooltipButton :button-props="{ quaternary: true }" :tooltip="t(`common.screen-lock.tooltip`)" @click="onClick">
    <template #icon>
      <i class="i-mage-lock" />
    </template>
  </NTooltipButton>
</template>

<style scoped lang='less'>

</style>
