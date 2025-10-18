<script setup lang='ts'>
import { useMenu } from '~/composables/useMenu'
import Logo from './components/Logo.vue'

const { sideCollapsed } = storeToRefs(useAppStore())
const { currentRoutePath } = useAutoRoutes()
const { menuOptions } = useMenu()
const router = useRouter()
const { toggleCollapsed } = useAppStore()
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <div class="wh-full flex-col">
    <div class="h-[60px] w-full flex-col-center overflow-hidden border-b dark:border-white/10">
      <Logo :collapsed="sideCollapsed" />
    </div>
    <div class="min-h-0 w-full flex-1">
      <NScrollbar>
        <NMenu
          :collapsed="sideCollapsed"
          :collapsed-width="60"
          :collapsed-icon-size="32"
          :indent="14"
          :icon-size="24"
          accordion
          :value="currentRoutePath"
          :options="menuOptions"
          @update:value="handleUpdateValue"
        />
      </NScrollbar>
    </div>
    <div class="flex items-center justify-center p-y-[10px]">
      <NButton quaternary @click="toggleCollapsed">
        <template #icon>
          <Transition name="fade" mode="out-in">
            <i v-if="sideCollapsed" class="i-mage-dots-menu" />
            <i v-else class="i-mage-dash-menu" />
          </Transition>
        </template>
      </NButton>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
