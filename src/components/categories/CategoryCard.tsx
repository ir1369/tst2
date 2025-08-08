import Link from 'next/link';
import { ArrowRight, BookOpen, Star, Users } from 'lucide-react';
import type { Category, ViewMode } from '@/types/categories';

interface CategoryCardProps {
  category: Category;
  viewMode: ViewMode;
}

export function CategoryCard({ category, viewMode }: CategoryCardProps) {
  return (
    <div className={`group cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}>
      <div
        className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
          viewMode === 'list' ? 'flex w-full' : ''
        }`}
      >
        <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'}`}>
          <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
          <div
            className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <category.icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <div className={`${viewMode === 'list' ? 'flex justify-between items-start' : ''}`}>
            <div className={viewMode === 'list' ? 'flex-1' : ''}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>

              <div className={`${viewMode === 'list' ? 'flex items-center space-x-6 space-x-reverse' : 'space-y-2'} mb-4`}>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                  <BookOpen className="w-4 h-4" />
                  <span>{category.courses} دوره</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{category.students} دانشجو</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{category.avgRating}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${category.bgColor} ${category.textColor}`}>
                  {category.level}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.slice(0, viewMode === 'list' ? 6 : 4).map((sub, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > (viewMode === 'list' ? 6 : 4) && (
                    <span className="text-xs text-gray-500">
                      +{category.subcategories.length - (viewMode === 'list' ? 6 : 4)} بیشتر
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={viewMode === 'list' ? 'flex-shrink-0 mr-4' : ''}>
              <Link
                href={`/category/${category.id}`}
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group-hover:translate-x-1 transition-transform duration-300"
              >
                <span className="ml-2">مشاهده دوره‌ها</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

