<script setup lang='ts'>
import type { DropdownOption } from 'naive-ui'
import { ChromeTabs } from '@oiij/chrome-tabs'
import { colord } from 'colord'
import TabsReloadButton from './TabsReloadButton.vue'
import TabsToggleContentFullScreenButton from './TabsToggleContentFullScreenButton.vue'

const { themeColors } = storeToRefs(useAppStore())
const { tabOptions, closeTab, closeOtherTabs, clearTabs } = useTabs()
const autoRoutes = useAutoRoutes()
const router = useRouter()
const { t } = useI18n()
function handleUpdateValue(key: string | number) {
  router.push(key as string)
}
function handleCloseTab(key: string) {
  if (autoRoutes.currentRoutePath.value === key) {
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
      label: t(`common.tabs.close-all`),
      key: 'close-all',
      props: {
        onClick: () => {
          clearTabs()
          handleUpdateValue('/')
        },
      },
    },
    {
      label: t(`common.tabs.close-others`),
      key: 'close-others',
      props: {
        onClick: () => {
          closeOtherTabs(autoRoutes.currentRoutePath.value)
        },
      },
    },
  ] as DropdownOption[]
})
</script>

<template>
  <ChromeTabs
    data-guide="tabs"
    :theme-colors="{ background: '#fff', active: '#f1f1f1', primary: colord(themeColors.primary ?? '#fff').alpha(0.3).toHex() }"
    :options="tabOptions"
    :value="autoRoutes.currentRoutePath.value"
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
          <TabsReloadButton />
        </div>
        <div data-guide="content-fullscreen">
          <TabsToggleContentFullScreenButton />
        </div>
      </div>
    </template>
  </ChromeTabs>
</template>

<style scoped lang='less'>

</style>
