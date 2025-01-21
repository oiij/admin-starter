<script setup lang='ts'>
const { sideCollapsed } = storeToRefs(useAppStore())
const { authMenu, currentPath } = storeToRefs(useAuthStore())
const router = useRouter()
const { toggleCollapsed } = useAppStore()
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <div class="wh-full flex-col">
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
  </div>
</template>

<style scoped lang='less'>

</style>
