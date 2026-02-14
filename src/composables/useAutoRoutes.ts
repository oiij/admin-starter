import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'es-toolkit'
import { autoRouter, router } from '~/modules/router'

function validatePermission(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const { permission } = storeToRefs(useAuthStore())

  return routes.map((m) => {
    const children = m.children?.filter(f => permission.value.includes(f.path) || !f.meta?.requireAuth)
    return {
      ...m,
      children,
    } as RouteRecordRaw
  }).filter(f => (permission.value.includes(f.path) || !f.meta?.requireAuth))
}

export function useAutoRoutes() {
  const { loading, flattenRoutes, routes, routesRaw } = autoRouter
  const authRoutes = computed(() => validatePermission(cloneDeep(routes)))
  const allPermission = flattenRoutes.map(m => m.path).flatMap(f => [f, ...Object.values(usePageAccess(f)).map(m => `${m.value}`)])
  const keepAlivePath = computed(() => flattenRoutes.filter(f => f.meta?.keepAlive).map(m => m.path))

  return {
    loading,
    routes,
    routesRaw,
    flattenRoutes,
    authRoutes,
    keepAlivePath,
    allPermission,
    currentRoutePath: computed(() => router.currentRoute.value.path),
  }
}
