<script setup lang="ts">
import type {
  ConfigProviderProps,
  DialogProviderInst,
  DialogProviderProps,
  LoadingBarProviderInst,
  LoadingBarProviderProps,
  MessageProviderInst,
  MessageProviderProps,
  ModalProviderInst,
  ModalProviderProps,
  NotificationProviderInst,
  NotificationProviderProps,
} from 'naive-ui'
import { useNaiveTheme } from '@eiog/naive-ui'

import {
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NModalProvider,
  NNotificationProvider,
  NSpin,
  useDialog,
  useLoadingBar,
  useMessage,
  useModal,
  useNotification,
} from 'naive-ui'
import { defineComponent, onMounted, ref } from 'vue'

const {
  configProviderProps,
  loadingBarProps,
  dialogProviderProps,
  modalProviderProps,
  notificationProviderProps,
  messageProviderProps,
} = defineProps<{
  configProviderProps?: ConfigProviderProps
  loadingBarProps?: LoadingBarProviderProps
  dialogProviderProps?: DialogProviderProps
  modalProviderProps?: ModalProviderProps
  notificationProviderProps?: NotificationProviderProps
  messageProviderProps?: MessageProviderProps
}>()
declare global {
  interface Window {
    $dialog: DialogProviderInst
    $loadingBar: LoadingBarProviderInst
    $message: MessageProviderInst
    $modal: ModalProviderInst
    $notification: NotificationProviderInst
    $loading: (text: string) => void
    $hideLoading: () => void
  }
}
const { theme, themeOverrides, locale, dateLocale } = useNaiveTheme()
const globalLoading = ref(false)
const globalLoadingText = ref('正在加载')
function showGlobalLoading(text: string = '正在加载') {
  globalLoading.value = true
  globalLoadingText.value = text
}
function hideGlobalLoading() {
  globalLoading.value = false
}
// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$dialog = useDialog()
  window.$loadingBar = useLoadingBar()
  window.$message = useMessage()
  window.$modal = useModal()
  window.$notification = useNotification()
  window.$loading = showGlobalLoading
  window.$hideLoading = hideGlobalLoading
}
const NaiveProviderContent = defineComponent({
  setup() {
    onMounted(() => {
      registerNaiveTools()
    })
  },
  render() {
    return null
  },
})
</script>

<template>
  <NConfigProvider
    abstract
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
    v-bind="configProviderProps"
  >
    <NLoadingBarProvider v-bind="loadingBarProps">
      <NDialogProvider v-bind="dialogProviderProps">
        <NModalProvider v-bind="modalProviderProps">
          <NNotificationProvider v-bind="notificationProviderProps">
            <NMessageProvider v-bind="messageProviderProps">
              <NSpin :style="{ width: '100%', height: '100%' }" :content-style="{ width: '100%', height: '100%' }" :show="globalLoading" :description="globalLoadingText">
                <slot />
              </NSpin>
              <NaiveProviderContent />
            </NMessageProvider>
          </NNotificationProvider>
        </NModalProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
    <NGlobalStyle />
  </NConfigProvider>
</template>

<style scoped></style>
