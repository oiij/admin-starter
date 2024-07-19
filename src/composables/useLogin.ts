import type { LoginType, StatusType } from '~/api'

const token = ref<string>()
const routePermission = ref<StatusType['Res']['routes']>()
const logged = ref(false)
const refreshed = ref(false)
async function login(data: LoginType['Data']) {
  token.value = (await baseApi.login(data)).token
  logged.value = true
}
async function refresh(data: { token: string }) {
  const { routes, token: refreshedToken } = await baseApi.status({ token: data.token })
  routePermission.value = routes
  token.value = refreshedToken
  refreshed.value = true
}
async function logout() {
  token.value = undefined
  routePermission.value = undefined
  logged.value = false
  refreshed.value = false
}
export function useLogin() {
  return {
    token,
    routePermission,
    logged,
    refreshed,
    login,
    refresh,
    logout,
  }
}
