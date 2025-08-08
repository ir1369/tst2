import type { CourseProgressItem } from '@/types/studentDashboard';

interface CourseProgressProps {
  selectedCourse: string;
  onSelectedCourseChange: (value: string) => void;
  items: ReadonlyArray<CourseProgressItem>;
}

export function CourseProgress({ selectedCourse, onSelectedCourseChange, items }: CourseProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">پیشرفت دوره‌ها</h2>
          <select
            value={selectedCourse}
            onChange={(e) => onSelectedCourseChange(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">همه دوره‌ها</option>
            <option value="react">React.js</option>
            <option value="design">طراحی UI/UX</option>
            <option value="marketing">بازاریابی دیجیتال</option>
          </select>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {items.map((course, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{course.title}</h3>
                <span className="text-sm text-gray-500">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${course.color}`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  {course.completedLessons}/{course.totalLessons} درس
                </span>
                <span>بعدی: {course.nextLesson}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

