import Link from 'next/link';
import type { Course } from '@/app/api/courses/route'; // Re-using the type from the API route

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/course/${course.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="relative h-48">
          <img
            src={course.thumbnail_url || '/placeholder.jpg'}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-emerald-600">{course.title}</h3>
          <p className="text-gray-600 mb-4 h-12 overflow-hidden">{course.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-emerald-600">
              {course.price && course.price > 0 ? `$${course.price}` : 'Free'}
            </p>
            <div className="text-emerald-600 font-medium">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
