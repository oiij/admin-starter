import type { Types, WithTimestamps } from 'mongoose'
import { model, Schema } from 'mongoose'

export type RecordDocument = WithTimestamps<unknown> & {
  _targetId: Types.ObjectId
  docs: object
}
export const RecordSchema = new Schema(
  {
    _targetId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    docs: { type: Object },
  },
  {
    timestamps: true,
  },
)
export const RecordModel = model<RecordDocument>('Record', RecordSchema)
