import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IBlogPost extends Document {
  title: string
  slug: string
  content: string       // Markdown content
  excerpt: string
  tags: string[]
  published: boolean
  coverImage?: string
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: '' },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    coverImage: { type: String, default: '' },
  },
  { timestamps: true }
)

// Auto-generate slug from title if not provided
BlogPostSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  next()
})

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)

export default BlogPost
