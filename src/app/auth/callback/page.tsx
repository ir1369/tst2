"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState("Processing...")

  useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      setStatus("Authentication failed. Please try again.")
      setTimeout(() => {
        router.push("/login")
      }, 3000)
      return
    }

    if (code) {
      // In a real app, you would send this code to your backend
      // to exchange it for access tokens
      console.log("Authorization code received:", code)
      
      // Simulate processing
      setStatus("Authentication successful! Redirecting...")
      
      setTimeout(() => {
        // Redirect to dashboard or home page
        router.push("/")
      }, 2000)
    } else {
      setStatus("No authorization code received. Redirecting...")
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Authentication</h1>
          <p className="text-gray-600">{status}</p>
        </div>

        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
} 