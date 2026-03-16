import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Review } from '@/lib/models/Review'

export async function GET() {
  await connectDB()
  const reviews = await Review.find().sort({ createdAt: -1 })
  return NextResponse.json(reviews)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const review = await Review.create(body)
  return NextResponse.json(review, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  await connectDB()
  const { id, ...update } = await req.json()
  const review = await Review.findByIdAndUpdate(id, update, { new: true })
  if (!review) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(review)
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await Review.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
