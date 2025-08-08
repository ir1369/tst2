"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, BookOpen, Users, Award, Play } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const router = useRouter()
  const { login, user, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    
    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || "خطا در ورود")
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

  const handleGoogleLogin = () => {
    // Redirect to the server-side route that will initiate the Google OAuth flow
    window.location.href = '/api/auth/google';
  }

  // Show loading spinner while checking auth state
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>

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
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">آکادمی دانش</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">خوش برگشتی!</h1>
            <p className="text-gray-600">برای ادامه یادگیری و دسترسی به دوره‌های خود وارد شوید.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

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
              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-800 transition-colors">
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
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
                  <span>در حال ورود...</span>
                </div>
              ) : (
                "ورود"
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

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full h-12 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>ادامه با گوگل</span>
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟{" "}
              <Link href="/signup" className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                ثبت نام
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Educational Content */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-emerald-600 to-blue-600 text-white p-12 flex-col justify-center">
        <div className="max-w-lg">
          {/* Main Heading */}
          <h2 className="text-4xl font-bold mb-8">به جامعه یادگیری ما بپیوندید</h2>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-emerald-200 text-sm">دانشجو</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-emerald-200 text-sm">دوره</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-emerald-200 text-sm">مدرس</div>
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
                <span className="text-emerald-800 font-bold text-lg">سعید</span>
              </div>
              <div>
                <div className="font-semibold">سعید احمدی</div>
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