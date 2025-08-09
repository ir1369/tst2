'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useStripe } from '@stripe/react-stripe-js';
import type { Course } from '@/app/api/courses/route';
import { BookOpen, CheckCircle, AlertCircle, Star } from 'lucide-react';

interface Review {
    id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    users: {
        first_name: string;
        last_name: string;
    }
}

function StarRating({ rating }: { rating: number }) {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token, user, loading: authLoading } = useAuth();
  const stripe = useStripe();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<'idle' | 'enrolling' | 'enrolled' | 'error'>('idle');
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCourseAndReviews = async () => {
      try {
        // Fetch course data
        const courseRes = await fetch(`/api/courses/${id}`);
        if (!courseRes.ok) throw new Error('Course not found.');
        const courseData = await courseRes.json();
        setCourse(courseData);

        // Fetch reviews
        const reviewsRes = await fetch(`/api/courses/${id}/reviews`);
        if (reviewsRes.ok) {
            const reviewsData = await reviewsRes.json();
            setReviews(reviewsData);
        }

      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseAndReviews();
    }
  }, [id]);

  const handleEnroll = async () => {
    if (!user || !token) {
      router.push('/login');
      return;
    }

    setEnrollmentStatus('enrolling');
    setEnrollmentError(null);

    try {
      // If the course is free, enroll directly
      if (!course?.price || course.price <= 0) {
        const response = await fetch('/api/enrollments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ course_id: id }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to enroll in the course.');
        setEnrollmentStatus('enrolled');
      } else {
        // If the course is paid, create a checkout session
        if (!stripe) {
            throw new Error('Stripe.js has not loaded yet.');
        }
        const response = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ course_id: id }),
        });
        const { session } = await response.json();
        if (!session) throw new Error('Could not create a checkout session.');

        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) {
            throw new Error(error.message);
        }
      }
    } catch (err: unknown) {
      setEnrollmentStatus('error');
      if (err instanceof Error) setEnrollmentError(err.message);
      else setEnrollmentError('An unknown error occurred');
    }
  };

  if (loading || authLoading) {
    return <div className="text-center p-8">Loading course...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!course) {
    return <div className="text-center p-8">Course could not be loaded.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={course.thumbnail_url || '/placeholder.jpg'}
            alt={course.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>

            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-6">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {course.price && course.price > 0 ? `$${course.price}` : 'Free'}
                </p>
              </div>
              <div>
                {enrollmentStatus === 'enrolled' ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-8 h-8" />
                    <span className="font-semibold">Successfully Enrolled!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrollmentStatus === 'enrolling'}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:bg-emerald-400"
                  >
                    {enrollmentStatus === 'enrolling' ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
            {enrollmentStatus === 'error' && (
              <div className="mb-4 flex items-center space-x-2 text-red-600 bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{enrollmentError}</span>
              </div>
            )}

            {/* Tabs for Overview and Reviews */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    <button onClick={() => setActiveTab('overview')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Overview</button>
                    <button onClick={() => setActiveTab('reviews')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Reviews ({reviews.length})</button>
                </nav>
            </div>

            <div className="py-6">
                {activeTab === 'overview' && (
                    <p className="text-gray-600">{course.description}</p>
                )}
                {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        {reviews.length > 0 ? reviews.map(review => (
                            <div key={review.id} className="border-b pb-4">
                                <div className="flex items-center mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 mr-3">
                                        {review.users.first_name.charAt(0)}{review.users.last_name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{review.users.first_name} {review.users.last_name}</p>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        )) : <p>No reviews yet.</p>}
                        {/* Add Review Form would go here for enrolled students */}
                    </div>
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}