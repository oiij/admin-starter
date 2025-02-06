import type { Ref } from 'vue'
import { useInjectionKey } from '@oiij/use'
import './index.less'

export const tabsBarInjectionKey = useInjectionKey<{
  list: Ref<string[]>
  activeName: Ref<string | undefined>
  pushItem: (name: string) => void
  removeItem: (name: string) => void
  itemClick: (name: string) => void
}>('tabs-bar-injection-key')

export { default as TabItem } from './TabItem.vue'
export { default as TabsBar } from './TabsBar.vue'
export type { TabsOptions } from './TabsBar.vue'
