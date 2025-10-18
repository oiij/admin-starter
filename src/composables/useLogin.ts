async function login(data: { username: string, password: string }) {
  const [err, res] = await to(loginApi.login(data))
  if (err) {
    return Promise.reject(err)
  }
  const { token, userInfo, logged, permission } = storeToRefs(useAuthStore())
  const { allPermission } = useAutoRoutes()
  token.value = res.token
  userInfo.value = res.userInfo
  logged.value = true
  permission.value = allPermission
  return res
}
async function refresh() {
  const [err, res] = await to(loginApi.status())
  if (err) {
    logout()
    return
  }
  const { token, userInfo, logged, permission } = storeToRefs(useAuthStore())
  const { allPermission } = useAutoRoutes()
  userInfo.value = res.userInfo
  token.value = res.token
  permission.value = allPermission

  if (!logged.value) {
    logged.value = true
  }
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
    refresh,
    logout,
  }
}
