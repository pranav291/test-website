import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Announcement } from '@/lib/models/Announcement'

export async function GET() {
  await connectDB()
  const announcements = await Announcement.find().sort({ createdAt: -1 })
  return NextResponse.json(announcements)
}

// Public route — only active, non-expired
export async function HEAD() {
  await connectDB()
  const now = new Date()
  const active = await Announcement.findOne({
    active: true,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }]
  }).sort({ createdAt: -1 })
  return NextResponse.json(active)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const ann = await Announcement.create(body)
  return NextResponse.json(ann, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  await connectDB()
  const { id, ...update } = await req.json()
  const ann = await Announcement.findByIdAndUpdate(id, update, { new: true })
  if (!ann) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(ann)
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await Announcement.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
