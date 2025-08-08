import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
          یادگیری آنلاین را تجربه کنید
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
          با بهترین اساتید و دوره‌های با کیفیت، مهارت‌های جدید را یاد بگیرید و آینده خود را بسازید
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            شروع یادگیری رایگان
          </Link>
          <Link
            href="#courses"
            className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-medium px-8 py-4 rounded-lg transition-all duration-200"
          >
            مشاهده دوره‌ها
          </Link>
        </div>
      </div>
    </section>
  );
}

