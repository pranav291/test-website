import mongoose, { Schema, Document, models } from 'mongoose'

export interface IStudent extends Document {
  _id: string
  name: string
  phone: string
  parentName: string
  address: string
  batch: 'kids' | 'beginner' | 'advanced' | 'competition'
  belt: 'white' | 'yellow' | 'green' | 'blue' | 'red' | 'black'
  joinDate: Date
  feePaidUntil: Date
  monthlyFee: number
  admissionFeePaid: boolean
  uniformFeePaid: boolean
  notes: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  parentName: { type: String, default: '' },
  address: { type: String, default: '' },
  batch: { type: String, enum: ['kids', 'beginner', 'advanced', 'competition'], default: 'beginner' },
  belt: { type: String, enum: ['white', 'yellow', 'green', 'blue', 'red', 'black'], default: 'white' },
  joinDate: { type: Date, default: Date.now },
  feePaidUntil: { type: Date, default: Date.now },
  monthlyFee: { type: Number, default: 500 },
  admissionFeePaid: { type: Boolean, default: false },
  uniformFeePaid: { type: Boolean, default: false },
  notes: { type: String, default: '' },
  active: { type: Boolean, default: true },
}, { timestamps: true })

export const Student = models.Student || mongoose.model<IStudent>('Student', StudentSchema)
