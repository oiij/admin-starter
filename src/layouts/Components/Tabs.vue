<script setup lang='ts'>
import type { DropdownOption } from 'naive-ui'
import { CTabs } from '@oiij/chrome-tabs'
import { colord } from 'colord'
import Reload from './Reload.vue'
import ToggleContentFullScreen from './ToggleContentFullScreen.vue'

const { colors } = storeToRefs(useAppStore())
const { tabOptions, closeTab, closeOtherTabs, clearTabs } = useTabs()
const { currentRoutePath } = useAutoRoutes()
const router = useRouter()

function handleUpdateValue(key: string | number) {
  router.push(key as string)
}
function handleCloseTab(key: string) {
  if (currentRoutePath.value === key) {
    const prevIndex = tabOptions.value.findIndex(f => f.key === key) - 1
    const preTab = tabOptions.value[prevIndex]
    const nextIndex = tabOptions.value.findIndex(f => f.key === key) + 1
    const nextTab = tabOptions.value[nextIndex]
    handleUpdateValue(preTab?.key ?? nextTab?.key ?? '/')

    closeTab(key)
  }
  else {
    closeTab(key)
  }
}
const dropdownOptions = computed(() => {
  return [
    {
      label: '全部关闭',
      key: 'close-all',
      props: {
        onClick: () => {
          clearTabs()
          handleUpdateValue('/')
        },
      },
    },
    {
      label: '全部其他',
      key: 'close-others',
      props: {
        onClick: () => {
          closeOtherTabs(currentRoutePath.value)
        },
      },
    },
  ] as DropdownOption[]
})
</script>

<template>
  <CTabs
    data-guide="tabs"
    :colors="{ background: '#fff', active: '#f1f1f1', primary: colord(colors.primary ?? '#fff').alpha(0.3).toHex() }"
    :options="tabOptions"
    :value="currentRoutePath"
    @click="handleUpdateValue"
    @close="(key) => handleCloseTab(key as string)"
  >
    <template #prefix>
      <NDropdown trigger="hover" :options="dropdownOptions">
        <NButton quaternary size="small">
          <template #icon>
            <i class="i-mage-chevron-down-circle" />
          </template>
        </NButton>
      </NDropdown>
    </template>
    <template #suffix>
      <div class="flex-y-center gap-[10px] p-x-[10px]">
        <div data-guide="reload">
          <Reload />
        </div>
        <div data-guide="content-fullscreen">
          <ToggleContentFullScreen />
        </div>
      </div>
    </template>
  </CTabs>
</template>

<style scoped lang='less'>

</style>
