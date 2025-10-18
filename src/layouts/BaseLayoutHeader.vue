<script setup lang='ts'>
import RouterSearch from './components/RouterSearch.vue'
import SetScreenLock from './components/SetScreenLock.vue'
import Setting from './components/Setting.vue'
import Tabs from './components/Tabs.vue'
import ToggleDarkMode from './components/ToggleDarkMode.vue'
import ToggleFullScreen from './components/ToggleFullScreen.vue'
import UserInfo from './components/UserInfo.vue'

const { contentFullScreen } = storeToRefs(useAppStore())
</script>

<template>
  <div class="w-full flex-col border-l dark:border-white/10" :class="contentFullScreen ? 'h-[40px]' : 'h-[100px]'">
    <div v-if="!contentFullScreen" class="h-[59px] w-full flex-y-center">
      <div class="m-l-auto flex-y-center gap-[10px] p-x-[10px]">
        <RouterSearch />
        <SetScreenLock />
        <ToggleFullScreen />
        <ToggleDarkMode />
        <Setting />
        <UserInfo />
      </div>
    </div>
    <div class="h-[40px] w-full border-t dark:border-white/10">
      <Tabs class="m-t-auto" />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
