import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'ایمیل و رمز عبور الزامی است' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'فرمت ایمیل صحیح نیست' },
        { status: 400 }
      )
    }

    // Authenticate user
    const result = await authenticateUser(email, password)
    
    if (!result) {
      return NextResponse.json(
        { error: 'ایمیل یا رمز عبور اشتباه است' },
        { status: 401 }
      )
    }

    const { user, token } = result

    // Return success response
    return NextResponse.json({
      message: 'ورود با موفقیت انجام شد',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      },
      token
    }, { status: 200 })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'خطا در ورود. لطفاً دوباره تلاش کنید' },
      { status: 500 }
    )
  }
}