import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Attendance } from '@/lib/models/Attendance'

// GET attendance for a student or all attendance for a date
export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId')
  const date = searchParams.get('date') // YYYY-MM-DD

  if (date) {
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = new Date(date)
    end.setHours(23, 59, 59, 999)
    const records = await Attendance.find({ date: { $gte: start, $lte: end } })
    return NextResponse.json(records)
  }
  
  if (studentId) {
    const records = await Attendance.find({ studentId }).sort({ date: -1 }).limit(60)
    return NextResponse.json(records)
  }

  return NextResponse.json({ error: 'Provide studentId or date' }, { status: 400 })
}

// POST: mark/update attendance for multiple students on a date
export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  // body: { date: 'YYYY-MM-DD', records: [{ studentId, present, note }] }
  const { date, records } = body

  const start = new Date(date)
  start.setHours(0, 0, 0, 0)

  const ops = records.map(({ studentId, present, note }: { studentId: string; present: boolean; note?: string }) => ({
    updateOne: {
      filter: { studentId, date: { $gte: start, $lte: new Date(start.getTime() + 86400000 - 1) } },
      update: { $set: { studentId, date: start, present, note: note || '' } },
      upsert: true,
    }
  }))

  await Attendance.bulkWrite(ops)
  return NextResponse.json({ success: true })
}
