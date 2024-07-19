<script setup lang="ts">
import HorizontalLayout from './Components/HorizontalLayout.vue'

const router = useRouter()
const { authMenu, currentPath } = storeToRefs(useAuthStore())
const { layout } = storeToRefs(useAppStore())
const { sideBar } = toRefs(layout.value)
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <div class="wh-full">
    <HorizontalLayout :side-bar="sideBar">
      <template #side-bar>
        <n-menu
          :collapsed="sideBar.collapsed"
          :collapsed-width="sideBar.collapsedWidth"
          :collapsed-icon-size="24"
          :root-indent="20"
          :value="currentPath"
          :options="authMenu"
          @update:value="handleUpdateValue"
        />
      </template>
      <RouterEntry />
    </HorizontalLayout>
  </div>
</template>

<style scoped lang="less"></style>
