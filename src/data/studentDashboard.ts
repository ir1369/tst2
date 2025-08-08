import {
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  CheckCircle,
  Play,
  Target,
  BarChart3,
  Calendar,
  Activity,
  Bookmark,
  MessageCircle,
  Settings
} from 'lucide-react';
import type {
  StatItem,
  UpcomingClassItem,
  RecentActivityItem,
  CourseProgressItem,
  BookmarkedResourceItem,
  MenuItem
} from '@/types/studentDashboard';

export const stats: StatItem[] = [
  {
    title: 'دوره‌های فعال',
    value: '8',
    change: '2 دوره جدید این ماه',
    changeType: 'positive',
    icon: BookOpen,
    color: 'bg-blue-500'
  },
  {
    title: 'ساعات یادگیری',
    value: '124',
    change: '+18 ساعت این هفته',
    changeType: 'positive',
    icon: Clock,
    color: 'bg-emerald-500'
  },
  {
    title: 'میانگین نمرات',
    value: '85%',
    change: '+7% از ماه گذشته',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-purple-500'
  },
  {
    title: 'گواهی‌نامه‌ها',
    value: '5',
    change: '2 گواهی جدید',
    changeType: 'positive',
    icon: Award,
    color: 'bg-orange-500'
  }
];

export const upcomingClasses: UpcomingClassItem[] = [
  {
    day: 'دوشنبه',
    date: '24',
    title: 'برنامه‌نویسی React.js: کامپوننت‌ها',
    time: '9:00 صبح - 10:30 صبح',
    instructor: 'دکتر احمد محمدی',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    day: 'سه‌شنبه',
    date: '25',
    title: 'طراحی UI/UX: اصول طراحی',
    time: '11:00 صبح - 12:30 ظهر',
    instructor: 'مهندس فاطمه احمدی',
    color: 'bg-green-100 text-green-600'
  },
  {
    day: 'چهارشنبه',
    date: '26',
    title: 'بازاریابی دیجیتال: SEO پیشرفته',
    time: '2:00 ظهر - 3:30 ظهر',
    instructor: 'استاد مریم احمدی',
    color: 'bg-purple-100 text-purple-600'
  }
];

export const recentActivities: RecentActivityItem[] = [
  {
    action: 'تکلیف ارسال کردید',
    item: 'پروژه React.js',
    course: 'برنامه‌نویسی React.js',
    time: '30 دقیقه پیش',
    status: 'completed',
    icon: CheckCircle
  },
  {
    action: 'ویدیو مشاهده کردید',
    item: 'اصول طراحی UI',
    course: 'طراحی رابط کاربری',
    time: '2 ساعت پیش',
    status: 'watched',
    icon: Play
  },
  {
    action: 'کوییز شرکت کردید',
    item: 'کوییز بازاریابی دیجیتال',
    course: 'بازاریابی دیجیتال',
    time: '1 روز پیش',
    status: 'quiz',
    icon: Target
  },
  {
    action: 'گواهی نامه دریافت کردید',
    item: 'گواهی JavaScript پایه',
    course: 'JavaScript مدرن',
    time: '3 روز پیش',
    status: 'certificate',
    icon: Award
  }
];

export const courseProgress: CourseProgressItem[] = [
  {
    title: 'برنامه‌نویسی React.js',
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    nextLesson: 'State Management',
    color: 'bg-blue-500'
  },
  {
    title: 'طراحی UI/UX',
    progress: 60,
    totalLessons: 20,
    completedLessons: 12,
    nextLesson: 'User Research',
    color: 'bg-purple-500'
  },
  {
    title: 'بازاریابی دیجیتال',
    progress: 90,
    totalLessons: 16,
    completedLessons: 14,
    nextLesson: 'Analytics',
    color: 'bg-green-500'
  }
];

export const bookmarkedResources: BookmarkedResourceItem[] = [
  {
    name: 'راهنمای React Hooks.pdf',
    course: 'برنامه‌نویسی React.js',
    size: '8.2 مگابایت',
    addedTime: 'دیروز ذخیره شده',
    type: 'pdf'
  },
  {
    name: 'چک‌لیست طراحی UI.docx',
    course: 'طراحی رابط کاربری',
    size: '1.5 مگابایت',
    addedTime: '2 روز پیش ذخیره شده',
    type: 'doc'
  },
  {
    name: 'ویدیو آموزش SEO.mp4',
    course: 'بازاریابی دیجیتال',
    size: '125 مگابایت',
    addedTime: 'هفته گذشته ذخیره شده',
    type: 'video'
  }
];

export const menuItems: MenuItem[] = [
  { icon: BarChart3, label: 'داشبورد', active: true },
  { icon: BookOpen, label: 'دوره‌های من' },
  { icon: Calendar, label: 'برنامه کلاس‌ها' },
  { icon: Activity, label: 'پیشرفت تحصیلی' },
  { icon: Bookmark, label: 'منابع ذخیره شده' },
  { icon: Award, label: 'گواهی‌نامه‌ها' },
  { icon: MessageCircle, label: 'پیام‌ها', badge: '2' },
  { icon: Settings, label: 'تنظیمات' }
];

