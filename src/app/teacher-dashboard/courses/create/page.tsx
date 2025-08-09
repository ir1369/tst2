import { CourseForm } from '@/components/teacher-dashboard/CourseForm';

export default function CreateCoursePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h1>
      <CourseForm isEditMode={false} />
    </div>
  );
}
