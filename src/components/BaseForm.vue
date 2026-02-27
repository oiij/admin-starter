<script setup lang='ts' generic="API extends (data: any) => Promise<any>">
import type { UseNaiveFormRules } from '@oiij/naive-ui'
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { ButtonProps } from 'naive-ui'
import { NPresetForm } from '@oiij/naive-ui/components'
import { useBoolean } from '@oiij/use'
import { useDebounceFn } from '@vueuse/core'
import { to } from 'await-to-js'

type ExtractData<T> = T extends (data: infer D) => any ? D : never
type ExtractResult<T> = T extends (data: any) => Promise<infer R> ? R : never
type D = ExtractData<API>
type R = ExtractResult<API>

const { api, defaultValue, rules, options, beforeSubmit, submitText = '确定', submitProps } = defineProps<{
  api: API
  defaultValue?: D
  rules?: UseNaiveFormRules<D>
  options?: PresetFormOptions<D>
  beforeSubmit?: (data: D) => (D | Promise<D>)
  submitText?: string
  submitProps?: ButtonProps
}>()
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit', data: D, result: R): void
  (e: 'error', error: Error): void
}>()
const presetForm = useTemplateRef('preset-form')

const { value: loading, setTrue, setFalse } = useBoolean(false)
const formValue = computed(() => presetForm.value?.formValue)

const handleSubmit = useDebounceFn(async () => {
  try {
    if (!formValue.value) {
      return
    }
    const values = beforeSubmit ? await Promise.try(beforeSubmit, formValue.value) : formValue.value
    setTrue()

    const [err, data] = await to(api(values))
    if (err) {
      emit('error', err)
      return
    }
    emit('submit', values, data)
  }
  finally {
    setFalse()
  }
})
function handleValidate() {
  presetForm.value?.validate()?.then(() => handleSubmit())
}
function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <NFlex vertical>
    <NScrollbar class="min-h-0 flex-1" content-class="p-x-10px">
      <NPresetForm
        ref="preset-form"
        :value="defaultValue"
        :rules="rules"
        :options="options"
        :grid-props="{
          xGap: 10,
        }"
      >
        <template #header="bind">
          <slot name="header" v-bind="bind" />
        </template>
        <template #default="bind">
          <slot v-bind="bind" />
        </template>
        <template #footer="bind">
          <slot name="footer" v-bind="bind" />
        </template>
      </NPresetForm>
    </NScrollbar>
    <NDivider class="m-y-[5px]!" />
    <NFlex justify="flex-end">
      <NButton type="default" @click="handleCancel">
        取消
      </NButton>
      <NButton :loading="loading" type="primary" v-bind="submitProps" @click="handleValidate">
        {{ submitText }}
      </NButton>
    </NFlex>
  </NFlex>
</template>

<style scoped>

</style>
