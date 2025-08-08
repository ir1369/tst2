'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Filter,
  Star,
  Users,
  Play,
  Award,
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle,
  Globe,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const teachers = [
    {
      id: 1,
      name: "دکتر احمد محمدی",
      title: "متخصص برنامه‌نویسی و توسعه نرم‌افزار",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
      rating: 4.9,
      reviews: 2450,
      students: "25,000+",
      courses: 15,
      experience: "10+ سال",
      location: "تهران، ایران",
      category: "برنامه‌نویسی",
      specialties: ["React.js", "Node.js", "JavaScript", "Python"],
      bio: "دکتر احمد محمدی با بیش از 10 سال تجربه در صنعت نرم‌افزار و 5 سال تدریس، یکی از برترین اساتید برنامه‌نویسی در کشور است. او در شرکت‌های بزرگ فناوری کار کرده و پروژه‌های متعددی را رهبری کرده است.",
      achievements: [
        "بیش از 25,000 دانشجوی موفق",
        "نویسنده 3 کتاب تخصصی",
        "سخنران در کنفرانس‌های بین‌المللی",
        "مشاور فناوری در استارتاپ‌ها"
      ],
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        website: "#"
      },
      isVerified: true,
      isTopRated: true,
      joinDate: "1399"
    },
    {
      id: 2,
      name: "دکتر فاطمه کریمی",
      title: "متخصص طراحی UI/UX و تجربه کاربری",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
      rating: 4.8,
      reviews: 1890,
      students: "18,500+",
      courses: 12,
      experience: "8+ سال",
      location: "اصفهان، ایران",
      category: "طراحی",
      specialties: ["UI/UX Design", "Figma", "Adobe XD", "User Research"],
      bio: "دکتر فاطمه کریمی طراح ارشد UI/UX با تجربه کار در شرکت‌های معتبر بین‌المللی است. او در زمینه تحقیقات کاربری و طراحی تجربه کاربری تخصص دارد.",
      achievements: [
        "طراح ارشد در شرکت‌های بین‌المللی",
        "برنده جوایز طراحی معتبر",
        "مشاور طراحی برای استارتاپ‌ها",
        "نویسنده مقالات تخصصی"
      ],
      socialLinks: {
        linkedin: "#",
        instagram: "#",
        website: "#"
      },
      isVerified: true,
      isTopRated: true,
      joinDate: "1400"
    },
    {
      id: 3,
      name: "استاد مریم احمدی",
      title: "متخصص بازاریابی دیجیتال و استراتژی برند",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      rating: 4.7,
      reviews: 1650,
      students: "15,200+",
      courses: 10,
      experience: "12+ سال",
      location: "شیراز، ایران",
      category: "بازاریابی",
      specialties: ["Digital Marketing", "SEO", "Social Media", "Brand Strategy"],
      bio: "استاد مریم احمدی با بیش از 12 سال تجربه در بازاریابی دیجیتال، مشاور برندهای معتبر داخلی و خارجی بوده است. او در زمینه استراتژی برند و بازاریابی محتوا متخصص است.",
      achievements: [
        "مشاور بیش از 100 برند معتبر",
        "موسس آژانس بازاریابی دیجیتال",
        "سخنران TEDx",
        "نویسنده کتاب بازاریابی دیجیتال"
      ],
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      },
      isVerified: true,
      isTopRated: false,
      joinDate: "1398"
    },
    {
      id: 4,
      name: "دکتر علی رضایی",
      title: "متخصص هوش مصنوعی و یادگیری ماشین",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop",
      rating: 4.9,
      reviews: 980,
      students: "8,900+",
      courses: 8,
      experience: "15+ سال",
      location: "تهران، ایران",
      category: "هوش مصنوعی",
      specialties: ["Machine Learning", "Deep Learning", "Python", "TensorFlow"],
      bio: "دکتر علی رضایی محقق و استاد دانشگاه در زمینه هوش مصنوعی است. او در پروژه‌های تحقیقاتی بین‌المللی مشارکت داشته و مقالات متعددی در مجلات معتبر منتشر کرده است.",
      achievements: [
        "دکترای هوش مصنوعی از دانشگاه معتبر",
        "نویسنده بیش از 50 مقاله علمی",
        "مشاور فناوری در شرکت‌های بزرگ",
        "عضو هیئت علمی دانشگاه"
      ],
      socialLinks: {
        linkedin: "#",
        website: "#"
      },
      isVerified: true,
      isTopRated: true,
      joinDate: "1401"
    },
    {
      id: 5,
      name: "استاد سارا نوری",
      title: "متخصص زبان‌های خارجی و روش‌های تدریس",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
      rating: 4.8,
      reviews: 2100,
      students: "22,000+",
      courses: 18,
      experience: "9+ سال",
      location: "مشهد، ایران",
      category: "زبان",
      specialties: ["English", "IELTS", "TOEFL", "Business English"],
      bio: "استاد سارا نوری با مدرک فوق‌لیسانس آموزش زبان انگلیسی و تجربه تدریس در موسسات معتبر، متخصص آموزش زبان‌های خارجی است. او روش‌های نوین تدریس را به کار می‌گیرد.",
      achievements: [
        "مدرک CELTA از کمبریج",
        "مدرس رسمی آزمون‌های بین‌المللی",
        "نویسنده کتاب‌های آموزش زبان",
        "مشاور آموزشی موسسات زبان"
      ],
      socialLinks: {
        linkedin: "#",
        instagram: "#"
      },
      isVerified: true,
      isTopRated: false,
      joinDate: "1399"
    },
    {
      id: 6,
      name: "مهندس حسین محمدی",
      title: "متخصص عکاسی و فیلمسازی",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=400&fit=crop",
      rating: 4.6,
      reviews: 750,
      students: "6,800+",
      courses: 7,
      experience: "11+ سال",
      location: "کرج، ایران",
      category: "عکاسی",
      specialties: ["Portrait Photography", "Wedding Photography", "Photoshop", "Lightroom"],
      bio: "مهندس حسین محمدی عکاس حرفه‌ای با تجربه کار در پروژه‌های تجاری و هنری است. او در زمینه عکاسی پرتره و عکاسی عروسی تخصص دارد.",
      achievements: [
        "برنده جوایز عکاسی ملی",
        "عکاس رسمی رویدادهای مهم",
        "نمایشگاه‌های عکس شخصی",
        "مشاور بصری برندها"
      ],
      socialLinks: {
        instagram: "#",
        website: "#"
      },
      isVerified: true,
      isTopRated: false,
      joinDate: "1400"
    }
  ];

  const categories = [
    { value: 'all', label: 'همه دسته‌بندی‌ها' },
    { value: 'برنامه‌نویسی', label: 'برنامه‌نویسی' },
    { value: 'طراحی', label: 'طراحی' },
    { value: 'بازاریابی', label: 'بازاریابی' },
    { value: 'هوش مصنوعی', label: 'هوش مصنوعی' },
    { value: 'زبان', label: 'زبان‌های خارجی' },
    { value: 'عکاسی', label: 'عکاسی و فیلم' }
  ];

  const ratings = [
    { value: 'all', label: 'همه امتیازها' },
    { value: '4.5+', label: '4.5+ ستاره' },
    { value: '4.7+', label: '4.7+ ستاره' },
    { value: '4.8+', label: '4.8+ ستاره' }
  ];

  // Filter teachers
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || teacher.category === selectedCategory;
    
    const matchesRating = selectedRating === 'all' ||
                         (selectedRating === '4.5+' && teacher.rating >= 4.5) ||
                         (selectedRating === '4.7+' && teacher.rating >= 4.7) ||
                         (selectedRating === '4.8+' && teacher.rating >= 4.8);
    
    return matchesSearch && matchesCategory && matchesRating;
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">اساتید و مدرسان ما</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            با بهترین اساتید و متخصصان حوزه‌های مختلف آشنا شوید و از تجربه و دانش آن‌ها بهره‌مند شوید
          </p>
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
                placeholder="جستجو در اساتید..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg border transition-colors ${
                  showFilters ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>فیلترها</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
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
            {filteredTeachers.length} استاد یافت شد
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              {/* Cover Image */}
              <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-blue-500">
                <img
                  src={teacher.coverImage}
                  alt=""
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute top-4 right-4 flex items-center space-x-2 space-x-reverse">
                  {teacher.isTopRated && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 space-x-reverse">
                      <Award className="w-3 h-3" />
                      <span>برتر</span>
                    </span>
                  )}
                  {teacher.isVerified && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 space-x-reverse">
                      <CheckCircle className="w-3 h-3" />
                      <span>تأیید شده</span>
                    </span>
                  )}
                </div>
                <button className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Profile Section */}
              <div className="relative px-6 pb-6">
                {/* Avatar */}
                <div className="flex justify-center -mt-12 mb-4">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>

                {/* Basic Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{teacher.title}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-1 space-x-reverse mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{teacher.rating}</span>
                    <span className="text-sm text-gray-500">({teacher.reviews} نظر)</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-center space-x-1 space-x-reverse text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{teacher.location}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{teacher.students}</div>
                    <div className="text-xs text-gray-500">دانشجو</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{teacher.courses}</div>
                    <div className="text-xs text-gray-500">دوره</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{teacher.experience}</div>
                    <div className="text-xs text-gray-500">تجربه</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {teacher.specialties.slice(0, 3).map((specialty, index) => (
                      <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                        {specialty}
                      </span>
                    ))}
                    {teacher.specialties.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{teacher.specialties.length - 3} بیشتر
                      </span>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">
                  {teacher.bio}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-2 space-x-reverse">
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse">
                    <MessageCircle className="w-4 h-4" />
                    <span>تماس</span>
                  </button>
                  <button className="flex-1 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse">
                    <Play className="w-4 h-4" />
                    <span>دوره‌ها</span>
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-3 space-x-reverse mt-4 pt-4 border-t border-gray-100">
                  {teacher.socialLinks.linkedin && (
                    <a href={teacher.socialLinks.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {teacher.socialLinks.twitter && (
                    <a href={teacher.socialLinks.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {teacher.socialLinks.instagram && (
                    <a href={teacher.socialLinks.instagram} className="text-gray-400 hover:text-pink-600 transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {teacher.socialLinks.website && (
                    <a href={teacher.socialLinks.website} className="text-gray-400 hover:text-emerald-600 transition-colors">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">استادی یافت نشد</h3>
            <p className="text-gray-500 mb-4">لطفاً کلمات کلیدی دیگری را امتحان کنید یا فیلترها را تغییر دهید</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedRating('all');
              }}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">می‌خواهید استاد ما شوید؟</h2>
          <p className="text-emerald-100 mb-6">
            به جمع اساتید ما بپیوندید و دانش خود را با هزاران دانشجو به اشتراک بگذارید
          </p>
          <Link
            href="/contact"
            className="bg-white text-emerald-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition-colors inline-block"
          >
            درخواست همکاری
          </Link>
        </div>
      </div>
    </div>
  );
}