import { Star } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">نظرات دانشجویان ما</h2>
          <p className="text-xl text-gray-600">آنچه دانشجویان درباره آکادمی دانش می‌گویند</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">4.8</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-gray-600">میانگین امتیاز</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">15,000+</div>
            <div className="text-gray-600">نظر مثبت</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-gray-600">رضایت دانشجویان</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "دوره‌ها عالی و کاربردی هستند. پشتیبانی و کیفیت تدریس بسیار خوب است."
              </blockquote>
              <div className="flex items-center">
                <img
                  src={
                    i % 2 === 0
                      ? 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
                      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
                  }
                  alt="کاربر"
                  className="w-12 h-12 rounded-full object-cover ml-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">کاربر {i}</div>
                  <div className="text-sm text-gray-600">نقش/حوزه</div>
                  <div className="text-xs text-emerald-600">دوره: نمونه</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

