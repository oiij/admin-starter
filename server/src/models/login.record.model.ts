import type { Types } from 'mongoose'
import { model, Schema } from 'mongoose'

export type LoginRecordDocument = {
  _targetId: Types.ObjectId
  ip: string
  userAgent: string | null
}
export const LoginRecordModel = model<LoginRecordDocument>('LoginRecord', new Schema(
  {
    _targetId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, default: null },
  },
  {
    timestamps: true,
  },
))
