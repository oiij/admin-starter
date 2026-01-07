import type { Types, WithTimestamps } from 'mongoose'
import { model, Schema } from 'mongoose'

export type LoginRecordDocument = WithTimestamps<unknown> & {
  _targetId: Types.ObjectId
  ip: string
  userAgent: string
}
export const LoginRecordSchema = new Schema(
  {
    _targetId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)
export const LoginRecordModel = model<LoginRecordDocument>('LoginRecord', LoginRecordSchema)
