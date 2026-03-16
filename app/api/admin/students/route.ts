import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Student } from '@/lib/models/Student'

export async function GET() {
  await connectDB()
  const students = await Student.find().sort({ createdAt: -1 })
  return NextResponse.json(students)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const student = await Student.create(body)
  return NextResponse.json(student, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const { id, ...update } = body
  const student = await Student.findByIdAndUpdate(id, update, { new: true })
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(student)
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await Student.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
