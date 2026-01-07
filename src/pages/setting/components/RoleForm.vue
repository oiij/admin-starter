<script setup lang='ts'>
import type { NaiveFormRules } from '@oiij/naive-ui'
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { RoleType } from '~/api'
import { cloneDeep } from 'es-toolkit'
import { roleApi } from '~/api'
import AccessPicker from '~/components/AccessPicker.vue'
import BaseForm from '~/components/BaseForm.vue'

type _CREATE = RoleType['Create']
type _UPDATE = RoleType['Update']
type _LIST = RoleType['Doc']

const { defaultValues } = defineProps<{
  defaultValues?: Partial<_LIST>
}>()
const emit = defineEmits<{
  cancel: []
  submit: [data: _CREATE | Partial<_CREATE> | _UPDATE | Partial<_UPDATE>, msg: string]
}>()
const _ADD_API = roleApi.create
const _UPDATE_API = roleApi.update

const formValue = ref<_CREATE | _UPDATE>({
  name: '',
  access: [],
  disabled: false,
  ...cloneDeep(defaultValues),
})
const options: PresetFormOptions<_CREATE | _UPDATE> = [
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
        'value': formValue.value.access?.map(m => m.value),
        'fallbackLabel': defaultValues?.access?.map(m => m.label).join(','),
        'multiple': true,
        'onUpdate:value': (val, raw) => {
          formValue.value.access = raw as { label: string, value: string }[]
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
const rules: NaiveFormRules<_CREATE | _UPDATE> = {

}
</script>

<template>
  <BaseForm
    class="h-[320px] w-[500px]"
    :create-api="_ADD_API"
    :update-api="_UPDATE_API"
    :default-values="formValue"
    :options="options"
    :rules="rules"
    @cancel="emit('cancel')"
    @submit="(data, msg) => emit('submit', data, msg)"
  />
</template>

<style scoped>

</style>
