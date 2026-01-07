import type { Router } from 'vue-router'
import { to as _to } from 'await-to-js'

export function useRouteGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const { loading } = useAutoRoutes()
    loading.value = true
    const { addTab } = useTabs()

    const { token, permission } = storeToRefs(useAuthStore())
    const { refresh } = useLogin()
    const requireAuth = to.meta.requireAuth
    const toPath = to.path

    if (token.value) {
      if (toPath === '/login') {
        window.$message.error('您已登录')
        return from.path === '/login' ? '/' : from.path
      }
      if (requireAuth) {
        const [err] = await _to(refresh())
        if (err) {
          window.$message.error('登录过期，请重新登录')
          return `/login?redirect=${toPath === '/login' ? '/' : toPath}`
        }
        if (permission.value.includes(toPath)) {
          addTab(toPath)
          return true
        }
        window.$message.error('您没有权限访问该页面')
        return '/401'
      }
      addTab(toPath)
      return true
    }
    if (requireAuth) {
      window.$message.error('请先登录')
      return `/login?redirect=${toPath === '/login' ? '/' : toPath}`
    }
    if (toPath === '/login') {
      return true
    }
    addTab(toPath)
    return true
  })
  router.afterEach((to) => {
    const title = useTitle()
    title.value = to.meta.title ?? ''
    const { loading } = useAutoRoutes()
    loading.value = false
    const { setLoadingDone } = useTabs()
    setLoadingDone(to.path)
  })
}
