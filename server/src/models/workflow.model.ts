import type { Types } from 'mongoose'
import type { WorkflowCreateZodType } from '../zod/workflow.zod'
import { model, Schema } from 'mongoose'

const ConfigSchema = new Schema({
  id: { type: String },
  type: { type: String },
  typeName: { type: String },
  fieldLabel: { type: String },
  fieldKey: { type: String },
  fieldValue: { type: String },
  required: { type: Boolean },
  placeholder: { type: String },
  options: { type: [
    {
      label: { type: String },
      value: { type: String },
    },
  ] },
  value: { type: String },
  label: { type: String },
})
const NodeSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  strategy: { type: String },
  config: { type: [ConfigSchema] },
})

export type WorkflowDocument = WorkflowCreateZodType & {
  _creatorId: Types.ObjectId
  deleted: boolean
}
export type WorkflowDocumentAggregate = Required<WorkflowDocument> & {
  _id: string
  creatorName: string
  createdAt: string
  updatedAt: string
}

export const WorkflowModel = model<WorkflowDocument>('Workflow', new Schema (
  {
    _creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    nodes: { type: [NodeSchema] },
    deleted: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
))
