<script setup lang='ts'>
import BaseLayoutAside from './BaseLayoutAside.vue'
import BaseLayoutFooter from './BaseLayoutFooter.vue'
import BaseLayoutHeader from './BaseLayoutHeader.vue'

const { sideCollapsed, contentFullScreen } = storeToRefs(useAppStore())
</script>

<template>
  <NLayout :has-sider="true" position="absolute" class="wh-full">
    <NLayoutSider
      v-if="!contentFullScreen"
      :width="200"
      :collapsed-width="60"
      collapse-mode="width"
      :collapsed="sideCollapsed"
      class="shadow-xl"
    >
      <BaseLayoutAside />
    </NLayoutSider>
    <NLayout class="wh-full">
      <NLayoutHeader position="absolute" class="z-999 w-full flex-col">
        <BaseLayoutHeader />
      </NLayoutHeader>
      <NLayoutContent content-style="padding: 10px;" class="wh-full bg-black/1! dark:bg-black/80!" :class="contentFullScreen ? 'p-t-[40px] p-b-0' : 'p-t-[100px] p-b-[40px]'">
        <slot />
      </NLayoutContent>
      <NLayoutFooter v-if="!contentFullScreen" position="absolute" class="h-[40px] w-full">
        <BaseLayoutFooter />
      </NLayoutFooter>
    </NLayout>
  </NLayout>
</template>

<style scoped lang='less'>

</style>
