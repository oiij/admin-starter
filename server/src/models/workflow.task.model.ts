import type { Types } from 'mongoose'
import type { WorkflowNodeType } from '../zod'
import type { UserDocument } from './user.model'
import type { WorkflowInstanceDocument } from './workflow.instance.model'
import type { WorkflowDocument } from './workflow.model'
import { model, Schema } from 'mongoose'

export type WorkflowTaskDocument = & {
  _applicantId: Types.ObjectId
  _workflowInstanceId: Types.ObjectId
  _workflowId: Types.ObjectId
  _targetId: Types.ObjectId
  nodeStep: number
  type: 'START' | 'APPROVAL' | 'CC' | 'END'
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'FINISHED'
  finishedAt?: Date
}
export type WorkflowTaskDocumentAggregate = Required<WorkflowTaskDocument> & {
  _id: string
  applicant: UserDocument
  workflow: WorkflowDocument
  workflowInstance: WorkflowInstanceDocument
  nodes: WorkflowNodeType[]
  node: WorkflowNodeType
  workflowName: string
  applicantName: string
  targetName: string
  createdAt: string
  updatedAt: string
}
export const WorkflowTaskSchema = new Schema<WorkflowTaskDocument>(
  {
    _applicantId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    _workflowInstanceId: { type: Schema.Types.ObjectId, ref: 'WorkflowInstance', required: true },
    _workflowId: { type: Schema.Types.ObjectId, ref: 'Workflow', required: true },
    _targetId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    nodeStep: { type: Number, required: true },
    type: { type: String, default: 'START' },
    status: { type: String, default: 'PENDING' },
    finishedAt: { type: Date },
  },
  {
    timestamps: true,
  },
)

export const WorkflowTaskModel = model<WorkflowTaskDocument>('WorkflowTask', WorkflowTaskSchema)
