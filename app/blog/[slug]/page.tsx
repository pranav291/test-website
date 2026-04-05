import { Metadata } from 'next'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/lib/models/BlogPost'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export const revalidate = 60

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectDB()
  const post = await BlogPost.findOne({ slug: params.slug, published: true }).lean()
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} - DTA Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  await connectDB()
  const post = await BlogPost.findOne({ slug: params.slug, published: true }).lean()
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-[100svh] bg-background pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/blog" className="inline-block mb-10 text-primary font-bold uppercase tracking-widest text-sm hover:-translate-x-2 transition-transform">
          ← Back to Blog
        </Link>
        <article className="tk-card-3d p-8 md:p-12 rounded-xl">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              {post.title}
            </h1>
            <div className="w-24 h-1 bg-primary mb-6" />
            <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <span>{new Date(post.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}</span>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex gap-2">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="text-primary">{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>
          
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-a:text-primary prose-strong:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}
