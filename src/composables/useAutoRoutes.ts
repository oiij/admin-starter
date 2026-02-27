import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'es-toolkit'
import { autoRouter, router } from '~/modules/router'

function validatePermission(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const { permission } = storeToRefs(useAuthStore())
  function validateRoute(route: RouteRecordRaw): boolean {
    if (!route.meta?.requireAuth) {
      return true
    }
    if (route.name && permission.value.includes(route.name.toString())) {
      return true
    }
    return false
  }
  return routes.filter(validateRoute).map((m) => {
    return {
      ...m,
      children: m.children?.filter(validateRoute),
    } as RouteRecordRaw
  })
}

export function useAutoRoutes() {
  const { loading, flattenRoutes, routes, routesRaw } = autoRouter
  const authRoutes = computed(() => validatePermission(cloneDeep(routes)))
  const allPermission = flattenRoutes.map(m => m.name?.toString()).filter(f => f !== undefined).flatMap(f => [f, ...Object.values(usePageAccess(f)).map(m => `${m.value}`)])
  const keepAliveName = computed(() => flattenRoutes.filter(f => f.meta?.keepAlive).map(m => m.name?.toString()).filter(f => f !== undefined))

  return {
    loading,
    routes,
    routesRaw,
    flattenRoutes,
    authRoutes,
    keepAliveName,
    allPermission,
    currentRoutePath: computed(() => router.currentRoute.value.path),
  }
}
