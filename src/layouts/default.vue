<script setup lang="ts">
import { RouterEntry } from '@eiog/ui'
import HorizontalLayout from './Components/HorizontalLayout.vue'
import VerticalLayout from './Components/VerticalLayout.vue'

const { layout } = storeToRefs(useAppStore())
const layoutMap = {
  Horizontal: HorizontalLayout,
  Vertical: VerticalLayout,
}
const LayoutComponent = computed(() => layoutMap[layout.value] ?? HorizontalLayout)
</script>

<template>
  <div class="wh-full">
    <component :is="LayoutComponent ">
      <RouterEntry />
    </component>
  </div>
</template>

<style scoped lang="less"></style>
