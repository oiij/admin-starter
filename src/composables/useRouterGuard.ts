import type { Router } from 'vue-router/auto'
import { to as _to } from 'await-to-js'

function validatePermission(path: string) {
  const { routePermission } = useAuthStore()
  return routePermission?.some(s => s.path === path)
}
export function useRouteGuard(router: Router) {
  const { start, done } = useNProgress()
  router.beforeEach(async (to) => {
    start()
    const { token, refresh } = useAuthStore()
    const requireAuth = to.meta.requireAuth
    const path = to.path
    const toLogin = path === '/login'

    if (token) {
      const [err] = await _to(refresh({ token: token ?? '' }))
      if (toLogin) {
        return false
      }
      if (requireAuth) {
        if (err) {
          return `/login?redirect=${to.path}`
        }
        if (validatePermission(path)) {
          return true
        }
        return '/401'
      }
      return true
    }
    if (requireAuth) {
      return `/login?redirect=${to.path}`
    }
    return true
  })
  router.afterEach((to, from) => {
    const { addTab } = useAuthStore()
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    to.meta.transition = toDepth < fromDepth ? 'slide-right' : toDepth > fromDepth ? 'slide-left' : 'fade'

    useChangeTitle(to)
    done()
    addTab(to.path)
  })
}
