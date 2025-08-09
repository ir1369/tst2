'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { CourseForm } from '@/components/teacher-dashboard/CourseForm';
import type { Course } from '@/app/api/courses/route';

export default function EditCoursePage() {
  const { id } = useParams();
  const { token, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      setError('You must be logged in to edit this page.');
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch course data. You may not have permission to edit this course.');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, token, authLoading]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Course</h1>
      {loading || authLoading ? (
        <div className="text-center">Loading course data...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : course ? (
        <CourseForm isEditMode={true} initialData={course} />
      ) : (
        <div className="text-center">Course not found.</div>
      )}
    </div>
  );
}
