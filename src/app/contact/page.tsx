'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  HeadphonesIcon,
  Users,
  CheckCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Contact form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "ایمیل",
      info: "info@daneshacademy.ir",
      description: "برای سوالات عمومی و پشتیبانی"
    },
    {
      icon: Phone,
      title: "تلفن",
      info: "021-1234-5678",
      description: "پاسخگویی در ساعات اداری"
    },
    {
      icon: MapPin,
      title: "آدرس",
      info: "تهران، خیابان ولیعصر، پلاک 123",
      description: "دفتر مرکزی آکادمی دانش"
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      info: "شنبه تا پنج‌شنبه، 9 تا 18",
      description: "پشتیبانی آنلاین 24/7"
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "چت آنلاین",
      description: "پاسخ فوری به سوالات شما",
      action: "شروع چت",
      color: "bg-blue-500"
    },
    {
      icon: HeadphonesIcon,
      title: "پشتیبانی تلفنی",
      description: "تماس مستقیم با کارشناسان",
      action: "تماس بگیرید",
      color: "bg-green-500"
    },
    {
      icon: Users,
      title: "انجمن کاربران",
      description: "پرسش و پاسخ با سایر دانشجویان",
      action: "ورود به انجمن",
      color: "bg-purple-500"
    }
  ];

  const faqItems = [
    {
      question: "چگونه می‌توانم در دوره‌ها ثبت نام کنم؟",
      answer: "برای ثبت نام در دوره‌ها، ابتدا باید حساب کاربری ایجاد کنید، سپس دوره مورد نظر را انتخاب کرده و فرآیند پرداخت را تکمیل کنید."
    },
    {
      question: "آیا گواهی نامه دریافت خواهم کرد؟",
      answer: "بله، پس از تکمیل موفقیت‌آمیز هر دوره، گواهی نامه معتبر دریافت خواهید کرد که قابل تأیید و اشتراک‌گذاری است."
    },
    {
      question: "آیا امکان بازپرداخت وجود دارد؟",
      answer: "بله، ما 30 روز ضمانت بازگشت وجه ارائه می‌دهیم. اگر از دوره راضی نباشید، می‌توانید درخواست بازپرداخت دهید."
    },
    {
      question: "چگونه با مدرسان ارتباط برقرار کنم؟",
      answer: "شما می‌توانید از طریق بخش سوال و جواب هر دوره، ایمیل، یا جلسات آنلاین با مدرسان ارتباط برقرار کنید."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">پیام شما ارسال شد!</h2>
          <p className="text-gray-600 mb-6">
            متشکریم که با ما تماس گرفتید. تیم پشتیبانی ما در اسرع وقت با شما تماس خواهد گرفت.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors block"
            >
              بازگشت به صفحه اصلی
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              ارسال پیام جدید
            </button>
          </div>
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">تماس با ما</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            ما همیشه آماده پاسخگویی به سوالات شما هستیم. با ما در ارتباط باشید
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">پیام خود را ارسال کنید</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      ایمیل
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    موضوع
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">موضوع را انتخاب کنید</option>
                    <option value="course-inquiry">سوال درباره دوره‌ها</option>
                    <option value="technical-support">پشتیبانی فنی</option>
                    <option value="payment-issue">مشکل پرداخت</option>
                    <option value="partnership">همکاری</option>
                    <option value="feedback">نظرات و پیشنهادات</option>
                    <option value="other">سایر موارد</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    پیام
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="پیام خود را اینجا بنویسید..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>در حال ارسال...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ارسال پیام</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Support Options */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">اطلاعات تماس</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{info.title}</h4>
                      <p className="text-emerald-600 font-medium">{info.info}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Options */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">راه‌های دیگر پشتیبانی</h3>
              <div className="space-y-4">
                {supportOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <div className={`w-8 h-8 ${option.color} rounded-lg flex items-center justify-center`}>
                        <option.icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-medium text-gray-900">{option.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      {option.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">سوالات متداول</h2>
            <p className="text-xl text-gray-600">پاسخ سوالات رایج در اینجا</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">نقشه دفتر مرکزی</p>
                <p className="text-sm text-gray-500">تهران، خیابان ولیعصر، پلاک 123</p>
              </div>
            </div>
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