import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/lib/models/BlogPost'
import { verifyToken } from '@/lib/auth'

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) throw new Error('Unauthorized')
  verifyToken(token)
}

// GET /api/blog/[id] — get by id OR slug (public)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = params
    // Try by _id first, then by slug
    const post = mongoose_or_slug(id)
      ? await BlogPost.findById(id).lean()
      : await BlogPost.findOne({ slug: id }).lean()
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

function mongoose_or_slug(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

// PUT /api/blog/[id] — admin: update post
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req)
    await connectDB()
    const body = await req.json()
    const post = await BlogPost.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: err.message || 'Update failed' }, { status: 500 })
  }
}

// DELETE /api/blog/[id] — admin: delete post
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req)
    await connectDB()
    await BlogPost.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
