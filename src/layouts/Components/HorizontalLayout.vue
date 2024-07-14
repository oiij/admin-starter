<script setup lang='ts'>
import ToggleFullScreen from './ToggleFullScreen.vue'
import ToggleLanguage from './ToggleLanguage.vue'
import ToggleDarkMode from './ToggleDarkMode.vue'
import UserInfo from './UserInfo.vue'
import Logo from './Logo.vue'

const collapsed = ref(false)
function changeCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider :width="200" :collapsed-width="50" collapse-mode="width" :collapsed="collapsed" bordered content-class="flex flex-col">
      <div class="w-full flex-1">
        <div class="h-[100px] w-full flex-col-center overflow-hidden">
          <Logo :size="collapsed ? 'small' : 'middle'" />
        </div>
        <slot name="side-bar" />
      </div>
      <div class="flex items-center justify-center p-y-[10px]">
        <n-button quaternary @click="changeCollapsed">
          <template #icon>
            <i v-if="collapsed" class="i-line-md-menu-unfold-right" />
            <i v-else class="i-line-md-menu-unfold-left" />
          </template>
        </n-button>
      </div>
    </n-layout-sider>
    <n-layout>
      <n-layout-header position="absolute" class="z-999 h-[100px] w-full flex-col">
        <div class="h-[60px] w-full flex-y-center">
          <div class="flex-1">
            b
          </div>
          <div class="flex-y-center gap-[10px]">
            <ToggleFullScreen />
            <ToggleLanguage />
            <ToggleDarkMode />
            <UserInfo />
          </div>
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 10px;" class="wh-full p-t-[120px]">
        <div class="bg-white">
          <slot />
        </div>
      </n-layout-content>
      <n-layout-footer>
        <slot name="footer" />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style scoped lang='less'>

</style>
