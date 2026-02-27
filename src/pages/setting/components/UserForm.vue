<script setup lang='ts'>
import type { UseNaiveFormRules } from '@oiij/naive-ui'
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { UserType } from '~/api'
import { cloneDeep } from 'es-toolkit'
import md5 from 'md5'
import { userApi } from '~/api'
import BaseForm from '~/components/BaseForm.vue'
import { PHONE_REGEXP } from '~/utils/regexp'
import RoleSelect from './RoleSelect.vue'

type _CREATE = UserType['Create']
type _UPDATE = UserType['Update']
type _LIST = UserType['Doc']

type _FormValueType = _CREATE | _UPDATE
type _ResultType = Awaited<ReturnType<typeof _API>>
const { defaultValue } = defineProps<{
  defaultValue?: Partial<_LIST>
}>()
const emit = defineEmits<{
  cancel: []
  submit: [data: _FormValueType, result: _ResultType]
}>()
const _ADD_API = userApi.create
const _UPDATE_API = userApi.update
const _API = defaultValue?._id ? _UPDATE_API : _ADD_API

const formValue = ref<_FormValueType>({
  phone: '',
  nickname: '',
  password: '',
  disabled: false,
  ...cloneDeep(defaultValue),
})
const options: PresetFormOptions<_FormValueType> = [
  {
    type: 'input',
    label: `手机号`,
    key: 'phone',
    props: {
      placeholder: '请输入手机号',
      clearable: true,
      minlength: 0,
      maxlength: 11,
      showCount: true,
      allowInput: (value: string) => !value || /^\d+$/.test(value),
    },
    span: 12,
    rule: {
      required: true,
      validator: (_, val) => {
        if (!val)
          return new Error('请输入手机号')
        if (!PHONE_REGEXP.test(val))
          return new Error('手机号格式错误')
        return true
      },
      trigger: ['input', 'blur'],
    },
  },
  {
    type: 'input',
    label: `昵称`,
    key: 'nickname',
    span: 12,
  },
  {
    type: 'input',
    label: `密码`,
    key: 'password',
    props: {
      clearable: true,
      placeholder: '请输入密码',
      minlength: 5,
      maxlength: 10,
      showCount: true,
      allowInput: (value: string) => !value.startsWith(' ') && !value.endsWith(' '),
    },
    span: 24,
  },
  {
    label: `权限`,
    key: '_roleId',
    span: 24,
    required: true,
    render: () => {
      return h(RoleSelect, {
        'value': formValue.value._roleId,
        'fallbackLabel': defaultValue?.roleName,
        'onUpdate:value': (val) => {
          formValue.value._roleId = val as string
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
    class="h-[400px] w-[500px]"
    :api="_API"
    :before-submit="(data) => ({ ...data, password: data.password ? md5(data.password) : undefined })"
    :default-value="formValue"
    :options="options"
    :rules="rules"
    @cancel="emit('cancel')"
    @submit="(data, result) => emit('submit', data, result)"
  />
</template>

<style scoped>

</style>
