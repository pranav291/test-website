import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Achievement } from '@/lib/models/Achievement'

export async function GET() {
  await connectDB()
  const achievements = await Achievement.find().sort({ date: -1 })
  return NextResponse.json(achievements)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const achievement = await Achievement.create(body)
  return NextResponse.json(achievement, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  await connectDB()
  const { id, ...update } = await req.json()
  const achievement = await Achievement.findByIdAndUpdate(id, update, { new: true })
  if (!achievement) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(achievement)
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await Achievement.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
