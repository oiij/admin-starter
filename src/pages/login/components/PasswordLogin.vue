<script setup lang='ts'>
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import { NPresetForm } from '@oiij/naive-ui/components'
import { useBoolean } from '@oiij/use'
import { useDebounceFn } from '@vueuse/core'
import md5 from 'md5'
import { NButton, NFlex, NInput } from 'naive-ui'
import { PHONE_REGEXP } from '~/utils/regexp'
import ImageVerify from './ImageVerify.vue'

const emit = defineEmits<{
  (e: 'logged'): void
}>()

const { login } = useLogin()
const presetForm = useTemplateRef('preset-form')

const formValues = ref({
  phone: '',
  password: '',
  code: '',
  inputCode: '',
})
const { value: loading, setTrue, setFalse } = useBoolean(false)
const handleLogin = useDebounceFn(async () => {
  try {
    setTrue()
    await login({
      phone: formValues.value.phone,
      password: md5(formValues.value.password),
    })
    emit('logged')
  }
  finally {
    setFalse()
  }
})
function handleValidate() {
  presetForm.value?.validate()?.then(() => {
    handleLogin()
  })
}
const options: PresetFormOptions<typeof formValues.value> = [
  {
    key: 'phone',
    label: '手机号',
    type: 'input',
    props: {
      placeholder: '请输入手机号',
      clearable: true,
      minlength: 0,
      maxlength: 11,
      showCount: true,
      allowInput: (value: string) => !value || /^\d+$/.test(value),
    },
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
    key: 'password',
    label: '密码',
    type: 'input',
    required: true,
    props: {
      type: 'password',
      clearable: true,
      showPasswordOn: 'mousedown',
      placeholder: '请输入密码',
      minlength: 5,
      maxlength: 10,
      showCount: true,
      allowInput: (value: string) => !value.startsWith(' ') && !value.endsWith(' '),
      onKeydown: (e) => {
        if (e.key === 'Enter') {
          handleValidate()
        }
      },
    },
  },
  {
    key: 'inputCode',
    label: '验证码',
    rule: {
      required: true,
      validator: (_, val) => {
        if (!val)
          return new Error('请输入验证码')
        if (val.toLocaleUpperCase() !== formValues.value.code.toLocaleUpperCase())
          return new Error('验证码错误')

        return true
      },
      trigger: ['input', 'blur'],
    },
    render: () => {
      return h(NFlex, { wrap: false }, {
        default: () => [
          h(NInput, {
            'value': formValues.value.inputCode,
            'class': 'w-auto!',
            'onUpdate:value': (val) => {
              formValues.value.inputCode = val
            },
            'onKeydown': (e) => {
              if (e.key === 'Enter') {
                handleValidate()
              }
            },
          }),
          h(ImageVerify, {
            'code': formValues.value.code,
            'onUpdate:code': (val) => {
              formValues.value.code = val as string
            },
          }),
        ],
      })
    },
  },
  {
    render: () => {
      return h(NButton, {
        type: 'primary',
        loading: loading.value,
        block: true,
        onClick: () => {
          handleValidate()
        },
      }, { default: () => '登录' })
    },
  },
]
</script>

<template>
  <NPresetForm
    ref="preset-form"
    :values="formValues"
    :options="options"
    :grid-props="{
      cols: 1,
    }"
  />
</template>

<style scoped>

</style>
