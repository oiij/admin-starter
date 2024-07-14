export function useAuthGuard() {
  const { routePermission } = storeToRefs(useAuthStore())

  const passed = ref(false)

  return {
    passed,
    routePermission,
  }
}
