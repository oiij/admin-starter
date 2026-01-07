import type { LoginType } from '~/api'
import { loginApi } from '~/api'

async function login(data: { phone: string, password: string }) {
  const [err, res] = await to(loginApi.login(data))
  if (err) {
    return Promise.reject(err)
  }
  const { token, userInfo, logged, permission } = storeToRefs(useAuthStore())

  token.value = res.token
  userInfo.value = res.userInfo
  logged.value = true
  permission.value = res.permission
  return res
}
async function captchaLogin(data: LoginType['CaptchaData']) {
  const [err, res] = await to(loginApi.captchaLogin(data))
  if (err) {
    return Promise.reject(err)
  }
  const { token, userInfo, logged, permission } = storeToRefs(useAuthStore())
  token.value = res.token
  userInfo.value = res.userInfo
  logged.value = true
  permission.value = res.permission
  return res
}
async function refresh() {
  const [err, res] = await to(loginApi.status())
  if (err) {
    logout()
    return Promise.reject(err)
  }

  const { token, userInfo, logged, permission } = storeToRefs(useAuthStore())
  const { allPermission } = useAutoRoutes()
  userInfo.value = res.userInfo
  token.value = res.token
  permission.value = res.isSuperAdmin ? allPermission : res.permission

  if (!logged.value) {
    logged.value = true
  }
  return res
}
async function logout() {
  const { token, userInfo, logged, permission } = storeToRefs(useAuthStore())

  userInfo.value = null
  token.value = null
  logged.value = false
  permission.value = []
}
export function useLogin() {
  return {
    login,
    captchaLogin,
    refresh,
    logout,
  }
}
