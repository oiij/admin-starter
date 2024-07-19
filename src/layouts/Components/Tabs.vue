<script setup lang='ts'>
const { tabs, currentPath } = storeToRefs(useAuthStore())
const { removeTab } = useAuthStore()
const router = useRouter()
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <n-tabs size="small" type="card" :animated="true" :value="currentPath" @update-value="handleUpdateValue" @close="removeTab">
    <n-tab v-for="item in tabs" :key="item.key" :name="(item.key as string)" :closable="item.key !== '/'">
      <div class="flex-y-center gap-[5px]" :class="item.key !== currentPath ? 'grayscale-100' : ''">
        <n-icon :component="defineComponent({ render: item.icon })" :size="18" />
        {{ item.label }}
      </div>
    </n-tab>
  </n-tabs>
</template>

<style scoped lang='less'>

</style>
