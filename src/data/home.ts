import { BookOpen, Users, Award, Globe, Code, Palette, TrendingUp, Languages, Camera, Music } from 'lucide-react';
import type { FeaturedCourse, HomeStat, CategoryItem } from '@/types/home';

export const featuredCourses: FeaturedCourse[] = [
  {
    id: 1,
    title: 'برنامه‌نویسی React.js',
    instructor: 'دکتر احمد محمدی',
    duration: '12 ساعت',
    students: '2,450',
    rating: 4.8,
    price: '1,200,000',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'یادگیری ماشین با Python',
    instructor: 'دکتر فاطمه کریمی',
    duration: '18 ساعت',
    students: '1,890',
    rating: 4.9,
    price: '1,800,000',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'طراحی رابط کاربری UI/UX',
    instructor: 'استاد مریم احمدی',
    duration: '15 ساعت',
    students: '3,120',
    rating: 4.7,
    price: '1,500,000',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
  }
];

export const stats: HomeStat[] = [
  { icon: Users, number: '50,000+', label: 'دانشجو' },
  { icon: BookOpen, number: '500+', label: 'دوره آموزشی' },
  { icon: Award, number: '200+', label: 'مدرس متخصص' },
  { icon: Globe, number: '25+', label: 'کشور' }
];

export const categories: CategoryItem[] = [
  {
    icon: Code,
    title: 'برنامه‌نویسی',
    description: 'یادگیری زبان‌های برنامه‌نویسی مدرن',
    courses: '120+ دوره',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Palette,
    title: 'طراحی',
    description: 'UI/UX، گرافیک و طراحی وب',
    courses: '85+ دوره',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: TrendingUp,
    title: 'بازاریابی',
    description: 'دیجیتال مارکتینگ و فروش',
    courses: '60+ دوره',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Languages,
    title: 'زبان‌های خارجی',
    description: 'یادگیری زبان‌های مختلف',
    courses: '45+ دوره',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Camera,
    title: 'عکاسی و فیلم',
    description: 'تکنیک‌های عکاسی و فیلمسازی',
    courses: '35+ دوره',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Music,
    title: 'موسیقی',
    description: 'آموزش ساز و تئوری موسیقی',
    courses: '25+ دوره',
    color: 'from-indigo-500 to-indigo-600'
  }
];

