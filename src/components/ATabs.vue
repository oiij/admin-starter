<script setup lang='ts'>
import type { DropdownOption } from 'naive-ui'
import type { HTMLAttributes, VNode } from 'vue'
import { defineComponent } from 'vue'

type VNodeChild = VNode | string | number | undefined | void | null | boolean
export interface TabsOptions {
  key: string | number
  label: string | number
  icon?: ((option: TabsOptions) => VNodeChild) | string
  disabled?: boolean
  badge?: string | number | boolean
  closeable?: boolean
  onClick?: (option: TabsOptions) => void
  onContextMenu?: (option: TabsOptions) => void
  onClose?: (option: TabsOptions) => void
  render?: ((option: TabsOptions) => VNodeChild)
  props?: HTMLAttributes
}
const { options, contextMenuOptions = [
  {
    label: '刷新页面',
    key: 'refresh',
    icon: () => h('i', { class: 'i-ri-refresh-line' }),
  },
  {
    label: '关闭当前',
    key: 'close',
    icon: () => h('i', { class: 'i-ri-refresh-line' }),
  },
  {
    label: '关闭其他',
    key: 'closeOther',
    icon: () => h('i', { class: 'i-ri-refresh-line' }),
  },
  {
    label: '关闭全部',
    key: 'closeAll',
    icon: () => h('i', { class: 'i-ri-refresh-line' }),
  },
], closeable = true } = defineProps<{
  options?: TabsOptions[]
  contextMenuOptions?: DropdownOption[]
  renderItem?: (option: TabsOptions) => VNodeChild
  closeable?: boolean
}>()
const emit = defineEmits<{
  (e: 'close', v: TabsOptions): void
  (e: 'onContextMenu', v: TabsOptions): void
  (e: 'onContextMenuSelect', v: { item?: TabsOptions, key: string }): void
}>()
function isString(data: unknown) {
  return Object.prototype.toString.call(data) === '[object String]'
}
function isFunction(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Function]'
}
function isBoolean(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Boolean]'
}
const value = defineModel<string | number>('value')
function onClick(options: TabsOptions) {
  options.onClick?.(options)
  value.value = options.key
}
const _index = computed(() => {
  return options?.findIndex((item) => {
    return item.key === value.value
  })
})
const { scrollRef, scrollToView } = useTabsScroll()
watch(value, () => {
  scrollToView()
})
const { x, y, show, contextMenuEvent, hide } = useContextMenu()
const contextMenuItem = ref<TabsOptions>()
function onContextMenu(e: MouseEvent, option: TabsOptions) {
  option.onContextMenu?.(option)
  contextMenuItem.value = option
  contextMenuEvent(e)
  emit('onContextMenu', option)
}
function handleSelect(v: string) {
  emit('onContextMenuSelect', { item: toRaw(contextMenuItem.value), key: v })
}
function onClose(option: TabsOptions) {
  option.onClose?.(option)
  emit('close', option)
}
</script>

<template>
  <div class="relative h-[40px] w-full flex-y-center bg-gray-2 p-x-[5px]">
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="x"
      :y="y"
      :options="contextMenuOptions"
      :show="show"
      :on-clickoutside="hide"
      @select="handleSelect"
    />
    <slot name="prefix" />
    <div class="absolute-bl h-[3px] w-full bg-white" />
    <div ref="scrollRef" class="relative h-full min-w-0 flex flex-1 gap-[1px] overflow-hidden p-y-[3px]">
      <transition-group>
        <div
          v-for="(item, index) in options"
          :ref="value === item.key ? 'itemRef' : ''"
          :key="item.key"
          class="relative m-x--6px h-[34px] flex cursor-default select-none items-end"
          :class="[value === item.key ? 'active z-2' : '', item.disabled ? 'cursor-not-allowed! grayscale-[100]! opacity-50! ' : '']"
          v-bind="item.props"
          @click="!item.disabled && onClick(item)"
          @contextmenu="!item.disabled && onContextMenu($event, item)"
        >
          <template v-if="renderItem">
            <component :is="defineComponent({ render: renderItem(item) as any })" />
          </template>
          <template v-else-if="item.render">
            <component :is="defineComponent({ render: item.render as Function })" />
          </template>
          <template v-else>
            <svg class="" :class="value === item.key ? 'visible' : 'invisible'" width="6" height="6" fill="white"><path d="M 0 6 A 6 6 0 0 0 6 0 L 6 6 Z" /></svg>
            <div
              class="relative h-[34px] flex items-center justify-center gap-[5px] rounded-t-lg p-x-[15px] transition-base"
              :class="[value === item.key ? 'bg-white!' : '', item.disabled ? '' : 'hover:bg-gray-1']"
            >
              <div class="flex items-center justify-center">
                <template v-if="item.icon && isString(item.icon)">
                  <i>{{ item.icon }}</i>
                </template>
                <template v-if="item.icon && isFunction(item.icon)">
                  <component :is="defineComponent({ render: item.icon as Function })" />
                </template>
              </div>
              <div class="min-w-[100px]">
                {{ item.label }}
              </div>
              <div
                v-if="closeable"
                class="m-r-[5px] flex items-center justify-center rounded-md p-[3px] transition-base"
                :class="[item.disabled ? '' : 'hover:bg-gray-2']"
                @click.stop="!item.disabled && onClose(item)"
              >
                <i class="i-ri-close-line" />
              </div>
              <div
                v-if="item.badge"
                class="absolute right-[5px] top-[2px] flex items-center justify-center rounded-full bg-red-5 leading-none"
                :class="[isBoolean(item.badge) ? 'w-[10px] h-[10px] rounded-full' : 'p-x-[3px] p-y-[2px] text-xs text-white']"
              >
                <span v-if="!isBoolean(item.badge)">
                  {{ item.badge }}
                </span>
              </div>
            </div>
            <div class="absolute right-[5px] top-[7px] h-[20px] w-[1px] bg-gray-5" :class="(_index === index || _index === index + 1) ? 'invisible' : 'visible'" />
            <svg class="" :class="value === item.key ? 'visible' : 'invisible'" width="6" height="6" fill="white"><path d="M 0 0 A 6 6 0 0 0 6 6 L 0 6 Z" /></svg>
          </template>
        </div>
      </transition-group>
    </div>
    <slot name="suffix" />
  </div>
</template>

<style scoped lang='less'>

</style>
