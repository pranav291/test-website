import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Message } from '@/lib/models/Message'

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json()

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    await connectDB()

    const newMessage = await Message.create({
      name,
      phone,
      message,
    })

    return NextResponse.json({ success: true, data: newMessage })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 })
  }
}
