import mongoose, { Schema, Document, models } from 'mongoose'

export interface IAttendance extends Document {
  _id: string
  studentId: string
  date: Date
  present: boolean
  note: string
  createdAt: Date
}

const AttendanceSchema = new Schema<IAttendance>({
  studentId: { type: String, required: true, index: true },
  date: { type: Date, required: true },
  present: { type: Boolean, default: false },
  note: { type: String, default: '' },
}, { timestamps: true })

// Compound index so we don't duplicate attendance for same student + same date
AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true })

export const Attendance = models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema)
