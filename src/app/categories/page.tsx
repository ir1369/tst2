'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Users, Star } from 'lucide-react';
import { categories as categoriesData, levels as levelsData } from '@/data/categories';
import type { ViewMode } from '@/types/categories';
import { FiltersBar } from '@/components/categories/FiltersBar';
import { CategoryCard } from '@/components/categories/CategoryCard';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const categories = categoriesData;
  const levels = levelsData;

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'all' || 
                        (selectedLevel === 'beginner' && category.level.includes('مبتدی')) ||
                        (selectedLevel === 'intermediate' && category.level.includes('متوسط')) ||
                        (selectedLevel === 'advanced' && category.level.includes('پیشرفته'));
    
    return matchesSearch && matchesLevel;
  });

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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">دسته‌بندی دوره‌ها</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            بیش از ۵۰۰ دوره آموزشی در ۱۲ دسته‌بندی مختلف برای یادگیری مهارت‌های جدید
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FiltersBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          selectedLevel={selectedLevel}
          onSelectedLevelChange={setSelectedLevel}
          levels={levels}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultsCount={filteredCategories.length}
        />

        {/* Categories Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} viewMode={viewMode} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">دسته‌بندی‌ای یافت نشد</h3>
            <p className="text-gray-500 mb-4">لطفاً کلمات کلیدی دیگری را امتحان کنید</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('all');
              }}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">دسته‌بندی مورد نظرتان را پیدا نکردید؟</h2>
          <p className="text-emerald-100 mb-6">
            ما مدام در حال اضافه کردن دوره‌های جدید هستیم. پیشنهادات خود را با ما در میان بگذارید.
          </p>
          <Link
            href="/contact"
            className="bg-white text-emerald-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition-colors inline-block"
          >
            تماس با ما
          </Link>
        </div>
      </div>
    </div>
  );
}