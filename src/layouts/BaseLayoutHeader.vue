<script setup lang='ts'>
import GlobalSearch from './components/GlobalSearch.vue'
import SetScreenLockButton from './components/SetScreenLockButton.vue'
import SettingButton from './components/SettingButton.vue'
import Tabs from './components/Tabs.vue'
import ToggleDarkModeButton from './components/ToggleDarkModeButton.vue'
import ToggleFullScreenButton from './components/ToggleFullScreenButton.vue'
import UserInfo from './components/UserInfo.vue'

const { contentFullScreen } = storeToRefs(useAppStore())
</script>

<template>
  <div class="w-full flex-col border-l dark:border-white/10" :class="contentFullScreen ? 'h-[40px]' : 'h-[100px]'">
    <div v-if="!contentFullScreen" class="h-[59px] w-full flex-y-center">
      <div class="m-l-auto flex-y-center gap-[10px] p-x-[10px]">
        <GlobalSearch />
        <SetScreenLockButton />
        <ToggleFullScreenButton />
        <ToggleDarkModeButton />
        <SettingButton />
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
