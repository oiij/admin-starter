<script setup lang='ts'>
import type { UseNaiveFormRules } from '@oiij/naive-ui'
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { RoleType } from '~/api'
import { cloneDeep } from 'es-toolkit'
import { roleApi } from '~/api'
import AccessPicker from '~/components/AccessPicker.vue'
import BaseForm from '~/components/BaseForm.vue'

type _CREATE = RoleType['Create']
type _UPDATE = RoleType['Update']
type _LIST = RoleType['Doc']

type _FormValueType = _CREATE | _UPDATE
type _ResultType = Awaited<ReturnType<typeof _API>>
const { defaultValues } = defineProps<{
  defaultValues?: Partial<_LIST>
}>()
const emit = defineEmits<{
  cancel: []
  submit: [data: _FormValueType, result: _ResultType]
}>()
const _ADD_API = roleApi.create
const _UPDATE_API = roleApi.update
const _API = defaultValues?._id ? _UPDATE_API : _ADD_API

const formValues = ref<_FormValueType>({
  name: '',
  access: [],
  disabled: false,
  ...cloneDeep(defaultValues),
})
const options: PresetFormOptions<_FormValueType> = [
  {
    type: 'input',
    label: `名称`,
    key: 'name',
    span: 24,
    required: true,
  },
  {
    label: '权限值',
    key: 'access',
    span: 24,
    render: () => {
      return h(AccessPicker, {
        'value': formValues.value.access?.map(m => m.value),
        'fallbackLabel': defaultValues?.access?.map(m => m.label).join(','),
        'multiple': true,
        'onUpdate:value': (val, raw) => {
          formValues.value.access = raw as { label: string, value: string }[]
        },
      })
    },
  },
  {
    label: '禁用',
    key: 'disabled',
    type: 'switch',
    span: 6,
  },
]
const rules: UseNaiveFormRules<_FormValueType> = {

}
</script>

<template>
  <BaseForm
    class="h-[320px] w-[500px]"
    :api="_API"
    :default-values="formValues"
    :options="options"
    :rules="rules"
    @cancel="emit('cancel')"
    @submit="(data, result) => emit('submit', data, result)"
  />
</template>

<style scoped>

</style>
