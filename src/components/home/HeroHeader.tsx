import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function HeroHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">آکادمی دانش</span>
          </div>
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <a href="#courses" className="text-gray-700 hover:text-emerald-600 transition-colors">دوره‌ها</a>
            <Link href="/teachers" className="text-gray-700 hover:text-emerald-600 transition-colors">اساتید</Link>
            <Link href="/teacher-dashboard" className="text-gray-700 hover:text-emerald-600 transition-colors">پنل مدرس</Link>
            <Link href="/student-dashboard" className="text-gray-700 hover:text-emerald-600 transition-colors">پنل دانشجو</Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">درباره ما</Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">تماس</Link>
          </nav>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/login" className="text-gray-700 hover:text-emerald-600 transition-colors">ورود</Link>
            <Link href="/signup" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">ثبت نام</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

