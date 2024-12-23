<script setup lang='ts'>
import { TabItem, TabsBar } from '@eiog/ui'
import '@eiog/ui/style.css'

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
const options = ref([
  {
    key: '1',
    label: '标签一',
    disabled: true,
  },
  {
    key: '2',
    label: '标签二',
    icon: () => {
      return h('i', { class: 'i-ri-24-hours-line' })
    },
    badge: 6,
  },
  {
    key: '3',
    label: '标签三',
    badge: true,
  },
  {
    key: '4',
    label: '标签四',
    badge: '新',
  },
])
const value = ref('1')
function onClose(name: string) {
  const index = options.value.findIndex(item => item.key === name)
  if (index !== -1) {
    options.value.splice(index, 1)
  }
}
function addOne() {
  const key = `${options.value.length + 1}`
  options.value.push({
    key,
    label: `标签${key}`,
  } as any)
  value.value = key
}
</script>

<template>
  <div class="wh-full flex-col gap-[10px]">
    <div class="h-[20%] w-full rounded-xl bg-black/5 dark:bg-white/5" />
    <div class="w-full flex flex-1 gap-[10px] rounded-xl">
      <div class="h-full w-[30%] rounded-xl bg-black/5 dark:bg-white/5" />
      <div class="h-full w-[50%] rounded-xl bg-black/5 p-[10px] dark:bg-white/5">
        <TabsBar v-model:value="value" @close="onClose">
          <TabItem v-for="item in options" :key="item.key" :name="item.key" :icon="item.icon" :disabled="item.disabled" :closeable="true">
            {{ item.label }}
          </TabItem>
        </TabsBar>
      </div>
      <div class="h-full w-[20%] rounded-xl bg-black/5 dark:bg-white/5">
        <n-button @click="addOne">
          Add
        </n-button>
      </div>
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
