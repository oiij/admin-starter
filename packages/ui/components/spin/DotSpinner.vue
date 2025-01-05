<script setup lang='ts'>
const { color = '#2f3545', dotSize = '2.8rem', duration = '.9s' } = defineProps<{
  color?: string
  dotSize?: string
  duration?: string
}>()
</script>

<template>
  <div class="dot-spinner" :style="{ '--color': `${color}`, '--size': `${dotSize}`, '--duration': `${duration}` }">
    <div class="dot-spinner__dot" />
    <div class="dot-spinner__dot" />
    <div class="dot-spinner__dot" />
    <div class="dot-spinner__dot" />
    <div class="dot-spinner__dot" />
    <div class="dot-spinner__dot" />
    <div class="dot-spinner__dot" />
    <div class="dot-spinner__dot" />
  </div>
</template>

<style scoped>
.dot-spinner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--size);
  width: var(--size);
}

.dot-spinner__dot {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}

.dot-spinner__dot::before {
  content: '';
  height: 20%;
  width: 20%;
  border-radius: 50%;
  background-color: var(--color);
  transform: scale(0);
  opacity: 0.5;
  animation: pulse0112 calc(var(--duration) * 1.111) ease-in-out infinite;
  box-shadow: 0 0 20px rgba(var(--color), 0.3);
}

.dot-spinner__dot:nth-child(2) {
  transform: rotate(45deg);
}

.dot-spinner__dot:nth-child(2)::before {
  animation-delay: calc(var(--duration) * -0.875);
}

.dot-spinner__dot:nth-child(3) {
  transform: rotate(90deg);
}

.dot-spinner__dot:nth-child(3)::before {
  animation-delay: calc(var(--duration) * -0.75);
}

.dot-spinner__dot:nth-child(4) {
  transform: rotate(135deg);
}

.dot-spinner__dot:nth-child(4)::before {
  animation-delay: calc(var(--duration) * -0.625);
}

.dot-spinner__dot:nth-child(5) {
  transform: rotate(180deg);
}

.dot-spinner__dot:nth-child(5)::before {
  animation-delay: calc(var(--duration) * -0.5);
}

.dot-spinner__dot:nth-child(6) {
  transform: rotate(225deg);
}

.dot-spinner__dot:nth-child(6)::before {
  animation-delay: calc(var(--duration) * -0.375);
}

.dot-spinner__dot:nth-child(7) {
  transform: rotate(270deg);
}

.dot-spinner__dot:nth-child(7)::before {
  animation-delay: calc(var(--duration) * -0.25);
}

.dot-spinner__dot:nth-child(8) {
  transform: rotate(315deg);
}

.dot-spinner__dot:nth-child(8)::before {
  animation-delay: calc(var(--duration) * -0.125);
}

@keyframes pulse0112 {
  0%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
