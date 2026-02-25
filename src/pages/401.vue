<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    title: '🔒无权限',
    hidden: true,
  },
})
const router = useRouter()
</script>

<template>
  <div class="wh-full flex-col-center p-[20px]">
    <NEmpty description="无权限">
      <template #icon>
        <span class="flex items-center justify-center">
          🔒
        </span>
      </template>
      <template #extra>
        <div class="flex-y-center gap-[10px]">
          <NButton @click="() => router.back()">
            返回上一页
          </NButton>
          <NButton @click="() => router.push('/')">
            返回首页
          </NButton>
        </div>
      </template>
    </NEmpty>
  </div>
</template>

<style scoped lang='less'>

</style>
