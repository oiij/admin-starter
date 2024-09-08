import { defineStore } from 'pinia'

// const exclude = ['/login', '/401', '/:all(.*)']
export const useAuthStore = defineStore(
  'authStore',
  () => {
    const { token, routePermission, logged, refreshed, login, refresh, logout } = useLogin()
    const { rawRoutes, authMenu, authFlatMenu } = useAuthMenu()

    const { currentPath, keepAlive } = useRouters()
    const { tabs, openedPath, addTab, removeTab, clearTab } = useTabs()
    const { miniNavigation } = useMiniNavigation()
    return {
      token,
      routePermission,
      logged,
      refreshed,
      refresh,
      login,
      logout,
      rawRoutes,
      authMenu,
      authFlatMenu,
      currentPath,
      openedPath,
      tabs,
      addTab,
      removeTab,
      clearTab,
      miniNavigation,
      keepAlive,
    }
  },
  {
    persist: {
      key: '__AUTH_STORE_PERSIST__',
      pick: ['token', 'logged'],
    },
  },
)
