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
.fade-enter-active,
.fade-leave-active,
.fade-left-enter-active,
.fade-left-leave-active,
.fade-right-enter-active,
.fade-right-leave-active,
.fade-top-enter-active,
.fade-top-leave-active,
.fade-bottom-enter-active,
.fade-bottom-leave-active,
.zoom-in-enter-active,
.zoom-in-leave-active,
.zoom-out-enter-active,
.zoom-out-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-left-enter-from,
.fade-left-leave-to {
  transform: translate(-20px, 0);
  opacity: 0;
}
.fade-right-enter-from,
.fade-right-leave-to {
  transform: translate(20px, 0);
  opacity: 0;
}
.fade-top-enter-from,
.fade-top-leave-to {
  transform: translate(0, -20px);
  opacity: 0;
}
.fade-bottom-enter-from,
.fade-bottom-leave-to {
  transform: translate(0, 20px);
  opacity: 0;
}
.zoom-in-enter-from,
.zoom-in-leave-to {
  transform: scale(1.2);
  opacity: 0;
}
.zoom-out-enter-from,
.zoom-out-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
.slide-left-enter-from {
  transform: translate(50%, 0);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translate(20%, 0);
  opacity: 0;
}
.slide-right-enter-from {
  transform: translate(-50%, 0);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translate(-20%, 0);
  opacity: 0;
}
</style>
