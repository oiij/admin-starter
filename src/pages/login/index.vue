<script setup lang='ts'>
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import { NPresetForm } from '@oiij/naive-ui/components'
import { useBoolean } from '@oiij/use'
import { useDebounceFn } from '@vueuse/core'
import md5 from 'md5'
import { NButton, NFlex, NInput } from 'naive-ui'
import ToggleDarkMode from '~/layouts/components/ToggleDarkMode.vue'
import ImageVerify from './components/ImageVerify.vue'

definePage({
  meta: {
    layout: 'blank',
    title: '登陆',
    hide: true,
    group: {
      hide: true,
    },
  },
})
const { backgroundImageSrc } = storeToRefs(useAppStore())

const router = useRouter()
const redirect = (useRoute().query.redirect as string) || '/'

const { login } = useLogin()
const presetForm = useTemplateRef('preset-form')

const formValues = ref({
  username: '',
  password: '',
  code: '',
  inputCode: '',
})
const { value: loading, setTrue, setFalse } = useBoolean(false)

const handleLogin = useDebounceFn(async () => {
  try {
    setTrue()
    await login({
      username: formValues.value.username,
      password: md5(formValues.value.password),
    })
    await router.push(redirect)
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
    key: 'username',
    label: '账号',
    type: 'input',
    props: {
      clearable: true,
      onKeydown: (e) => {
        if (e.key === 'Enter') {
          handleValidate()
        }
      },
    },
    required: true,
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
  <div class="relative h-[100vh] w-[100vw]">
    <img :src="backgroundImageSrc" class="wh-full object-cover dark:brightness-50">

    <div class="absolute inset-0 flex-col-center">
      <div class="w-[420px] flex-col gap-[10px] border border-white/60 rounded-[20px] bg-white/30 p-[60px] shadow-black/20 backdrop-blur-2xl backdrop-brightness-110 backdrop-saturate-110 transition-base dark:border-black/30 dark:bg-black/60 focus-within:shadow-2xl">
        <h1 class="m-y-[10px] text-5xl">
          欢迎登陆
        </h1>
        <p class="text-base">
          靓芙泉·店铺管理系统
        </p>
        <NDivider class="m-y-[10px]!" />
        <NPresetForm
          ref="preset-form"
          :values="formValues"
          :options="options"
          :grid-props="{
            cols: 1,
          }"
        />
      </div>
    </div>
    <div class="absolute right-[20px] top-[20px] flex-y-center gap-[10px]">
      <ToggleDarkMode />
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
