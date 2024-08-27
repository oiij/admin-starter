<script setup lang='ts'>
defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: '首页',
    icon: 'svg:home',
    keepAlive: true,
    requireAuth: true,
  },
})
useHead({
  title: '首页',
})
</script>

<template>
  <div class="wh-full flex-col gap-[10px]">
    <div class="h-[20%] w-full rounded-xl bg-black/5 dark:bg-white/5" />
    <div class="w-full flex flex-1 gap-[10px] rounded-xl">
      <div class="h-full w-[30%] rounded-xl bg-black/5 dark:bg-white/5" />
      <div class="h-full w-[50%] rounded-xl bg-black/5 dark:bg-white/5" />
      <div class="h-full w-[20%] rounded-xl bg-black/5 dark:bg-white/5" />
    </div>
  </div>
</template>

<style scoped lang='less'>
.i-border {
  border: solid 4px transparent;
  border-radius: 10px;
  background-image: linear-gradient(#fff, #fff), linear-gradient(135deg, rgba(183, 40, 255, 1), rgba(40, 112, 255, 1));
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
