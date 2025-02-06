import type { LoginType, StatusType } from '~/api'

const token = ref<string>()
const userInfo = ref<StatusType['Res']['userInfo']>()
const routePermission = ref<StatusType['Res']['routes']>()
const logged = computed(() => !!token.value)
async function login(data: LoginType['Data']) {
  const [err, res] = await baseApi._login(data)
  if (err) {
    return Promise.reject(err)
  }
  token.value = res.token
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
  userInfo.value = res.userInfo
  routePermission.value = res.routes
  token.value = res.token
}
async function logout() {
  userInfo.value = undefined
  token.value = undefined
  routePermission.value = undefined
}
export function useLogin() {
  return {
    userInfo,
    token,
    routePermission,
    logged,
    login,
    refresh,
    logout,
  }
}
