import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">آماده شروع یادگیری هستید؟</h2>
        <p className="text-xl mb-8 opacity-90">همین امروز ثبت نام کنید و به هزاران دانشجوی موفق بپیوندید</p>
        <Link href="/signup" className="bg-white text-emerald-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-colors inline-block">
          شروع رایگان
        </Link>
      </div>
    </section>
  );
}

