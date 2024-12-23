<script setup lang='ts'>
import { computed, inject, onMounted, type VNode } from 'vue'
import { tabsBarInjectionKey } from './index'

type VNodeChild = VNode | string | number | undefined | void | null | boolean

const { name, disabled, closeable, icon } = defineProps<{
  name: string
  disabled?: boolean
  closeable?: boolean
  showLine?: boolean
  icon?: (() => VNodeChild) | string
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
const { activeName, list, pushItem, removeItem, itemClick } = inject(tabsBarInjectionKey) || {}
const active = computed(() => activeName?.value === name)
const activeIndex = computed(() => list?.value.findIndex(f => f === activeName?.value))
const currentIndex = computed(() => list?.value.findIndex(f => f === name))
const showLine = computed(() => activeIndex?.value !== currentIndex?.value && (activeIndex?.value ?? 0) - 1 !== currentIndex?.value)
function onClose() {
  removeItem?.(name)
  emit('close')
}
onMounted(() => {
  pushItem?.(name)
})
</script>

<template>
  <div class="group relative m-x-[-5px] h-[40px] flex-shrink-0 cursor-default select-none p-x-[10px] p-t-[6px] first:m-l-0! last:m-r-0!" :class="[active ? 'tab-active' : '', disabled ? 'cursor-not-allowed! pointer-events-none! grayscale-[100]! opacity-50!' : '']" @click="itemClick(name)">
    <div class="relative z-1 h-[28px] flex-y-center gap-[5px] rounded-[10px] p-x-[6px] transition-base" :class="active ? '' : 'group-hover:bg-[--tabs-bar-primary-color]'">
      <component :is="icon" />
      <div class="text-sm">
        <slot />
      </div>
      <div v-if="closeable" class="m-l-[10px] h-[16px] w-[16px] flex items-center justify-center rounded-full transition-base hover:bg-black/20" @click.stop="onClose">
        <i class="i-ri-close-line text-sm" />
      </div>
    </div>
    <div class="absolute bottom-0 left-0 z-0 h-[34px] w-full flex items-end transition-base" :class="active ? 'opacity-100' : ' opacity-0'">
      <svg width="10" height="10" class="fill-[--tabs-bar-active-background-color]"><path d="M 0 10 A 10 10 0 0 0 10 0 L 10 10 Z" /></svg>
      <div class="h-full flex-1 rounded-t-[10px] bg-[--tabs-bar-active-background-color]" />
      <svg width="10" height="10" class="fill-[--tabs-bar-active-background-color]"><path d="M 0 0 A 10 10 0 0 0 10 10 L 0 10 Z" /></svg>
    </div>
    <div :class="showLine ? 'opacity-100' : 'opacity-0'" class="absolute bottom-[12px] right-[4px] h-[16px] w-[2px] rounded-full bg-[--tabs-bar-primary-color] transition-base" />
  </div>
</template>

<style scoped lang='less'>

</style>
