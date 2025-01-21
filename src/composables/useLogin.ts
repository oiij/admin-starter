import type { LoginType, StatusType } from '~/api'

const token = ref<string>()
const routePermission = ref<StatusType['Res']['routes']>()
const refreshed = ref(false)
async function login(data: LoginType['Data']) {
  const [err, res] = await baseApi._login(data)
  if (err) {
    return Promise.reject(err)
  }
  token.value = res.token
  refreshed.value = true
  return res
}
async function refresh(data: { token: string }) {
  window.$loading('正在获取登陆信息')
  const [err, res] = await baseApi._status({ token: data.token })
  window.$hideLoading()
  if (err) {
    logout()
    return
  }
  const { routes, token: refreshedToken } = res
  routePermission.value = routes
  token.value = refreshedToken
  refreshed.value = true
}
async function logout() {
  token.value = undefined
  routePermission.value = undefined
  refreshed.value = false
}
export function useLogin() {
  return {
    token,
    routePermission,
    refreshed,
    login,
    refresh,
    logout,
  }
}
