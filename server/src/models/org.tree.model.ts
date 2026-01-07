import type { Types } from 'mongoose'
import type { OrgTreeCreateZodType } from '../zod/org.tree.zod.js'
import { model, Schema } from 'mongoose'

export type OrgTreeDocument = OrgTreeCreateZodType & {
  _creatorId: Types.ObjectId
  deleted: boolean
}
export type OrgTreeDocumentAggregate = Required<OrgTreeDocument> & {
  _id: string
  parentName: string
  leaderName: string
  children: OrgTreeDocumentAggregate[]
  createdAt: string
  updatedAt: string
}
export const OrgTreeModel = model<OrgTreeDocument>('OrgTree', new Schema(
  {
    name: { type: String, required: true, unique: true },
    _userIds: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    _creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    _parentId: { type: Schema.Types.ObjectId, ref: 'OrgTree', default: null },
    _leaderId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    deleted: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
))
