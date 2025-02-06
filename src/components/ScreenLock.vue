<script setup lang='ts'>
import avatar from '~/assets/avatar_400.png'

const { setScreenUnlock } = useAppStore()
const { hour, minute, year, month, day } = useClock()
const { value: loginFlag, setTrue: setShow, setFalse: setHide } = useBoolean(false)
const { escape } = useMagicKeys()
watch(escape, (v) => {
  if (v)
    setHide()
})
const pin = ref('')
function onClick() {
  setScreenUnlock(pin.value)
}
function onKeyUp(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    onClick()
  }
}
</script>

<template>
  <div class="background fixed inset-0 z-999 h-[100vh] w-[100vw] flex-col-center" @click="setShow">
    <div class="absolute inset-0 z-0 wh-full transition-base" :class="loginFlag ? 'backdrop-blur-3xl bg-white/60 backdrop-saturate-200' : 'bg-transparent'" />
    <div class="z-1 flex-col-center">
      <Transition name="fade-bottom" mode="out-in">
        <div v-if="!loginFlag" class="h-[600px] w-[400px] flex-col cursor-default items-center">
          <h1 class="text-[100px] text-white font-bold">
            {{ hour }}:{{ minute }}
          </h1>
          <h2 class="text-[40px] text-white font-normal">
            {{ year }}-{{ month }}-{{ day }}
          </h2>
        </div>
        <div v-else class="h-[600px] w-[200px] flex-col-center gap-[20px]">
          <div class="h-[160px] w-[160px] overflow-hidden rounded-full">
            <img :src="avatar" alt="Avatar">
          </div>
          <n-input
            v-model:value="pin"
            type="password"
            show-password-on="mousedown"
            placeholder="Enter PIN"
            :autofocus="true"
            :input-props="{
              autocomplete: 'off',
            }"
            :maxlength="6"
            @keyup="onKeyUp"
          />
          <n-button tertiary strong block @click="onClick">
            登录
          </n-button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang='less'>
.background {
  background-image: url(~/assets/wallpaper/francesco-ungaro-mcZz7PUPpqY-unsplash.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
