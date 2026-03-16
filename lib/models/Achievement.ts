import mongoose, { Schema, Document, models } from 'mongoose'

export interface IAchievement extends Document {
  _id: string
  studentName: string
  achievement: string
  level: 'district' | 'state' | 'national' | 'international' | 'belt'
  medal: 'gold' | 'silver' | 'bronze' | 'none'
  date: Date
  visible: boolean
  createdAt: Date
}

const AchievementSchema = new Schema<IAchievement>({
  studentName: { type: String, required: true },
  achievement: { type: String, required: true },
  level: { type: String, enum: ['district', 'state', 'national', 'international', 'belt'], default: 'district' },
  medal: { type: String, enum: ['gold', 'silver', 'bronze', 'none'], default: 'gold' },
  date: { type: Date, default: Date.now },
  visible: { type: Boolean, default: true },
}, { timestamps: true })

export const Achievement = models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema)
