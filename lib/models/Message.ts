import mongoose, { Schema, models } from 'mongoose'

export interface IMessage {
  _id?: string
  name: string
  phone: string
  message: string
  createdAt?: Date
  read?: boolean
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Message = models.Message || mongoose.model<IMessage>('Message', MessageSchema)
