import 'naive-ui'
import type { DialogProviderInst, LoadingBarProviderInst, MenuOption, MessageProviderInst, NotificationProviderInst } from 'naive-ui'
import type { RouteMeta } from 'vue-router'

declare global {
  interface Window {
    $message: MessageProviderInst
    $notification: NotificationProviderInst
    $dialog: DialogProviderInst
    $loadingBar: LoadingBarProviderInst
  }
}
declare module 'naive-ui' {
  type IMenuOption = MenuOption & {
    meta?: RouteMeta
  }
}
