import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { GalleryImage } from '@/lib/models/GalleryImage'

export async function GET() {
  try {
    await connectDB()
    const images = await GalleryImage.find().sort({ createdAt: -1 })
    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { url, alt } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    await connectDB()
    const image = await GalleryImage.create({ url, alt: alt || 'Gallery Image' })
    return NextResponse.json(image)
  } catch (error) {
    console.error('Error adding gallery image:', error)
    return NextResponse.json({ error: 'Failed to add gallery image' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    await connectDB()
    await GalleryImage.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 })
  }
}
