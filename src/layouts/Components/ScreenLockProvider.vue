<script setup lang='ts'>
import ScreenLock from './ScreenLock.vue'

const { screenLockFlag } = useScreenLock()
</script>

<template>
  <Transition name="fade-bottom">
    <Teleport to="body">
      <ScreenLock v-if="screenLockFlag" />
    </Teleport>
  </Transition>
</template>

<style scoped>

</style>
