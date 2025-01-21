<script setup lang='ts'>
import LayoutHeader from './LayoutHeader.vue'
import LayoutSider from './LayoutSider.vue'

const { layout, sideCollapsed, contentFullScreen } = storeToRefs(useAppStore())
const { authMenu, currentPath } = storeToRefs(useAuthStore())
const router = useRouter()
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <n-layout :has-sider="layout === 'Horizontal'" class="wh-full">
    <n-layout-sider
      v-if="layout === 'Horizontal' && !contentFullScreen"
      :width="200"
      :collapsed-width="60"
      collapse-mode="width"
      :collapsed="sideCollapsed"
      bordered
      content-class="flex flex-col"
    >
      <LayoutSider />
    </n-layout-sider>
    <n-layout class="wh-full">
      <n-layout-header position="absolute" class="z-999 w-full flex-col">
        <div v-if="!contentFullScreen && layout === 'Vertical'" class="h-[40px] w-full flex gap-[10px] border-b p-x-[10px]">
          <Logo size="small" />
          <n-menu
            mode="horizontal"
            :value="currentPath"
            :options="authMenu"
            @update:value="handleUpdateValue"
          />
        </div>
        <LayoutHeader />
      </n-layout-header>
      <n-layout-content content-style="padding: 10px;" class="wh-full bg-white! dark:bg-black/80!" :class="contentFullScreen ? 'p-t-[46px] p-b-0' : 'p-t-[100px] p-b-[40px]'">
        <slot />
      </n-layout-content>
      <n-layout-footer v-if="!contentFullScreen" position="absolute" class="h-[40px] w-full flex-col-center">
        <slot name="footer" />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style scoped lang='less'>

</style>
