<script setup lang='ts'>
import { TooltipButton } from '@eiog/ui'

const router = useRouter()
const { value, result } = useRouterSearch('')
const index = ref(0)
const { Ctrl_K, ArrowUp, ArrowDown, Enter } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown')
      e.preventDefault()
  },
})
const { value: show, setTrue: openModal } = useBoolean(false)

watchEffect(() => {
  if (Ctrl_K.value) {
    openModal()
  }
})
function handleUp() {
  if (index.value > 0) {
    index.value -= 1
  }
}
function handleDown() {
  if (index.value < result.value.length - 1) {
    index.value += 1
  }
}
function reset() {
  value.value = ''
  index.value = 0
  show.value = false
}
function handleChoose() {
  const item = result.value[index.value]
  if (item) {
    router.push(item.key as string)
    reset()
  }
}
function handleClick(path: string) {
  router.push(path)
  reset()
}
watchEffect(() => {
  if (!show.value)
    return
  if (ArrowUp.value)
    return handleUp()
  if (ArrowDown.value)
    return handleDown()
  if (Enter.value)
    return handleChoose()
})
</script>

<template>
  <TooltipButton :button-props="{ quaternary: true }" tooltip="全局搜索" @click="openModal">
    <template #icon>
      <i class="i-mage-search" />
    </template>
    <n-tag round :bordered="false" size="small">
      Ctrl+K
    </n-tag>
  </TooltipButton>
  <n-modal v-model:show="show" preset="card" :closable="false" class="h-[600px]! w-[600px]!" content-class="min-h-0" @after-leave="reset">
    <template #header>
      <n-input v-model:value="value" placeholder="搜索路由" size="large" />
    </template>
    <n-scrollbar v-if="result.length > 0" class="wh-full">
      <div class="w-full flex-col gap-[10px]">
        <div
          v-for="(item, _index) in result"
          :key="item.key"
          class="flex-y-center cursor-pointer gap-[14px] rounded-md bg-black/5 p-[10px] transition-base dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
          :class="_index === index ? 'bg-black/10! dark:bg-white/10!' : ''"
          @click="handleClick(item.key as string)"
          @mouseenter="index = _index"
        >
          <div class="flex items-center justify-center">
            <n-icon :component="defineComponent({ render: item.icon })" :size="40" />
          </div>
          <div class="w-full flex-col">
            <div class="text-xl font-medium dark:text-white">
              {{ item.label }}
            </div>
            <div class="text-black/50 dark:text-white/60">
              {{ item.key }}
            </div>
          </div>
        </div>
      </div>
    </n-scrollbar>
    <div v-else class="wh-full flex items-center justify-center">
      <n-empty description="无内容" />
    </div>

    <template #footer>
      <div class="flex-y-center gap-[10px]">
        <div class="flex-y-center gap-[5px]">
          <n-tag size="small" :bordered="false">
            <i class="i-mage-l-arrow-down-left" />
          </n-tag>
          Choose
        </div>
        <div class="flex-y-center gap-[5px]">
          <n-tag size="small" :bordered="false">
            <i class="i-mage-arrow-up" />
            <i class="i-mage-arrow-down" />
          </n-tag>
          Navigate
        </div>
        <div class="flex-y-center gap-[5px]">
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
