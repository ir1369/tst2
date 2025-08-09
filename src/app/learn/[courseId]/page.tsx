'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Lock, PlayCircle, FileText } from 'lucide-react';

// Manually define the Lesson type for now
interface Lesson {
  id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  position: number;
}

export default function LearnPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token, loading: authLoading } = useAuth();

  const courseId = params.courseId as string;
  const lessonId = searchParams.get('lesson');

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchLessons = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/lessons`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to load course content.');
        }
        setLessons(data);
        // If no lesson is selected, redirect to the first one
        if (!lessonId && data.length > 0) {
          router.replace(`/learn/${courseId}?lesson=${data[0].id}`);
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchLessons();
    }
  }, [courseId, token, authLoading, lessonId, router]);

  const activeLesson = useMemo(() => {
    if (!lessonId) return lessons[0];
    return lessons.find(l => l.id === lessonId);
  }, [lessons, lessonId]);

  if (loading || authLoading) {
    return <div className="flex h-screen items-center justify-center">Loading course...</div>;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        <div className="text-center">
            <Lock size={48} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p>{error}</p>
            <button onClick={() => router.push('/courses')} className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg">
                Back to Courses
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Course Content</h2>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {lessons.map((lesson, index) => (
              <li key={lesson.id}>
                <button
                  onClick={() => router.push(`/learn/${courseId}?lesson=${lesson.id}`)}
                  className={`w-full text-left p-4 flex items-center space-x-3 text-sm transition-colors ${
                    lesson.id === activeLesson?.id
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-gray-400">{index + 1}</span>
                  <span>{lesson.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeLesson ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">{activeLesson.title}</h1>

            {activeLesson.video_url && (
              <div className="mb-6 bg-black rounded-lg aspect-video flex items-center justify-center">
                 <div className="text-white text-center">
                    <PlayCircle size={64} />
                    <p className="mt-2">Video player placeholder</p>
                    <p className="text-sm text-gray-400 mt-1">URL: {activeLesson.video_url}</p>
                 </div>
              </div>
            )}

            <div className="prose max-w-none">
                <p>{activeLesson.content || "This lesson has no written content."}</p>
            </div>
          </div>
        ) : (
            <div className="text-center">Select a lesson to begin.</div>
        )}
      </main>
    </div>
  );
}
