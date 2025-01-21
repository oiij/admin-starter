<script setup lang='ts'>
const { contentFullScreen } = storeToRefs(useAppStore())
</script>

<template>
  <div class="h-[110px] w-full flex-col">
    <div v-if="!contentFullScreen" class="h-[64px] w-full flex-y-center">
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
    <div class="h-[46px] w-full flex items-end">
      <Tabs />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
