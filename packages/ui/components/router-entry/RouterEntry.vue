<script setup lang="ts">
import type { KeepAliveProps, RendererElement, RendererNode, SuspenseProps, TransitionProps, VNode } from 'vue'
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { h } from 'vue'

const {
  transitionName,
  transitionProps,
  keepAliveProps,
  suspenseProps,
  show = true,
  componentWrapper = true,
  componentNameFormat = (route: RouteLocationNormalizedLoadedGeneric) => route.path,
} = defineProps<{
  transitionName?: string | 'fade' | 'slide-left' | 'slide-right' | 'slide-top' | 'slide-bottom' | 'zoom-in' | 'zoom-out' | 'slide-left' | 'slide-right'
  transitionProps?: TransitionProps
  keepAliveProps?: KeepAliveProps
  suspenseProps?: SuspenseProps
  show?: boolean
  componentWrapper?: boolean
  componentNameFormat?: (route: RouteLocationNormalizedLoadedGeneric) => string
}>()

// 用来存已经创建的组件
const wrapperMap = new Map()
// 将router传个我们的组件重新换一个新的组件，原组件包里面
function formatComponentInstance(component: VNode<RendererNode, RendererElement, {
  [key: string]: any
}>, route: RouteLocationNormalizedLoadedGeneric) {
  let wrapper
  if (component) {
    const wrapperName = componentNameFormat(route)
    if (wrapperMap.has(wrapperName)) {
      wrapper = wrapperMap.get(wrapperName)
    }
    else {
      wrapper = {
        name: wrapperName,
        render() {
          return h(component)
        },
      }
      wrapperMap.set(wrapperName, wrapper)
    }
    return h(wrapper)
  }
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition appear mode="out-in" :name="transitionName" v-bind="transitionProps">
      <KeepAlive v-bind="keepAliveProps">
        <Suspense v-bind="suspenseProps">
          <component :is="componentWrapper ? formatComponentInstance(Component, route) : Component" v-if="show" :key="route.path" />
          <template #fallback>
            <slot name="fallback">
              Component Fallback
            </slot>
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style scoped lang="less">

</style>
