import mongoose, { Schema, models } from 'mongoose'

export interface IGalleryImage {
  _id?: string
  url: string
  alt: string
  createdAt?: Date
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true, default: 'Gallery Image' },
  },
  { timestamps: true }
)

export const GalleryImage =
  models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema)
