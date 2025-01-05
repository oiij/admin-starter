import { defineStore } from 'pinia'

// const exclude = ['/login', '/401', '/:all(.*)']
export const useAuthStore = defineStore(
  'authStore',
  () => {
    const { token, routePermission, logged, refreshed, login, refresh, logout } = useLogin()

    const { routes, authRoutes, authMenu, authFlatMenu, currentRoute, currentPath, keepAlivePath, tabsPath, authTabs, addTab, removeTab, clearTab, searchValue, searchRouteResult, miniNavigation } = useAuthRouter()
    return {
      token,
      routePermission,
      logged,
      refreshed,
      login,
      refresh,
      logout,
      routes,
      authRoutes,
      authMenu,
      authFlatMenu,
      currentRoute,
      currentPath,
      keepAlivePath,
      tabsPath,
      authTabs,
      addTab,
      removeTab,
      clearTab,
      searchValue,
      searchRouteResult,
      miniNavigation,
    }
  },
  {
    persist: {
      key: '__AUTH_STORE_PERSIST__',
      pick: ['token', 'logged'],
    },
  },
)
