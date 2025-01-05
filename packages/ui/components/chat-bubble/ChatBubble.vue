<script setup lang='ts'>
import { colord } from 'colord'
import { NAvatar } from 'naive-ui'
import { computed } from 'vue'

const { placement = 'left', avatar, name, type, time, content } = defineProps<{
  placement?: 'left' | 'right'
  avatar?: string
  name?: string
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  time?: string
  content?: string
}>()
const backgroundColor = computed(() => {
  switch (type) {
    case 'default':
      return '#FFF'
      break
    case 'primary':
      return '#2080F0'
      break
    case 'success':
      return '#18A058'
      break
    case 'warning':
      return '#F0A020'
      break
    case 'error':
      return '#D03050'
      break
    default:
      return '#FFF'
      break
  }
})
const backgroundColorDark = computed(() => colord(backgroundColor.value).darken(0.3).toHex())
const borderColor = computed(() => colord(backgroundColor.value).darken(0.1).toHex())
const borderColorDark = computed(() => colord(backgroundColorDark.value).lighten(0.1).toHex())
const textColor = computed(() => colord(backgroundColor.value).brightness() > 0.8 ? '#333639' : '#FFF')
const textColorDark = computed(() => colord(backgroundColorDark.value).isDark() ? '#FFF' : '#000')
</script>

<template>
  <div class=":uno: flex gap-[15px]" :class="placement === 'right' ? ':uno: flex-row-reverse' : ''" :style="{ '--background-color': `${backgroundColor}`, '--background-color-dark': `${backgroundColorDark}`, '--border-color': `${borderColor}`, '--border-color-dark': `${borderColorDark}`, '--text-color': `${textColor}`, '--text-color-dark': `${textColorDark}` }">
    <div class="flex-col">
      <NAvatar round :size="40" :src="avatar" />
      <div class=":uno: flex items-center justify-center">
        <span class=":uno: text-black dark:text-zinc-5">{{ name }}</span>
      </div>
    </div>
    <div class=":uno: flex-col gap-[5px]" :class="placement === 'right' ? ':uno: items-end' : 'items-start'">
      <div class=":uno: relative">
        <div class=":uno: absolute top-0 z-0 h-full flex-col" :class="placement === 'right' ? ':uno: right-[-5px]' : ':uno: left-[-5px]'">
          <div class=":uno: m-t-[20px] h-[10px] w-[10px] rotate-45 border border-[--border-color] bg-[--background-color] dark:border-[--border-color-dark] dark:bg-[--background-color-dark]" />
        </div>
        <div class=":uno: relative z-1 min-h-[46px] min-w-[100px] flex-col gap-[5px] border border-[--border-color] rounded-lg bg-[--background-color] p-[10px] text-[--text-color] dark:border-[--border-color-dark] dark:bg-[--background-color-dark] dark:text-[--text-color-dark]">
          <div class=":uno: text-[14px]">
            <slot>{{ content }}</slot>
          </div>
        </div>
        <div class=":uno: absolute top-0 h-full flex-y-center" :class="placement === 'right' ? ':uno: left-[-30px]' : ':uno: right-[-30px]'">
          <div class=":uno: flex cursor-pointer items-center justify-center p-[5px]">
            <i
              class=":uno: i-mage-reload text-black/50 dark:text-white/50"
            />
          </div>
        </div>
      </div>
      <div class=":uno: flex justify-end">
        <span class=":uno: text-xs text-zinc-3 dark:text-zinc-6">
          <slot name="time">
            {{ time }}
          </slot>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
