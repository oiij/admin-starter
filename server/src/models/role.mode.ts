import type { RoleCreateZodType } from '../zod'
import { model, Schema } from 'mongoose'

export type RoleDocument = RoleCreateZodType & {
  deleted: boolean
}
export type RoleDocumentAggregate = Required<RoleDocument> & {
  _id: string
  createdAt: string
  updatedAt: string
}

export const RoleModel = model<RoleDocument>('Role', new Schema (
  {
    name: { type: String, required: true, unique: true },
    access: { type: [{ label: String, value: String }], required: true },
    deleted: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
))
