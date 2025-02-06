<script setup lang='ts'>
import { SearchInput, TooltipButton } from '@oiij/ui'
import { useBoolean } from '@oiij/use'
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()

const router = useRouter()
const { searchValue, searchRouteResult } = useAuthRouter()
const index = ref(0)
const { Ctrl_K, ArrowUp, ArrowDown, Enter } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown')
      e.preventDefault()
  },
})

const { value: modalFlag, setTrue: showModal, setFalse: hideModal } = useBoolean(false)

watchEffect(() => {
  if (Ctrl_K.value) {
    showModal()
  }
})
function handleUp() {
  if (index.value > 0) {
    index.value -= 1
  }
}
function handleDown() {
  if (index.value < searchRouteResult.value.length - 1) {
    index.value += 1
  }
}
function reset() {
  searchValue.value = ''
  index.value = 0
}
function handleChoose() {
  const item = searchRouteResult.value[index.value]
  if (item) {
    hideModal()
    router.push(item.key as string)
    reset()
  }
}
function handleClick(path: string) {
  router.push(path)
  reset()
}
watchEffect(() => {
  if (!modalFlag.value)
    return
  if (ArrowUp.value)
    return handleUp()
  if (ArrowDown.value)
    return handleDown()
  if (Enter.value)
    return handleChoose()
})
const patterns = computed(() => {
  return searchValue.value === '' ? [] : [searchValue.value]
})
const highLightStyle = computed(() => {
  return {
    padding: '0 4px',
    borderRadius: themeVars.value.borderRadius,
    display: 'inline-block',
    color: themeVars.value.baseColor,
    background: themeVars.value.primaryColor,
    transition: `all .3s ${themeVars.value.cubicBezierEaseInOut}`,
  }
})
</script>

<template>
  <TooltipButton :button-props="{ quaternary: true }" :tooltip="$t(`common.globalSearch.placeholder`)" @click="showModal">
    <template #icon>
      <i class="i-mage-search" />
    </template>
    <NTag round :bordered="false" size="small">
      Ctrl+K
    </NTag>
  </TooltipButton>
  <NModal v-model:show="modalFlag" preset="card" :closable="false" class="h-[600px]! w-[600px]!" content-class="min-h-0" @after-leave="reset">
    <template #header>
      <SearchInput v-model:value="searchValue" :input-props="{ placeholder: $t(`common.globalSearch.placeholder`), size: 'large' }" :button-props="{ size: 'large' }" />
    </template>
    <NScrollbar v-if="searchRouteResult.length > 0" class="wh-full">
      <div class="w-full flex-col gap-[10px]">
        <div
          v-for="(item, _index) in searchRouteResult"
          :key="_index"
          class="flex-y-center cursor-pointer gap-[14px] rounded-md bg-black/5 p-[10px] transition-base dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
          :class="_index === index ? 'bg-black/10! dark:bg-white/10!' : ''"
          @click="handleClick(item.key as string)"
          @mouseenter="index = _index"
        >
          <div class="flex items-center justify-center">
            <NIcon :component="item.icon" :size="40" />
          </div>
          <div class="w-full flex-col">
            <div class="text-xl font-medium dark:text-white">
              <NHighlight :text="(item.label as string)" :patterns="patterns" :highlight-style="highLightStyle" />
            </div>
            <div class="text-black/50 dark:text-white/60">
              <NHighlight :text="(item.key as string)" :patterns="patterns" :highlight-style="highLightStyle" />
            </div>
          </div>
        </div>
      </div>
    </NScrollbar>
    <div v-else class="wh-full flex items-center justify-center">
      <NEmpty description="无内容" />
    </div>

    <template #footer>
      <div class="flex-y-center gap-[10px]">
        <div class="flex-y-center gap-[5px]">
          <NTag size="small" :bordered="false">
            <i class="i-mage-l-arrow-down-left" />
          </NTag>
          {{ $t('common.globalSearch.enter') }}
        </div>
        <div class="flex-y-center gap-[5px]">
          <NTag size="small" :bordered="false">
            <i class="i-mage-arrow-up" />
            <i class="i-mage-arrow-down" />
          </NTag>
          {{ $t('common.globalSearch.navigate') }}
        </div>
        <div class="flex-y-center gap-[5px]">
          <NTag size="small" :bordered="false">
            <i class="">Esc</i>
          </NTag>
          {{ $t('common.globalSearch.closure') }}
        </div>
      </div>
    </template>
  </NModal>
</template>

<style scoped lang='less'>

</style>
