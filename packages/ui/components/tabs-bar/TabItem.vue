<script setup lang='ts'>
import { computed, h, inject, onMounted, type VNode } from 'vue'
import { tabsBarInjectionKey } from './index'

type VNodeChild = VNode | string | number | undefined | void | null | boolean

const { name, disabled, closeable, icon, loading, loadingRender = () => h('i', { class: 'i-line-md-loading-twotone-loop', style: { width: `16px`, height: `16px` } }) } = defineProps<{
  name: string
  disabled?: boolean
  closeable?: boolean
  showLine?: boolean
  icon?: (() => VNodeChild) | string
  loading?: boolean
  loadingRender?: () => VNodeChild
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'click', ev: MouseEvent): void
  (e: 'contextmenu', ev: MouseEvent): void
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
function onClick(ev: MouseEvent) {
  itemClick?.(name)
  emit('click', ev)
}
function onContextMenu(ev: MouseEvent) {
  emit('contextmenu', ev)
}
onMounted(() => {
  pushItem?.(name)
})
</script>

<template>
  <div class=":uno: group relative z-1 m-x-[-5px] h-[40px] flex-shrink-0 cursor-default select-none p-x-[10px] p-t-[6px] first:m-l-0! last:m-r-0!" :class="[active ? 'tab-active' : '', disabled ? ':uno: cursor-not-allowed! pointer-events-none! grayscale-[100]! opacity-50!' : '']" @click="onClick" @contextmenu="onContextMenu">
    <div class=":uno: relative h-[28px] flex-y-center gap-[5px] rounded-[10px] p-x-[6px] transition-base" :class="active ? '' : ':uno: group-hover:bg-[--tabs-bar-primary-color] dark:group-hover:bg-[--tabs-bar-primary-color-dark]'">
      <component :is="loading ? loadingRender : icon" />
      <div class=":uno: text-sm">
        <slot />
      </div>
      <div v-if="closeable" class=":uno: m-l-[10px] h-[16px] w-[16px] flex items-center justify-center rounded-full transition-base hover:bg-black/20" @click.stop="onClose">
        <i class=":uno: i-ri-close-line text-sm" />
      </div>
    </div>
    <div class=":uno: absolute bottom-0 left-0 z-[-1] h-[34px] w-full flex items-end transition-base" :class="active ? ':uno: opacity-100' : ':uno: opacity-0'">
      <svg width="10" height="10" class=":uno: fill-[--tabs-bar-active-background-color] dark:fill-[--tabs-bar-active-background-color-dark]"><path d="M 0 10 A 10 10 0 0 0 10 0 L 10 10 Z" /></svg>
      <div class=":uno: h-full flex-1 rounded-t-[10px] bg-[--tabs-bar-active-background-color] dark:bg-[--tabs-bar-active-background-color-dark]" />
      <svg width="10" height="10" class=":uno: fill-[--tabs-bar-active-background-color] dark:fill-[--tabs-bar-active-background-color-dark]"><path d="M 0 0 A 10 10 0 0 0 10 10 L 0 10 Z" /></svg>
    </div>
    <div :class="showLine ? ':uno: opacity-100' : ':uno: opacity-0'" class=":uno: absolute bottom-[12px] right-[4px] h-[16px] w-[2px] rounded-full bg-[--tabs-bar-primary-color] transition-base dark:bg-[--tabs-bar-primary-color-dark]" />
  </div>
</template>

<style scoped lang='less'>

</style>
