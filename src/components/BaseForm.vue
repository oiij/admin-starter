<script setup lang='ts'
  generic="D extends DataObject, DU extends Partial<D>&{_id:string}"
>
import type { DataObject, NaiveFormRules } from '@oiij/naive-ui'
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import { NPresetForm } from '@oiij/naive-ui/components'
import { useBoolean } from '@oiij/use'
import { useDebounceFn } from '@vueuse/core'
import { to } from 'await-to-js'

const { createApi, updateApi, defaultValues, rules, options, type, beforeSubmit } = defineProps<{
  createApi: (data: D) => Promise<{ msg: string }>
  updateApi?: (data: DU) => Promise<{ msg: string }>
  defaultValues?: D | DU
  rules?: NaiveFormRules<D | DU>
  options?: PresetFormOptions<D | DU>
  type?: 'create' | 'update'
  beforeSubmit?: (data: D | DU) => (D | DU | Promise<D | DU>)
}>()
const emit = defineEmits<{
  (e: 'create', data: D, msg: string): void
  (e: 'update', data: DU, msg: string): void
  (e: 'cancel'): void
  (e: 'submit', data: D | DU, msg: string): void
}>()
const presetForm = useTemplateRef('preset-form')

const { value: loading, setTrue, setFalse } = useBoolean(false)
const formValue = computed(() => presetForm.value?.formValue)
const _type = computed(() => type ?? defaultValues?._id ? 'update' : 'create')
async function createMethod(values: D) {
  const [err, data] = await to(createApi(values))
  if (err) {
    return
  }
  emit('create', values, data.msg)
  emit('submit', values, data.msg)
}
async function updateMethod(values: DU) {
  if (!updateApi) {
    return
  }
  const [err, data] = await to(updateApi(values))
  if (err) {
    return
  }
  emit('update', values, data.msg)
  emit('submit', values, data.msg)
}

const handleSave = useDebounceFn(async () => {
  try {
    if (!formValue.value) {
      return
    }
    const values = beforeSubmit ? await Promise.try(beforeSubmit, formValue.value) : formValue.value
    setTrue()
    switch (_type.value) {
      case 'create':
        await createMethod(values as D)
        break
      case 'update':
        await updateMethod(values as DU)
        break
      default:
        break
    }
  }
  finally {
    setFalse()
  }
})
function handleValidate() {
  presetForm.value?.validate()?.then(() => handleSave())
}
function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <NFlex vertical>
    <NScrollbar class="min-h-0 flex-1" content-class="p-0px">
      <!-- @vue-generic {D|DU} -->
      <NPresetForm
        ref="preset-form"
        :values="defaultValues"
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
      <NButton :loading="loading" type="primary" @click="handleValidate">
        {{ _type === 'create' ? '创建' : '更新' }}
      </NButton>
    </NFlex>
  </NFlex>
</template>

<style scoped>

</style>
