<script setup lang='ts'>
const { value, result } = useRouterSearch()
const { ctrl_k } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown')
      e.preventDefault()
  },
})
const { value: show, toggle: toggleShow } = useBoolean(false)

watch(ctrl_k, (v) => {
  if (v) {
    toggleShow()
  }
})
</script>

<template>
  <TooltipButton tooltip="全局搜索" @click="toggleShow">
    <template #icon>
      <i class="i-line-md-search" />
    </template>
    <n-tag round :bordered="false" size="small">
      Ctrl+K
    </n-tag>
  </TooltipButton>
  <n-modal v-model:show="show" preset="card" :closable="false" class="h-[600px]! w-[600px]!">
    <template #header>
      <n-input v-model:value="value" placeholder="搜索路由" size="large" />
    </template>
    <div class="">
      <div v-for="item in result" :key="item.key" class="">
        {{ item.label }}
      </div>
    </div>
    <template #footer>
      <div class="flex-y-center gap-[10px]">
        <div class="">
          <n-tag size="small" :bordered="false">
            <i class="i-mi-enter" />
          </n-tag>
          Choose
        </div>
        <div class="">
          <n-tag size="small" :bordered="false">
            <i class="i-mi-arrow-up" />
            <i class="i-mi-arrow-down" />
          </n-tag>
          Navigate
        </div>
        <div class="">
          <n-tag size="small" :bordered="false">
            <i class="">Esc</i>
          </n-tag>
          Closure
        </div>
      </div>
    </template>
  </n-modal>
</template>

<style scoped lang='less'>

</style>
