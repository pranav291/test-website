import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dta-admin-secret-key-2026-xyz'
)

export async function middleware(request: NextRequest) {
  // Only protect /admin (except /admin/login) and /api/admin
  if (
    (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') ||
    (request.nextUrl.pathname.startsWith('/api/admin') && request.nextUrl.pathname !== '/api/admin/login')
  ) {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Also protect POST/DELETE on /api/gallery
  if (request.nextUrl.pathname === '/api/gallery' && request.method !== 'GET') {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/gallery'],
}
