import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const ADMIN_USERNAME = 'darbhanga8051'
const ADMIN_PASSWORD = 'darbhanga8051@'
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dta-admin-secret-key-2026-xyz'
)

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function createToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function getAdminToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAdminToken()
  if (!token) return false
  return verifyToken(token)
}
