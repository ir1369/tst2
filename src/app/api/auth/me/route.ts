import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getUserById } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'توکن احراز هویت یافت نشد' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    const payload = verifyToken(token)

    if (!payload) {
      return NextResponse.json(
        { error: 'توکن نامعتبر است' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await getUserById(payload.userId)
    
    if (!user) {
      return NextResponse.json(
        { error: 'کاربر یافت نشد' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { error: 'خطا در احراز هویت' },
      { status: 500 }
    )
  }
}