<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    title: '❌页面找不到了',
    hide: true,
  },
})
const router = useRouter()
</script>

<template>
  <div class="wh-full flex-col-center p-[20px]">
    <n-empty description="页面找不到了">
      <template #icon>
        <span class="flex items-center justify-center">
          ❌
        </span>
      </template>
      <template #extra>
        <div class="flex-y-center gap-[10px]">
          <n-button @click="() => router.go(-2)">
            返回上一页
          </n-button>
          <n-button @click="() => router.push('/')">
            返回首页
          </n-button>
        </div>
      </template>
    </n-empty>
  </div>
</template>

<style scoped lang='less'>

</style>
