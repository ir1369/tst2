'use client';

import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  Award, 
  Target,
  Heart,
  Lightbulb,
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  Calendar,
  MapPin
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, number: "50,000+", label: "دانشجوی فعال" },
    { icon: BookOpen, number: "500+", label: "دوره آموزشی" },
    { icon: Award, number: "200+", label: "مدرس متخصص" },
    { icon: Globe, number: "25+", label: "کشور" }
  ];

  const values = [
    {
      icon: Target,
      title: "کیفیت بالا",
      description: "ما متعهد به ارائه بالاترین کیفیت آموزش هستیم. تمام دوره‌های ما توسط متخصصان باتجربه طراحی و بررسی می‌شوند."
    },
    {
      icon: Heart,
      title: "دسترسی برای همه",
      description: "ما معتقدیم که آموزش باید برای همه قابل دسترس باشد. قیمت‌های منصفانه و بورسیه‌های تحصیلی ما این هدف را محقق می‌کند."
    },
    {
      icon: Lightbulb,
      title: "نوآوری مداوم",
      description: "ما همیشه در حال بروزرسانی محتوا و روش‌های تدریس خود هستیم تا با آخرین تکنولوژی‌ها همگام باشیم."
    },
    {
      icon: Users,
      title: "جامعه قوی",
      description: "ما یک جامعه قوی از یادگیرندگان و مدرسان ایجاد کرده‌ایم که در آن همه می‌توانند از تجربیات یکدیگر بهره‌مند شوند."
    }
  ];

  const team = [
    {
      name: "دکتر احمد محمدی",
      role: "مدیر عامل و بنیانگذار",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "دکترای مهندسی کامپیوتر با بیش از 15 سال تجربه در صنعت فناوری و آموزش"
    },
    {
      name: "دکتر فاطمه کریمی",
      role: "مدیر آموزش",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "متخصص طراحی آموزشی با تجربه گسترده در توسعه برنامه‌های درسی نوآورانه"
    },
    {
      name: "مهندس علی رضایی",
      role: "مدیر فناوری",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "متخصص توسعه نرم‌افزار و معماری سیستم‌های مقیاس‌پذیر"
    },
    {
      name: "دکتر مریم احمدی",
      role: "مدیر محتوا",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "متخصص تولید محتوای آموزشی و روش‌های یادگیری مؤثر"
    }
  ];

  const milestones = [
    {
      year: "1400",
      title: "تأسیس آکادمی دانش",
      description: "شروع فعالیت با 10 دوره اولیه در حوزه برنامه‌نویسی"
    },
    {
      year: "1401",
      title: "گسترش دوره‌ها",
      description: "اضافه شدن دوره‌های طراحی و بازاریابی دیجیتال"
    },
    {
      year: "1402",
      title: "رسیدن به 10,000 دانشجو",
      description: "عبور از مرز 10 هزار دانشجوی فعال"
    },
    {
      year: "1403",
      title: "بین‌المللی شدن",
      description: "ارائه دوره‌ها به زبان‌های مختلف و حضور در 25 کشور"
    }
  ];

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
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">درباره آکادمی دانش</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            ما با هدف دموکراتیزه کردن آموزش و دسترسی همگان به یادگیری با کیفیت تأسیس شدیم
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">ماموریت ما</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                آکادمی دانش با هدف ایجاد دسترسی آسان و مقرون‌به‌صرفه به آموزش‌های با کیفیت تأسیس شده است. 
                ما معتقدیم که هر فردی حق دارد به بهترین منابع آموزشی دسترسی داشته باشد، صرف‌نظر از موقعیت 
                جغرافیایی یا وضعیت اقتصادی‌اش.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                تیم ما متشکل از متخصصان باتجربه در حوزه‌های مختلف است که با اشتیاق و تعهد، 
                محتوای آموزشی با کیفیت تولید می‌کنند و تجربه یادگیری منحصر‌به‌فردی را برای دانشجویان فراهم می‌آورند.
              </p>
              <div className="flex items-center space-x-4 space-x-reverse">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <span className="text-gray-700">آموزش با کیفیت و به‌روز</span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse mt-3">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <span className="text-gray-700">پشتیبانی 24/7 از دانشجویان</span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse mt-3">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <span className="text-gray-700">گواهی‌نامه معتبر و قابل اعتماد</span>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="تیم آکادمی دانش"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ارزش‌های ما</h2>
            <p className="text-xl text-gray-600">اصول و باورهایی که ما را هدایت می‌کنند</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">سفر ما</h2>
            <p className="text-xl text-gray-600">نگاهی به مسیر رشد و توسعه آکادمی دانش</p>
          </div>
          
          <div className="relative">
            <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start space-x-4 space-x-reverse">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center relative z-10">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <span className="text-emerald-600 font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">تیم ما</h2>
            <p className="text-xl text-gray-600">متخصصانی که آکادمی دانش را می‌سازند</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">به خانواده آکادمی دانش بپیوندید</h2>
          <p className="text-xl mb-8 opacity-90">
            همین امروز شروع کنید و مسیر یادگیری خود را با ما طی کنید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-emerald-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-colors"
            >
              ثبت نام رایگان
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-medium px-8 py-4 rounded-lg transition-colors"
            >
              تماس با ما
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-8 h-8 text-emerald-600" />
                <span className="text-2xl font-bold">آکادمی دانش</span>
              </div>
              <p className="text-gray-400">
                بهترین پلتفرم یادگیری آنلاین برای همه
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">دوره‌ها</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/category/1" className="hover:text-white transition-colors">برنامه‌نویسی</Link></li>
                <li><Link href="/category/2" className="hover:text-white transition-colors">طراحی</Link></li>
                <li><Link href="/category/3" className="hover:text-white transition-colors">بازاریابی</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors">همه دوره‌ها</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">پشتیبانی</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">راهنما</a></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">تماس با ما</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">سوالات متداول</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">شبکه‌های اجتماعی</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">اینستاگرام</a></li>
                <li><a href="#" className="hover:text-white transition-colors">تلگرام</a></li>
                <li><a href="#" className="hover:text-white transition-colors">یوتیوب</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; ۱۴۰۳ آکادمی دانش. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}