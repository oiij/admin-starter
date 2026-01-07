import type { UserCreateZodType } from '../zod/user.zod.ts'
import { model, Schema } from 'mongoose'

export type UserDocument = UserCreateZodType & {
  deleted: boolean
}
export type UserDocumentAggregate = Required<UserDocument> & {
  _id: string
  roleName: string
  createdAt: string
  updatedAt: string
}
export const UserModel = model<UserDocument>('User', new Schema(
  {
    _roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    phone: { type: String, required: true, unique: true },
    nickname: { type: String },
    avatar: { type: String },
    password: { type: String },
    deleted: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
))
