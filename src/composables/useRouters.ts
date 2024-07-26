import { router } from '~/modules'

const currentRoute = computed(() => router.currentRoute.value)
const routes = computed(() => router.getRoutes())
const currentPath = computed(() => router.currentRoute.value.path)
const keepAlive = computed(() => router.getRoutes().filter(f => !f.meta.isLayout).filter(f => f.meta.keepAlive).map((m) => {
  return m.path
}))
export function useRouters() {
  return {
    currentRoute,
    routes,
    currentPath,
    keepAlive,
  }
}
