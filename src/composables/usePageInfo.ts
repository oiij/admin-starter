export function usePageInfo() {
  const route = useRoute()
  const _ROUTE_PATH = route.path
  const _ROUTE_TITLE = route.meta.title ?? ''
  const { _ADD_ACCESS, _DELETE_ACCESS, _UPDATE_ACCESS, _EXPORT_ACCESS, _APPROVAL_ACCESS, _SUPER_ACCESS } = usePageAccess(_ROUTE_PATH)
  return {
    _ROUTE_PATH,
    _ROUTE_TITLE,
    _ADD_ACCESS: _ADD_ACCESS.value,
    _DELETE_ACCESS: _DELETE_ACCESS.value,
    _UPDATE_ACCESS: _UPDATE_ACCESS.value,
    _EXPORT_ACCESS: _EXPORT_ACCESS.value,
    _APPROVAL_ACCESS: _APPROVAL_ACCESS.value,
    _SUPER_ACCESS: _SUPER_ACCESS.value,
  }
}
