'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Search, Star, Clock, Users, Play, Heart, ArrowLeft, Grid3X3, List, TrendingUp, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { categoriesById, coursesByCategoryId, levelOptions, priceOptions, ratingOptions, sortOptions as sortOptionsData } from '@/data/categoryCourses';
import type { ViewMode, Option, SortValue } from '@/types/categoryCourses';

export default function CategoryCoursesPage() {
  const params = useParams();
  const categoryId = Number(params.id);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = categoriesById;
  const allCourses = coursesByCategoryId;

  const category = categories[categoryId as keyof typeof categories];
  const courses = allCourses[categoryId as keyof typeof allCourses] || [];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">دسته‌بندی یافت نشد</h1>
          <Link href="/categories" className="text-emerald-600 hover:text-emerald-700">
            بازگشت به دسته‌بندی‌ها
          </Link>
        </div>
      </div>
    );
  }

  // Filter and sort logic
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'all' || 
                        (selectedLevel === 'beginner' && course.level.includes('مبتدی')) ||
                        (selectedLevel === 'intermediate' && course.level.includes('متوسط')) ||
                        (selectedLevel === 'advanced' && course.level.includes('پیشرفته'));
    
    const price = parseInt(course.price.replace(/,/g, ''));
    const matchesPrice = selectedPrice === 'all' ||
                        (selectedPrice === 'free' && price === 0) ||
                        (selectedPrice === 'under2m' && price < 2000000) ||
                        (selectedPrice === '2m-3m' && price >= 2000000 && price <= 3000000) ||
                        (selectedPrice === 'over3m' && price > 3000000);
    
    const matchesRating = selectedRating === 'all' ||
                         (selectedRating === '4+' && course.rating >= 4) ||
                         (selectedRating === '4.5+' && course.rating >= 4.5);
    
    return matchesSearch && matchesLevel && matchesPrice && matchesRating;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return parseInt(b.students.replace(/,/g, '')) - parseInt(a.students.replace(/,/g, ''));
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, ''));
      case 'newest':
        return a.updated.localeCompare(b.updated);
      default:
        return 0;
    }
  });

  const levels = levelOptions;
  const priceRanges = priceOptions;
  const ratings = ratingOptions;
  const sortOptions: Option<SortValue>[] = sortOptionsData;

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

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">خانه</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-gray-900">دسته‌بندی‌ها</Link>
            <span>/</span>
            <span className="text-gray-900">{category.title}</span>
          </div>
        </div>
      </div>

      {/* Category Hero */}
      <div className={`bg-gradient-to-r ${category.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.title}</h1>
              <p className="text-xl opacity-90 mb-6">{category.description}</p>
              <div className="flex items-center space-x-6 space-x-reverse">
                <div className="text-center">
                  <div className="text-2xl font-bold">{category.totalCourses}</div>
                  <div className="text-sm opacity-80">دوره</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{category.totalStudents}</div>
                  <div className="text-sm opacity-80">دانشجو</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در دوره‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Sort */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg border transition-colors ${
                  showFilters ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>فیلترها</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سطح دوره</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {levels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">محدوده قیمت</label>
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">امتیاز</label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>{rating.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {sortedCourses.length} دوره یافت شد
          </div>
        </div>

        {/* Courses Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortedCourses.map((course) => (
            <div key={course.id} className={`group cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}>
              <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                {/* Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-48'}`}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex items-center space-x-2 space-x-reverse">
                    {course.bestseller && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        پرفروش
                      </span>
                    )}
                    <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.price} تومان
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className={`${viewMode === 'list' ? 'flex justify-between items-start' : ''}`}>
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{course.instructor}</p>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{course.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className={`${viewMode === 'list' ? 'flex items-center space-x-6 space-x-reverse' : 'space-y-2'} mb-4`}>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{course.students} دانشجو</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{course.rating} ({course.reviews})</span>
                        </div>
                      </div>

                      {/* Level Badge */}
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${category.bgColor} ${category.textColor}`}>
                          {course.level}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className={viewMode === 'list' ? 'flex-shrink-0 mr-4' : ''}>
                      <Link
                        href={`/course/${course.id}`}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                      >
                        <Play className="w-4 h-4" />
                        <span>مشاهده دوره</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">دوره‌ای یافت نشد</h3>
            <p className="text-gray-500 mb-4">لطفاً کلمات کلیدی دیگری را امتحان کنید یا فیلترها را تغییر دهید</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('all');
                setSelectedPrice('all');
                setSelectedRating('all');
              }}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}

        {/* Back to Categories */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            بازگشت به دسته‌بندی‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}