import type { Types } from 'mongoose'
import type { WorkflowInstanceCreateZodType } from '../zod'
import type { WorkflowDocumentAggregate } from './workflow.model'
import dayjs from 'dayjs'
import { model, Schema } from 'mongoose'
import { nanoid } from 'nanoid'

export type WorkflowInstanceDocument = WorkflowInstanceCreateZodType & {
  _applicantId: Types.ObjectId
  currentStep: number
  sn: string
  status: 'DRAFT' | 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  deleted: boolean
}
export type WorkflowInstanceDocumentAggregate = Required<WorkflowInstanceDocument> & {
  _id: string
  creatorName: string
  workflow: WorkflowDocumentAggregate
  createdAt: string
  updatedAt: string
}
export const WorkflowInstanceSchema = new Schema<WorkflowInstanceDocument>(
  {
    _applicantId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    _workflowId: { type: Schema.Types.ObjectId, ref: 'Workflow', required: true },
    currentStep: { type: Number, default: 0 },
    sn: { type: String, default: () => `${dayjs().format('YYYYMMDD')}-${nanoid(6)}` },
    formData: { type: [Object] },
    status: { type: String, default: 'PROCESSING' },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

export const WorkflowInstanceModel = model<WorkflowInstanceDocument>('WorkflowInstance', WorkflowInstanceSchema)
