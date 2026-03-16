import mongoose, { Schema, Document, models } from 'mongoose'

export interface IVisitorStat extends Document {
  _id: string
  date: string // YYYY-MM-DD
  count: number
}

const VisitorStatSchema = new Schema<IVisitorStat>({
  date: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
})

export const VisitorStat = models.VisitorStat || mongoose.model<IVisitorStat>('VisitorStat', VisitorStatSchema)
