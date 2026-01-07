<script setup lang='ts'>
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import { NPresetForm } from '@oiij/naive-ui/components'
import { useBoolean } from '@oiij/use'
import { useDebounceFn } from '@vueuse/core'
import { NButton, NInput, NInputGroup } from 'naive-ui'
import { loginApi } from '~/api'
import { PHONE_REGEXP } from '~/utils/regexp'

const emit = defineEmits<{
  (e: 'logged'): void
}>()

const { captchaLogin } = useLogin()
const presetForm = useTemplateRef('preset-form')
const expire = ref(0)
const formValues = ref({
  phone: '18646153654',
  captcha: '',
})
const { value: loading, setTrue, setFalse } = useBoolean(false)
const handleLogin = useDebounceFn(async () => {
  try {
    setTrue()
    await captchaLogin({
      phone: formValues.value.phone,
      captcha: formValues.value.captcha,
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
const { pause, resume } = useIntervalFn(() => {
  if (expire.value <= 0) {
    pause()
    return
  }
  expire.value--
}, 1000)
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
    key: 'captcha',
    label: '验证码',
    required: true,
    render: () => {
      return h(NInputGroup, {}, {
        default: () => [
          h(NInput, {
            'placeholder': '请输入验证码',
            'minlength': 0,
            'maxlength': 6,
            'showCount': true,
            'allowInput': (value: string) => !value || /^\d+$/.test(value),
            'value': formValues.value.captcha,
            'onUpdate:value': (val) => {
              formValues.value.captcha = val
            },
          }),
          h(NButton, {
            disabled: !PHONE_REGEXP.test(formValues.value.phone) || expire.value > 0,
            type: 'primary',
            onClick: async () => {
              const [err, res] = await to(loginApi.captcha({ phone: formValues.value.phone }))
              if (err) {
                return
              }
              expire.value = 60 * 1
              resume()
              window.$message.info(`验证码已发送至${res.phone}/captcha:${res.captcha}`, { duration: 3 * 1000 })
            },
          }, { default: () => expire.value > 0 ? `${expire.value}秒后重新获取` : '获取验证码' }),
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
