<script setup lang='ts'>
const props = withDefaults(defineProps<{
  sideBar?: {
    width: number
    collapsedWidth: number
    collapsed: boolean
  }
}>(), {
  sideBar: () => {
    return {
      width: 200,
      collapsedWidth: 60,
      collapsed: false,
    }
  },
})
const { sideBar } = toRefs(props)
const { toggleCollapsed } = useAppStore()
</script>

<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider
      :width="sideBar.width"
      :collapsed-width="sideBar.collapsedWidth"
      collapse-mode="width"
      :collapsed="sideBar.collapsed"
      bordered
      content-class="flex flex-col"
    >
      <div class="w-full flex-1">
        <div class="h-[100px] w-full flex-col-center overflow-hidden">
          <Logo :size="sideBar.collapsed ? 'small' : 'middle'" />
        </div>
        <slot name="side-bar" />
      </div>
      <div class="flex items-center justify-center p-y-[10px]">
        <n-button quaternary @click="toggleCollapsed">
          <template #icon>
            <i v-if="sideBar.collapsed" class="i-line-md-menu-unfold-right" />
            <i v-else class="i-line-md-menu-unfold-left" />
          </template>
        </n-button>
      </div>
    </n-layout-sider>
    <n-layout>
      <n-layout-header position="absolute" class="z-999 h-[100px] w-full flex-col">
        <div class="h-[60px] w-full flex-y-center">
          <div class="flex-1 p-[10px]">
            <MiniNavigation />
          </div>
          <div class="p-x-[10px]">
            <RouterSearch />
          </div>
          <div class="flex-y-center gap-[10px] p-x-[10px]">
            <ToggleFullScreen />
            <ToggleLanguage />
            <ToggleDarkMode />
            <UserInfo />
          </div>
        </div>
        <div class="h-[40px] w-full flex items-end">
          <Tabs />
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 10px;" class="wh-full p-t-[100px] bg-white! dark:bg-black/80!">
        <slot />
      </n-layout-content>
      <n-layout-footer>
        <slot name="footer" />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style scoped lang='less'>

</style>
