export const WorkflowInstanceStatusEnum = {
  DRAFT: {
    type: 'default',
    label: '草稿',
  },
  PROCESSING: {
    type: 'info',
    label: '处理中',
  },
  APPROVED: {
    type: 'success',
    label: '已通过',
  },
  REJECTED: {
    type: 'error',
    label: '已拒绝',
  },
  CANCELLED: {
    type: 'warning',
    label: '已取消',
  },
} as const

export const WorkflowTaskStatusEnum = {
  PENDING: {
    type: 'default',
    label: '待处理',
  },
  APPROVED: {
    type: 'success',
    label: '已通过',
  },
  REJECTED: {
    type: 'error',
    label: '已拒绝',
  },
  RETURNED: {
    type: 'warning',
    label: '已返回',
  },
  CANCELLED: {
    type: 'default',
    label: '已取消',
  },
  FINISHED: {
    type: 'success',
    label: '已完成',
  },
} as const

export const WorkflowNodeTypeEnum = {
  START: {
    type: 'info',
    label: '开始',
  },
  APPROVAL: {
    type: 'warning',
    label: '审批',
  },
  CC: {
    type: 'success',
    label: '抄送',
  },
  END: {
    type: 'default',
    label: '结束',
  },
} as const
