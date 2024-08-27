<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    title: '401 无权限',
    hideOnMenu: true,
  },
})
const route = useRoute()
const redirect = route.query.redirect as string || '/'
const router = useRouter()
</script>

<template>
  <div class="p-[20px]">
    <n-empty size="huge" description="你没有访问的权限">
      <template #icon>
        <i class="i-line-md-alert" />
      </template>
      <template #extra>
        <div class="flex-y-center gap-[10px]">
          <n-button @click="() => router.push(redirect)">
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
