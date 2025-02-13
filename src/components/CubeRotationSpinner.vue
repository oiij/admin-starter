<script setup lang='ts'>
const { color = '#2f3545', duration = '2s' } = defineProps<{
  color?: string
  duration?: string
}>()
</script>

<template>
  <div class="cube-rotation-spinner" :style="{ '--color': `${color}`, '--duration': `${duration}` }">
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
</template>

<style scoped>
.cube-rotation-spinner {
  width: 44px;
  height: 44px;
  margin: 10px;
  animation: spinner-y0fdc1 var(--duration) infinite ease;
  transform-style: preserve-3d;
}

.cube-rotation-spinner > div {
  background-color: rgba(var(--color), 0.2);
  height: 100%;
  position: absolute;
  width: 100%;
  border: 2px solid var(--color);
}

.cube-rotation-spinner div:nth-of-type(1) {
  transform: translateZ(-22px) rotateY(180deg);
}

.cube-rotation-spinner div:nth-of-type(2) {
  transform: rotateY(-270deg) translateX(50%);
  transform-origin: top right;
}

.cube-rotation-spinner div:nth-of-type(3) {
  transform: rotateY(270deg) translateX(-50%);
  transform-origin: center left;
}

.cube-rotation-spinner div:nth-of-type(4) {
  transform: rotateX(90deg) translateY(-50%);
  transform-origin: top center;
}

.cube-rotation-spinner div:nth-of-type(5) {
  transform: rotateX(-90deg) translateY(50%);
  transform-origin: bottom center;
}

.cube-rotation-spinner div:nth-of-type(6) {
  transform: translateZ(22px);
}

@keyframes spinner-y0fdc1 {
  0% {
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
  }

  50% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
  }

  100% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
  }
}
</style>
