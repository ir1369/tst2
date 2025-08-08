"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, BookOpen, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Password reset requested for:", email)
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <div className="mb-8">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            بازگشت به صفحه ورود
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">آکادمی دانش</span>
          </div>

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">بازیابی رمز عبور</h1>
                <p className="text-gray-600">
                  ایمیل خود را وارد کنید تا لینک بازنشانی رمز عبور برای شما ارسال شود.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
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
                      <span>در حال ارسال...</span>
                    </div>
                  ) : (
                    "ارسال لینک بازنشانی"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">ایمیل ارسال شد!</h1>
                <p className="text-gray-600">
                  لینک بازنشانی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق ورودی خود را بررسی کنید.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  ارسال مجدد
                </Button>
                
                <div className="text-center">
                  <Link 
                    href="/login" 
                    className="text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                  >
                    بازگشت به صفحه ورود
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">نیاز به کمک دارید؟</p>
              <a href="#" className="text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                تماس با پشتیبانی
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            حساب کاربری ندارید؟{" "}
            <Link href="/signup" className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
              ثبت نام کنید
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 