import { model, Schema } from 'mongoose'

export type TestDocument = {
  _id: string
  deleted: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
export type TestFindDocument = TestDocument & {

}
export const TestModel = model<TestDocument>('Test', new Schema(
  {
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
  },
).index({ _id: 1 }, { unique: true }))
