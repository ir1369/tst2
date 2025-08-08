import type { CategorySummary, CourseItem, Option, LevelValue, PriceValue, RatingValue, SortValue } from '@/types/categoryCourses';

export const categoriesById: Record<number, CategorySummary> = {
  1: {
    id: 1,
    title: 'برنامه‌نویسی',
    description: 'یادگیری زبان‌های برنامه‌نویسی مدرن و توسعه نرم‌افزار',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    totalCourses: 120,
    totalStudents: '25,000+',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=400&fit=crop'
  },
  2: {
    id: 2,
    title: 'طراحی',
    description: 'UI/UX، گرافیک، طراحی وب و هنرهای دیجیتال',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    totalCourses: 85,
    totalStudents: '18,500+',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=400&fit=crop'
  },
  3: {
    id: 3,
    title: 'بازاریابی',
    description: 'دیجیتال مارکتینگ، فروش و استراتژی‌های تجاری',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    totalCourses: 60,
    totalStudents: '12,300+',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop'
  }
};

export const coursesByCategoryId: Record<number, CourseItem[]> = {
  1: [
    {
      id: 1,
      title: 'برنامه‌نویسی React.js از مبتدی تا پیشرفته',
      instructor: 'دکتر احمد محمدی',
      description: 'یادگیری کامل React.js با پروژه‌های عملی و مفاهیم پیشرفته',
      price: '2,500,000',
      originalPrice: '4,200,000',
      duration: '200 ساعت',
      students: '12,500',
      rating: 4.8,
      reviews: 1250,
      level: 'متوسط تا پیشرفته',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      tags: ['React', 'JavaScript', 'Frontend'],
      bestseller: true,
      updated: '2 هفته پیش'
    },
    {
      id: 2,
      title: 'Python برای علم داده',
      instructor: 'دکتر سارا احمدی',
      description: 'یادگیری Python و کتابخانه‌های علم داده',
      price: '1,800,000',
      originalPrice: '3,000,000',
      duration: '150 ساعت',
      students: '8,900',
      rating: 4.7,
      reviews: 890,
      level: 'مبتدی تا متوسط',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
      tags: ['Python', 'Data Science', 'Machine Learning'],
      bestseller: false,
      updated: '1 ماه پیش'
    },
    {
      id: 3,
      title: 'توسعه وب با Node.js',
      instructor: 'مهندس علی رضایی',
      description: 'ساخت API و برنامه‌های وب با Node.js و Express',
      price: '2,200,000',
      originalPrice: '3,500,000',
      duration: '180 ساعت',
      students: '6,700',
      rating: 4.6,
      reviews: 670,
      level: 'متوسط',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      tags: ['Node.js', 'Backend', 'API'],
      bestseller: false,
      updated: '3 هفته پیش'
    },
    {
      id: 4,
      title: 'برنامه‌نویسی موبایل با Flutter',
      instructor: 'دکتر مریم کریمی',
      description: 'ساخت اپلیکیشن‌های موبایل کراس پلتفرم',
      price: '2,800,000',
      originalPrice: '4,500,000',
      duration: '220 ساعت',
      students: '5,400',
      rating: 4.9,
      reviews: 540,
      level: 'متوسط تا پیشرفته',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      tags: ['Flutter', 'Mobile', 'Dart'],
      bestseller: true,
      updated: '1 هفته پیش'
    },
    {
      id: 5,
      title: 'جاوا اسکریپت مدرن ES6+',
      instructor: 'استاد حسین محمدی',
      description: 'یادگیری ویژگی‌های جدید JavaScript',
      price: '1,500,000',
      originalPrice: '2,500,000',
      duration: '120 ساعت',
      students: '15,200',
      rating: 4.5,
      reviews: 1520,
      level: 'مبتدی تا متوسط',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
      tags: ['JavaScript', 'ES6', 'Frontend'],
      bestseller: false,
      updated: '2 ماه پیش'
    },
    {
      id: 6,
      title: 'برنامه‌نویسی Java از صفر',
      instructor: 'دکتر فاطمه نوری',
      description: 'یادگیری کامل زبان Java و برنامه‌نویسی شی‌گرا',
      price: '2,000,000',
      originalPrice: '3,200,000',
      duration: '160 ساعت',
      students: '9,800',
      rating: 4.4,
      reviews: 980,
      level: 'مبتدی',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
      tags: ['Java', 'OOP', 'Backend'],
      bestseller: false,
      updated: '1 ماه پیش'
    }
  ],
  2: [
    {
      id: 7,
      title: 'طراحی رابط کاربری با Figma',
      instructor: 'مهندس فاطمه احمدی',
      description: 'یادگیری طراحی UI/UX حرفه‌ای با Figma',
      price: '1,800,000',
      originalPrice: '3,000,000',
      duration: '150 ساعت',
      students: '8,200',
      rating: 4.9,
      reviews: 820,
      level: 'مبتدی تا متوسط',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      tags: ['Figma', 'UI/UX', 'Design'],
      bestseller: true,
      updated: '1 هفته پیش'
    },
    {
      id: 8,
      title: 'گرافیک دیزاین با Adobe Photoshop',
      instructor: 'استاد علی حسینی',
      description: 'تسلط بر Photoshop برای طراحی گرافیک',
      price: '1,600,000',
      originalPrice: '2,800,000',
      duration: '130 ساعت',
      students: '11,500',
      rating: 4.6,
      reviews: 1150,
      level: 'مبتدی',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop',
      tags: ['Photoshop', 'Graphic Design', 'Adobe'],
      bestseller: false,
      updated: '2 هفته پیش'
    },
    {
      id: 9,
      title: 'طراحی لوگو و هویت بصری',
      instructor: 'دکتر مریم رضایی',
      description: 'ساخت لوگو و برند حرفه‌ای',
      price: '2,100,000',
      originalPrice: '3,400,000',
      duration: '140 ساعت',
      students: '6,300',
      rating: 4.8,
      reviews: 630,
      level: 'متوسط',
      image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=250&fit=crop',
      tags: ['Logo Design', 'Branding', 'Identity'],
      bestseller: true,
      updated: '3 هفته پیش'
    }
  ],
  3: [
    {
      id: 10,
      title: 'دیجیتال مارکتینگ جامع',
      instructor: 'استاد احمد کریمی',
      description: 'یادگیری کامل بازاریابی دیجیتال',
      price: '2,300,000',
      originalPrice: '3,800,000',
      duration: '170 ساعت',
      students: '7,800',
      rating: 4.7,
      reviews: 780,
      level: 'متوسط',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      tags: ['Digital Marketing', 'SEO', 'Social Media'],
      bestseller: true,
      updated: '1 هفته پیش'
    },
    {
      id: 11,
      title: 'تبلیغات گوگل و Google Ads',
      instructor: 'دکتر سارا محمدی',
      description: 'مدیریت کمپین‌های تبلیغاتی گوگل',
      price: '1,900,000',
      originalPrice: '3,100,000',
      duration: '120 ساعت',
      students: '5,600',
      rating: 4.5,
      reviews: 560,
      level: 'متوسط تا پیشرفته',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
      tags: ['Google Ads', 'PPC', 'Advertising'],
      bestseller: false,
      updated: '2 هفته پیش'
    }
  ]
};

export const levelOptions: Option<LevelValue>[] = [
  { value: 'all', label: 'همه سطوح' },
  { value: 'beginner', label: 'مبتدی' },
  { value: 'intermediate', label: 'متوسط' },
  { value: 'advanced', label: 'پیشرفته' }
];

export const priceOptions: Option<PriceValue>[] = [
  { value: 'all', label: 'همه قیمت‌ها' },
  { value: 'free', label: 'رایگان' },
  { value: 'under2m', label: 'زیر 2 میلیون' },
  { value: '2m-3m', label: '2 تا 3 میلیون' },
  { value: 'over3m', label: 'بالای 3 میلیون' }
];

export const ratingOptions: Option<RatingValue>[] = [
  { value: 'all', label: 'همه امتیازها' },
  { value: '4+', label: '4+ ستاره' },
  { value: '4.5+', label: '4.5+ ستاره' }
];

export const sortOptions: Option<SortValue>[] = [
  { value: 'popular', label: 'محبوب‌ترین' },
  { value: 'rating', label: 'بالاترین امتیاز' },
  { value: 'price-low', label: 'ارزان‌ترین' },
  { value: 'price-high', label: 'گران‌ترین' },
  { value: 'newest', label: 'جدیدترین' }
];



