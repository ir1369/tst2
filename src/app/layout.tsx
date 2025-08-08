import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProviderWrapper } from "@/components/providers/auth-provider-wrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "آکادمی دانش - پلتفرم یادگیری آنلاین",
  description: "بهترین پلتفرم یادگیری آنلاین با دوره‌های با کیفیت و اساتید متخصص. مهارت‌های جدید را یاد بگیرید و آینده خود را بسازید.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProviderWrapper>
          {children}
        </AuthProviderWrapper>
      </body>
    </html>
  )
} 