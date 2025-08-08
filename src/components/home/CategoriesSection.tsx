import type { CategoryItem } from '@/types/home';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  categories: ReadonlyArray<CategoryItem>;
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">دسته‌بندی دوره‌ها</h2>
          <p className="text-xl text-gray-600">در هر زمینه‌ای که علاقه دارید، دوره‌های متنوعی در انتظار شماست</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald-600 font-medium">{category.courses}</span>
                  <div className="flex items-center text-emerald-600 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium ml-2">مشاهده دوره‌ها</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-block border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-medium px-8 py-4 rounded-lg transition-all duration-200"
          >
            مشاهده همه دسته‌بندی‌ها
          </Link>
        </div>
      </div>
    </section>
  );
}

