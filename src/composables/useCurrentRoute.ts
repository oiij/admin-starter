import { router } from '~/modules'

const route = computed(() => router.currentRoute.value)
const currentPath = computed(() => router.currentRoute.value.path)
export function useCurrentRoute() {
  return {
    route,
    currentPath,
  }
}
