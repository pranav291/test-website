import { MetadataRoute } from 'next'

const BASE_URL = 'https://darbhangataekwondo.fit'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const static_routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Dynamic blog posts
  let blog_routes: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${BASE_URL}/api/blog`, { cache: 'no-store' })
    if (res.ok) {
      const posts = await res.json()
      blog_routes = posts.map((post: { slug: string; updatedAt?: string; createdAt?: string }) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.createdAt || new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch {
    // Blog API not available at build time — skip
  }

  return [...static_routes, ...blog_routes]
}
