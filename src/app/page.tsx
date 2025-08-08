import { BookOpen } from "lucide-react";
import { HeroHeader } from '@/components/home/HeroHeader';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedCoursesSection } from '@/components/home/FeaturedCoursesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CtaSection } from '@/components/home/CtaSection';
import { Footer } from '@/components/home/Footer';
import { featuredCourses, stats, categories } from '@/data/home';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <HeroHeader />
      <HeroSection />
      <StatsSection stats={stats} />
      <CategoriesSection categories={categories} />
      <FeaturedCoursesSection courses={featuredCourses} />
      {/* Features section kept inline for now */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">چرا آکادمی دانش؟</h2>
            <p className="text-xl text-gray-600">ویژگی‌های منحصر به فرد ما</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <BookOpen className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">دوره‌های با کیفیت</h3>
              <p className="text-gray-600">دوره‌های آموزشی با بالاترین استانداردهای کیفیت و به‌روزرسانی مداوم</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">اساتید متخصص</h3>
              <p className="text-gray-600">بهترین اساتید و متخصصان حوزه‌های مختلف در کنار شما</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">گواهی معتبر</h3>
              <p className="text-gray-600">دریافت گواهی معتبر پس از اتمام موفقیت‌آمیز دوره‌ها</p>
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}