import type { InjectionKey, Ref } from 'vue'
import './index.less'

export const tabsBarInjectionKey: InjectionKey<{
  list: Ref<string[]>
  activeName: Ref<string | undefined>
  pushItem: (name: string) => void
  removeItem: (name: string) => void
  itemClick: (name: string) => void
}> = Symbol('tabs-bar-injection-key')

export { default as TabItem } from './TabItem.vue'
export { default as TabsBar } from './TabsBar.vue'
export type { TabsOptions } from './TabsBar.vue'
