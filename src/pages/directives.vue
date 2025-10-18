<script setup lang='ts'>
defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: '自定义指令',
    icon: 'svg:icon-window',
  },
})
useHead({
  title: '首页',
})
const copyText = ref('复制的内容')
function onCopySuccess(value: string) {
  window.$message.success(value)
}
function defEvent() {
  window.$message.success('默认事件')
}
function onLongPress() {
  window.$message.success('长按事件')
}
function onDebounce() {
  window.$message.success('防抖触发')
}
function onThrottle() {
  window.$message.success('节流触发')
}
function onIntoView() {
  window.$message.success('进入视图触发')
}
function onClickOutside() {
  window.$message.success('点击外部触发')
}
</script>

<template>
  <div v-watermark="'进入视图触发视图触发进入2'" class="wh-full flex-col gap-[10px] p-[20px]">
    <div class="w-full flex gap-[20px]">
      <NCard title="复制" class="w-1/4">
        <NButton v-copy="{ value: copyText, success: onCopySuccess }" @click="defEvent">
          点击复制
        </NButton>
        <NButton @click="() => copyText = '新的内容'">
          设置新内容
        </NButton>
      </NCard>
      <NCard title="长按" class="w-1/4">
        <NButton v-long-press:1000="onLongPress">
          长按触发事件
        </NButton>
      </NCard>
      <NCard title="防抖" class="w-1/4">
        <NButton v-debounce="onDebounce">
          点击
        </NButton>
      </NCard>
      <NCard title="节流" class="w-1/4">
        <NButton v-throttle="onThrottle">
          点击
        </NButton>
      </NCard>
    </div>
    <div class="flex gap-[20px]">
      <NCard title="进入视图">
        <NButton v-into-view="onIntoView" v-click-outside="onClickOutside">
          进入视图
        </NButton>
      </NCard>
      <NCard title="点击元素外部">
        <NButton v-into-view="onIntoView" v-click-outside="onClickOutside">
          点击元素外部
        </NButton>
      </NCard>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
