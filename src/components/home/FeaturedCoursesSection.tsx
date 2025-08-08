import type { FeaturedCourse } from '@/types/home';
import Link from 'next/link';
import { Clock, Users, Star, Play } from 'lucide-react';

interface FeaturedCoursesSectionProps {
  courses: ReadonlyArray<FeaturedCourse>;
}

export function FeaturedCoursesSection({ courses }: FeaturedCoursesSectionProps) {
  return (
    <section id="courses" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">دوره‌های محبوب</h2>
          <p className="text-xl text-gray-600">برترین دوره‌های آموزشی با بالاترین امتیاز</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.price} تومان
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.instructor}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{course.students} دانشجو</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                <Link
                  href={`/course/${course.id}`}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <Play className="w-4 h-4" />
                  <span>مشاهده دوره</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/signup"
            className="inline-block bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-200"
          >
            مشاهده همه دوره‌ها
          </Link>
        </div>
      </div>
    </section>
  );
}

