import { Metadata } from 'next'
import Link from 'next/link'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/lib/models/BlogPost'

export const metadata: Metadata = {
  title: 'Blog - Darbhanga Taekwondo Academy',
  description: 'Read the latest updates, tips, and news from Darbhanga Taekwondo Academy.',
}

export const revalidate = 60 // revalidate every minute

export default async function BlogIndexPage() {
  await connectDB()
  const posts = await BlogPost.find({ published: true })
    .select('title slug excerpt createdAt')
    .sort({ createdAt: -1 })
    .lean()

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8">
          Academy <span className="tk-text-solid-primary">Blog</span>
        </h1>
        <div className="w-24 h-1 bg-primary mb-12" />

        {posts.length === 0 ? (
          <p className="text-muted-foreground text-lg">No posts published yet. Check back soon!</p>
        ) : (
          <div className="grid gap-8">
            {posts.map((post: any) => (
              <article key={post._id.toString()} className="tk-card-3d p-8 rounded-xl block hover:-translate-y-2 transition-transform">
                <time className="text-sm text-primary font-bold tracking-widest uppercase mb-2 block">
                  {new Date(post.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </time>
                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="text-2xl font-bold text-white mb-4 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="inline-block mt-6 text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
