import type { DialogProviderInst, LoadingBarProviderInst, MenuOption, MessageProviderInst, ModalProviderInst, NotificationProviderInst } from 'naive-ui'
import type { RouteMeta } from 'vue-router'
import 'naive-ui'

declare global {
  interface Window {
    $dialog: DialogProviderInst
    $loadingBar: LoadingBarProviderInst
    $message: MessageProviderInst
    $modal: ModalProviderInst
    $notification: NotificationProviderInst
  }
}
declare module 'naive-ui' {
  type IMenuOption = MenuOption & {
    meta?: RouteMeta
  }
}
