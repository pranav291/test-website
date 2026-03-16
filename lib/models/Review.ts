import mongoose, { Schema, Document, models } from 'mongoose'

export interface IReview extends Document {
  _id: string
  name: string
  role: string
  text: string
  stars: number
  visible: boolean
  createdAt: Date
}

const ReviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
  role: { type: String, default: 'Student' },
  text: { type: String, required: true },
  stars: { type: Number, default: 5, min: 1, max: 5 },
  visible: { type: Boolean, default: true },
}, { timestamps: true })

export const Review = models.Review || mongoose.model<IReview>('Review', ReviewSchema)
