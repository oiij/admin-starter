<script setup lang='ts'>
import { NCheckbox, NCheckboxGroup, NInput, NRadio, NRadioGroup, NSelect, NSwitch } from 'naive-ui'

const { value, type, fieldLabel, required, options } = defineProps<{
  value?: string
  type?: 'INPUT' | 'SELECT' | 'RADIO' | 'CHECKBOX' | 'SWITCH'
  fieldLabel?: string
  fieldKey?: string
  required?: boolean
  options?: {
    label: string
    value: string
  }[]
}>()
const emit = defineEmits<{
  (e: 'update:value', v: string): void
}>()
const components = {
  INPUT: NInput,
  SELECT: h(NSelect, {
    options,
  }),
  RADIO: h(NRadioGroup, {}, {
    default: () => options?.map((item) => {
      return h(NRadio, {
        value: item.value,
      }, { default: () => item.label })
    }),
  }),
  CHECKBOX: h(NCheckboxGroup, {}, {
    default: () => options?.map((item) => {
      return h(NCheckbox, {
        value: item.value,
      }, { default: () => item.label })
    }),
  }),
  SWITCH: NSwitch,
}
</script>

<template>
  <NInputGroup v-if="type">
    <NInputGroupLabel>
      <span>{{ fieldLabel }}</span>
      <span v-if="required" class="text-red-500">
        *
      </span>
    </NInputGroupLabel>
    <component :is="components[type]" :value="value" @update:value="(v:string) => emit('update:value', v)" />
  </NInputGroup>
</template>

<style scoped>

</style>
