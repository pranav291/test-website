import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Message } from '@/lib/models/Message'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const messages = await Message.find().sort({ createdAt: -1 })
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, read } = await request.json()
    await connectDB()
    const message = await Message.findByIdAndUpdate(id, { read }, { new: true })
    return NextResponse.json(message)
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    await connectDB()
    await Message.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
