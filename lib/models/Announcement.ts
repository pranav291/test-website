import mongoose, { Schema, Document, models } from 'mongoose'

export interface IAnnouncement extends Document {
  _id: string
  text: string
  type: 'info' | 'warning' | 'success'
  active: boolean
  expiresAt: Date | null
  createdAt: Date
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  text: { type: String, required: true },
  type: { type: String, enum: ['info', 'warning', 'success'], default: 'info' },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date, default: null },
}, { timestamps: true })

export const Announcement = models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema)
