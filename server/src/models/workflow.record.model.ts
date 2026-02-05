import type { WithTimestamps } from 'mongoose'
import { model, Schema } from 'mongoose'

export type WorkflowRecordDocument = WithTimestamps<unknown> & {
  _instanceId: string
  _taskId: string
  approverId: string
  nodeId: number
  nodeName: string
  action: 'APPROVE' | 'REJECT' | 'RETURN' | 'CANCEL'
  comment: string
  formDataSnapshot: []
}

export const WorkflowRecordModel = model<WorkflowRecordDocument>('WorkflowRecord', new Schema (
  {

  },
  {
    timestamps: true,
  },
))
