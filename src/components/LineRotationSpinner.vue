<script setup lang='ts'>
const { color = ['rgba(225, 20, 98, 0.75)', 'rgba(111, 202, 220, 0.75)', 'rgba(61, 184, 143, 0.75)', 'rgba(233, 169, 32, 0.75)'], duration = '2s' } = defineProps<{
  color?: [string, string, string, string]
  duration?: string
}>()
</script>

<template>
  <div class="line-rotation-spinner" :style="{ '--color-1': `${color[0]}`, '--color-2': `${color[1]}`, '--color-3': `${color[2]}`, '--color-4': `${color[3]}`, '--duration': `${duration}` }">
    <div class="loader" />
  </div>
</template>

<style scoped>
.line-rotation-spinner {
  position: relative;
}
.loader {
  position: relative;
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
}

.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  transform: translate(-50%, -50%);
}

.loader:before {
  animation: before8 var(--duration) infinite ease-in-out;
}

.loader:after {
  animation: after6 var(--duration) infinite ease-in-out;
}

@keyframes before8 {
  0% {
    width: 0.5em;
    box-shadow:
      1em -0.5em var(--color-1),
      -1em 0.5em var(--color-2);
  }

  35% {
    width: 2.5em;
    box-shadow:
      0 -0.5em var(--color-1),
      0 0.5em var(--color-2);
  }

  70% {
    width: 0.5em;
    box-shadow:
      -1em -0.5em var(--color-1),
      1em 0.5em var(--color-2);
  }

  100% {
    box-shadow:
      1em -0.5em var(--color-1),
      -1em 0.5em var(--color-2);
  }
}

@keyframes after6 {
  0% {
    height: 0.5em;
    box-shadow:
      0.5em 1em var(--color-3),
      -0.5em -1em var(--color-4);
  }

  35% {
    height: 2.5em;
    box-shadow:
      0.5em 0 var(--color-3),
      -0.5em 0 var(--color-4);
  }

  70% {
    height: 0.5em;
    box-shadow:
      0.5em -1em var(--color-3),
      -0.5em 1em var(--color-4);
  }

  100% {
    box-shadow:
      0.5em 1em var(--color-3),
      -0.5em -1em var(--color-4);
  }
}
</style>
