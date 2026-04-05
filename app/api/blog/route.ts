import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/lib/models/BlogPost'
import { verifyToken } from '@/lib/auth'

// GET /api/blog — public: list published posts
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') // admin uses ?all=1 to get unpublished too
    const token = req.cookies.get('admin_token')?.value
    let isAdmin = false
    if (token) {
      try { verifyToken(token); isAdmin = true } catch {}
    }

    const filter = (all && isAdmin) ? {} : { published: true }
    const posts = await BlogPost.find(filter)
      .select('title slug excerpt tags published createdAt updatedAt coverImage')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(posts)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

// POST /api/blog — admin only: create post
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try { verifyToken(token) } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()
    const post = await BlogPost.create(body)
    return NextResponse.json(post, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create post' }, { status: 500 })
  }
}
