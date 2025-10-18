<script setup lang='ts'>
import type { FormValidationStatus } from 'naive-ui'
import { useBoolean } from '@oiij/use'
import { AnimatePresence, motion } from 'motion-v'
import ToggleDarkMode from './ToggleDarkMode.vue'

const MotionDiv = motion.div
const { backgroundImageSrc } = storeToRefs(useAppStore())
const { screenUnlock, screenPinLength } = useScreenLock()
const inputRef = useTemplateRef('input-ref')
const { date, time } = useClock()
const { value: loginFlag, setTrue: setShow, setFalse: setHide } = useBoolean(false)
const { escape, enter } = useMagicKeys()
const optStatus = ref<FormValidationStatus>()
watch(escape, (v) => {
  if (v)
    setHide()
})
watch(enter, (v) => {
  if (!v) {
    setShow()
  }
})
watch(loginFlag, (v) => {
  if (v) {
    nextTick(() => {
      inputRef.value?.focusOnChar(0)
    })
  }
})
const pin = ref([])
function onClick() {
  const isUnlocked = screenUnlock(pin.value.join(''))
  optStatus.value = isUnlocked ? undefined : 'error'
  pin.value = []
}
function onKeyUp(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    onClick()
  }
}
</script>

<template>
  <div class="fixed inset-0 z-999 h-[100vh] w-[100vw]" @click="setShow">
    <img :src="backgroundImageSrc" class="absolute inset-0 z-1 wh-full object-cover dark:brightness-50">
    <div class="absolute inset-0 z-2 wh-full transition-base" :class="loginFlag ? 'backdrop-blur-3xl  bg-white/10 dark:backdrop-brightness-120 dark:backdrop-contrast-200 dark:bg-black/50 backdrop-saturate-200 ' : 'bg-transparent'" />
    <div class="absolute right-[20px] top-[20px] z-4 flex-y-center gap-[10px]">
      <ToggleDarkMode />
    </div>
    <div class="absolute inset-0 z-3 wh-full flex-col items-center">
      <MotionDiv class="flex-col-center cursor-default drop-shadow-2xl" :animate="{ translateY: loginFlag ? '25vh' : '35vh' }" :transition="{ ease: 'easeInOut' }">
        <h1 class="text-[100px] text-white font-bold tracking-widest">
          {{ time }}
        </h1>
        <h2 class="text-[40px] text-white font-normal">
          {{ date }}
        </h2>
        <h3 class="m-t-[20px] text-[16x] text-white font-normal">
          回车或点击任意位置解锁
        </h3>
      </MotionDiv>
      <AnimatePresence>
        <MotionDiv
          v-show="loginFlag"
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0 }"
          class="m-t-[300px] w-[320px] flex-col-center gap-[20px]"
        >
          <NInputOtp
            ref="input-ref"
            v-model:value="pin"
            block
            size="large"
            :length="screenPinLength"
            :allow-input="value => !value || /^\d+$/.test(value)"
            :status="optStatus"
            @keyup="onKeyUp"
          />
          <NButton tertiary strong block size="large" @click="onClick">
            登录
          </NButton>
        </MotionDiv>
      </AnimatePresence>
    </div>
  </div>
</template>

<style scoped>

</style>
