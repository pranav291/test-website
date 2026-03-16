import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { VisitorStat } from '@/lib/models/VisitorStat'

// GET last 30 days of stats
export async function GET() {
  await connectDB()
  const stats = await VisitorStat.find().sort({ date: -1 }).limit(30)
  return NextResponse.json(stats)
}

// POST: increment today's count (called from layout or middleware)
export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json().catch(() => ({}))
  const date = body.date || new Date().toISOString().split('T')[0]
  const stat = await VisitorStat.findOneAndUpdate(
    { date },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  )
  return NextResponse.json(stat)
}
