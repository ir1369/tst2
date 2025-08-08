'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  emailVerified: boolean
  createdAt: string
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
  confirmPassword: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token')
    if (savedToken) {
      setToken(savedToken)
      fetchUser(savedToken)
    } else {
      setLoading(false)
    }
  }, [])

  // Fetch user data with token
  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('auth_token')
        setToken(null)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      localStorage.removeItem('auth_token')
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('auth_token', data.token)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'خطا در ارتباط با سرور' }
    }
  }

  // Signup function
  const signup = async (userData: SignupData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('auth_token', data.token)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: 'خطا در ارتباط با سرور' }
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
  }

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}