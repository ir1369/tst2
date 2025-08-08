import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold">آکادمی دانش</span>
            </div>
            <p className="text-gray-400">بهترین پلتفرم یادگیری آنلاین برای همه</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">دوره‌ها</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">برنامه‌نویسی</a></li>
              <li><a href="#" className="hover:text-white transition-colors">طراحی</a></li>
              <li><a href="#" className="hover:text-white transition-colors">بازاریابی</a></li>
              <li><a href="#" className="hover:text-white transition-colors">زبان‌های خارجی</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">آکادمی</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/teachers" className="hover:text-white transition-colors">اساتید</Link></li>
              <li><Link href="/teacher-dashboard" className="hover:text-white transition-colors">پنل مدرس</Link></li>
              <li><Link href="/student-dashboard" className="hover:text-white transition-colors">پنل دانشجو</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">درباره ما</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">وبلاگ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اخبار</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">پشتیبانی</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">راهنما</a></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">تماس با ما</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">سوالات متداول</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; ۱۴۰۳ آکادمی دانش. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}

