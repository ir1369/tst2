import { CourseCard } from '@/components/courses/CourseCard';
import type { Course } from '@/app/api/courses/route';

async function getCourses(): Promise<Course[]> {
  try {
    // In a real app, this URL should come from an environment variable
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/courses`, {
        cache: 'no-store' // Don't cache the result, always fetch fresh data
    });

    if (!res.ok) {
      throw new Error('Failed to fetch courses');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Find the perfect course to boost your skills and advance your career.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:p-8 py-8">
        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Courses Found</h3>
            <p className="text-gray-500">
              We are working on adding new courses. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
