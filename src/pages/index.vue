<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { createWorker } from 'workey'

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
function add(a: number, b: number) {
  return a + b
}
const dayjs: any = null
const { callWorker: worker } = createWorker((foo: string) => {
  const arr = Array.from({ length: 1000000 }, (_, i) => i)
  return {
    arr: arr.reduce((pre, cur) => add(pre, cur), 0),
    foo,
    dayjs: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }
}, {
  dependencies: ['https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js'],
  localDependencies: [add],
})
worker('foo').then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
</script>

<template>
  <div class="wh-full flex-col gap-[10px]">
    <div class="h-[20%] w-full rounded-xl bg-black/5 dark:bg-white/5" />
    <div class="w-full flex flex-1 gap-[10px] rounded-xl">
      <div class="h-full w-[30%] rounded-xl bg-black/5 dark:bg-white/5" />
      <div class="h-full w-[50%] rounded-xl bg-black/5 p-[10px] dark:bg-white/5" />
      <div class="h-full w-[20%] rounded-xl bg-black/5 dark:bg-white/5" />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
