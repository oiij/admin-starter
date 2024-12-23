<script setup lang='ts'>
import { useScrollView } from '@eiog/use'
import { computed, nextTick, provide, ref, watch } from 'vue'
import { tabsBarInjectionKey } from './index'

export interface TabsOptions {
  name: string
}
const { backgroundColor = '#E5E7EB', activeBackgroundColor = '#fff', primaryColor = 'rgba(251,191,36,.3)' } = defineProps<{
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
</script>

<template>
  <div
    class=":uno: relative h-[46px] w-full"
    :style="{
      '--tabs-bar-background-color': `${backgroundColor}`,
      '--tabs-bar-active-background-color': `${activeBackgroundColor}`,
      '--tabs-bar-primary-color': `${primaryColor}`,
    }"
  >
    <div class="h-[40px] w-full flex-y-center bg-[--tabs-bar-background-color]">
      <div class="h-[40px] w-[40px] flex items-center justify-center">
        <slot name="prefix">
          <div class="h-[28px] w-[28px] flex items-center justify-center rounded-[10px] bg-[--tabs-bar-active-background-color] transition-base hover:bg-[--tabs-bar-primary-color]">
            <i class="i-ri-arrow-down-s-line" />
          </div>
        </slot>
      </div>
      <div ref="scrollRef" class=":uno: m-l-[-6px] h-full min-w-0 flex-1 overflow-hidden">
        <transition-group name="group" tag="div" class="h-full flex">
          <slot />
        </transition-group>
      </div>
      <slot name="suffix" />
    </div>
    <div class="h-[6px] w-full bg-[--tabs-bar-active-background-color] p-x-[5px]" />
  </div>
</template>

<style scoped lang='less'>

</style>
