<script setup lang='ts'>
import { useScrollView } from '@oiij/use'
import { colord } from 'colord'
import { computed, nextTick, provide, ref, watch } from 'vue'
import { tabsBarInjectionKey } from './index'

export interface TabsOptions {
  name: string
}
const { backgroundColor = '#E5E7EB', activeBackgroundColor = '#fff', primaryColor = 'rgba(251,191,36,1)' } = defineProps<{
  backgroundColor?: string
  activeBackgroundColor?: string
  primaryColor?: string
}>()
const emit = defineEmits<{
  (e: 'close', v: string): void
}>()
const value = defineModel<string | number>('value')

const { scrollRef, scrollToView } = useScrollView({ activeClassName: '.tab-active' })
watch(value, () => {
  scrollToView()
})
const list = ref<string[]>([])
const activeName = computed(() => list.value.find(f => f === value.value))
provide(tabsBarInjectionKey, {
  list,
  activeName,
  pushItem(name: string) {
    list.value.push(name)
  },
  removeItem(name: string) {
    emit('close', name)
    nextTick(() => {
      scrollToView()
    })
  },
  itemClick(name: string) {
    value.value = name
  },
})
const backgroundColorDark = computed(() => colord(backgroundColor).darken(0.8).toHex())
const activeBackgroundColorDark = computed(() => colord(activeBackgroundColor).darken(0.8).toHex())
const primaryColorDark = computed(() => colord(primaryColor).darken(0.3).toHex())
</script>

<template>
  <div
    class=":uno: relative h-[46px] w-full"
    :style="{
      '--tabs-bar-background-color': `${backgroundColor}`,
      '--tabs-bar-background-color-dark': `${backgroundColorDark}`,
      '--tabs-bar-active-background-color': `${activeBackgroundColor}`,
      '--tabs-bar-active-background-color-dark': `${activeBackgroundColorDark}`,
      '--tabs-bar-primary-color': `${primaryColor}`,
      '--tabs-bar-primary-color-dark': `${primaryColorDark}`,
    }"
  >
    <div class=":uno: h-[40px] w-full flex-y-center bg-[--tabs-bar-background-color] dark:bg-[--tabs-bar-background-color-dark]">
      <div class=":uno: h-[40px] w-[40px] flex items-center justify-center">
        <slot name="prefix">
          <div class=":uno: h-[28px] w-[28px] flex items-center justify-center rounded-[10px] bg-[--tabs-bar-active-background-color] transition-base dark:bg-[--tabs-bar-active-background-color-dark] hover:bg-[--tabs-bar-primary-color] dark:hover:bg-[--tabs-bar-primary-color-dark]">
            <i class="i-ri-arrow-down-s-line" />
          </div>
        </slot>
      </div>
      <div ref="scrollRef" class=":uno: m-l-[-6px] h-full min-w-0 flex-1 overflow-hidden">
        <transition-group name="group" tag="div" class=":uno: h-full flex">
          <slot />
        </transition-group>
      </div>
      <slot name="suffix" />
    </div>
    <div class=":uno: h-[6px] w-full bg-[--tabs-bar-active-background-color] p-x-[5px] dark:bg-[--tabs-bar-active-background-color-dark]" />
  </div>
</template>

<style scoped lang='less'>

</style>
