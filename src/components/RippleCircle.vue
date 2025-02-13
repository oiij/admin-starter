<script setup lang="ts">
const { size = 210, opacity = 0.24, animationDelay, borderStyle } = defineProps<{
  size?: number
  class?: string
  opacity?: number
  animationDelay?: number
  borderStyle?: string
}>()
</script>

<template>
  <div class="animate-ripple-circle absolute shadow-xl" />
</template>

<style scoped>
.animate-ripple-circle {
  animation: ripple-effect var(--duration, 2s) ease-in-out calc(var(--i, 0) * 0.2s) infinite;
  border-width: 1px;
  top: 50%;
  left: 50%;
  width: v-bind('`${size}px`');
  height: v-bind('`${size}px`');
  animation-delay: v-bind('`${animationDelay}ms`');
  opacity: v-bind('opacity');
  transform: translate(-50%, -50%) scale(1);
  border-style: v-bind('borderStyle');
}

@keyframes ripple-effect {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    transform: translate(-50%, -50%) scale(0.9);
  }
}
</style>
