"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, User, Phone, BookOpen, Users, Award, Play } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function SignUpPage() {
  const router = useRouter()
  const { signup, user, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/")
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    const result = await signup(formData)
    
    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || "خطا در ثبت نام")
    }
    
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("") // Clear error when user starts typing
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleGoogleSignUp = async () => {
    try {
      // Initialize Google OAuth
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}&response_type=code&scope=openid%20email%20profile`
      window.location.href = googleAuthUrl
    } catch (error) {
      console.error('Google sign up error:', error)
      alert('Google sign up is not configured. Please contact support.')
    }
  }

  // Show loading spinner while checking auth state
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>

  const benefits = [
    {
      icon: BookOpen,
      title: "دوره‌های با کیفیت",
      description: "دسترسی به صدها دوره آموزشی با بالاترین استانداردهای کیفیت"
    },
    {
      icon: Users,
      title: "اساتید متخصص",
      description: "یادگیری از بهترین اساتید و متخصصان حوزه‌های مختلف"
    },
    {
      icon: Award,
      title: "گواهی معتبر",
      description: "دریافت گواهی معتبر پس از اتمام موفقیت‌آمیز دوره‌ها"
    }
  ]

  const popularCourses = [
    {
      id: 1,
      title: "برنامه‌نویسی React.js",
      instructor: "دکتر احمد محمدی",
      students: "2,450",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "یادگیری ماشین",
      instructor: "دکتر فاطمه کریمی",
      students: "1,890",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "طراحی UI/UX",
      instructor: "استاد مریم احمدی",
      students: "3,120",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop"
    }
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Sign Up Form */}
      <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">آکادمی دانش</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">شروع سفر یادگیری</h1>
            <p className="text-gray-600">ثبت نام کنید و به جامعه یادگیری ما بپیوندید.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  نام
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="نام"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  نام خانوادگی
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="نام خانوادگی"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                ایمیل
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                شماره تلفن
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="شماره تلفن خود را وارد کنید"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                رمز عبور
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور خود را وارد کنید"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                تأیید رمز عبور
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="رمز عبور را دوباره وارد کنید"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>در حال ثبت نام...</span>
                </div>
              ) : (
                "ثبت نام"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">یا</span>
            </div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleGoogleSignUp}
              className="w-full h-12 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>ثبت نام با گوگل</span>
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>ثبت نام با اپل</span>
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              قبلاً حساب کاربری دارید؟{" "}
              <Link href="/login" className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                ورود
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Educational Content */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-emerald-600 to-blue-600 text-white p-12 flex-col justify-center">
        <div className="max-w-lg">
          {/* Main Heading */}
          <h2 className="text-4xl font-bold mb-8">به آینده یادگیری بپیوندید</h2>
          
          {/* Benefits */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-emerald-200 mb-6">مزایای عضویت</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-400 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{benefit.title}</h4>
                    <p className="text-emerald-200 text-xs">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="mb-12">
            <div className="text-6xl text-emerald-300 mb-4">"</div>
            <blockquote className="text-xl leading-relaxed mb-6">
              آکادمی دانش مسیر یادگیری من را کاملاً متحول کرد. دوره‌های با کیفیت و اساتید متخصص باعث شدند که بتوانم مهارت‌های جدید را به سرعت یاد بگیرم.
            </blockquote>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                <span className="text-emerald-800 font-bold text-lg">سارا</span>
              </div>
              <div>
                <div className="font-semibold">سارا احمدی</div>
                <div className="text-emerald-200">توسعه‌دهنده نرم‌افزار</div>
              </div>
            </div>
          </div>

          {/* Popular Courses */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-200 mb-6">دوره‌های محبوب</h3>
            <div className="space-y-4">
              {popularCourses.map((course) => (
                <Link key={course.id} href={`/course/${course.id}`} className="flex items-center space-x-4 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{course.title}</h4>
                    <p className="text-emerald-200 text-xs">{course.instructor}</p>
                    <p className="text-emerald-200 text-xs">{course.students} دانشجو</p>
                  </div>
                  <Play className="w-4 h-4 text-emerald-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 