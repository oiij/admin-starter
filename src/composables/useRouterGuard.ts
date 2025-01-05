import type { Router } from 'vue-router/auto'

// const READ = 0b1000 // 可读
// const WRITE = 0b0100 // 可写
// const CREATE = 0b0010 // 创建
// const DELETE = 0b0001 // 删除

function validatePermission(path: string) {
  const { routePermission } = useAuthStore()
  return routePermission?.some(s => s.path === path)
}
export function useRouteGuard(router: Router) {
  const { start, done } = useNProgress()

  router.beforeEach(async (to) => {
    start()
    const { token, logged, refreshed, refresh } = useAuthStore()
    const requireAuth = to.meta.requireAuth
    const path = to.path
    const toLogin = path === '/login'

    if (logged && toLogin) // 已登录 去登陆 跳转上一页面
      return false
    if (!requireAuth) // 不需要验证 直接通过
      return true
    if (requireAuth && !logged) // 需要验证 没登陆 去登陆
      return `/login?redirect=${to.path}`
    if (requireAuth && logged && refreshed && validatePermission(path)) // 需要验证 已刷新token 已验证路由 通过
      return true
    if (requireAuth && logged && refreshed && !validatePermission(path)) // 需要验证 已刷新token 路由验证失败 跳转无权限
      return `/401?redirect=${to.path}`
    if (requireAuth && logged && token && !refreshed) { // 需要验证 已登录 没刷新token 去刷新
      try {
        await refresh({ token })
        if (validatePermission(path)) {
          return true
        }
        return `/401?redirect=${to.path}`
      }
      catch {
        return `/login?redirect=${to.path}`
      }
    }
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
