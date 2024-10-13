<script setup lang='ts'>
const { sideCollapsed, contentFullScreen } = storeToRefs(useAppStore())
const { authMenu, currentPath } = storeToRefs(useAuthStore())
const router = useRouter()

const { toggleCollapsed } = useAppStore()
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider
      v-if="!contentFullScreen"
      :width="200"
      :collapsed-width="60"
      collapse-mode="width"
      :collapsed="sideCollapsed"
      bordered
      content-class="flex flex-col"
    >
      <div class="w-full flex-1">
        <div class="h-[100px] w-full flex-col-center overflow-hidden">
          <Logo :size="sideCollapsed ? 'small' : 'middle'" />
        </div>
        <n-menu
          :collapsed="sideCollapsed"
          :collapsed-width="60"
          :collapsed-icon-size="24"
          :root-indent="20"
          :value="currentPath"
          :options="authMenu"
          @update:value="handleUpdateValue"
        />
      </div>
      <div class="flex items-center justify-center p-y-[10px]">
        <n-button quaternary @click="toggleCollapsed">
          <template #icon>
            <Transition name="fade" mode="out-in">
              <i v-if="sideCollapsed" class="i-mage-dots-menu" />
              <i v-else class="i-mage-dash-menu" />
            </Transition>
          </template>
        </n-button>
      </div>
    </n-layout-sider>
    <n-layout>
      <n-layout-header position="absolute" class="z-999 w-full flex-col">
        <div v-if="!contentFullScreen" class="h-[60px] w-full flex-y-center">
          <div class="flex-1 p-[10px]">
            <MiniNavigation />
          </div>
          <div class="p-x-[10px]">
            <RouterSearch />
          </div>
          <div class="flex-y-center gap-[10px] p-x-[10px]">
            <SetScreenLock />
            <ToggleFullScreen />
            <ToggleDarkMode />
            <Setting />
            <GitHubButton />
            <UserInfo />
          </div>
        </div>
        <div class="h-[40px] w-full flex items-end">
          <Tabs />
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 10px;" class="wh-full bg-white! dark:bg-black/80!" :class="contentFullScreen ? 'p-t-[40px] p-b-0' : 'p-t-[100px] p-b-[40px]'">
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
