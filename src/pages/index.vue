<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { createWorker } from 'workey'
import RandomSvg from '~/components/RandomSvg.vue'

defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: '首页',
    icon: 'svg:icon-home',
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
const avatar = ref('')
</script>

<template>
  <div class="wh-full flex-col gap-[10px]">
    <div class="h-[20%] w-full rounded-xl bg-black/5 dark:bg-white/5" />
    <div class="w-full flex flex-1 gap-[10px] rounded-xl">
      <div class="h-full w-[30%] rounded-xl bg-black/5 dark:bg-white/5">
        <AvatarUpload v-model:value="avatar" />
      </div>
      <div class="h-full w-[50%] flex items-center justify-center rounded-xl bg-black/5 p-[10px] dark:bg-white/5">
        <div class="mockup-window h-[300px] w-[600px] border bg-white">
          <div class="wh-full flex-col-center">
            Hello!
          </div>
        </div>
      </div>
      <div class="h-full w-[20%] rounded-xl bg-black/5 dark:bg-white/5">
        <RandomSvg value="foo" />
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
