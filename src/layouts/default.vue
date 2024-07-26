<script setup lang="ts">
import HorizontalLayout from './Components/HorizontalLayout.vue'
import VerticalLayout from './Components/VerticalLayout.vue'

const { layout } = storeToRefs(useAppStore())
const layoutMap = {
  Horizontal: HorizontalLayout,
  Vertical: VerticalLayout,
}
const LayoutComponent = computed(() => layoutMap[layout.value])
</script>

<template>
  <div class="wh-full">
    <component :is="LayoutComponent ?? HorizontalLayout">
      <RouterEntry />
    </component>
  </div>
</template>

<style scoped lang="less"></style>
