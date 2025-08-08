 'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowRight, 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle,
  Calendar,
  Award,
  Download,
  MessageCircle,
  Heart
} from 'lucide-react';
import courseData from '@/data/courses';

export default function CourseDetailPage() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const course = courseData[Number(idParam) as keyof typeof courseData];
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">دوره یافت نشد</h1>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse">
              <BookOpen className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">آکادمی دانش</span>
            </Link>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                ورود
              </Link>
              <Link href="/signup" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                ثبت‌نام
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Users className="w-4 h-4" />
                      <span>{course.students} دانشجو</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{course.rating} ({course.reviews} نظر)</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-full ${
                    isWishlisted ? 'text-red-500' : 'text-gray-400'
                  } hover:text-red-500 transition-colors`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 space-x-reverse">
                  {[
                    { id: 'overview', label: 'نمای کلی' },
                    { id: 'curriculum', label: 'سرفصل‌ها' },
                    { id: 'instructor', label: 'مدرس' },
                    { id: 'reviews', label: 'نظرات' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">درباره این دوره</h3>
                      <p className="text-gray-600 leading-relaxed">{course.longDescription}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">آنچه یاد خواهید گرفت</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start space-x-2 space-x-reverse">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">پیش‌نیازها</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {course.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    {course.curriculum.map((chapter, chapterIndex) => (
                      <div key={chapterIndex} className="border border-gray-200 rounded-lg">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                          <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="p-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3 space-x-reverse">
                                {lesson.type === 'video' ? (
                                  <Play className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Download className="w-4 h-4 text-blue-600" />
                                )}
                                <span className="text-gray-700">{lesson.title}</span>
                              </div>
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <img
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.instructor}</h3>
                      <p className="text-gray-600 mb-4">
                        مدرس با تجربه در زمینه برنامه‌نویسی و توسعه نرم‌افزار با بیش از ۱۰ سال سابقه تدریس
                      </p>
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Users className="w-4 h-4" />
                          <span>۵۰,۰۰۰+ دانشجو</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Play className="w-4 h-4" />
                          <span>۱۵ دوره</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>۴.۹ امتیاز</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">هنوز نظری برای این دوره ثبت نشده است.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Course Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <div className="flex items-center space-x-2 space-x-reverse mb-4">
                  <span className="text-3xl font-bold text-gray-900">{course.price}</span>
                  <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
                  <span className="text-sm text-emerald-600 font-medium">تومان</span>
                </div>

                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors mb-4">
                  ثبت‌نام در دوره
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-500">۳۰ روز ضمانت بازگشت وجه</p>
                </div>
              </div>

              {/* Course Features */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">این دوره شامل:</h3>
                <div className="space-y-3">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 space-x-reverse">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Info */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">اطلاعات دوره</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">سطح:</span>
                    <span className="text-gray-900">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">زبان:</span>
                    <span className="text-gray-900">{course.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">مدت زمان:</span>
                    <span className="text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">آخرین بروزرسانی:</span>
                    <span className="text-gray-900">{course.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">گواهی نامه:</span>
                    <span className="text-gray-900">{course.certificateType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}