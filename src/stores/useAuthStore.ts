import { defineStore } from 'pinia'
// import { routes } from 'vue-router/auto-routes'
import type { LoginType, StatusType } from '~/api'

// const exclude = ['/login', '/401', '/:all(.*)']
export const useAuthStore = defineStore(
  'appStore',
  () => {
    const token = ref<string>()
    const routePermission = ref<StatusType['Res']['routes']>()
    const logged = ref(false)
    const refreshed = ref(false)

    async function refresh(data: { token: string }) {
      const { routes, token: refreshedToken } = await baseApi.status({ token: data.token })
      routePermission.value = routes
      token.value = refreshedToken
      refreshed.value = true
    }
    async function login(data: LoginType['Data']) {
      token.value = (await baseApi.login(data)).token
      logged.value = true
    }

    return {
      token,
      routePermission,
      logged,
      refreshed,
      refresh,
      login,
    }
  },
  {
    persist: {
      key: '__AUTH_STORE_PERSIST__',
      paths: ['token', 'logged'],
    },
  },
)
