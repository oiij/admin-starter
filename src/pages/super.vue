<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    title: 'RequireAuth',
    icon: 'svg:icon-super',
    requireAuth: true,
    keepAlive: false,
  },
})
const { _ROUTE_TITLE } = usePageInfo()
const value = ref([])
</script>

<template>
  <NCard :title="_ROUTE_TITLE" class="wh-full">
    <AccessTransfer v-model:value="value" />
  </NCard>
</template>

<style scoped lang='less'>

</style>
