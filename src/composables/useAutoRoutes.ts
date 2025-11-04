import type { RouteRecordRaw } from 'vue-router'
import { useBoolean } from '@oiij/use'
import { cloneDeep } from 'es-toolkit'
import { routes as _routes } from 'vue-router/auto-routes'
import { router } from '~/modules'

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
function parseRoutes(routes: RouteRecordRaw[] | readonly RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.map((route) => {
    const indexMeta = route.children?.find(f => f.path === ``)?.meta?.group
    return {
      ...route,
      meta: {
        ...route.meta,
        ...indexMeta,
        sort: route.meta?.sort,
      },
      children: route.children?.map((m) => {
        return {
          ...m,
          path: m.path === '' ? route.path : m.path,
        }
      }).toSorted((a, b) => (a.meta?.sort ?? Infinity) - (b.meta?.sort ?? Infinity)),
    } as RouteRecordRaw
  }).toSorted((a, b) => (a.meta?.sort ?? Infinity) - (b.meta?.sort ?? Infinity))
}
const { value: loading } = useBoolean(false)
const currentRoute = computed(() => router.currentRoute.value)
const currentRoutePath = computed(() => currentRoute.value.path)
const routes = parseRoutes(cloneDeep(_routes))

const flattenRoutes = cloneDeep(routes).flatMap(f => f.children ?? f)
const authRoutes = computed(() => validatePermission(cloneDeep(routes)))
const keepAlivePath = computed(() => flattenRoutes.filter(f => f.meta?.keepAlive).map(m => m.path))
const allPermission = flattenRoutes.map(m => m.path).flatMap(f => [f, ...Object.values(usePageAccess(f)).map(m => `${m.value}`)])

export function useAutoRoutes() {
  return {
    loading,
    currentRoute,
    currentRoutePath,
    routes,
    flattenRoutes,
    authRoutes,
    keepAlivePath,
    allPermission,
  }
}
