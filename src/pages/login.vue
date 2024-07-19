<script setup lang='ts'>
import type { LoginType } from '~/api'

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
const { loading, runAsync: handleLogin } = useRequest(() => login(formValue.value), { manual: true })

async function handleValidate() {
  try {
    await validate()
    await handleLogin()
    window.$message.success('登录成功')
    router.push(redirect)
  }
  catch {

  }
}
</script>

<template>
  <div class="background wh-full flex items-center justify-center dark:brightness-75">
    <div class="absolute right-[20px] top-[20px] flex-y-center rounded-xl bg-white/70 p-[10px] backdrop-blur-2xl dark:bg-white/30">
      <ToggleFullScreen />
      <ToggleLanguage />
      <ToggleDarkMode />
    </div>
    <div class="w-[400px] flex-col rounded-3xl bg-white/60 p-[20px] backdrop-blur-2xl transition-base dark:bg-white/30 hover:shadow-xl">
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
          <n-button type="primary" size="large" block :loading="loading" @click="handleValidate">
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style scoped lang='less'>
.background {
  background-image: url(~/assets/background.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

<route lang='yaml'>
name: login
meta:
  layout: blank
  title: 登录
  hideOnMenu: true
</route>
