<script setup lang='ts'>
import type { LoginType } from '~/api'
import Logo from '~/layouts/Components/Logo.vue'

const route = useRoute()
const redirect = route.query.redirect as string || '/'
const router = useRouter()
const { login } = useAuthStore()
const { formRef, formValue, formProps, validate } = useNaiveForm<LoginType['Data']>({
  value: {
    username: '',
    password: '',
  },
  rules: {
    username: {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  },
})

async function handleValidate() {
  try {
    await validate()
    await login(formValue.value)
    window.$message.success('登录成功')
    router.push(redirect)
  }
  catch {

  }
}
</script>

<template>
  <div class="wh-full flex items-center justify-center">
    <div class="w-[400px] flex-col rounded-2xl bg-white p-[20px] transition-base hover:shadow-xl">
      <div class="p-y-[10px]">
        <Logo size="large" />
      </div>
      <n-form ref="formRef" v-bind="formProps">
        <n-form-item path="username">
          <n-input v-model:value="formValue.username" size="large" placeholder="用户名" />
        </n-form-item>
        <n-form-item path="password">
          <n-input v-model:value="formValue.password" size="large" placeholder="密码" type="password" show-password-on="click" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" size="large" block :loading="false" @click="handleValidate">
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang='yaml'>
name: login
meta:
  layout: blank
  title: 登录
</route>
