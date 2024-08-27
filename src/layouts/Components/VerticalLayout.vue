<script setup lang='ts'>
const { contentFullScreen } = storeToRefs(useAppStore())
const { authMenu, currentPath } = storeToRefs(useAuthStore())
const router = useRouter()

function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <n-layout class="wh-full">
    <n-layout-header position="absolute" class="z-999 w-full flex-col">
      <div class="h-[40px] w-full flex gap-[10px] border-b p-x-[10px]">
        <Logo size="small" />
        <n-menu
          mode="horizontal"
          :value="currentPath"
          :options="authMenu"
          @update:value="handleUpdateValue"
        />
      </div>
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
          <ToggleLanguage />
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
    <n-layout-content content-style="padding: 10px;" class="wh-full bg-white! dark:bg-black/80!" :class="contentFullScreen ? 'p-t-[40px] p-b-0' : 'p-t-[140px] p-b-[40px]'">
      <slot />
    </n-layout-content>
    <n-layout-footer v-if="!contentFullScreen" position="absolute" class="h-[40px] w-full flex-col-center">
      <slot name="footer" />
    </n-layout-footer>
  </n-layout>
</template>

<style scoped lang='less'>

</style>
