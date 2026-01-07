<script setup lang='ts'>
import ToggleDarkMode from '~/layouts/components/ToggleDarkMode.vue'
import CaptchaLogin from './components/CaptchaLogin.vue'
import PasswordLogin from './components/PasswordLogin.vue'

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

function handleLogged() {
  router.push(redirect)
}
</script>

<template>
  <div class="relative h-[100vh] w-[100vw]">
    <img :src="backgroundImageSrc" class="wh-full object-cover dark:brightness-50">

    <div class="absolute inset-0 flex-col-center">
      <div class="w-[360px] flex-col gap-[20px] border border-white/60 rounded-[20px] bg-white/30 p-[40px] shadow-black/20 backdrop-blur-2xl backdrop-brightness-110 backdrop-saturate-110 transition-base dark:border-black/30 dark:bg-black/60 focus-within:shadow-2xl">
        <h1 class="m-y-[5px] text-3xl">
          登陆
        </h1>
        <NTabs type="line" animated>
          <NTabPane name="captcha-login" tab="验证码登陆">
            <CaptchaLogin class="m-t-[10px]" @logged="() => handleLogged()" />
          </NTabPane>
          <NTabPane name="password-login" tab="账号密码登陆">
            <PasswordLogin class="m-t-[10px]" @logged="() => handleLogged()" />
          </NTabPane>
        </NTabs>
      </div>
    </div>
    <div class="absolute right-[20px] top-[20px] flex-y-center gap-[10px]">
      <ToggleDarkMode />
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
