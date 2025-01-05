// autoRouterApplyMeta(routes)
import type { RouteRecordRaw } from 'vue-router'
import type { Router } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router/auto'

import { handleHotUpdate, routes } from 'vue-router/auto-routes'

export function applyMeta(routes: RouteRecordRaw[]) {
  const _routes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.path === '_')
      return
    const _route = { ...route }
    if (_route.children && _route.children.length > 0) {
      _route.meta = {
        ..._route.meta,
        ..._route.children.find(f => f.path === '_')?.meta,
      }
      _route.children = applyMeta(_route.children)
    }
    _routes.push(_route)
  })
  return _routes
}

export const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHashHistory(import.meta.env.VITE_BASE as string),
  routes: setupLayouts(applyMeta(routes)),
})

useRouteGuard(router)

if (import.meta.hot) {
  handleHotUpdate(router)
}
