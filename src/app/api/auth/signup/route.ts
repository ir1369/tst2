import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, password, confirmPassword } = body

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'تمام فیلدهای اجباری را پر کنید' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'رمز عبور و تأیید رمز عبور مطابقت ندارند' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'رمز عبور باید حداقل 6 کاراکتر باشد' },
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

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'کاربری با این ایمیل قبلاً ثبت نام کرده است' },
        { status: 409 }
      )
    }

    // Create user
    const user = await createUser({
      email,
      password,
      firstName,
      lastName,
      phone
    })

    // Generate token
    const token = generateToken(user.id, user.email)

    // Return success response
    return NextResponse.json({
      message: 'ثبت نام با موفقیت انجام شد',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      },
      token
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'خطا در ثبت نام. لطفاً دوباره تلاش کنید' },
      { status: 500 }
    )
  }
}