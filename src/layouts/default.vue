<script setup lang="ts">
import ScreenSnap from '~/components/ScreenSnap.vue'
import BaseLayout from './BaseLayout.vue'
import RouterEntry from './components/RouterEntry.vue'
import ScreenLockProvider from './components/ScreenLockProvider.vue'
import Watermark from './components/Watermark.vue'
</script>

<template>
  <div class="h-[100vh] w-[100vw]">
    <BaseLayout>
      <RouterEntry />
    </BaseLayout>
    <Watermark />
    <ScreenLockProvider />
    <ScreenSnap />
  </div>
</template>

<style scoped lang="less"></style>
