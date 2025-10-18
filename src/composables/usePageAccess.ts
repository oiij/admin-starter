export function usePageAccess(path: string) {
  const _ADD_ACCESS = `${path}__ADD`
  const _DELETE_ACCESS = `${path}__DELETE`
  const _UPDATE_ACCESS = `${path}__UPDATE`
  const _EXPORT_ACCESS = `${path}__EXPORT`
  const _APPROVAL_ACCESS = `${path}__APPROVAL`
  const _SUPER_ACCESS = `${path}__SUPER`
  return {
    _ADD_ACCESS: {
      label: '新增',
      value: _ADD_ACCESS,
    },
    _DELETE_ACCESS: {
      label: '删除',
      value: _DELETE_ACCESS,
    },
    _UPDATE_ACCESS: {
      label: '修改',
      value: _UPDATE_ACCESS,
    },
    _EXPORT_ACCESS: {
      label: '导出',
      value: _EXPORT_ACCESS,
    },
    _APPROVAL_ACCESS: {
      label: '审批',
      value: _APPROVAL_ACCESS,
    },
    _SUPER_ACCESS: {
      label: '超管',
      value: _SUPER_ACCESS,
    },
  }
}
